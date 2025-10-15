import { GoogleGenerativeAI } from '@google/generative-ai';
import { JobRequirements, Candidate, ScoringWeights, SkillMatch, LocationData, EmploymentTimeline, ExperienceLevel } from '@/types';
import {
  calculateSkillsScore,
  calculateLocationScore,
  calculateExperienceScore,
  calculateStabilityScore,
  calculateOverallScore
} from './scoring';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface ParsedJob {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface JobWithDuration {
  startDate: string;
  endDate: string;
  duration: number;
}

export async function analyzeResume(
  resumeText: string,
  jobRequirements: JobRequirements,
  weights: ScoringWeights
): Promise<Partial<Candidate>> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Analyze this resume and extract structured information. Return ONLY valid JSON without any markdown formatting or code blocks.

Resume:
${resumeText}

Extract the following information:
1. Name, email, phone
2. Skills (list all technical and professional skills mentioned)
3. Current/preferred location (infer from education or work history if not explicit)
4. Complete employment history with company names, positions, start dates, end dates
5. Education
6. Years of experience

Return JSON in this exact format:
{
  "name": "string",
  "email": "string",
  "phone": "string or null",
  "skills": ["skill1", "skill2"],
  "location": {
    "current": "string or null",
    "preferred": "string or null",
    "fromEducation": "string or null",
    "fromWorkHistory": "string or null"
  },
  "jobs": [
    {
      "company": "string",
      "position": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present"
    }
  ],
  "education": ["degree/institution"],
  "totalYears": number
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/```\n?$/, '');
    }

    const parsed = JSON.parse(cleanedText);

    // Process skills with matching
    const skillMatches: SkillMatch[] = parsed.skills.map((skill: string) => ({
      skill,
      matched: false,
      depth: 'intermediate' as const
    }));

    // Process location
    const locationData: LocationData = {
      current: parsed.location.current || parsed.location.fromWorkHistory || parsed.location.fromEducation,
      preferred: parsed.location.preferred,
      fromEducation: parsed.location.fromEducation,
      fromWorkHistory: parsed.location.fromWorkHistory,
      confidence: parsed.location.current ? 'high' : 'medium'
    };

    // Process employment timeline
    const jobs = parsed.jobs.map((job: ParsedJob) => {
      const startDate = job.startDate;
      const endDate = job.endDate;
      const duration = calculateJobDuration(startDate, endDate);

      return {
        company: job.company,
        position: job.position,
        startDate,
        endDate,
        duration
      };
    });

    const totalExperience = parsed.totalYears || calculateTotalExperience(jobs);
    const gaps = detectGaps(jobs);
    const averageJobDuration = jobs.length > 0
      ? jobs.reduce((sum: number, job: JobWithDuration) => sum + job.duration, 0) / jobs.length
      : 0;

    const timeline: EmploymentTimeline = {
      jobs,
      totalExperience,
      gaps,
      averageJobDuration
    };

    // Determine experience level and trajectory
    const experienceLevel: ExperienceLevel = {
      years: totalExperience,
      level: totalExperience < 3 ? 'entry' : totalExperience < 6 ? 'mid' : totalExperience < 10 ? 'senior' : 'lead',
      careerTrajectory: determineTrajectory(jobs)
    };

    // Calculate scores
    const skillsScore = calculateSkillsScore(skillMatches, jobRequirements.requiredSkills);
    const locationScore = calculateLocationScore(locationData, jobRequirements.location);
    const experienceScore = calculateExperienceScore(totalExperience, jobRequirements.minimumExperience, experienceLevel.careerTrajectory);
    const stabilityScore = calculateStabilityScore(averageJobDuration, gaps);

    const scores = {
      skills: skillsScore,
      location: locationScore,
      experience: experienceScore,
      stability: stabilityScore,
      overall: 0
    };

    scores.overall = calculateOverallScore(scores, weights);

    return {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      skills: skillMatches,
      location: locationData,
      timeline,
      experienceLevel,
      education: parsed.education,
      scores,
      resumeText
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
}

function calculateJobDuration(startDate: string, endDate: string): number {
  try {
    const start = new Date(startDate + '-01');
    const end = endDate.toLowerCase() === 'present' ? new Date() : new Date(endDate + '-01');
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(0, months);
  } catch {
    return 12; // Default to 1 year if parsing fails
  }
}

function calculateTotalExperience(jobs: JobWithDuration[]): number {
  const totalMonths = jobs.reduce((sum, job) => sum + job.duration, 0);
  return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal
}

function detectGaps(jobs: JobWithDuration[]): { startDate: string; endDate: string; duration: number }[] {
  if (jobs.length < 2) return [];

  const sortedJobs = [...jobs].sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const gaps = [];
  for (let i = 0; i < sortedJobs.length - 1; i++) {
    const currentEnd = new Date(sortedJobs[i].endDate === 'Present' ? new Date() : sortedJobs[i].endDate + '-01');
    const nextStart = new Date(sortedJobs[i + 1].startDate + '-01');

    const gapMonths = (nextStart.getFullYear() - currentEnd.getFullYear()) * 12 +
      (nextStart.getMonth() - currentEnd.getMonth());

    if (gapMonths > 1) {
      gaps.push({
        startDate: sortedJobs[i].endDate,
        endDate: sortedJobs[i + 1].startDate,
        duration: gapMonths
      });
    }
  }

  return gaps;
}

function determineTrajectory(jobs: JobWithDuration[]): 'ascending' | 'stable' | 'descending' {
  if (jobs.length < 2) return 'stable';

  const sortedJobs = [...jobs].sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Simple heuristic: check if job durations are increasing (ascending) or decreasing (descending)
  const durations = sortedJobs.map(j => j.duration);
  const increasing = durations.filter((d, i) => i === 0 || d >= durations[i - 1]).length;
  const decreasing = durations.filter((d, i) => i === 0 || d <= durations[i - 1]).length;

  if (increasing > decreasing) return 'ascending';
  if (decreasing > increasing) return 'descending';
  return 'stable';
}
