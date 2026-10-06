import React from 'react';
import { ShieldCheck, Award, HeartHandshake, PhoneCall, Stethoscope, Microscope } from 'lucide-react';

export default function VetTrustSection() {
  const trustFeatures = [
    {
      icon: <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      title: 'Licensed Veterinary Surgeons',
      desc: 'All consultations are conducted by registered B.V.Sc & M.V.Sc veterinary doctors with extensive surgical and clinical experience.'
    },
    {
      icon: <Microscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      title: 'In-House Diagnostics & Imaging',
      desc: 'Digital X-ray, ultrasound, hematology blood analyzers, and microscopic cytology available on-site for rapid clinical diagnosis.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      title: 'Fear-Free Pet Handling',
      desc: 'Low-stress examination rooms with separate feline and canine waiting areas to eliminate pet anxiety and fear.'
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      title: '24/7 Emergency Triage Line',
      desc: 'Priority emergency attention for acute trauma, toxin ingestion, bloat, or severe distress with dedicated triage protocols.'
    }
  ];

  return (
    <section className="bg-teal-50/60 dark:bg-zinc-950/80 rounded-3xl p-8 lg:p-12 border border-teal-100 dark:border-zinc-800 my-12 transition-colors">
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest bg-teal-100 dark:bg-teal-950/60 px-3 py-1 rounded-full inline-block">
          Clinical Excellence Guarantee
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Why Pet Parents Entrust Their Furry Family to PawPet Clinic
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
          We combine cutting-edge veterinary medicine with genuine warmth and empathy. No crowded waiting rooms, no rushed 3-minute checkups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustFeatures.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-slate-100 dark:border-zinc-800/80 shadow-xs hover:border-teal-300 dark:hover:border-teal-700 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center">
              {feat.icon}
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {feat.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
