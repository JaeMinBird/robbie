import { GoogleGenerativeAI } from '@google/generative-ai';
import { JobRequirements, ScoringWeights, Candidate, CustomCriteriaMatch, DimensionScore, SkillMatch } from '@/types';
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
  company: string;
  position: string;
}

// Extract key traits from job description
export async function extractJobTraits(jobDescription: string): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Analyze this job description and extract 5-8 key traits, qualifications, or characteristics that would make an ideal candidate. Focus on skills, experience, education, location preferences, cultural fit, and any unique requirements.

Job Description:
${jobDescription}

Return ONLY a JSON array of strings, no markdown formatting:
["trait1", "trait2", "trait3", ...]`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Clean up response
    let cleanedText = text;
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/```\n?$/, '');
    }

    const traits = JSON.parse(cleanedText);
    return Array.isArray(traits) ? traits : [];
  } catch (error) {
    console.error('Error extracting job traits:', error);
    return [];
  }
}

// Analyze resume from PDF file directly using Gemini
export async function analyzeResumeFromPDF(
  fileData: ArrayBuffer,
  fileName: string,
  jobRequirements: JobRequirements,
  weights: ScoringWeights
): Promise<Partial<Candidate>> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  // Convert ArrayBuffer to base64
  const bytes = new Uint8Array(fileData);
  const base64Data = Buffer.from(bytes).toString('base64');

  const customCriteria = jobRequirements.customPrompt
    ? `\n\nIMPORTANT CUSTOM CRITERIA FROM RECRUITER: ${jobRequirements.customPrompt}\nEvaluate the candidate against this criteria and mention it in your analysis.`
    : '';

  const aiTraits = jobRequirements.aiExtractedTraits?.length
    ? `\n\nKey traits for this role: ${jobRequirements.aiExtractedTraits.join(', ')}`
    : '';

  const prompt = `Analyze this resume PDF and extract structured information. ${customCriteria}${aiTraits}

Extract the following information:
1. Name, email, phone
2. Skills (list all technical and professional skills mentioned)
3. Current/preferred location (infer from education or work history if not explicit)
4. Complete employment history with company names, positions, start dates, end dates
5. Education
6. Years of experience
7. ${customCriteria ? 'IMPORTANT: Evaluate how well this candidate matches the custom criteria. If they match a specific requirement (like school alumni, specific certification, etc.), provide a strong match rating.' : ''}

Return ONLY valid JSON without any markdown formatting or code blocks:
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
  "totalYears": number,
  "customCriteriaMatch": {
    "matched": boolean,
    "explanation": "string - detailed explanation of match/non-match",
    "matchLevel": "strong|partial|weak"
  }
}`;

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: 'application/pdf'
        }
      },
      prompt
    ]);

    const text = result.response.text();

    // Clean up the response
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/```\n?$/, '');
    }

    const parsed = JSON.parse(cleanedText);

    // Process the data (same as before)
    const skillMatches = parsed.skills.map((skill: string) => ({
      skill,
      matched: false,
      depth: 'intermediate' as const
    }));

    const locationData = {
      current: parsed.location.current || parsed.location.fromWorkHistory || parsed.location.fromEducation,
      preferred: parsed.location.preferred,
      fromEducation: parsed.location.fromEducation,
      fromWorkHistory: parsed.location.fromWorkHistory,
      confidence: (parsed.location.current ? 'high' : 'medium') as 'high' | 'medium' | 'low'
    };

    const jobs = parsed.jobs.map((job: ParsedJob) => {
      const duration = calculateJobDuration(job.startDate, job.endDate);
      return {
        company: job.company,
        position: job.position,
        startDate: job.startDate,
        endDate: job.endDate,
        duration
      };
    });

    const totalExperience = parsed.totalYears || calculateTotalExperience(jobs);
    const gaps = detectGaps(jobs);
    const averageJobDuration = jobs.length > 0
      ? jobs.reduce((sum: number, job: JobWithDuration) => sum + job.duration, 0) / jobs.length
      : 0;

    const timeline = {
      jobs,
      totalExperience,
      gaps,
      averageJobDuration
    };

    const experienceLevel = {
      years: totalExperience,
      level: (totalExperience < 3 ? 'entry' : totalExperience < 6 ? 'mid' : totalExperience < 10 ? 'senior' : 'lead') as 'entry' | 'mid' | 'senior' | 'lead',
      careerTrajectory: determineTrajectory(jobs) as 'ascending' | 'stable' | 'descending'
    };

    // Calculate scores
    const skillsScore = calculateSkillsScore(skillMatches, jobRequirements.requiredSkills);
    const locationScore = calculateLocationScore(locationData, jobRequirements.location);
    const experienceScore = calculateExperienceScore(totalExperience, jobRequirements.minimumExperience, experienceLevel.careerTrajectory);
    const stabilityScore = calculateStabilityScore(averageJobDuration, gaps);

    // Handle custom criteria match
    let customCriteriaMatch: CustomCriteriaMatch | undefined = undefined;
    let customBonus = 0;
    
    if (jobRequirements.customPrompt && parsed.customCriteriaMatch) {
      customCriteriaMatch = parsed.customCriteriaMatch;
      
      // Apply significant boost based on match level
      if (customCriteriaMatch && customCriteriaMatch.matched) {
        if (customCriteriaMatch.matchLevel === 'strong') {
          customBonus = 20; // Strong match gives major boost
        } else if (customCriteriaMatch.matchLevel === 'partial') {
          customBonus = 10;
        } else {
          customBonus = 5;
        }
      }
    }

    const scores = {
      skills: skillsScore,
      location: locationScore,
      experience: experienceScore,
      stability: stabilityScore,
      overall: 0
    };

    // Calculate base overall score
    let overallScore = calculateOverallScore(scores, weights);
    
    // Apply custom criteria bonus to overall score
    if (customBonus > 0) {
      overallScore = Math.min(100, overallScore + customBonus);
    }
    
    scores.overall = overallScore;

    // Generate highlights
    const highlights = generateHighlights(
      skillsScore,
      locationScore,
      experienceScore,
      stabilityScore,
      customCriteriaMatch,
      skillMatches,
      jobRequirements,
      averageJobDuration,
      gaps
    );

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
      customCriteriaMatch,
      highlights
    };
  } catch (error) {
    console.error('Error analyzing resume from PDF:', error);
    throw new Error(`Failed to analyze resume: ${fileName}`);
  }
}

function generateHighlights(
  skillsScore: DimensionScore,
  locationScore: DimensionScore,
  experienceScore: DimensionScore,
  stabilityScore: DimensionScore,
  customCriteriaMatch: CustomCriteriaMatch | undefined,
  skillMatches: SkillMatch[],
  jobRequirements: JobRequirements,
  averageJobDuration: number,
  gaps: { duration: number }[]
): { positive: string[]; negative: string[] } {
  const positive: string[] = [];
  const negative: string[] = [];

  // Custom criteria (highest priority)
  if (customCriteriaMatch) {
    if (customCriteriaMatch.matched) {
      if (customCriteriaMatch.matchLevel === 'strong') {
        positive.push(customCriteriaMatch.explanation);
      } else if (customCriteriaMatch.matchLevel === 'partial') {
        positive.push(`Partially matches: ${customCriteriaMatch.explanation}`);
      }
    } else {
      negative.push(customCriteriaMatch.explanation);
    }
  }

  // Skills highlights
  if (skillsScore.score >= 80) {
    const matchedCount = skillMatches.filter(s => s.matched).length;
    positive.push(`Strong skill match (${matchedCount}/${jobRequirements.requiredSkills.length} required skills)`);
  } else if (skillsScore.score < 50 && Array.isArray(skillsScore.details.missing) && skillsScore.details.missing.length > 0) {
    negative.push(`Missing key skills: ${skillsScore.details.missing.slice(0, 2).join(', ')}`);
  }

  // Location highlights
  if (locationScore.score >= 90) {
    positive.push('Located in target area');
  } else if (locationScore.score < 50) {
    negative.push('Location mismatch - may require relocation');
  }

  // Experience highlights
  if (experienceScore.score >= 85 && typeof experienceScore.details.candidateYears === 'number') {
    positive.push(`${experienceScore.details.candidateYears}+ years of relevant experience`);
  } else if (experienceScore.score < 60 && typeof experienceScore.details.candidateYears === 'number') {
    negative.push(`Limited experience (${experienceScore.details.candidateYears} years)`);
  }

  // Stability highlights
  if (stabilityScore.score >= 80 && averageJobDuration >= 36) {
    positive.push('Excellent job stability');
  } else if (averageJobDuration < 18) {
    negative.push('Short average tenure at previous roles');
  }

  if (gaps.length > 1) {
    negative.push(`${gaps.length} employment gaps`);
  }

  // Limit to top 3 of each
  return {
    positive: positive.slice(0, 3),
    negative: negative.slice(0, 3)
  };
}

function calculateJobDuration(startDate: string, endDate: string): number {
  try {
    const start = new Date(startDate + '-01');
    const end = endDate.toLowerCase() === 'present' ? new Date() : new Date(endDate + '-01');
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(0, months);
  } catch {
    return 12;
  }
}

function calculateTotalExperience(jobs: JobWithDuration[]): number {
  const totalMonths = jobs.reduce((sum, job) => sum + job.duration, 0);
  return Math.round(totalMonths / 12 * 10) / 10;
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

function determineTrajectory(jobs: JobWithDuration[]): string {
  if (jobs.length < 2) return 'stable';

  const sortedJobs = [...jobs].sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const durations = sortedJobs.map(j => j.duration);
  const increasing = durations.filter((d, i) => i === 0 || d >= durations[i - 1]).length;
  const decreasing = durations.filter((d, i) => i === 0 || d <= durations[i - 1]).length;

  if (increasing > decreasing) return 'ascending';
  if (decreasing > increasing) return 'descending';
  return 'stable';
}
