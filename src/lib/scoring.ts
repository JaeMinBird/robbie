import {
  JobRequirements,
  ScoringWeights,
  Candidate,
  DimensionScore,
  SkillMatch,
  CandidateScores
} from '@/types';
import { SKILL_SYNONYMS } from './constants';

// Normalize skill names and check for synonyms
function normalizeSkill(skill: string): string {
  const normalized = skill.toLowerCase().trim();

  // Check if this skill is a synonym for another
  for (const [canonical, synonyms] of Object.entries(SKILL_SYNONYMS)) {
    if (normalized === canonical || synonyms.includes(normalized)) {
      return canonical;
    }
  }

  return normalized;
}

// Skills scoring with synonym normalization and depth bonuses
export function calculateSkillsScore(
  candidateSkills: SkillMatch[],
  requiredSkills: string[]
): DimensionScore {
  if (requiredSkills.length === 0) {
    return {
      score: 100,
      reasoning: 'No specific skills required',
      details: { matched: [], missing: [] }
    };
  }

  const normalizedRequired = requiredSkills.map(s => normalizeSkill(s));
  const normalizedCandidate = candidateSkills.map(s => ({
    ...s,
    normalized: normalizeSkill(s.skill)
  }));

  let matchedCount = 0;
  let depthBonus = 0;
  const matched: string[] = [];
  const missing: string[] = [];

  for (const required of normalizedRequired) {
    const match = normalizedCandidate.find(c => c.normalized === required);

    if (match) {
      matchedCount++;
      matched.push(match.skill);

      // Depth bonus
      if (match.depth === 'advanced') depthBonus += 5;
      else if (match.depth === 'intermediate') depthBonus += 2;
    } else {
      missing.push(required);
    }
  }

  const baseScore = (matchedCount / normalizedRequired.length) * 100;
  const finalScore = Math.min(100, baseScore + depthBonus);

  const reasoning = matchedCount === normalizedRequired.length
    ? `Perfect match! Has all ${normalizedRequired.length} required skills${depthBonus > 0 ? ` with strong depth (+${depthBonus} bonus)` : ''}.`
    : `Matches ${matchedCount}/${normalizedRequired.length} required skills. Missing: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}.`;

  return {
    score: Math.round(finalScore),
    reasoning,
    details: { matched, missing, depthBonus }
  };
}

// Location scoring with confidence levels
export function calculateLocationScore(
  candidateLocation: { current?: string; preferred?: string; confidence: 'high' | 'medium' | 'low' },
  requiredLocation: string
): DimensionScore {
  const normalized = requiredLocation.toLowerCase().trim();
  const currentMatch = candidateLocation.current?.toLowerCase().includes(normalized);
  const preferredMatch = candidateLocation.preferred?.toLowerCase().includes(normalized);

  let score = 0;
  let reasoning = '';

  if (currentMatch) {
    score = candidateLocation.confidence === 'high' ? 100 :
            candidateLocation.confidence === 'medium' ? 90 : 80;
    reasoning = `Currently located in ${candidateLocation.current}`;
  } else if (preferredMatch) {
    score = 70;
    reasoning = `Not currently in ${requiredLocation}, but has expressed preference for it`;
  } else {
    score = 30;
    reasoning = `Located in ${candidateLocation.current || 'unknown location'}, not ${requiredLocation}. Relocation may be required.`;
  }

  return {
    score,
    reasoning,
    details: {
      current: candidateLocation.current,
      confidence: candidateLocation.confidence
    }
  };
}

// Experience scoring with career trajectory analysis
export function calculateExperienceScore(
  candidateYears: number,
  requiredYears: number,
  careerTrajectory: 'ascending' | 'stable' | 'descending'
): DimensionScore {
  const yearsDiff = candidateYears - requiredYears;

  let baseScore = 0;
  let reasoning = '';

  if (yearsDiff >= 3) {
    baseScore = 100;
    reasoning = `${candidateYears} years of experience (${yearsDiff} years above requirement)`;
  } else if (yearsDiff >= 0) {
    baseScore = 85 + (yearsDiff * 5);
    reasoning = `${candidateYears} years of experience (meets requirement)`;
  } else if (yearsDiff >= -2) {
    baseScore = 70 + (yearsDiff * 7.5);
    reasoning = `${candidateYears} years of experience (slightly below ${requiredYears} year requirement)`;
  } else {
    baseScore = 40 + Math.max(0, (yearsDiff + 5) * 6);
    reasoning = `${candidateYears} years of experience (${Math.abs(yearsDiff)} years below requirement)`;
  }

  // Career trajectory bonus/penalty
  let trajectoryAdjustment = 0;
  if (careerTrajectory === 'ascending') {
    trajectoryAdjustment = 10;
    reasoning += '. Strong upward career progression.';
  } else if (careerTrajectory === 'descending') {
    trajectoryAdjustment = -10;
    reasoning += '. Career trajectory shows some concerns.';
  }

  const finalScore = Math.max(0, Math.min(100, baseScore + trajectoryAdjustment));

  return {
    score: Math.round(finalScore),
    reasoning,
    details: {
      candidateYears,
      requiredYears,
      trajectory: careerTrajectory
    }
  };
}

// Stability scoring with job hopping and gap detection
export function calculateStabilityScore(
  averageJobDuration: number, // in months
  gaps: { duration: number }[]
): DimensionScore {
  let score = 100;
  let flags: string[] = [];
  let positives: string[] = [];

  // Job hopping analysis
  if (averageJobDuration < 12) {
    score -= 30;
    flags.push('Very short average tenure (< 1 year)');
  } else if (averageJobDuration < 18) {
    score -= 15;
    flags.push('Short average tenure (< 1.5 years)');
  } else if (averageJobDuration >= 36) {
    positives.push('Strong tenure history (3+ years average)');
  }

  // Gap analysis
  const totalGapMonths = gaps.reduce((sum, gap) => sum + gap.duration, 0);
  const significantGaps = gaps.filter(g => g.duration >= 6);

  if (significantGaps.length > 0) {
    score -= significantGaps.length * 10;
    flags.push(`${significantGaps.length} employment gap(s) of 6+ months`);
  }

  if (totalGapMonths > 12) {
    score -= 10;
  }

  const finalScore = Math.max(0, score);

  const reasoning = flags.length > 0
    ? `Some stability concerns: ${flags.join('; ')}`
    : positives.length > 0
    ? positives.join('; ')
    : 'Good employment stability';

  return {
    score: Math.round(finalScore),
    reasoning,
    details: {
      averageJobDuration,
      flags,
      positives,
      gapsCount: gaps.length
    }
  };
}

// Calculate overall weighted score
export function calculateOverallScore(
  scores: Omit<CandidateScores, 'overall'>,
  weights: ScoringWeights
): number {
  const totalWeight = weights.skills + weights.location + weights.experience + weights.stability;

  const weighted =
    (scores.skills.score * weights.skills +
     scores.location.score * weights.location +
     scores.experience.score * weights.experience +
     scores.stability.score * weights.stability) / totalWeight;

  return Math.round(weighted);
}

// Re-calculate scores with new weights
export function recalculateScores(
  candidate: Candidate,
  weights: ScoringWeights
): Candidate {
  const newOverall = calculateOverallScore(candidate.scores, weights);

  return {
    ...candidate,
    scores: {
      ...candidate.scores,
      overall: newOverall
    }
  };
}
