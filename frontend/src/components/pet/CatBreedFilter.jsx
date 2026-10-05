import React from 'react';
import { Sparkles, Info, X } from 'lucide-react';

export const CAT_BREEDS = [
  {
    id: 'persian',
    name: 'Persian Cat',
    emoji: '👑',
    trait: 'Luxurious Plush Coat • Hairball Care',
    careTip: 'Requires daily grooming to avoid painful mats and specialized hairball control nutrition.'
  },
  {
    id: 'siamese',
    name: 'Siamese',
    emoji: '🐱',
    trait: 'Vocal & Social • High Climbing Agility',
    careTip: 'Loves companionship, vertical cat towers, and puzzle toys to satisfy sharp curiosity.'
  },
  {
    id: 'mainecoon',
    name: 'Maine Coon',
    emoji: '🦁',
    trait: 'Gentle Giant • Heavy-Duty Furniture',
    careTip: 'Needs heavy-duty, wide scratching posts and high-protein nutrition to support substantial bone mass.'
  },
  {
    id: 'bengal',
    name: 'Bengal Cat',
    emoji: '🐆',
    trait: 'Athletic Leaper • High Mental Stimulation',
    careTip: 'Highly energetic miniature leopard requiring daily interactive laser play and vertical shelves.'
  },
  {
    id: 'indiecat',
    name: 'Indian Billi (Indie Cat)',
    emoji: '🐾',
    trait: 'Agile & Resilient • Sleek Hunter',
    careTip: 'Naturally robust constitution; thrives with fresh running water fountains and chasing wands.'
  }
];

export default function CatBreedFilter({ selectedBreed, onSelectBreed }) {
  const activeBreedObj = CAT_BREEDS.find((b) => b.name === selectedBreed);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-5 border border-slate-200/80 dark:border-zinc-800 shadow-soft mb-8 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Filter By Your Cat's Breed</span>
        </span>
        {selectedBreed && (
          <button
            onClick={() => onSelectBreed('')}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Clear Breed Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {CAT_BREEDS.map((breed) => {
          const isSelected = selectedBreed === breed.name;
          return (
            <button
              key={breed.id}
              onClick={() => onSelectBreed(isSelected ? '' : breed.name)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/40 shadow-sm ring-1 ring-purple-500'
                  : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 bg-slate-50/60 dark:bg-zinc-900/60'
              }`}
            >
              <span className="text-xl block mb-1">{breed.emoji}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{breed.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{breed.trait}</p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Breed Care Insight Banner */}
      {activeBreedObj && (
        <div className="mt-4 p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-purple-950 dark:text-purple-200">
              {activeBreedObj.name} Nutrition & Care Insight
            </p>
            <p className="text-[11px] text-purple-800/90 dark:text-purple-300/80 mt-0.5">
              {activeBreedObj.careTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
