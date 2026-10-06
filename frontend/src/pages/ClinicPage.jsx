import React, { useState, useEffect } from 'react';
import { Stethoscope, ShieldCheck, HeartPulse, Clock, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { PageLoader } from '../components/common/Loader';
import ServiceCard from '../components/clinic/ServiceCard';
import BookingModal from '../components/clinic/BookingModal';
import VetTrustSection from '../components/clinic/VetTrustSection';

export default function ClinicPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function loadClinic() {
      try {
        setLoading(true);
        const res = await api.get('/clinic/services');
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Failed to load clinic services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadClinic();
  }, []);

  const categories = ['All', ...new Set(services.map((s) => s.category))];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter((s) => s.category === activeCategory);

  if (loading) return <PageLoader message="Loading veterinary clinics and doctors..." />;

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* Clinic Hero Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-950 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
            <span>PawPetStore Veterinary Clinic Suite</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Comprehensive Pet Healthcare, Scheduled in Seconds
          </h1>
          
          <p className="text-sm sm:text-base text-teal-100/80 leading-relaxed">
            From routine checkups and kitten/puppy immunizations to ultrasonic dental scaling and dermatology, our accredited veterinarians provide gold-standard clinical care for your pets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-medium text-teal-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-300" />
              Licensed B.V.Sc Surgeons
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Zero Waiting Time Slots
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <HeartPulse className="w-3.5 h-3.5 text-rose-300" />
              Fear-Free Handling Environment
            </span>
          </div>
        </div>
      </section>

      {/* Main Clinic Services Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Clinical Procedures & Consultations
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Select any procedure below to book a guaranteed time slot. No advance booking deposit required.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id || service.slug}
              service={service}
              onBook={(s) => setSelectedService(s)}
            />
          ))}
        </div>

        {/* Clinical Quality Trust Guarantee Section */}
        <VetTrustSection />

      </div>

      {/* Interactive Appointment Booking Wizard Modal */}
      <BookingModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />

    </div>
  );
}
