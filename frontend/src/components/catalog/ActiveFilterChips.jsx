import React from 'react';
import { X } from 'lucide-react';

export default function ActiveFilterChips({
  searchQuery,
  onClearSearch,
  petType,
  onClearPetType,
  category,
  onClearCategory,
  rating,
  onClearRating,
  onResetAll,
}) {
  const hasFilters = searchQuery || (petType && petType !== 'all') || (category && category !== 'all') || rating;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
      <span className="text-slate-400 dark:text-zinc-500 font-medium">Active filters:</span>

      {searchQuery && (
        <span className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full font-medium border border-brand-200 dark:border-brand-900/60">
          <span>Search: "{searchQuery}"</span>
          <button onClick={onClearSearch} className="hover:text-brand-900 dark:hover:text-brand-200"><X className="w-3.5 h-3.5" /></button>
        </span>
      )}

      {petType && petType !== 'all' && (
        <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 px-3 py-1 rounded-full font-medium border border-slate-200 dark:border-zinc-800">
          <span>Pet: {petType.toUpperCase()}</span>
          <button onClick={onClearPetType} className="hover:text-slate-900 dark:hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </span>
      )}

      {category && category !== 'all' && (
        <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 px-3 py-1 rounded-full font-medium border border-slate-200 dark:border-zinc-800">
          <span>Category: {category}</span>
          <button onClick={onClearCategory} className="hover:text-slate-900 dark:hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </span>
      )}

      {rating && (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-medium border border-amber-200 dark:border-amber-800">
          <span>{rating}★ & Above</span>
          <button onClick={onClearRating} className="hover:text-amber-900 dark:hover:text-amber-200"><X className="w-3.5 h-3.5" /></button>
        </span>
      )}

      <button
        onClick={onResetAll}
        className="text-xs font-semibold text-red-600 hover:text-red-700 underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
