import React, { useState, useEffect } from 'react';
import { Stethoscope, Calendar, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { PageLoader } from '../components/common/Loader';
import ImageWithFallback from '../components/common/ImageWithFallback';

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
];

export default function ClinicPage() {
  const { user, isAuthenticated } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  // Booking Modal Form State
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [petAge, setPetAge] = useState('');
  const [ownerPhone, setOwnerPhone] = useState(user?.phone || '');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');

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

  const handleOpenBooking = (service) => {
    setSelectedService(service);
    setBookingSuccess(null);
    setBookingError('');
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setBookingError('Please sign in or use one-click demo credentials to book a clinic slot.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');

      const payload = {
        serviceId: selectedService.id || selectedService.slug,
        serviceName: selectedService.title,
        price: selectedService.price,
        petName,
        petType,
        petAge,
        ownerPhone,
        date: selectedDate,
        timeSlot: selectedSlot,
        notes,
      };

      const res = await api.post('/clinic/appointments', payload);
      if (res.success && res.data) {
        setBookingSuccess(res.data);
      }
    } catch (err) {
      setBookingError(err.message || 'Failed to confirm booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <PageLoader message="Loading veterinary clinics and doctors..." />;

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen pb-16 text-slate-900 dark:text-zinc-100">
      
      {/* Clinic Hero Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
            <span>PawPetStore Veterinary Clinic Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Professional Veterinary Care, Scheduled in Seconds
          </h1>
          <p className="text-sm sm:text-base text-teal-100/80 leading-relaxed">
            Choose from routine physical screenings, puppy and kitten immunization programs, dental scaling, or specialized allergy consultations with our registered veterinary doctors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Available Clinic Services</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Book an appointment online with zero advance deposit required</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id || service.slug}
              className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xs hover:shadow-soft-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-zinc-900">
                <ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-400" />
                  <span>{service.durationMinutes} mins</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{service.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {service.fullDescription || service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 block font-medium">Consultation Fee</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(service.price)}</span>
                  </div>

                  <Button
                    onClick={() => handleOpenBooking(service)}
                    variant="secondary"
                    size="sm"
                    className="gap-1.5 rounded-full"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={`Book: ${selectedService.title}`}
          maxWidth="max-w-xl"
        >
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Appointment Confirmed!</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                Your consultation reference is <strong>{bookingSuccess.bookingReference}</strong> for <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.timeSlot}</strong>.
              </p>
              <Button onClick={() => setSelectedService(null)} className="rounded-full">
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {bookingError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Pet Name"
                  placeholder="e.g. Bruno"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  required
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Pet Type
                  </label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="dog" className="dark:bg-zinc-900">🐕 Dog</option>
                    <option value="cat" className="dark:bg-zinc-900">🐈 Cat</option>
                    <option value="bird" className="dark:bg-zinc-900">🦜 Bird</option>
                    <option value="other" className="dark:bg-zinc-900">🐾 Other Companion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Pet Age / Months"
                  placeholder="e.g. 2 years"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                />
                <Input
                  label="Owner Contact Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Select Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="dark:bg-zinc-900">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Health Symptoms / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe any symptoms, vaccination history, or special considerations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 block font-medium">Total Fee Due at Clinic:</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(selectedService.price)}</span>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  isLoading={bookingLoading}
                  className="shadow-md shadow-teal-600/20"
                >
                  Confirm Appointment
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

    </div>
  );
}
