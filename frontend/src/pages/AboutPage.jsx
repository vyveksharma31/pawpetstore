import React from 'react';
import { Heart, ShieldCheck, Award, Stethoscope, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center text-2xl shadow-xs">
            🐾
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About PawPetStore
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Born out of a deep reverence for four-legged family members and feathered companions.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-soft space-y-6 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Our Founding Vision</h2>
          <p>
            At PawPetStore, we believe pet parenting should never feel like guesswork. Traditional retail stores frequently provide generic feed with little regard for breed genetics, age stages, or physiological allergies. Simultaneously, accessing dependable veterinary consultations often entails stressful commutes and chaotic clinic wait times.
          </p>
          <p>
            We set out to engineer a unified digital ecosystem where verified pet nutrition, specialized gear, and certified clinical appointments live harmoniously under one modern roof. Every food formulation in our warehouse is 100% genuine and traceable back to certified brand partners like Royal Canin, Pedigree, and Whiskas.
          </p>
        </div>

        {/* Mission Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Authenticity Only</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Zero counterfeit or grey-market feeds. Every batch is QC inspected.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Doctor Supervised</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Integrated veterinary clinic appointments with certified doctors.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Companion First</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Breed guides and dietary consultation tailored to each animal.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
