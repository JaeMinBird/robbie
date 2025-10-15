import { Candidate } from '@/types';

// Generate 50 demo candidates: 8 Tier 1 (80-100), 15 Tier 2 (60-79), 27 Tier 3 (0-59)
export const DEMO_CANDIDATES: Candidate[] = [
  // Tier 1 Candidates (8)
  {
    id: 'demo-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '555-0101',
    skills: [
      { skill: 'React', matched: true, depth: 'advanced' },
      { skill: 'TypeScript', matched: true, depth: 'advanced' },
      { skill: 'Node.js', matched: true, depth: 'intermediate' },
      { skill: 'AWS', matched: true, depth: 'intermediate' },
      { skill: 'Docker', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Tech Corp', position: 'Senior Engineer', startDate: '2019-03', endDate: 'Present', duration: 69 },
        { company: 'StartUp Inc', position: 'Software Engineer', startDate: '2016-01', endDate: '2019-02', duration: 38 }
      ],
      totalExperience: 8.9,
      gaps: [],
      averageJobDuration: 53.5
    },
    experienceLevel: { years: 8.9, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - Stanford University'],
    scores: {
      skills: { score: 98, reasoning: 'Perfect match! Has all 5 required skills with strong depth (+10 bonus).', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '8.9 years of experience (3.9 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 99
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '555-0102',
    skills: [
      { skill: 'JavaScript', matched: true, depth: 'advanced' },
      { skill: 'React', matched: true, depth: 'advanced' },
      { skill: 'Python', matched: true, depth: 'advanced' },
      { skill: 'PostgreSQL', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Big Tech Co', position: 'Lead Engineer', startDate: '2017-06', endDate: 'Present', duration: 90 },
        { company: 'Medium Corp', position: 'Senior Dev', startDate: '2014-03', endDate: '2017-05', duration: 39 }
      ],
      totalExperience: 10.8,
      gaps: [],
      averageJobDuration: 64.5
    },
    experienceLevel: { years: 10.8, level: 'lead', careerTrajectory: 'ascending' },
    education: ['MS Software Engineering - MIT', 'BS CS - UC Berkeley'],
    scores: {
      skills: { score: 95, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+10 bonus).', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '10.8 years of experience (5.8 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 97
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-3',
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '555-0103',
    skills: [
      { skill: 'React', matched: true, depth: 'advanced' },
      { skill: 'TypeScript', matched: true, depth: 'advanced' },
      { skill: 'GraphQL', matched: true, depth: 'intermediate' },
      { skill: 'AWS', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Jose, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Cloud Systems', position: 'Senior Engineer', startDate: '2018-01', endDate: 'Present', duration: 84 },
        { company: 'Dev Studio', position: 'Engineer', startDate: '2015-06', endDate: '2017-12', duration: 31 }
      ],
      totalExperience: 9.6,
      gaps: [],
      averageJobDuration: 57.5
    },
    experienceLevel: { years: 9.6, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Computer Engineering - Carnegie Mellon'],
    scores: {
      skills: { score: 95, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+10 bonus).', details: {} },
      location: { score: 95, reasoning: 'Currently located in San Jose, CA', details: {} },
      experience: { score: 100, reasoning: '9.6 years of experience (4.6 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 96
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '555-0104',
    skills: [
      { skill: 'Node.js', matched: true, depth: 'advanced' },
      { skill: 'TypeScript', matched: true, depth: 'advanced' },
      { skill: 'MongoDB', matched: true, depth: 'intermediate' },
      { skill: 'Docker', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'FinTech Solutions', position: 'Senior Backend Engineer', startDate: '2019-02', endDate: 'Present', duration: 70 },
        { company: 'Payment Systems Inc', position: 'Backend Developer', startDate: '2016-06', endDate: '2019-01', duration: 32 }
      ],
      totalExperience: 8.5,
      gaps: [],
      averageJobDuration: 51
    },
    experienceLevel: { years: 8.5, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - Cornell University'],
    scores: {
      skills: { score: 95, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+10 bonus).', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '8.5 years of experience (3.5 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 96
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-5',
    name: 'Jennifer Liu',
    email: 'jennifer.liu@email.com',
    phone: '555-0105',
    skills: [
      { skill: 'React', matched: true, depth: 'advanced' },
      { skill: 'Vue.js', matched: true, depth: 'intermediate' },
      { skill: 'TypeScript', matched: true, depth: 'advanced' },
      { skill: 'CSS', matched: true, depth: 'advanced' }
    ],
    location: {
      current: 'Oakland, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Design Systems Co', position: 'Senior Frontend Engineer', startDate: '2018-08', endDate: 'Present', duration: 77 },
        { company: 'Web Agency', position: 'Frontend Developer', startDate: '2016-01', endDate: '2018-07', duration: 31 }
      ],
      totalExperience: 9,
      gaps: [],
      averageJobDuration: 54
    },
    experienceLevel: { years: 9, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Design + CS - Rhode Island School of Design'],
    scores: {
      skills: { score: 95, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+10 bonus).', details: {} },
      location: { score: 95, reasoning: 'Currently located in Oakland, CA', details: {} },
      experience: { score: 100, reasoning: '9.0 years of experience (4.0 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 95
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-6',
    name: 'Alex Patel',
    email: 'alex.patel@email.com',
    phone: '555-0106',
    skills: [
      { skill: 'Java', matched: true, depth: 'advanced' },
      { skill: 'Spring Boot', matched: true, depth: 'advanced' },
      { skill: 'Microservices', matched: true, depth: 'advanced' },
      { skill: 'Kubernetes', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'Palo Alto, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Enterprise Software Inc', position: 'Staff Engineer', startDate: '2017-03', endDate: 'Present', duration: 94 },
        { company: 'Consulting Firm', position: 'Senior Consultant', startDate: '2014-01', endDate: '2017-02', duration: 38 }
      ],
      totalExperience: 11,
      gaps: [],
      averageJobDuration: 66
    },
    experienceLevel: { years: 11, level: 'lead', careerTrajectory: 'ascending' },
    education: ['MS Computer Science - Georgia Tech', 'BS Engineering - IIT Delhi'],
    scores: {
      skills: { score: 98, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+15 bonus).', details: {} },
      location: { score: 100, reasoning: 'Currently located in Palo Alto, CA', details: {} },
      experience: { score: 100, reasoning: '11.0 years of experience (6.0 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 99
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-7',
    name: 'Rachel Martinez',
    email: 'rachel.martinez@email.com',
    phone: '555-0107',
    skills: [
      { skill: 'Python', matched: true, depth: 'advanced' },
      { skill: 'Django', matched: true, depth: 'advanced' },
      { skill: 'PostgreSQL', matched: true, depth: 'advanced' },
      { skill: 'Redis', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Data Platform Co', position: 'Senior Backend Engineer', startDate: '2018-04', endDate: 'Present', duration: 80 },
        { company: 'Analytics Startup', position: 'Backend Engineer', startDate: '2015-08', endDate: '2018-03', duration: 32 }
      ],
      totalExperience: 9.3,
      gaps: [],
      averageJobDuration: 56
    },
    experienceLevel: { years: 9.3, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UCLA'],
    scores: {
      skills: { score: 98, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+15 bonus).', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '9.3 years of experience (4.3 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 99
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-8',
    name: 'Thomas Anderson',
    email: 'thomas.anderson@email.com',
    phone: '555-0108',
    skills: [
      { skill: 'React', matched: true, depth: 'advanced' },
      { skill: 'Next.js', matched: true, depth: 'advanced' },
      { skill: 'TypeScript', matched: true, depth: 'advanced' },
      { skill: 'Tailwind CSS', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Mateo, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'E-commerce Platform', position: 'Senior Full Stack Engineer', startDate: '2019-01', endDate: 'Present', duration: 72 },
        { company: 'Digital Agency', position: 'Full Stack Developer', startDate: '2016-03', endDate: '2018-12', duration: 34 }
      ],
      totalExperience: 8.8,
      gaps: [],
      averageJobDuration: 53
    },
    experienceLevel: { years: 8.8, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Software Engineering - University of Washington'],
    scores: {
      skills: { score: 98, reasoning: 'Perfect match! Has all 4 required skills with strong depth (+15 bonus).', details: {} },
      location: { score: 95, reasoning: 'Currently located in San Mateo, CA', details: {} },
      experience: { score: 100, reasoning: '8.8 years of experience (3.8 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 97
    },
    processedAt: new Date().toISOString()
  },

  // Tier 2 Candidates (15) - Scores between 60-79
  {
    id: 'demo-9',
    name: 'Jessica Brown',
    email: 'jessica.brown@email.com',
    phone: '555-0109',
    skills: [
      { skill: 'React', matched: true, depth: 'intermediate' },
      { skill: 'JavaScript', matched: true, depth: 'intermediate' },
      { skill: 'HTML/CSS', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'Los Angeles, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Media Company', position: 'Frontend Developer', startDate: '2020-06', endDate: 'Present', duration: 54 },
        { company: 'Small Agency', position: 'Junior Developer', startDate: '2018-01', endDate: '2020-05', duration: 29 }
      ],
      totalExperience: 6.9,
      gaps: [],
      averageJobDuration: 41.5
    },
    experienceLevel: { years: 6.9, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - Cal State LA'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: TypeScript.', details: {} },
      location: { score: 70, reasoning: 'Not currently in San Francisco, but has expressed preference for it', details: {} },
      experience: { score: 95, reasoning: '6.9 years of experience (1.9 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 75
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-10',
    name: 'Kevin Nguyen',
    email: 'kevin.nguyen@email.com',
    phone: '555-0110',
    skills: [
      { skill: 'Node.js', matched: true, depth: 'intermediate' },
      { skill: 'Express', matched: true, depth: 'intermediate' },
      { skill: 'MongoDB', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Startup Inc', position: 'Backend Developer', startDate: '2021-03', endDate: 'Present', duration: 45 },
        { company: 'Tech Consultancy', position: 'Developer', startDate: '2019-06', endDate: '2021-02', duration: 21 }
      ],
      totalExperience: 5.5,
      gaps: [],
      averageJobDuration: 33
    },
    experienceLevel: { years: 5.5, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Information Systems - SJSU'],
    scores: {
      skills: { score: 75, reasoning: 'Matches 3/3 required skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 85, reasoning: '5.5 years of experience (meets requirement). Strong upward career progression.', details: {} },
      stability: { score: 55, reasoning: 'Some stability concerns: Short average tenure (< 3 years)', details: {} },
      overall: 76
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-11',
    name: 'Amanda Foster',
    email: 'amanda.foster@email.com',
    skills: [
      { skill: 'Python', matched: true, depth: 'intermediate' },
      { skill: 'Flask', matched: true, depth: 'intermediate' },
      { skill: 'SQL', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Diego, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Healthcare Tech', position: 'Software Engineer', startDate: '2020-01', endDate: 'Present', duration: 60 },
        { company: 'Research Lab', position: 'Junior Engineer', startDate: '2018-06', endDate: '2019-12', duration: 19 }
      ],
      totalExperience: 6.6,
      gaps: [],
      averageJobDuration: 39.5
    },
    experienceLevel: { years: 6.6, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Biology + CS Minor - UCSD'],
    scores: {
      skills: { score: 75, reasoning: 'Matches 3/3 required skills.', details: {} },
      location: { score: 65, reasoning: 'Located in San Diego, CA, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 95, reasoning: '6.6 years of experience (1.6 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 85, reasoning: 'Good employment stability', details: {} },
      overall: 76
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-12',
    name: 'Brian Cooper',
    email: 'brian.cooper@email.com',
    phone: '555-0112',
    skills: [
      { skill: 'Java', matched: true, depth: 'intermediate' },
      { skill: 'Spring', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Financial Services', position: 'Java Developer', startDate: '2019-09', endDate: 'Present', duration: 63 },
        { company: 'Banking Corp', position: 'Associate Developer', startDate: '2017-01', endDate: '2019-08', duration: 32 }
      ],
      totalExperience: 7.9,
      gaps: [],
      averageJobDuration: 47.5
    },
    experienceLevel: { years: 7.9, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UC Davis'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: Microservices.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '7.9 years of experience (2.9 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 85
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-13',
    name: 'Nicole Taylor',
    email: 'nicole.taylor@email.com',
    skills: [
      { skill: 'React', matched: true, depth: 'intermediate' },
      { skill: 'Vue.js', matched: false, depth: 'intermediate' },
      { skill: 'CSS', matched: true, depth: 'advanced' }
    ],
    location: {
      current: 'Sacramento, CA',
      confidence: 'medium'
    },
    timeline: {
      jobs: [
        { company: 'Gov Tech Solutions', position: 'Frontend Developer', startDate: '2020-03', endDate: 'Present', duration: 57 },
        { company: 'Web Studio', position: 'Web Developer', startDate: '2018-05', endDate: '2020-02', duration: 22 }
      ],
      totalExperience: 6.6,
      gaps: [],
      averageJobDuration: 39.5
    },
    experienceLevel: { years: 6.6, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Information Technology - CSU Sacramento'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: TypeScript.', details: {} },
      location: { score: 60, reasoning: 'Located in Sacramento, CA, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 95, reasoning: '6.6 years of experience (1.6 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 85, reasoning: 'Good employment stability', details: {} },
      overall: 73
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-14',
    name: 'Daniel White',
    email: 'daniel.white@email.com',
    phone: '555-0114',
    skills: [
      { skill: 'C#', matched: true, depth: 'advanced' },
      { skill: '.NET', matched: true, depth: 'advanced' },
      { skill: 'Azure', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Jose, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Enterprise Software', position: 'Senior .NET Developer', startDate: '2018-02', endDate: 'Present', duration: 82 },
        { company: 'Consulting Firm', position: '.NET Developer', startDate: '2015-06', endDate: '2018-01', duration: 32 }
      ],
      totalExperience: 9.5,
      gaps: [],
      averageJobDuration: 57
    },
    experienceLevel: { years: 9.5, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Software Engineering - San Jose State'],
    scores: {
      skills: { score: 75, reasoning: 'Matches 3/3 required skills with strong depth (+5 bonus).', details: {} },
      location: { score: 95, reasoning: 'Currently located in San Jose, CA', details: {} },
      experience: { score: 100, reasoning: '9.5 years of experience (4.5 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 89
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-15',
    name: 'Laura Garcia',
    email: 'laura.garcia@email.com',
    skills: [
      { skill: 'Angular', matched: false, depth: 'intermediate' },
      { skill: 'TypeScript', matched: true, depth: 'intermediate' },
      { skill: 'RxJS', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Insurance Tech', position: 'Frontend Engineer', startDate: '2021-01', endDate: 'Present', duration: 48 },
        { company: 'Marketing Agency', position: 'Developer', startDate: '2019-03', endDate: '2020-12', duration: 22 }
      ],
      totalExperience: 5.8,
      gaps: [],
      averageJobDuration: 35
    },
    experienceLevel: { years: 5.8, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Information Systems - SF State'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: React, Node.js.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 90, reasoning: '5.8 years of experience (0.8 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 70, reasoning: 'Some stability concerns: Short average tenure (< 3 years)', details: {} },
      overall: 65
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-16',
    name: 'Christopher Lee',
    email: 'christopher.lee@email.com',
    phone: '555-0116',
    skills: [
      { skill: 'PHP', matched: false, depth: 'advanced' },
      { skill: 'Laravel', matched: false, depth: 'advanced' },
      { skill: 'MySQL', matched: true, depth: 'advanced' }
    ],
    location: {
      current: 'Berkeley, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Web Platform', position: 'Backend Engineer', startDate: '2018-07', endDate: 'Present', duration: 77 },
        { company: 'Digital Services', position: 'PHP Developer', startDate: '2015-02', endDate: '2018-06', duration: 41 }
      ],
      totalExperience: 9.8,
      gaps: [],
      averageJobDuration: 59
    },
    experienceLevel: { years: 9.8, level: 'senior', careerTrajectory: 'stable' },
    education: ['BS Computer Science - UC Berkeley'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: Node.js, TypeScript.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Berkeley, CA', details: {} },
      experience: { score: 100, reasoning: '9.8 years of experience (4.8 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 70
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-17',
    name: 'Stephanie Moore',
    email: 'stephanie.moore@email.com',
    skills: [
      { skill: 'React', matched: true, depth: 'intermediate' },
      { skill: 'Redux', matched: false, depth: 'intermediate' },
      { skill: 'Jest', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'Fremont, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'SaaS Company', position: 'Frontend Developer', startDate: '2020-09', endDate: 'Present', duration: 51 },
        { company: 'Startup', position: 'Junior Developer', startDate: '2018-11', endDate: '2020-08', duration: 22 }
      ],
      totalExperience: 6.1,
      gaps: [],
      averageJobDuration: 36.5
    },
    experienceLevel: { years: 6.1, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UC Irvine'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: TypeScript.', details: {} },
      location: { score: 90, reasoning: 'Currently located in Fremont, CA', details: {} },
      experience: { score: 90, reasoning: '6.1 years of experience (1.1 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 75, reasoning: 'Some stability concerns: Short average tenure (< 3 years)', details: {} },
      overall: 75
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-18',
    name: 'Matthew Harris',
    email: 'matthew.harris@email.com',
    phone: '555-0118',
    skills: [
      { skill: 'Python', matched: true, depth: 'intermediate' },
      { skill: 'FastAPI', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'AI Startup', position: 'Backend Engineer', startDate: '2021-06', endDate: 'Present', duration: 42 },
        { company: 'Data Company', position: 'Junior Engineer', startDate: '2019-08', endDate: '2021-05', duration: 22 }
      ],
      totalExperience: 5.3,
      gaps: [],
      averageJobDuration: 32
    },
    experienceLevel: { years: 5.3, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UC Santa Cruz'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: PostgreSQL.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 85, reasoning: '5.3 years of experience (meets requirement). Strong upward career progression.', details: {} },
      stability: { score: 50, reasoning: 'Some stability concerns: Short average tenure (< 3 years)', details: {} },
      overall: 73
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-19',
    name: 'Ashley Clark',
    email: 'ashley.clark@email.com',
    skills: [
      { skill: 'JavaScript', matched: true, depth: 'intermediate' },
      { skill: 'React', matched: true, depth: 'intermediate' },
      { skill: 'Svelte', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Santa Clara, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Tech Solutions', position: 'Full Stack Developer', startDate: '2020-02', endDate: 'Present', duration: 58 },
        { company: 'Consulting', position: 'Developer', startDate: '2018-04', endDate: '2020-01', duration: 22 }
      ],
      totalExperience: 6.7,
      gaps: [],
      averageJobDuration: 40
    },
    experienceLevel: { years: 6.7, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Software Engineering - Santa Clara University'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: TypeScript.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Santa Clara, CA', details: {} },
      experience: { score: 95, reasoning: '6.7 years of experience (1.7 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 85, reasoning: 'Good employment stability', details: {} },
      overall: 79
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-20',
    name: 'Ryan Johnson',
    email: 'ryan.johnson@email.com',
    phone: '555-0120',
    skills: [
      { skill: 'Go', matched: true, depth: 'intermediate' },
      { skill: 'Docker', matched: true, depth: 'intermediate' },
      { skill: 'Kubernetes', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'Mountain View, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Cloud Infrastructure Co', position: 'DevOps Engineer', startDate: '2019-11', endDate: 'Present', duration: 61 },
        { company: 'Hosting Provider', position: 'Systems Engineer', startDate: '2017-05', endDate: '2019-10', duration: 30 }
      ],
      totalExperience: 7.6,
      gaps: [],
      averageJobDuration: 45.5
    },
    experienceLevel: { years: 7.6, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Engineering - Stanford'],
    scores: {
      skills: { score: 75, reasoning: 'Matches 3/3 required skills.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Mountain View, CA', details: {} },
      experience: { score: 100, reasoning: '7.6 years of experience (2.6 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 87
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-21',
    name: 'Megan Davis',
    email: 'megan.davis@email.com',
    skills: [
      { skill: 'React', matched: true, depth: 'intermediate' },
      { skill: 'Node.js', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Marketplace Startup', position: 'Full Stack Developer', startDate: '2021-09', endDate: 'Present', duration: 39 },
        { company: 'E-commerce', position: 'Junior Developer', startDate: '2020-01', endDate: '2021-08', duration: 20 }
      ],
      totalExperience: 4.9,
      gaps: [],
      averageJobDuration: 29.5
    },
    experienceLevel: { years: 4.9, level: 'mid', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UC Riverside'],
    scores: {
      skills: { score: 67, reasoning: 'Matches 2/3 required skills. Missing: TypeScript.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 77, reasoning: '4.9 years of experience (slightly below 5 year requirement). Strong upward career progression.', details: {} },
      stability: { score: 45, reasoning: 'Some stability concerns: Very short average tenure (< 3 years)', details: {} },
      overall: 69
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-22',
    name: 'Justin Wilson',
    email: 'justin.wilson@email.com',
    phone: '555-0122',
    skills: [
      { skill: 'Ruby', matched: false, depth: 'advanced' },
      { skill: 'Rails', matched: false, depth: 'advanced' },
      { skill: 'PostgreSQL', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Social Platform', position: 'Backend Engineer', startDate: '2018-01', endDate: 'Present', duration: 84 },
        { company: 'Agency', position: 'Rails Developer', startDate: '2015-06', endDate: '2017-12', duration: 31 }
      ],
      totalExperience: 9.6,
      gaps: [],
      averageJobDuration: 57.5
    },
    experienceLevel: { years: 9.6, level: 'senior', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - UC Santa Barbara'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: Node.js, TypeScript.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '9.6 years of experience (4.6 years above requirement). Strong upward career progression.', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 69
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-23',
    name: 'Samantha Miller',
    email: 'samantha.miller@email.com',
    skills: [
      { skill: 'JavaScript', matched: true, depth: 'intermediate' },
      { skill: 'jQuery', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Sunnyvale, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Legacy Software Co', position: 'Frontend Developer', startDate: '2019-04', endDate: 'Present', duration: 68 },
        { company: 'Web Development Firm', position: 'Web Developer', startDate: '2016-09', endDate: '2019-03', duration: 31 }
      ],
      totalExperience: 8.3,
      gaps: [],
      averageJobDuration: 49.5
    },
    experienceLevel: { years: 8.3, level: 'senior', careerTrajectory: 'stable' },
    education: ['BA Computer Science - Cal Poly'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: React, TypeScript.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Sunnyvale, CA', details: {} },
      experience: { score: 100, reasoning: '8.3 years of experience (3.3 years above requirement).', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 70
    },
    processedAt: new Date().toISOString()
  },

  // Tier 3 Candidates (27) - Scores below 60
  {
    id: 'demo-24',
    name: 'Brandon Thomas',
    email: 'brandon.thomas@email.com',
    skills: [
      { skill: 'HTML', matched: false, depth: 'intermediate' },
      { skill: 'CSS', matched: false, depth: 'intermediate' },
      { skill: 'JavaScript', matched: true, depth: 'basic' }
    ],
    location: {
      current: 'Portland, OR',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Small Agency', position: 'Junior Developer', startDate: '2022-06', endDate: 'Present', duration: 30 },
        { company: 'Freelance', position: 'Web Developer', startDate: '2021-01', endDate: '2022-05', duration: 17 }
      ],
      totalExperience: 3.9,
      gaps: [],
      averageJobDuration: 23.5
    },
    experienceLevel: { years: 3.9, level: 'entry', careerTrajectory: 'ascending' },
    education: ['Bootcamp Graduate - General Assembly'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: React, TypeScript.', details: {} },
      location: { score: 30, reasoning: 'Located in Portland, OR, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 62, reasoning: '3.9 years of experience (1.1 years below requirement). Strong upward career progression.', details: {} },
      stability: { score: 55, reasoning: 'Some stability concerns: Short average tenure (< 2 years)', details: {} },
      overall: 42
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-25',
    name: 'Kayla Martinez',
    email: 'kayla.martinez@email.com',
    skills: [
      { skill: 'WordPress', matched: false, depth: 'intermediate' },
      { skill: 'PHP', matched: false, depth: 'basic' }
    ],
    location: {
      current: 'Austin, TX',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Marketing Agency', position: 'Web Developer', startDate: '2021-08', endDate: 'Present', duration: 40 }
      ],
      totalExperience: 3.3,
      gaps: [],
      averageJobDuration: 40
    },
    experienceLevel: { years: 3.3, level: 'entry', careerTrajectory: 'stable' },
    education: ['AS Web Design - Community College'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: React, TypeScript, Node.js.', details: {} },
      location: { score: 30, reasoning: 'Located in Austin, TX, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 47, reasoning: '3.3 years of experience (1.7 years below requirement).', details: {} },
      stability: { score: 85, reasoning: 'Good employment stability', details: {} },
      overall: 28
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-26',
    name: 'Derek Anderson',
    email: 'derek.anderson@email.com',
    phone: '555-0126',
    skills: [
      { skill: 'Java', matched: true, depth: 'basic' }
    ],
    location: {
      current: 'Seattle, WA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Tech Company', position: 'Junior Developer', startDate: '2023-01', endDate: 'Present', duration: 21 }
      ],
      totalExperience: 1.8,
      gaps: [],
      averageJobDuration: 21
    },
    experienceLevel: { years: 1.8, level: 'entry', careerTrajectory: 'stable' },
    education: ['BS Computer Science - University of Washington'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: Spring Boot, Microservices.', details: {} },
      location: { score: 30, reasoning: 'Located in Seattle, WA, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 22, reasoning: '1.8 years of experience (3.2 years below requirement).', details: {} },
      stability: { score: 55, reasoning: 'Some stability concerns: Short average tenure (< 2 years)', details: {} },
      overall: 31
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-27',
    name: 'Brittany Lewis',
    email: 'brittany.lewis@email.com',
    skills: [
      { skill: 'React', matched: true, depth: 'basic' },
      { skill: 'HTML', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Startup', position: 'Frontend Intern', startDate: '2022-09', endDate: '2023-03', duration: 7 },
        { company: 'Tech Company', position: 'Junior Developer', startDate: '2023-04', endDate: 'Present', duration: 20 }
      ],
      totalExperience: 2.3,
      gaps: [],
      averageJobDuration: 13.5
    },
    experienceLevel: { years: 2.3, level: 'entry', careerTrajectory: 'ascending' },
    education: ['BS Computer Science - SF State (2023)'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: TypeScript, Node.js.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 32, reasoning: '2.3 years of experience (2.7 years below requirement). Strong upward career progression.', details: {} },
      stability: { score: 40, reasoning: 'Some stability concerns: Very short average tenure (< 1.5 years)', details: {} },
      overall: 50
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-28',
    name: 'Gregory Scott',
    email: 'gregory.scott@email.com',
    phone: '555-0128',
    skills: [
      { skill: 'Python', matched: true, depth: 'basic' }
    ],
    location: {
      current: 'Denver, CO',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Data Analytics Firm', position: 'Junior Analyst', startDate: '2022-01', endDate: 'Present', duration: 36 }
      ],
      totalExperience: 3,
      gaps: [],
      averageJobDuration: 36
    },
    experienceLevel: { years: 3, level: 'entry', careerTrajectory: 'stable' },
    education: ['BS Mathematics - Colorado State'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: Django, PostgreSQL.', details: {} },
      location: { score: 30, reasoning: 'Located in Denver, CO, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 55, reasoning: '3.0 years of experience (2.0 years below requirement).', details: {} },
      stability: { score: 75, reasoning: 'Good employment stability', details: {} },
      overall: 43
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-29',
    name: 'Melissa Robinson',
    email: 'melissa.robinson@email.com',
    skills: [
      { skill: 'C++', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Boston, MA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Robotics Company', position: 'Software Engineer', startDate: '2020-05', endDate: 'Present', duration: 55 }
      ],
      totalExperience: 4.6,
      gaps: [],
      averageJobDuration: 55
    },
    experienceLevel: { years: 4.6, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Computer Engineering - MIT'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: React, TypeScript, Node.js.', details: {} },
      location: { score: 30, reasoning: 'Located in Boston, MA, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 70, reasoning: '4.6 years of experience (slightly below 5 year requirement).', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 35
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-30',
    name: 'Jordan Hall',
    email: 'jordan.hall@email.com',
    phone: '555-0130',
    skills: [
      { skill: 'JavaScript', matched: true, depth: 'basic' }
    ],
    location: {
      current: 'Phoenix, AZ',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Local Business', position: 'Web Developer', startDate: '2021-03', endDate: '2022-11', duration: 21 },
        { company: 'Another Company', position: 'Developer', startDate: '2023-01', endDate: 'Present', duration: 21 }
      ],
      totalExperience: 3.5,
      gaps: [{ duration: 2, startDate: '2022-11', endDate: '2023-01' }],
      averageJobDuration: 21
    },
    experienceLevel: { years: 3.5, level: 'entry', careerTrajectory: 'stable' },
    education: ['Bootcamp Certificate'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: React, TypeScript.', details: {} },
      location: { score: 30, reasoning: 'Located in Phoenix, AZ, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 57, reasoning: '3.5 years of experience (1.5 years below requirement).', details: {} },
      stability: { score: 45, reasoning: 'Some stability concerns: Short average tenure (< 2 years)', details: {} },
      overall: 39
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-31',
    name: 'Chelsea Young',
    email: 'chelsea.young@email.com',
    skills: [
      { skill: 'Shopify', matched: false, depth: 'intermediate' },
      { skill: 'Liquid', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'New York, NY',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'E-commerce Agency', position: 'Shopify Developer', startDate: '2021-06', endDate: 'Present', duration: 42 }
      ],
      totalExperience: 3.5,
      gaps: [],
      averageJobDuration: 42
    },
    experienceLevel: { years: 3.5, level: 'entry', careerTrajectory: 'stable' },
    education: ['BA Marketing - NYU'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: React, TypeScript, Node.js.', details: {} },
      location: { score: 30, reasoning: 'Located in New York, NY, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 57, reasoning: '3.5 years of experience (1.5 years below requirement).', details: {} },
      stability: { score: 85, reasoning: 'Good employment stability', details: {} },
      overall: 31
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-32',
    name: 'Tyler King',
    email: 'tyler.king@email.com',
    phone: '555-0132',
    skills: [
      { skill: 'VBA', matched: false, depth: 'intermediate' },
      { skill: 'Excel', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'Chicago, IL',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Finance Corp', position: 'Business Analyst', startDate: '2019-03', endDate: 'Present', duration: 69 }
      ],
      totalExperience: 5.8,
      gaps: [],
      averageJobDuration: 69
    },
    experienceLevel: { years: 5.8, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Business Administration - Northwestern'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All technical skills.', details: {} },
      location: { score: 30, reasoning: 'Located in Chicago, IL, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 90, reasoning: '5.8 years of experience (0.8 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 38
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-33',
    name: 'Danielle Wright',
    email: 'danielle.wright@email.com',
    skills: [
      { skill: 'Figma', matched: false, depth: 'advanced' },
      { skill: 'Sketch', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Design Agency', position: 'UI/UX Designer', startDate: '2020-01', endDate: 'Present', duration: 60 }
      ],
      totalExperience: 5,
      gaps: [],
      averageJobDuration: 60
    },
    experienceLevel: { years: 5, level: 'mid', careerTrajectory: 'stable' },
    education: ['BFA Graphic Design - CCA'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 85, reasoning: '5.0 years of experience (meets requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 52
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-34',
    name: 'Eric Green',
    email: 'eric.green@email.com',
    phone: '555-0134',
    skills: [
      { skill: 'Manual Testing', matched: false, depth: 'intermediate' },
      { skill: 'JIRA', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Jose, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Software Company', position: 'QA Tester', startDate: '2019-06', endDate: 'Present', duration: 66 }
      ],
      totalExperience: 5.5,
      gaps: [],
      averageJobDuration: 66
    },
    experienceLevel: { years: 5.5, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Information Systems - SJSU'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 95, reasoning: 'Currently located in San Jose, CA', details: {} },
      experience: { score: 85, reasoning: '5.5 years of experience (meets requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 50
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-35',
    name: 'Amber Baker',
    email: 'amber.baker@email.com',
    skills: [
      { skill: 'Salesforce', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Miami, FL',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'CRM Solutions', position: 'Salesforce Admin', startDate: '2020-08', endDate: 'Present', duration: 52 }
      ],
      totalExperience: 4.3,
      gaps: [],
      averageJobDuration: 52
    },
    experienceLevel: { years: 4.3, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Business - Florida State'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 30, reasoning: 'Located in Miami, FL, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 67, reasoning: '4.3 years of experience (slightly below requirement).', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 32
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-36',
    name: 'Trevor Adams',
    email: 'trevor.adams@email.com',
    phone: '555-0136',
    skills: [
      { skill: 'React', matched: true, depth: 'basic' }
    ],
    location: {
      current: 'Dallas, TX',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Regional Company', position: 'Junior Developer', startDate: '2022-08', endDate: 'Present', duration: 28 }
      ],
      totalExperience: 2.3,
      gaps: [],
      averageJobDuration: 28
    },
    experienceLevel: { years: 2.3, level: 'entry', careerTrajectory: 'stable' },
    education: ['BS Computer Science - UT Dallas'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: TypeScript, Node.js.', details: {} },
      location: { score: 30, reasoning: 'Located in Dallas, TX, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 32, reasoning: '2.3 years of experience (2.7 years below requirement).', details: {} },
      stability: { score: 60, reasoning: 'Some stability concerns: Short average tenure (< 2.5 years)', details: {} },
      overall: 35
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-37',
    name: 'Kristen Nelson',
    email: 'kristen.nelson@email.com',
    skills: [
      { skill: 'Angular', matched: false, depth: 'basic' }
    ],
    location: {
      current: 'Atlanta, GA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Corporate IT', position: 'Junior Developer', startDate: '2021-09', endDate: '2023-02', duration: 18 },
        { company: 'Tech Services', position: 'Developer', startDate: '2023-05', endDate: 'Present', duration: 19 }
      ],
      totalExperience: 3.1,
      gaps: [{ duration: 3, startDate: '2023-02', endDate: '2023-05' }],
      averageJobDuration: 18.5
    },
    experienceLevel: { years: 3.1, level: 'entry', careerTrajectory: 'stable' },
    education: ['BS Computer Science - Georgia State'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: React, TypeScript, Node.js.', details: {} },
      location: { score: 30, reasoning: 'Located in Atlanta, GA, not San Francisco. Relocation may be required.', details: {} },
      experience: { score: 55, reasoning: '3.1 years of experience (1.9 years below requirement).', details: {} },
      stability: { score: 40, reasoning: 'Some stability concerns: Very short average tenure (< 2 years)', details: {} },
      overall: 26
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-38',
    name: 'Marcus Phillips',
    email: 'marcus.phillips@email.com',
    phone: '555-0138',
    skills: [
      { skill: 'Swift', matched: false, depth: 'intermediate' },
      { skill: 'iOS', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Mobile App Startup', position: 'iOS Developer', startDate: '2020-11', endDate: 'Present', duration: 49 }
      ],
      totalExperience: 4.1,
      gaps: [],
      averageJobDuration: 49
    },
    experienceLevel: { years: 4.1, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Computer Science - UC Berkeley'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All web development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 65, reasoning: '4.1 years of experience (slightly below requirement).', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 51
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-39',
    name: 'Courtney Campbell',
    email: 'courtney.campbell@email.com',
    skills: [
      { skill: 'Android', matched: false, depth: 'intermediate' },
      { skill: 'Kotlin', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Oakland, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'App Development Co', position: 'Android Developer', startDate: '2021-01', endDate: 'Present', duration: 48 }
      ],
      totalExperience: 4,
      gaps: [],
      averageJobDuration: 48
    },
    experienceLevel: { years: 4, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Computer Science - UC Davis'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All web development skills.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Oakland, CA', details: {} },
      experience: { score: 62, reasoning: '4.0 years of experience (1.0 years below requirement).', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 47
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-40',
    name: 'Nathan Mitchell',
    email: 'nathan.mitchell@email.com',
    phone: '555-0140',
    skills: [
      { skill: 'Unity', matched: false, depth: 'advanced' },
      { skill: 'C#', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Game Studio', position: 'Game Developer', startDate: '2018-09', endDate: 'Present', duration: 75 }
      ],
      totalExperience: 6.3,
      gaps: [],
      averageJobDuration: 75
    },
    experienceLevel: { years: 6.3, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Game Design - DigiPen'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: Web development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 92, reasoning: '6.3 years of experience (1.3 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 53
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-41',
    name: 'Victoria Roberts',
    email: 'victoria.roberts@email.com',
    skills: [
      { skill: 'Tableau', matched: false, depth: 'advanced' },
      { skill: 'SQL', matched: true, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Analytics Firm', position: 'Data Analyst', startDate: '2019-07', endDate: 'Present', duration: 65 }
      ],
      totalExperience: 5.4,
      gaps: [],
      averageJobDuration: 65
    },
    experienceLevel: { years: 5.4, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Statistics - UC Berkeley'],
    scores: {
      skills: { score: 33, reasoning: 'Matches 1/3 required skills. Missing: Python, Django.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 87, reasoning: '5.4 years of experience (meets requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 67
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-42',
    name: 'Sean Turner',
    email: 'sean.turner@email.com',
    phone: '555-0142',
    skills: [
      { skill: 'DevOps', matched: false, depth: 'intermediate' },
      { skill: 'Jenkins', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Santa Rosa, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'IT Services', position: 'DevOps Engineer', startDate: '2020-04', endDate: 'Present', duration: 56 }
      ],
      totalExperience: 4.7,
      gaps: [],
      averageJobDuration: 56
    },
    experienceLevel: { years: 4.7, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Computer Science - Sonoma State'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: Development skills.', details: {} },
      location: { score: 80, reasoning: 'Currently located in Santa Rosa, CA', details: {} },
      experience: { score: 72, reasoning: '4.7 years of experience (slightly below requirement).', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 44
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-43',
    name: 'Lindsay Parker',
    email: 'lindsay.parker@email.com',
    skills: [
      { skill: 'Technical Writing', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Software Company', position: 'Technical Writer', startDate: '2019-01', endDate: 'Present', duration: 72 }
      ],
      totalExperience: 6,
      gaps: [],
      averageJobDuration: 72
    },
    experienceLevel: { years: 6, level: 'mid', careerTrajectory: 'stable' },
    education: ['BA English - Stanford'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 90, reasoning: '6.0 years of experience (1.0 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 52
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-44',
    name: 'Craig Evans',
    email: 'craig.evans@email.com',
    phone: '555-0144',
    skills: [
      { skill: 'Project Management', matched: false, depth: 'advanced' },
      { skill: 'Agile', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Tech Corp', position: 'Product Manager', startDate: '2017-05', endDate: 'Present', duration: 91 }
      ],
      totalExperience: 7.6,
      gaps: [],
      averageJobDuration: 91
    },
    experienceLevel: { years: 7.6, level: 'senior', careerTrajectory: 'stable' },
    education: ['MBA - Stanford GSB', 'BS Engineering - MIT'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 100, reasoning: '7.6 years of experience (2.6 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 53
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-45',
    name: 'Monica Collins',
    email: 'monica.collins@email.com',
    skills: [
      { skill: 'Customer Support', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'SaaS Company', position: 'Support Engineer', startDate: '2020-06', endDate: 'Present', duration: 54 }
      ],
      totalExperience: 4.5,
      gaps: [],
      averageJobDuration: 54
    },
    experienceLevel: { years: 4.5, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Information Systems - SF State'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 70, reasoning: '4.5 years of experience (slightly below requirement).', details: {} },
      stability: { score: 95, reasoning: 'Good employment stability', details: {} },
      overall: 48
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-46',
    name: 'Harold Stewart',
    email: 'harold.stewart@email.com',
    phone: '555-0146',
    skills: [
      { skill: 'Network Administration', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Jose, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Enterprise IT', position: 'Network Admin', startDate: '2018-03', endDate: 'Present', duration: 81 }
      ],
      totalExperience: 6.8,
      gaps: [],
      averageJobDuration: 81
    },
    experienceLevel: { years: 6.8, level: 'mid', careerTrajectory: 'stable' },
    education: ['BS Information Technology - SJSU'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 95, reasoning: 'Currently located in San Jose, CA', details: {} },
      experience: { score: 95, reasoning: '6.8 years of experience (1.8 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 51
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-47',
    name: 'Vanessa Sanchez',
    email: 'vanessa.sanchez@email.com',
    skills: [
      { skill: 'Graphic Design', matched: false, depth: 'advanced' },
      { skill: 'Photoshop', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Creative Agency', position: 'Graphic Designer', startDate: '2019-08', endDate: 'Present', duration: 64 }
      ],
      totalExperience: 5.3,
      gaps: [],
      averageJobDuration: 64
    },
    experienceLevel: { years: 5.3, level: 'mid', careerTrajectory: 'stable' },
    education: ['BFA Graphic Design - RISD'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 87, reasoning: '5.3 years of experience (meets requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 52
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-48',
    name: 'Keith Morris',
    email: 'keith.morris@email.com',
    phone: '555-0148',
    skills: [
      { skill: 'Content Writing', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'Berkeley, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Marketing Firm', position: 'Content Writer', startDate: '2020-10', endDate: 'Present', duration: 50 }
      ],
      totalExperience: 4.2,
      gaps: [],
      averageJobDuration: 50
    },
    experienceLevel: { years: 4.2, level: 'mid', careerTrajectory: 'stable' },
    education: ['BA Communications - UC Berkeley'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 95, reasoning: 'Currently located in Berkeley, CA', details: {} },
      experience: { score: 65, reasoning: '4.2 years of experience (slightly below requirement).', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 46
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-49',
    name: 'Erica Rogers',
    email: 'erica.rogers@email.com',
    skills: [
      { skill: 'SEO', matched: false, depth: 'intermediate' },
      { skill: 'Google Analytics', matched: false, depth: 'intermediate' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Digital Marketing', position: 'SEO Specialist', startDate: '2021-02', endDate: 'Present', duration: 46 }
      ],
      totalExperience: 3.8,
      gaps: [],
      averageJobDuration: 46
    },
    experienceLevel: { years: 3.8, level: 'entry', careerTrajectory: 'stable' },
    education: ['BA Marketing - SF State'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 60, reasoning: '3.8 years of experience (1.2 years below requirement).', details: {} },
      stability: { score: 90, reasoning: 'Good employment stability', details: {} },
      overall: 45
    },
    processedAt: new Date().toISOString()
  },
  {
    id: 'demo-50',
    name: 'Gerald Cook',
    email: 'gerald.cook@email.com',
    phone: '555-0150',
    skills: [
      { skill: 'Recruiting', matched: false, depth: 'advanced' }
    ],
    location: {
      current: 'San Francisco, CA',
      confidence: 'high'
    },
    timeline: {
      jobs: [
        { company: 'Tech Recruiting Firm', position: 'Technical Recruiter', startDate: '2018-06', endDate: 'Present', duration: 78 }
      ],
      totalExperience: 6.5,
      gaps: [],
      averageJobDuration: 78
    },
    experienceLevel: { years: 6.5, level: 'mid', careerTrajectory: 'stable' },
    education: ['BA Psychology - UC Davis'],
    scores: {
      skills: { score: 0, reasoning: 'Matches 0/3 required skills. Missing: All development skills.', details: {} },
      location: { score: 100, reasoning: 'Currently located in San Francisco, CA', details: {} },
      experience: { score: 92, reasoning: '6.5 years of experience (1.5 years above requirement).', details: {} },
      stability: { score: 100, reasoning: 'Strong tenure history (3+ years average)', details: {} },
      overall: 53
    },
    processedAt: new Date().toISOString()
  }
];
