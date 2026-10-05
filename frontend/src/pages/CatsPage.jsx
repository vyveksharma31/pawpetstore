import React, { useState, useEffect } from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeletonGrid } from '../components/common/Loader';
import CatBreedFilter from '../components/pet/CatBreedFilter';

const CAT_SUBCATEGORIES = [
  { id: 'all', label: 'All Feline Gear' },
  { id: 'Cat Food', label: '🐟 Dry Kibble' },
  { id: 'Wet Food', label: '🍲 Gourmet Gravy Pouches' },
  { id: 'Cat Treats', label: '🍗 Lickable Purées & Treats' },
  { id: 'Cat Litter', label: '✨ Clumping Litter & Scoops' },
  { id: 'Scratching Posts', label: '🌳 Sisal Towers & Trees' },
  { id: 'Interactive Toys', label: '🎯 Lasers & Feather Toys' },
  { id: 'Grooming & Hairball Care', label: '🌿 Hairball & Grooming Care' },
];

export default function CatsPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCatProducts() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ petType: 'cat' });
        if (selectedSubCategory !== 'all') {
          queryParams.append('subCategory', selectedSubCategory);
        }
        if (selectedBreed) {
          queryParams.append('breed', selectedBreed);
        }

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load cat products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCatProducts();
  }, [selectedSubCategory, selectedBreed]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* Feline Hero Portal Banner */}
      <section className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-800 text-white py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🐱 Feline Sanctuary & Wellness Hub
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Purr-fect Nutrition, Sisal Castles & Tailored Feline Care
              </h1>
              <p className="text-sm sm:text-base text-purple-100/90 max-w-2xl leading-relaxed">
                From delicate kittens to majestic seniors, explore veterinarian-approved wet gravies, dust-free bentonite litter, multi-tier scratching trees, and hairball relief remedies.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-purple-100">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  100% Genuine Whiskas, Sheba & Royal Canin
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Hairball Control Formulas
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
                  alt="Curious playful cat portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Cat Breed Filter Component */}
        <CatBreedFilter
          selectedBreed={selectedBreed}
          onSelectBreed={setSelectedBreed}
        />

        {/* Subcategories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CAT_SUBCATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
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
              {selectedBreed
                ? `${selectedBreed} Feline Essentials`
                : selectedSubCategory !== 'all'
                ? selectedSubCategory
                : 'All Cat Essentials'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Showing {products.length} products
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-zinc-800">
              <span className="text-4xl block mb-2">🐱</span>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Cat Products Found</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Try resetting your selected breed or subcategory filter.
              </p>
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setSelectedBreed('');
                }}
                className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 underline hover:opacity-80"
              >
                Reset Feline Filters
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
