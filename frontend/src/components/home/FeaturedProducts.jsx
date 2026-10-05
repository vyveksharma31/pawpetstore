import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import ProductCard from '../product/ProductCard';
import { ProductSkeletonGrid } from '../common/Loader';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const query = activeTab === 'all' ? '/products?limit=8' : `/products?petType=${activeTab}&limit=8`;
        const res = await api.get(query);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Failed to load featured products:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, [activeTab]);

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Pet Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Essentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bestselling Food, Treats & Gear
            </h2>
          </div>

          {/* Quick Pet Type Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Essentials' },
              { id: 'dog', label: '🐶 Dogs' },
              { id: 'cat', label: '🐱 Cats' },
              { id: 'bird', label: '🦜 Birds' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-brand-500'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <ProductSkeletonGrid count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:hover:bg-zinc-800 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <span>View All {products.length}+ Products in Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
