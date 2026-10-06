import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Stethoscope, Clock, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function AppointmentsTab({ appointments = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Veterinary Appointments</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Track booked consultations, vaccination schedules, and health records.
          </p>
        </div>

        <Link to="/clinic">
          <Button size="sm" variant="secondary" className="rounded-full gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Book New Appointment</span>
          </Button>
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-slate-50 dark:bg-zinc-900/40 rounded-3xl p-12 text-center border border-slate-100 dark:border-zinc-800 space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">No Appointments Scheduled</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Give your companion routine preventive care. Book certified veterinary consultations in just a few clicks.
          </p>
          <div className="pt-2">
            <Link to="/clinic">
              <Button size="sm" className="rounded-full bg-teal-600 hover:bg-teal-700 text-white">
                Explore Clinic Services
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt._id || apt.id}
              className="border border-teal-100 dark:border-teal-900/40 rounded-3xl p-5 bg-teal-50/20 dark:bg-zinc-950 shadow-xs hover:border-teal-300 dark:hover:border-teal-800 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-teal-100/60 dark:border-zinc-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{apt.serviceName}</h4>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
                    Ref: {apt.bookingReference}
                  </span>
                </div>
                <span className="bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {apt.status || 'Confirmed'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Pet Details</span>
                  <p className="font-bold text-slate-800 dark:text-zinc-200">
                    {apt.petName} <span className="font-normal text-slate-500 capitalize">({apt.petType})</span>
                  </p>
                  {apt.petAge && <p className="text-[11px] text-slate-400">Age: {apt.petAge}</p>}
                </div>

                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Schedule Time</span>
                  <p className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    <span>{apt.date} at {apt.timeSlot}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">Emergency Phone: {apt.ownerPhone}</p>
                </div>
              </div>

              {apt.notes && (
                <div className="p-3 bg-white/70 dark:bg-zinc-900/60 rounded-xl text-xs text-slate-600 dark:text-zinc-400 border border-slate-100 dark:border-zinc-800">
                  <strong className="text-slate-700 dark:text-zinc-300">Symptoms/Notes: </strong>
                  {apt.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
