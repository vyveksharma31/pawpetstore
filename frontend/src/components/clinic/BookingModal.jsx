import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Calendar, Clock, Stethoscope } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
];

export default function BookingModal({ service, isOpen, onClose }) {
  const { user, isAuthenticated } = useAuth();

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

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!service) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setErrorMessage('Please sign in or use one-click demo credentials to book a clinic appointment.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const payload = {
        serviceId: service.id || service.slug,
        serviceName: service.title,
        price: service.price,
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
        setSuccessData(res.data);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to confirm booking.');
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book Appointment: ${service.title}`}
      maxWidth="max-w-xl"
    >
      {successData ? (
        <div className="text-center py-6 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Appointment Confirmed!</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Your consultation reference is <strong className="text-teal-600 dark:text-teal-400 font-mono">{successData.bookingReference}</strong> for <strong>{successData.date}</strong> at <strong>{successData.timeSlot}</strong>.
          </p>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-300">
            A confirmation reminder has been logged to your account dashboard under <strong>Vet Appointments</strong>.
          </div>
          <Button onClick={onClose} className="rounded-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-red-700 dark:text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Pet Species
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="dog">🐶 Dog</option>
                <option value="cat">🐱 Cat</option>
                <option value="bird">🦜 Bird</option>
                <option value="other">🐾 Other Pet</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Pet Age / Life Stage"
              placeholder="e.g. 1 year 2 months"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
            />

            <Input
              label="Emergency Phone"
              placeholder="e.g. +91 9876543210"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Appointment Date"
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Available Time Slot
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
              Symptoms / Reason for Visit (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe any visible symptoms, vomiting, scratching, or vaccination history..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400">Total Consultation Fee</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(service.price)}</p>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading} className="rounded-full bg-teal-600 hover:bg-teal-700 text-white">
                Confirm Booking
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
