import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';
import ImageWithFallback from '../common/ImageWithFallback';

export default function ServiceCard({ service, onBook }) {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xs hover:shadow-soft-lg transition-all overflow-hidden flex flex-col justify-between">
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
            onClick={() => onBook(service)}
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
  );
}
