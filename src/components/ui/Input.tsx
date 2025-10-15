'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-black dark:text-white mb-2 tracking-tight">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-black placeholder:text-neutral-400',
            'focus:border-black focus:ring-1 focus:ring-black transition-smooth',
            'dark:bg-black dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-600',
            'dark:focus:border-white dark:focus:ring-white',
            error && 'border-black focus:border-black focus:ring-black',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-black dark:text-white">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
