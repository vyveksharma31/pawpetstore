import React from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return <Loader2 className={`animate-spin text-brand-500 ${sizes[size] || sizes.md} ${className}`} />;
}

export function PageLoader({ message = 'Loading PawPetStore...' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-brand-100 dark:border-brand-950/60 border-t-brand-500 animate-spin" />
        <span className="absolute text-2xl">🐾</span>
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">{message}</p>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 p-4 animate-pulse">
          <div className="w-full aspect-square bg-slate-100 dark:bg-zinc-900 rounded-xl mb-3" />
          <div className="h-4 bg-slate-100 dark:bg-zinc-900 rounded w-1/3 mb-2" />
          <div className="h-5 bg-slate-100 dark:bg-zinc-900 rounded w-4/5 mb-3" />
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="h-6 bg-slate-100 dark:bg-zinc-900 rounded w-1/3" />
            <div className="h-8 bg-slate-100 dark:bg-zinc-900 rounded-xl w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
