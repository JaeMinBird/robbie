'use client';

import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-black text-white hover:bg-neutral-800 focus-visible:ring-black dark:bg-white dark:text-black dark:hover:bg-neutral-200',
      secondary: 'bg-neutral-100 text-black hover:bg-neutral-200 focus-visible:ring-neutral-500 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700',
      outline: 'border border-black text-black hover:bg-black hover:text-white focus-visible:ring-black dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black',
      ghost: 'text-black hover:bg-neutral-100 focus-visible:ring-neutral-500 dark:text-white dark:hover:bg-neutral-900'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...(props as MotionProps)}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';