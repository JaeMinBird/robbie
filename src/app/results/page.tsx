'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Settings2, Sparkles } from 'lucide-react';
import { Candidate, ScoringWeights } from '@/types';
import { getTierFromScore } from '@/lib/utils';
import { recalculateScores } from '@/lib/scoring';
import { TIER_CONFIGS, DEFAULT_WEIGHTS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CandidateCard } from '@/components/CandidateCard';
import { exportToCSV, downloadFile } from '@/lib/utils';

export default function Results() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);
  const [showWeights, setShowWeights] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from sessionStorage
    const candidatesData = sessionStorage.getItem('candidates');
    const weightsData = sessionStorage.getItem('weights');

    if (!candidatesData) {
      router.push('/');
      return;
    }

    const loadedCandidates = JSON.parse(candidatesData);
    const loadedWeights = weightsData ? JSON.parse(weightsData) : DEFAULT_WEIGHTS;

    setCandidates(loadedCandidates);
    setWeights(loadedWeights);
    setLoading(false);
  }, [router]);

  const handleWeightChange = (key: keyof ScoringWeights, value: number) => {
    const newWeights = { ...weights, [key]: value };
    const total = Object.values(newWeights).reduce((sum, val) => sum + val, 0);

    if (total <= 100) {
      setWeights(newWeights);

      // Recalculate all candidate scores
      const updatedCandidates = candidates.map(candidate =>
        recalculateScores(candidate, newWeights)
      );

      setCandidates(updatedCandidates);
    }
  };

  const handleExportCSV = () => {
    const exportData = candidates.map(c => ({
      Name: c.name,
      Email: c.email,
      Phone: c.phone || '',
      Location: c.location.current || '',
      'Overall Score': c.scores.overall,
      'Skills Score': c.scores.skills.score,
      'Location Score': c.scores.location.score,
      'Experience Score': c.scores.experience.score,
      'Stability Score': c.scores.stability.score,
      'Experience Years': c.experienceLevel.years,
      Tier: getTierFromScore(c.scores.overall)
    }));

    const csv = exportToCSV(exportData);
    downloadFile(csv, 'candidates-analysis.csv', 'text/csv');
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(candidates, null, 2);
    downloadFile(json, 'candidates-analysis.json', 'application/json');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading results...</p>
        </div>
      </div>
    );
  }

  // Group candidates by tier
  const tier1 = candidates.filter(c => getTierFromScore(c.scores.overall) === 1);
  const tier2 = candidates.filter(c => getTierFromScore(c.scores.overall) === 2);
  const tier3 = candidates.filter(c => getTierFromScore(c.scores.overall) === 3);

  const totalWeight = Object.values(weights).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Setup
            </Button>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Analysis Results
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              {candidates.length} candidates analyzed and ranked
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Button
              variant="outline"
              onClick={() => setShowWeights(!showWeights)}
            >
              <Settings2 className="w-4 h-4 mr-2" />
              Adjust Weights
            </Button>
            <Button variant="secondary" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="secondary" onClick={handleExportJSON}>
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </motion.div>
        </div>

        {/* Weight Adjustment Panel */}
        {showWeights && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Scoring Weights
                </h3>
                <span className={`text-sm font-medium ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                  Total: {totalWeight}%
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium capitalize text-neutral-700 dark:text-neutral-300">
                        {key}
                      </label>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {value}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleWeightChange(key as keyof ScoringWeights, parseInt(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Adjust weights to recalculate scores in real-time
              </p>
            </Card>
          </motion.div>
        )}

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TIER_CONFIGS.map((config, idx) => {
            const count = config.tier === 1 ? tier1.length : config.tier === 2 ? tier2.length : tier3.length;

            return (
              <motion.div
                key={config.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  className="text-center"
                  style={{
                    backgroundColor: config.bgColor,
                    borderColor: config.borderColor
                  }}
                >
                  <div className="text-4xl font-bold mb-2" style={{ color: config.color }}>
                    {count}
                  </div>
                  <div className="text-lg font-semibold mb-1" style={{ color: config.color }}>
                    {config.label}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {config.range[0]}-{config.range[1]} score
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tier 1 Candidates */}
        {tier1.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-lg">
                {tier1.length}
              </span>
              Tier 1 - Top Candidates
            </h2>
            <div className="space-y-4">
              {tier1.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <CandidateCard candidate={candidate} tier={1} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2 Candidates */}
        {tier2.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg">
                {tier2.length}
              </span>
              Tier 2 - Strong Candidates
            </h2>
            <div className="space-y-4">
              {tier2.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <CandidateCard candidate={candidate} tier={2} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 3 Candidates */}
        {tier3.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-lg">
                {tier3.length}
              </span>
              Tier 3 - Needs Review
            </h2>
            <div className="space-y-4">
              {tier3.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <CandidateCard candidate={candidate} tier={3} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
