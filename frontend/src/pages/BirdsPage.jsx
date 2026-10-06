import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Feather, Heart } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeletonGrid } from '../components/common/Loader';
import BirdSpeciesFilter from '../components/pet/BirdSpeciesFilter';

const BIRD_SUBCATEGORIES = [
  { id: 'all', label: 'All Avian Supplies' },
  { id: 'Daily Food', label: '🌾 Seed Mixes & Millet' },
  { id: 'Pellets', label: '🍎 Fruit & Maintenance Pellets' },
  { id: 'Cages', label: '🏰 Flight Cages & Aviaries' },
  { id: 'Perches & Swings', label: '🪵 Pepperwood Perches & Swings' },
  { id: 'Feeding Bowls & Waterers', label: '💧 Siphon Feeders & Waterers' },
  { id: 'Bird Toys', label: '🥥 Foraging Coconut & Rope Toys' },
  { id: 'Mineral Blocks', label: '🦴 Cuttlebone & Calcium Bells' },
];

export default function BirdsPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBirdProducts() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ petType: 'bird' });
        if (selectedSubCategory !== 'all') {
          queryParams.append('subCategory', selectedSubCategory);
        }
        if (selectedSpecies) {
          queryParams.append('breed', selectedSpecies);
        }

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load bird products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBirdProducts();
  }, [selectedSubCategory, selectedSpecies]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* Avian Hero Sanctuary Banner */}
      <section className="relative bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700 text-white py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🦜 Avian Haven & Exotic Bird Sanctuary
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Vibrant Plumage Nutrition, Flight Aviaries & Foraging Toys
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                From singing canaries and whistling cockatiels to magnificent African greys, discover vet-formulated seed mixes, natural wood branch perches, non-toxic flight cages, and cuttlebone chews.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-emerald-100">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-300" />
                  100% Genuine Versele-Laga, ZuPreem & Vitapol
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Feather className="w-3.5 h-3.5 text-cyan-300" />
                  Non-Toxic Zinc-Free Materials
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80"
                  alt="Beautiful tropical bird on perch"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Bird Species Filter Component */}
        <BirdSpeciesFilter
          selectedSpecies={selectedSpecies}
          onSelectSpecies={setSelectedSpecies}
        />

        {/* Subcategories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {BIRD_SUBCATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-md'
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
              {selectedSpecies
                ? `${selectedSpecies} Essentials`
                : selectedSubCategory !== 'all'
                ? selectedSubCategory
                : 'All Avian Supplies'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Showing {products.length} products
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-zinc-800">
              <span className="text-4xl block mb-2">🦜</span>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Bird Products Found</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Try resetting your selected species or subcategory filter.
              </p>
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setSelectedSpecies('');
                }}
                className="mt-4 text-xs font-bold text-teal-600 dark:text-teal-400 underline hover:opacity-80"
              >
                Reset Avian Filters
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
