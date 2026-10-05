import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { useLocation } from '../../context/LocationContext';
import { MapPin, Check } from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Bengaluru', pincode: '560001' },
  { name: 'Mumbai', pincode: '400001' },
  { name: 'Delhi NCR', pincode: '110001' },
  { name: 'Hyderabad', pincode: '500001' },
  { name: 'Chennai', pincode: '600001' },
  { name: 'Pune', pincode: '411001' },
  { name: 'Kolkata', pincode: '700001' },
];

export default function LocationModal() {
  const { location, setLocation, isModalOpen, setIsModalOpen } = useLocation();
  const [customCity, setCustomCity] = useState('');
  const [customPincode, setCustomPincode] = useState('');

  const handleSelectCity = (city, pincode) => {
    setLocation(`${city}, ${pincode}`);
    setIsModalOpen(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customCity.trim() && customPincode.trim()) {
      setLocation(`${customCity.trim()}, ${customPincode.trim()}`);
      setIsModalOpen(false);
      setCustomCity('');
      setCustomPincode('');
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Choose Delivery Location"
    >
      <div className="space-y-6">
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Select your city to check accurate delivery timelines and veterinary clinic availability.
        </p>

        {/* Popular Cities */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block mb-2">
            Popular Cities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_CITIES.map((city) => {
              const fullStr = `${city.name}, ${city.pincode}`;
              const isSelected = location === fullStr;

              return (
                <button
                  key={city.name}
                  onClick={() => handleSelectCity(city.name, city.pincode)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold'
                      : 'border-slate-200 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-brand-500' : 'text-slate-400 dark:text-zinc-500'}`} />
                    <span>{city.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Or enter custom pincode */}
        <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-4">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block">
            Or Enter Pincode & City
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="City (e.g. Jaipur)"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
            <Input
              placeholder="6-digit Pincode"
              maxLength={6}
              value={customPincode}
              onChange={(e) => setCustomPincode(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!customCity.trim() || customPincode.trim().length < 6}
          >
            Apply Location
          </Button>
        </form>
      </div>
    </Modal>
  );
}
