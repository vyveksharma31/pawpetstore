import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Luggage, Sparkle, Tag } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeletonGrid } from '../components/common/Loader';

const ACCESSORY_SUBCATEGORIES = [
  { id: 'all', label: 'All Universal Gear' },
  { id: 'Carriers & Crates', label: '🎒 Travel Carriers & Crates' },
  { id: 'Bowls & Feeders', label: '🥣 Bowls & Smart Feeders' },
  { id: 'Grooming & Shampoos', label: '✂️ Deshedding & Grooming Blowers' },
  { id: 'Waste Cleanup', label: '🌱 Eco Waste Poop Bags' },
  { id: 'Apparel & Raincoats', label: '🧥 All-Weather Raincoats & Vests' },
];

const COMPATIBILITY_FILTERS = [
  { id: '', label: '🐾 Universal (All Pets)' },
  { id: 'dog', label: '🐶 Dogs' },
  { id: 'cat', label: '🐱 Cats' },
  { id: 'bird', label: '🦜 Birds' },
];

export default function AccessoriesPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccessories() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ category: 'Accessories' });
        if (selectedSubCategory !== 'all') {
          queryParams.append('subCategory', selectedSubCategory);
        }
        if (selectedPetType) {
          queryParams.append('petType', selectedPetType);
        }

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load accessory products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAccessories();
  }, [selectedSubCategory, selectedPetType]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* Accessories Lifestyle Banner */}
      <section className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🎒 Universal Pet Gear & Everyday Lifestyle
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Smart Feeders, Airline Crates & High-Performance Essentials
              </h1>
              <p className="text-sm sm:text-base text-amber-50/90 max-w-2xl leading-relaxed">
                Engineered for adventures, comfortable road trips, hygiene maintenance, and effortless pet parenting across dogs, cats, and all domestic animals.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-amber-100">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-300" />
                  Heavy-Duty Durable Hardware
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Luggage className="w-3.5 h-3.5 text-amber-200" />
                  IATA Airline Approved Travel Specs
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80"
                  alt="Pet travel accessories"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Target Pet Compatibility Filter Selector */}
        <div className="bg-white dark:bg-zinc-950 rounded-3xl p-5 border border-slate-200/80 dark:border-zinc-800 shadow-soft mb-8 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Pet Compatibility Filter</span>
            </span>
            {selectedPetType && (
              <button
                onClick={() => setSelectedPetType('')}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
              >
                Reset to Universal
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {COMPATIBILITY_FILTERS.map((comp) => {
              const isSelected = selectedPetType === comp.id;
              return (
                <button
                  key={comp.id || 'universal'}
                  onClick={() => setSelectedPetType(comp.id)}
                  className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300 shadow-sm ring-1 ring-brand-500'
                      : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 bg-slate-50/60 dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  {comp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {ACCESSORY_SUBCATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md dark:bg-brand-500'
                  : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedSubCategory !== 'all' ? selectedSubCategory : 'All Accessories & Lifestyle Care'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Showing {products.length} products
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-zinc-800">
              <span className="text-4xl block mb-2">🎒</span>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Accessories Found</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Try resetting your selected subcategory or pet compatibility filter.
              </p>
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setSelectedPetType('');
                }}
                className="mt-4 text-xs font-bold text-brand-600 dark:text-brand-400 underline hover:opacity-80"
              >
                Reset Accessory Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
