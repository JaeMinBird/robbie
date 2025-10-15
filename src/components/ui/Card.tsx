'use client';

import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  glass?: boolean;
  hover?: boolean;
  children?: ReactNode;
}

export function Card({ className, glass = true, hover = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } } : undefined}
      className={cn(
        'rounded-3xl p-8 transition-smooth',
        glass ? 'glass-strong' : 'bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800',
        hover && 'hover-lift',
        className
      )}
      {...(props as MotionProps)}
    >
      {children}
    </motion.div>
  );
}
