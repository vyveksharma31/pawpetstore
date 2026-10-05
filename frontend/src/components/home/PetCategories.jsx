import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'dogs',
    name: 'Dogs & Puppies',
    subtitle: 'Kibble, Chew Toys, Beds & Care',
    link: '/dogs',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    color: 'from-orange-500/80 to-amber-500/80',
    badge: 'Popular',
  },
  {
    id: 'cats',
    name: 'Cats & Kittens',
    subtitle: 'Gourmet Food, Litter & Scratch Trees',
    link: '/cats',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    color: 'from-teal-600/80 to-cyan-600/80',
    badge: 'Trending',
  },
  {
    id: 'birds',
    name: 'Birds & Parrots',
    subtitle: 'Enriched Seeds, Cages & Perches',
    link: '/birds',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-600/80 to-teal-700/80',
    badge: 'Specialty',
  },
  {
    id: 'accessories',
    name: 'Supplies & Care',
    subtitle: 'Travel Crates, Steel Bowls & Brushes',
    link: '/products?category=accessories',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
    color: 'from-slate-700/80 to-slate-900/80',
    badge: 'Essential',
  },
];

export default function PetCategories() {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
              Shop By Companion
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tailored Nutrition & Supplies for Every Pet
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 aspect-[4/5] flex flex-col justify-end p-6 border border-slate-100 dark:border-zinc-800"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

              {/* Content Card */}
              <div className="relative z-10 text-white space-y-1.5">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                  {cat.badge}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">{cat.name}</h3>
                <p className="text-xs text-white/90 line-clamp-1">{cat.subtitle}</p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
