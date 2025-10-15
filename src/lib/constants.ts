import { TierConfig } from '@/types';

export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: 1,
    label: 'Tier 1',
    range: [80, 100],
    color: '#10B981', // Green
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    tier: 2,
    label: 'Tier 2',
    range: [60, 79],
    color: '#F59E0B', // Yellow/Amber
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)'
  },
  {
    tier: 3,
    label: 'Tier 3',
    range: [0, 59],
    color: '#EF4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)'
  }
];

export const DEFAULT_WEIGHTS = {
  skills: 40,
  location: 25,
  experience: 20,
  stability: 15
};

export const SKILL_SYNONYMS: Record<string, string[]> = {
  'javascript': ['js', 'ecmascript', 'es6', 'es2015'],
  'typescript': ['ts'],
  'react': ['reactjs', 'react.js'],
  'node': ['nodejs', 'node.js'],
  'python': ['py'],
  'java': ['jvm'],
  'csharp': ['c#', '.net', 'dotnet'],
  'aws': ['amazon web services', 'amazon cloud'],
  'gcp': ['google cloud', 'google cloud platform'],
  'azure': ['microsoft azure'],
  'docker': ['containerization', 'containers'],
  'kubernetes': ['k8s'],
  'sql': ['mysql', 'postgresql', 'postgres', 'mssql', 'oracle'],
  'nosql': ['mongodb', 'dynamodb', 'cassandra', 'redis'],
  'ci/cd': ['continuous integration', 'continuous deployment', 'cicd'],
  'git': ['github', 'gitlab', 'bitbucket', 'version control'],
  'agile': ['scrum', 'kanban'],
  'testing': ['jest', 'mocha', 'cypress', 'selenium', 'unit testing', 'integration testing']
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 50;
export const BATCH_SIZE = 5; // Process 5 resumes in parallel
