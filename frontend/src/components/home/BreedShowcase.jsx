import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { api } from '../../services/api';
import ImageWithFallback from '../common/ImageWithFallback';

export default function BreedShowcase() {
  const [selectedPet, setSelectedPet] = useState('dog');
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBreeds() {
      try {
        setLoading(true);
        const res = await api.get(`/breeds?petType=${selectedPet}`);
        if (res.success && res.data) {
          setBreeds(res.data);
        }
      } catch (err) {
        console.warn('Failed to fetch breeds:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadBreeds();
  }, [selectedPet]);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-black border-t border-slate-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
              Data-Driven Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shop by Breed & Specific Traits
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Every breed has unique dietary needs, coat characteristics, and exercise profiles.
            </p>
          </div>

          {/* Dog vs Cat Toggle Tabs */}
          <div className="flex bg-slate-200/80 dark:bg-zinc-900 p-1 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedPet('dog')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPet === 'dog'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🐕 Dog Breeds
            </button>
            <button
              onClick={() => setSelectedPet('cat')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPet === 'cat'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🐈 Cat Breeds
            </button>
          </div>
        </div>

        {/* Breeds Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds.slice(0, 6).map((breed) => (
            <div
              key={breed.id}
              className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 hover:border-brand-300 hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-zinc-900">
                <ImageWithFallback
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Origin: {breed.origin}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{breed.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {breed.description}
                  </p>

                  {/* Temperament Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {breed.temperament?.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                    Life: {breed.lifeSpan}
                  </span>
                  <Link
                    to={`/products?breed=${encodeURIComponent(breed.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>Recommended Food</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
