import React from 'react';
import { Sparkles, Info, X } from 'lucide-react';

export const BIRD_SPECIES = [
  {
    id: 'budgie',
    name: 'Budgerigar (Budgie)',
    emoji: '🦜',
    trait: 'Cheerful Parakeet • High Social Needs',
    careTip: 'Supply varied millet, cuttlebone for calcium, and rotate bell toys weekly to prevent cage boredom.'
  },
  {
    id: 'cockatiel',
    name: 'Cockatiel',
    emoji: '🕊️',
    trait: 'Expressive Crest • Whistling Companion',
    careTip: 'Requires wide horizontal flight space, non-toxic wood perches, and safe fruit-blend pellet nutrition.'
  },
  {
    id: 'lovebird',
    name: 'Lovebird (Agapornis)',
    emoji: '💖',
    trait: 'Feisty & Affectionate • Pocket Parrot',
    careTip: 'Thrives in bonded pairs with plenty of chewable palm leaves, rattan foraging balls, and mineral bells.'
  },
  {
    id: 'africangrey',
    name: 'African Grey Parrot',
    emoji: '🦅',
    trait: 'Genius Intelligence • Master Mimic',
    careTip: 'Demands continuous cognitive puzzles, foraging feeders, large flight territory, and high-protein pellet blends.'
  },
  {
    id: 'finch',
    name: 'Zebra Finch',
    emoji: '🐦',
    trait: 'Gentle Beepers • Colony Flocks',
    careTip: 'Keep in pairs or flocks inside flight cages. Provide fine grit, woven roosting baskets, and small seed mixes.'
  },
  {
    id: 'canary',
    name: 'Atlantic Canary',
    emoji: '🎶',
    trait: 'Melodic Singer • Peaceful Spirit',
    careTip: 'Ensure long horizontal perches for flight exercise and maintain natural daylight rhythms for healthy seasonal molting.'
  }
];

export default function BirdSpeciesFilter({ selectedSpecies, onSelectSpecies }) {
  const activeSpeciesObj = BIRD_SPECIES.find((s) => s.name === selectedSpecies);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-5 border border-slate-200/80 dark:border-zinc-800 shadow-soft mb-8 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>Filter By Your Bird's Species</span>
        </span>
        {selectedSpecies && (
          <button
            onClick={() => onSelectSpecies('')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Clear Species Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {BIRD_SPECIES.map((species) => {
          const isSelected = selectedSpecies === species.name;
          return (
            <button
              key={species.id}
              onClick={() => onSelectSpecies(isSelected ? '' : species.name)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/40 shadow-sm ring-1 ring-teal-500'
                  : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 bg-slate-50/60 dark:bg-zinc-900/60'
              }`}
            >
              <span className="text-xl block mb-1">{species.emoji}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{species.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{species.trait}</p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Species Care Insight Banner */}
      {activeSpeciesObj && (
        <div className="mt-4 p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-teal-950 dark:text-teal-200">
              {activeSpeciesObj.name} Avian Care Insight
            </p>
            <p className="text-[11px] text-teal-800/90 dark:text-teal-300/80 mt-0.5">
              {activeSpeciesObj.careTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
