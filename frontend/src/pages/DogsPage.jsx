import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeletonGrid } from '../components/common/Loader';
import ImageWithFallback from '../components/common/ImageWithFallback';

const DOG_SUBCATEGORIES = [
  { id: 'all', label: 'All Dog Gear' },
  { id: 'Dry Food', label: '🥩 Dry Kibble' },
  { id: 'Wet Food', label: '🍲 Wet Pouches' },
  { id: 'Treats', label: '🥓 Training Treats' },
  { id: 'Chew Toys', label: '🦴 Chew & Tug Toys' },
  { id: 'Beds & Mats', label: '🛏️ Orthopedic Beds' },
  { id: 'Collars & Leashes', label: '🦮 Tactical Leashes' },
  { id: 'Grooming', label: '🧼 Tick & Flea Shampoos' },
];

const POPULAR_BREEDS = [
  { name: 'Labrador Retriever', emoji: '🐕', trait: 'High Energy • Large Appetite' },
  { name: 'Golden Retriever', emoji: '🦮', trait: 'Silky Double Coat • Friendly' },
  { name: 'German Shepherd', emoji: '🐕‍🦺', trait: 'Muscular Guard • High Protein' },
  { name: 'Beagle', emoji: '🐶', trait: 'Curious Sniffer • Sensitive Ears' },
  { name: 'Indian Pariah (Indie)', emoji: '🐕', trait: 'Resilient • Low Maintenance' },
  { name: 'Shih Tzu', emoji: '🐩', trait: 'Apartment Toy • Facial Grooming' },
];

export default function DogsPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDogProducts() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ petType: 'dog' });
        if (selectedSubCategory !== 'all') queryParams.append('subCategory', selectedSubCategory);
        if (selectedBreed) queryParams.append('breed', selectedBreed);

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load dog products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDogProducts();
  }, [selectedSubCategory, selectedBreed]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100">
      
      {/* Dog Hero Portal Banner */}
      <section className="relative bg-gradient-to-r from-amber-600 via-brand-500 to-orange-600 text-white py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🐶 Canine Excellence Hub
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Tail-Wagging Nutrition, Indestructible Toys & Canine Wellness
              </h1>
              <p className="text-sm sm:text-base text-amber-50/90 max-w-2xl leading-relaxed">
                From playful puppyhood to noble golden years, discover scientifically balanced nutrition, veterinary joint supplements, and heavy-duty chew gear tailored for every breed.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
                  alt="Dog with happy expression"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Popular Breed Selector Pills */}
        <div className="bg-white dark:bg-zinc-950 rounded-3xl p-5 border border-slate-200/80 dark:border-zinc-800 shadow-soft mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Filter By Your Dog's Breed</span>
            </span>
            {selectedBreed && (
              <button
                onClick={() => setSelectedBreed('')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Clear Breed Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {POPULAR_BREEDS.map((breed) => {
              const isSelected = selectedBreed === breed.name;
              return (
                <button
                  key={breed.name}
                  onClick={() => setSelectedBreed(isSelected ? '' : breed.name)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 shadow-sm'
                      : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 bg-slate-50/60 dark:bg-zinc-900'
                  }`}
                >
                  <span className="text-xl block mb-1">{breed.emoji}</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{breed.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{breed.trait}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {DOG_SUBCATEGORIES.map((cat) => (
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

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedBreed ? `${selectedBreed} Suitable Products` : selectedSubCategory !== 'all' ? selectedSubCategory : 'All Dog Essentials'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Showing {products.length} products
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-zinc-800">
              <span className="text-4xl block mb-2">🐕</span>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Dog Products Found</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Try resetting the breed or subcategory filter.</p>
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setSelectedBreed('');
                }}
                className="mt-4 text-xs font-bold text-brand-600 underline"
              >
                Reset Dog Filters
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
