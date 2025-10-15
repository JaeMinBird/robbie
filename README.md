# Robbie - AI-Powered Resume Screening

Process 50 resumes in minutes instead of hours with AI-powered candidate screening and ranking.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **AI-Powered Analysis**: Uses Gemini AI to extract structured data from PDF resumes
- **Multi-Dimensional Scoring**: Evaluates candidates across 4 key dimensions:
  - Skills matching with synonym normalization (40%)
  - Location fit with confidence levels (25%)
  - Experience alignment with career trajectory (20%)
  - Stability analysis detecting job hopping and gaps (15%)
- **Customizable Weights**: Adjust scoring weights in real-time with instant re-ranking
- **Tier-Based Ranking**: Automatically categorizes candidates into 3 tiers
  - Tier 1: 80-100 score (Top Candidates)
  - Tier 2: 60-79 score (Strong Candidates)
  - Tier 3: 0-59 score (Needs Review)
- **Demo Mode**: Load 50 pre-processed candidates instantly to explore functionality
- **Export Options**: Download results as CSV or JSON
- **Glassmorphism UI**: Beautiful Swedish minimalist design with iOS 26-inspired glass effects
- **Batch Processing**: Process up to 50 resumes in parallel (5 at a time)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **AI**: Google Gemini AI (gemini-1.5-flash)
- **PDF Parsing**: pdf-parse
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/robbie.git
cd robbie
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Try Demo Data

Click "Load Demo" on the home page to instantly view 50 pre-processed candidates and explore all features without waiting for API processing.

### Analyze Real Resumes

1. **Configure Job Requirements**:
   - Enter position title
   - Specify location
   - List required skills (comma-separated)
   - Set minimum years of experience

2. **Adjust Scoring Weights** (optional):
   - Skills: 0-100%
   - Location: 0-100%
   - Experience: 0-100%
   - Stability: 0-100%
   - Total must equal 100%

3. **Upload Resumes**:
   - Drag & drop or click to upload
   - PDF format only
   - Max 50 files
   - Max 10MB per file

4. **View Results**:
   - Candidates automatically ranked into tiers
   - Expand cards to see detailed breakdowns
   - Adjust weights for real-time re-ranking
   - Export results as CSV or JSON

## Scoring Algorithm

### Skills (Default: 40%)
- Normalizes skill names with synonym detection
- Matches against required skills
- Awards depth bonuses for advanced proficiency
- **Output**: Match percentage + depth bonus (max 100)

### Location (Default: 25%)
- Checks current location with confidence levels
- Considers location preferences
- Infers from education/work history if not explicit
- **Output**: Fit score based on match and confidence

### Experience (Default: 20%)
- Compares years against requirement
- Analyzes career trajectory (ascending/stable/descending)
- Rewards relevant experience progression
- **Output**: Alignment score with trajectory adjustment

### Stability (Default: 15%)
- Calculates average job duration
- Detects employment gaps (6+ months)
- Flags job hopping patterns (< 1.5 years average)
- **Output**: Stability score with risk flags

## Deployment to Vercel

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Add environment variable: `GEMINI_API_KEY`

3. Deploy!

Your app will be live at `https://your-project.vercel.app`

## Project Structure

```
robbie/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts       # Resume processing API
│   │   ├── results/
│   │   │   └── page.tsx           # Results page
│   │   ├── globals.css            # Global styles with glassmorphism
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Setup page (home)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx         # Reusable button component
│   │   │   ├── Card.tsx           # Glassmorphism card component
│   │   │   └── Input.tsx          # Form input component
│   │   └── CandidateCard.tsx      # Expandable candidate card
│   ├── lib/
│   │   ├── constants.ts           # App constants and configs
│   │   ├── demoData.ts            # 50 demo candidates
│   │   ├── gemini.ts              # Gemini AI integration
│   │   ├── scoring.ts             # Scoring algorithms
│   │   └── utils.ts               # Utility functions
│   └── types/
│       └── index.ts               # TypeScript type definitions
├── .env.example                   # Environment variable template
├── .env.local                     # Your local environment variables
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## Features in Detail

### Demo Data
- 50 realistic pre-processed candidates
- 8 Tier 1 (80-100 score)
- 15 Tier 2 (60-79 score)
- 27 Tier 3 (0-59 score)
- Instant load without API calls

### Real-time Re-ranking
- Adjust scoring weights with sliders
- Candidates automatically re-score and re-sort
- Smooth animations during transitions
- No page reload required

### Explainable AI
- Each score includes reasoning
- Detailed breakdowns for all dimensions
- Risk flags for stability concerns
- Positive signals highlighted

### Export Options
- **CSV**: Spreadsheet-friendly format with all key metrics
- **JSON**: Complete data dump including raw scores and reasoning

## Performance

- **Batch Processing**: 5 resumes processed in parallel
- **Optimistic UI**: Skeleton loaders during processing
- **Error Handling**: Retry logic with detailed error messages
- **Timeout**: 60-second max for Vercel serverless functions

## Design System

- **Color Palette**: Swedish minimalist (5 colors)
  - Primary: Blue (#3B82F6)
  - Success: Green (#10B981)
  - Warning: Amber (#F59E0B)
  - Error: Red (#EF4444)
  - Neutral: Gray shades
- **Typography**: Geist Sans (1 typeface family)
- **Effects**: Glassmorphism with backdrop blur
- **Animations**: Smooth, responsive (0.3s ease)
- **Layout**: Clean spacing, generous padding

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS 15+, Android 10+)

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Inspired by West Shore Home's lead qualification system
- Design influenced by iOS 26 glassmorphism

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---
