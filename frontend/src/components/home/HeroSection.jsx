import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Star, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50 to-white dark:from-zinc-950 dark:via-black dark:to-black py-12 sm:py-20 lg:py-24">
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-teal-300/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 border border-brand-200/80 dark:border-brand-900/50 px-4 py-1.5 rounded-full shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              <span className="text-xs font-bold text-brand-700 dark:text-brand-400 tracking-wide uppercase">
                🐾 India's #1 Pet Commerce & Health Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Everything Your Pet Needs,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-amber-500">
                All in One Place.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore breed-specific dog kibble, feline delicacies, bird supplies, and clinical veterinary checkups. Curated by pet nutritionists and verified doctors.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link to="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-brand-500/25">
                  <span>Shop Pet Store</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to="/clinic" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 shadow-lg shadow-teal-600/20">
                  <Stethoscope className="w-4 h-4" />
                  <span>Book Vet Clinic</span>
                </Button>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-zinc-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {['🐶', '🐱', '🦜'].map((emoji, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xs">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span><strong>25,000+</strong> Happy Pets Fed</span>
              </div>

              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-zinc-200">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9 / 5 Rating</span>
              </div>

              <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>100% Genuine Brands</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Pet Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 aspect-[4/5] bg-slate-100 dark:bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80"
                  alt="Happy Golden Dog looking forward"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-3 flex items-center gap-3 backdrop-blur-md animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center text-lg">
                  🐕
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Premium Canine Diet</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready to Ship</p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-3.5 flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Vet Doctor On-Demand</p>
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">Available 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
