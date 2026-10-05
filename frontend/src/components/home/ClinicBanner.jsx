import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ShieldCheck, Calendar, Clock, Award, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function ClinicBanner() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Veterinary Care Suite</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Compassionate, Certified Clinical Care for Your Beloved Companions
            </h2>

            <p className="text-sm sm:text-base text-teal-100/80 max-w-2xl leading-relaxed">
              Don't wait for emergencies. Book routine health checkups, puppy vaccination schedules, ultrasonic dental scaling, and personalized diet charts with verified veterinary specialists.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Zero Clinic Wait Times</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-200">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Flexible 30-min Slots</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-200">
                <Award className="w-4 h-4 text-teal-400" />
                <span>Certified Doctors</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
            <Link to="/clinic" className="w-full">
              <Button size="lg" className="w-full bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold gap-2 shadow-lg shadow-teal-500/30">
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </Button>
            </Link>
            <Link to="/clinic" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-teal-400/40 text-teal-100 hover:bg-teal-700/50">
                <span>Explore All 6 Clinic Services</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
