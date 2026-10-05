import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const PET_TYPES = [
  { id: 'all', label: 'All Pets' },
  { id: 'dog', label: '🐶 Dogs' },
  { id: 'cat', label: '🐱 Cats' },
  { id: 'bird', label: '🦜 Birds' },
  { id: 'general', label: '🦴 General Supplies' },
];

const CATEGORIES = [
  'All Categories',
  'Dog Food',
  'Dog Treats',
  'Dog Toys',
  'Dog Beds',
  'Cat Food',
  'Cat Treats',
  'Cat Litter',
  'Scratching Posts',
  'Bird Food',
  'Bird Cages',
  'Bird Accessories',
  'Accessories',
  'Health Care'
];

export default function FilterSidebar({
  selectedPetType,
  setSelectedPetType,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
  onResetFilters,
  isOpenOnMobile,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenOnMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Filter Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-80 max-w-[85vw] bg-white dark:bg-zinc-950 lg:bg-transparent lg:dark:bg-transparent p-6 lg:p-0 shadow-2xl lg:shadow-none flex flex-col transition-transform duration-300 ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800 lg:hidden mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-500" />
            <span className="font-bold text-base text-slate-900 dark:text-white">Filters</span>
          </div>
          <button onClick={onCloseMobile} className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Sidebar Card */}
        <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 space-y-6 shadow-xs">
          
          {/* Header & Reset Action */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Refine Products</h3>
            </div>
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Filter: Pet Type */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider block mb-2.5">
              Pet Type
            </label>
            <div className="space-y-1.5">
              {PET_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedPetType(type.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedPetType === type.id
                      ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Category */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
            <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider block mb-2.5">
              Product Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase() || (cat === 'All Categories' && selectedCategory === 'all');
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'All Categories' ? 'all' : cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors truncate block ${
                      isSelected
                        ? 'bg-slate-900 text-white font-semibold dark:bg-zinc-800'
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter: Max Price Slider */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-bold text-brand-600">
                Up to {formatCurrency(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
              <span>₹200</span>
              <span>₹5,000</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* Filter: Customer Rating */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
            <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider block mb-2.5">
              Minimum Rating
            </label>
            <div className="space-y-1.5">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedRating === stars
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {'⭐'.repeat(stars)} & Above
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
