'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Candidate, Tier } from '@/types';
import { cn } from '@/lib/utils';
import { TIER_CONFIGS } from '@/lib/constants';

interface CandidateCardProps {
  candidate: Candidate;
  tier: Tier;
}

export function CandidateCard({ candidate, tier }: CandidateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tierConfig = TIER_CONFIGS.find(t => t.tier === tier)!;

  const matchedSkills = candidate.skills.filter(s => s.matched);
  const missingSkills = candidate.skills.filter(s => !s.matched);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'glass rounded-2xl overflow-hidden transition-smooth',
        'border-l-4',
        `hover:shadow-lg`
      )}
      style={{ borderLeftColor: tierConfig.color }}
    >
      {/* Header - Always Visible */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
                {candidate.name}
              </h3>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: tierConfig.bgColor,
                  color: tierConfig.color,
                  border: `1px solid ${tierConfig.borderColor}`
                }}
              >
                {tierConfig.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              {candidate.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{candidate.email}</span>
                </div>
              )}
              {candidate.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{candidate.phone}</span>
                </div>
              )}
              {candidate.location.current && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{candidate.location.current}</span>
                </div>
              )}
            </div>
          </div>

          {/* Overall Score */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: tierConfig.bgColor,
                color: tierConfig.color,
                border: `2px solid ${tierConfig.borderColor}`
              }}
            >
              {candidate.scores.overall}
            </div>
            <span className="text-xs text-neutral-500">Overall</span>
          </div>

          {/* Expand Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-6 h-6 text-neutral-400" />
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Skills', score: candidate.scores.skills.score, icon: CheckCircle2 },
            { label: 'Location', score: candidate.scores.location.score, icon: MapPin },
            { label: 'Experience', score: candidate.scores.experience.score, icon: Briefcase },
            { label: 'Stability', score: candidate.scores.stability.score, icon: TrendingUp }
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <item.icon className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.label}</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {item.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-6">
              {/* Skills */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Skills
                </h4>
                <div className="space-y-2">
                  {matchedSkills.length > 0 && (
                    <div>
                      <p className="text-xs text-neutral-500 mb-1.5">Matched:</p>
                      <div className="flex flex-wrap gap-2">
                        {matchedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            {skill.skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {missingSkills.length > 0 && (
                    <div>
                      <p className="text-xs text-neutral-500 mb-1.5">Other Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {skill.skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                  {candidate.scores.skills.reasoning}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experience ({candidate.experienceLevel.years} years)
                </h4>
                <div className="space-y-2">
                  {candidate.timeline.jobs.slice(0, 3).map((job, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">{job.position}</p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {job.company} · {job.startDate} - {job.endDate} ({Math.floor(job.duration / 12)}y {job.duration % 12}m)
                      </p>
                    </div>
                  ))}
                  {candidate.timeline.jobs.length > 3 && (
                    <p className="text-xs text-neutral-500">
                      +{candidate.timeline.jobs.length - 3} more positions
                    </p>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                  {candidate.scores.experience.reasoning}
                </p>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {candidate.scores.location.reasoning}
                </p>
              </div>

              {/* Stability */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Stability
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Avg. Job Duration:</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {Math.floor(candidate.timeline.averageJobDuration / 12)}y {Math.round(candidate.timeline.averageJobDuration % 12)}m
                    </span>
                  </div>
                  {candidate.timeline.gaps.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Employment Gaps:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {candidate.timeline.gaps.length}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                  {candidate.scores.stability.reasoning}
                </p>
              </div>

              {/* Education */}
              {candidate.education.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </h4>
                  <div className="space-y-1">
                    {candidate.education.map((edu, idx) => (
                      <p key={idx} className="text-sm text-neutral-600 dark:text-neutral-400">
                        {edu}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Risk Flags */}
              {(candidate.timeline.gaps.length > 0 || candidate.timeline.averageJobDuration < 24) && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                        Points to Consider
                      </p>
                      <ul className="text-sm text-amber-800 dark:text-amber-300 mt-1 space-y-1">
                        {candidate.timeline.gaps.length > 0 && (
                          <li>• Has {candidate.timeline.gaps.length} employment gap(s)</li>
                        )}
                        {candidate.timeline.averageJobDuration < 24 && (
                          <li>• Average job duration is less than 2 years</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
