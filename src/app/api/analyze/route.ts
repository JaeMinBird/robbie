import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeFromPDF, extractJobTraits } from '@/lib/geminiPDF';
import { JobRequirements, ScoringWeights, Candidate } from '@/types';
import { BATCH_SIZE } from '@/lib/constants';

export const maxDuration = 60; // 60 seconds for Vercel

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobRequirementsStr = formData.get('jobRequirements') as string;
    const weightsStr = formData.get('weights') as string;

    if (!jobRequirementsStr || !weightsStr) {
      return NextResponse.json(
        { error: 'Missing job requirements or weights' },
        { status: 400 }
      );
    }

    const jobRequirements: JobRequirements = JSON.parse(jobRequirementsStr);
    const weights: ScoringWeights = JSON.parse(weightsStr);

    // Extract key traits from job description if provided
    if (jobRequirements.jobDescription && !jobRequirements.aiExtractedTraits) {
      try {
        jobRequirements.aiExtractedTraits = await extractJobTraits(jobRequirements.jobDescription);
      } catch (error) {
        console.error('Error extracting job traits:', error);
      }
    }

    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const candidates: Candidate[] = [];
    const failed: { fileName: string; error: string }[] = [];
    const startTime = Date.now();

    // Process files in batches
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map(async (file) => {
          try {
            const arrayBuffer = await file.arrayBuffer();

            // Analyze PDF directly with Gemini
            const analyzed = await analyzeResumeFromPDF(
              arrayBuffer,
              file.name,
              jobRequirements,
              weights
            );

            const candidate: Candidate = {
              id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: analyzed.name || 'Unknown',
              email: analyzed.email || '',
              phone: analyzed.phone,
              skills: analyzed.skills || [],
              location: analyzed.location || {
                confidence: 'low'
              },
              timeline: analyzed.timeline || {
                jobs: [],
                totalExperience: 0,
                gaps: [],
                averageJobDuration: 0
              },
              experienceLevel: analyzed.experienceLevel || {
                years: 0,
                level: 'entry',
                careerTrajectory: 'stable'
              },
              education: analyzed.education || [],
              scores: analyzed.scores || {
                skills: { score: 0, reasoning: '', details: {} },
                location: { score: 0, reasoning: '', details: {} },
                experience: { score: 0, reasoning: '', details: {} },
                stability: { score: 0, reasoning: '', details: {} },
                overall: 0
              },
              resumeText: '',
              processedAt: new Date().toISOString()
            };

            return { fileName: file.name, candidate };
          } catch (error) {
            throw { fileName: file.name, error: error instanceof Error ? error.message : 'Unknown error' };
          }
        })
      );

      // Process batch results
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          candidates.push(result.value.candidate);
        } else {
          const error = result.reason as { fileName: string; error: string };
          failed.push(error);
        }
      });
    }

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      candidates,
      failed,
      processingTime
    });
  } catch (error) {
    console.error('Error processing resumes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process resumes' },
      { status: 500 }
    );
  }
}
