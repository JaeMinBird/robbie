// Core type definitions for the resume screening application

export interface JobRequirements {
  position: string;
  location: string;
  requiredSkills: string[];
  minimumExperience: number; // in years
  jobDescription?: string; // Full job description text or URL
  customPrompt?: string; // Recruiter's custom criteria
  aiExtractedTraits?: string[]; // Key traits extracted by AI
}

export interface ScoringWeights {
  skills: number;
  location: number;
  experience: number;
  stability: number;
}

export interface SkillMatch {
  skill: string;
  matched: boolean;
  synonyms?: string[];
  depth?: 'basic' | 'intermediate' | 'advanced';
}

export interface LocationData {
  current?: string;
  preferred?: string;
  fromEducation?: string;
  fromWorkHistory?: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface Employment {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  duration: number; // in months
}

export interface EmploymentTimeline {
  jobs: Employment[];
  totalExperience: number; // in years
  gaps: {
    startDate: string;
    endDate: string;
    duration: number; // in months
  }[];
  averageJobDuration: number; // in months
}

export interface ExperienceLevel {
  years: number;
  level: 'entry' | 'mid' | 'senior' | 'lead';
  careerTrajectory: 'ascending' | 'stable' | 'descending';
}

export interface DimensionScore {
  score: number; // 0-100
  reasoning: string;
  details: any;
}

export interface CustomCriteriaMatch {
  matched: boolean;
  explanation: string;
  matchLevel: 'strong' | 'partial' | 'weak';
}

export interface CandidateScores {
  skills: DimensionScore;
  location: DimensionScore;
  experience: DimensionScore;
  stability: DimensionScore;
  overall: number; // weighted score 0-100
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;

  // Extracted data
  skills: SkillMatch[];
  location: LocationData;
  timeline: EmploymentTimeline;
  experienceLevel: ExperienceLevel;
  education: string[];

  // Scoring
  scores: CandidateScores;
  
  // Custom criteria
  customCriteriaMatch?: CustomCriteriaMatch;
  
  // Highlights
  highlights?: {
    positive: string[];
    negative: string[];
  };

  // Metadata
  resumeText?: string;
  processedAt: string;
}

export interface ProcessingResult {
  candidates: Candidate[];
  failed: {
    fileName: string;
    error: string;
  }[];
  processingTime: number; // in milliseconds
}

export type Tier = 1 | 2 | 3;

export interface TierConfig {
  tier: Tier;
  label: string;
  range: [number, number];
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface ProcessingProgress {
  current: number;
  total: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  currentFile?: string;
}
