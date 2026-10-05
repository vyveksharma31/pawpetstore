import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 dark:text-zinc-400 mt-auto border-t border-slate-800 dark:border-zinc-900">
      {/* Trust Proposition Bar */}
      <div className="border-b border-slate-800/80 dark:border-zinc-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">100% Genuine Care</p>
              <p className="text-xs text-slate-400">Authentic food & medicine brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Free Express Delivery</p>
              <p className="text-xs text-slate-400">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Verified Vets on Call</p>
              <p className="text-xs text-slate-400">Experienced pet health specialists</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Pet Parent First</p>
              <p className="text-xs text-slate-400">Dedicated guidance & support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Paw<span className="text-brand-500">Pet</span>Store
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India’s premier integrated pet-commerce and veterinary care platform. Providing breed-specific nutrition, certified accessories, and clinical pet care tailored for your beloved companions.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span>101 Pet Paradise Tech Park, Indiranagar, Bengaluru, 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span>+91 98765 43210 (Mon-Sat, 9AM - 8PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>care@pawpetstore.com</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop By Pet</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/dogs" className="hover:text-brand-400 transition-colors">Dog Food & Kibble</Link></li>
              <li><Link to="/dogs" className="hover:text-brand-400 transition-colors">Puppy Toys & Chews</Link></li>
              <li><Link to="/cats" className="hover:text-brand-400 transition-colors">Cat Dry & Wet Food</Link></li>
              <li><Link to="/cats" className="hover:text-brand-400 transition-colors">Cat Litter & Trees</Link></li>
              <li><Link to="/birds" className="hover:text-brand-400 transition-colors">Bird Seeds & Perches</Link></li>
              <li><Link to="/products?category=accessories" className="hover:text-brand-400 transition-colors">Travel Crates & Beds</Link></li>
            </ul>
          </div>

          {/* Veterinary Services */}
          <div>
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-4">Clinic & Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">General Health Checkup</Link></li>
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">Puppy & Kitten Vaccination</Link></li>
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">Dental Hygiene & Scaling</Link></li>
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">Dermatology & Skin Care</Link></li>
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">Nutritional Diet Planning</Link></li>
              <li><Link to="/clinic" className="hover:text-teal-300 transition-colors">Emergency Triage</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company & Help</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Pet Parent Login</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 dark:border-zinc-900 py-6 px-4 text-xs text-slate-500 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PawPetStore. Built with ❤️ for pets & pet parents.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>UPI Instant</span>
            <span>•</span>
            <span>Debit / Credit Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
