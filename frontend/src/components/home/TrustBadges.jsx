import React from 'react';
import { ShieldCheck, Truck, Clock, RefreshCw, Award, HeartHandshake } from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: '100% Authentic Products',
    desc: 'Sourced directly from authorized manufacturers including Royal Canin, Pedigree, and Whiskas.',
    color: 'text-brand-500 bg-brand-50',
  },
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'Prompt doorstep delivery on all orders above ₹999 across major pin codes.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: Award,
    title: 'Certified Veterinarians',
    desc: 'All wellness checkups and nutritional advice supervised by registered veterinary doctors.',
    color: 'text-amber-500 bg-amber-50',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Pet Support',
    desc: 'Reach our empathetic pet care specialists Monday through Saturday from 9 AM to 8 PM.',
    color: 'text-rose-500 bg-rose-50',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-black border-t border-slate-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
            The PawPetStore Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Pet Parents Across India Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xs hover:shadow-soft transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
