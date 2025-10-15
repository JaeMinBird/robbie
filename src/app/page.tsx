'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { DEFAULT_WEIGHTS, MAX_FILES, MAX_FILE_SIZE } from '@/lib/constants';
import { DEMO_CANDIDATES } from '@/lib/demoData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    position: '',
    location: '',
    requiredSkills: '',
    minimumExperience: '',
    jobDescription: '',
    customPrompt: ''
  });
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hasJobDescription = formData.jobDescription.trim().length > 0;

  const handleLoadDemo = () => {
    sessionStorage.setItem('candidates', JSON.stringify(DEMO_CANDIDATES));
    sessionStorage.setItem('weights', JSON.stringify(weights));
    sessionStorage.setItem('jobRequirements', JSON.stringify({
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      requiredSkills: ['React', 'TypeScript', 'Node.js'],
      minimumExperience: 5
    }));
    router.push('/results');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File ${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
        return false;
      }
      if (file.type !== 'application/pdf') {
        setError(`File ${file.name} must be a PDF`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);
    setError('');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // If no job description, require all fields
    if (!hasJobDescription) {
      if (!formData.position || !formData.location || !formData.requiredSkills || !formData.minimumExperience) {
        setError('Please fill in all required fields or provide a job description');
        return;
      }
    }

    if (files.length === 0) {
      setError('Please upload at least one resume');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      const jobRequirements = {
        position: formData.position || 'To be extracted',
        location: formData.location || 'To be extracted',
        requiredSkills: formData.requiredSkills ? formData.requiredSkills.split(',').map(s => s.trim()) : [],
        minimumExperience: formData.minimumExperience ? parseInt(formData.minimumExperience) : 0,
        jobDescription: formData.jobDescription || undefined,
        customPrompt: formData.customPrompt || undefined
      };

      formDataToSend.append('jobRequirements', JSON.stringify(jobRequirements));
      formDataToSend.append('weights', JSON.stringify(weights));

      files.forEach(file => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to process resumes');
      }

      const data = await response.json();

      sessionStorage.setItem('candidates', JSON.stringify(data.candidates));
      sessionStorage.setItem('weights', JSON.stringify(weights));
      sessionStorage.setItem('jobRequirements', JSON.stringify(jobRequirements));

      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    const newWeights = { ...weights, [key]: value };
    const total = Object.values(newWeights).reduce((sum, val) => sum + val, 0);
    if (total <= 100) {
      setWeights(newWeights);
    }
  };

  const totalWeight = Object.values(weights).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen p-6 md:p-16 bg-white dark:bg-black">
      <motion.div
        className="max-w-5xl mx-auto space-y-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-6">
          <motion.h1
            className="text-7xl md:text-8xl font-bold text-black dark:text-white tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Robbie
          </motion.h1>
          <motion.p
            className="text-lg text-neutral-500 dark:text-neutral-400 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            AI-Powered Resume Screening
          </motion.p>
        </motion.div>

        {/* Demo Card */}
        <motion.div variants={item}>
          <Card hover={false} className="!p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white tracking-tight">
                  Try Demo
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  View 50 pre-analyzed candidates instantly
                </p>
              </div>
              <Button onClick={handleLoadDemo} variant="outline" size="sm">
                Load Demo
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Description Card */}
          <motion.div variants={item}>
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-black dark:text-white tracking-tight">
                Job Details
              </h2>

              <div className="space-y-6">
                {/* Job Description Textarea */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-black dark:text-white tracking-tight">
                    Job Description or URL
                    <span className="text-neutral-400 font-normal ml-2">Optional</span>
                  </label>
                  <textarea
                    placeholder="Paste full job listing or URL here. AI will extract requirements automatically."
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    className="w-full px-4 py-4 rounded-2xl border border-neutral-200 bg-white text-black placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black transition-smooth dark:bg-black dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-white dark:focus:ring-white min-h-[140px] resize-y tracking-tight"
                  />
                  {hasJobDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-neutral-500"
                    >
                      ✓ AI will extract requirements from your description
                    </motion.p>
                  )}
                </div>

                {/* Manual Fields */}
                {!hasJobDescription && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                      <p className="text-sm text-neutral-500 mb-6">Or fill in manually</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Position"
                          placeholder="Senior Software Engineer"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          required={!hasJobDescription}
                        />
                        <Input
                          label="Location"
                          placeholder="San Francisco, CA"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required={!hasJobDescription}
                        />
                        <Input
                          label="Required Skills"
                          placeholder="React, TypeScript, Node.js"
                          value={formData.requiredSkills}
                          onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                          required={!hasJobDescription}
                          className="md:col-span-2"
                        />
                        <Input
                          label="Min. Experience (years)"
                          type="number"
                          min="0"
                          placeholder="5"
                          value={formData.minimumExperience}
                          onChange={(e) => setFormData({ ...formData, minimumExperience: e.target.value })}
                          required={!hasJobDescription}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Custom Prompt */}
                <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <label className="block text-sm font-medium text-black dark:text-white tracking-tight">
                    Custom Criteria
                    <span className="text-neutral-400 font-normal ml-2">Optional</span>
                  </label>
                  <Input
                    placeholder="e.g., 'Penn State graduates' or 'Startup experience required'"
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Scoring Weights */}
          <motion.div variants={item}>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">
                  Weights
                </h2>
                <span className={`text-sm font-medium ${totalWeight === 100 ? 'text-black dark:text-white' : 'text-neutral-400'}`}>
                  {totalWeight}%
                </span>
              </div>
              <div className="space-y-6">
                {Object.entries(weights).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium capitalize text-black dark:text-white tracking-tight">
                        {key}
                      </label>
                      <span className="text-lg font-semibold text-black dark:text-white tabular-nums">
                        {value}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleWeightChange(key as keyof typeof weights, parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer dark:bg-neutral-800 accent-black dark:accent-white"
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* File Upload */}
          <motion.div variants={item}>
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-black dark:text-white tracking-tight">
                Resumes
              </h2>
              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-3xl cursor-pointer hover:border-black dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-smooth group">
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="w-16 h-16 mb-4 text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    <p className="mb-2 text-base text-black dark:text-white font-medium">
                      Drop files or click to upload
                    </p>
                    <p className="text-sm text-neutral-500">
                      PDF · Max {MAX_FILES} files · {MAX_FILE_SIZE / 1024 / 1024}MB each
                    </p>
                  </motion.div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                <AnimatePresence mode="popLayout">
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <p className="text-sm font-medium text-black dark:text-white">
                        {files.length} file{files.length > 1 ? 's' : ''} selected
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {files.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 group"
                          >
                            <FileText className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                            <span className="truncate text-sm text-black dark:text-white flex-1">
                              {file.name}
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-black dark:text-white flex-shrink-0" />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4 text-neutral-500" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.div variants={item}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading || totalWeight !== 100}
              className="w-full text-lg py-6 rounded-2xl"
            >
              {loading ? 'Analyzing Resumes...' : 'Analyze Resumes'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
