import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  Menu, 
  ChevronDown, 
  LogOut, 
  Package, 
  Calendar,
  Sparkles,
  Stethoscope,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

export default function Navbar({ onOpenMobileNav }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { location, setIsModalOpen } = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 shadow-xs transition-colors">
      {/* Top Banner */}
      <div className="bg-slate-900 dark:bg-zinc-950 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-brand-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded">NEW</span>
            <span className="hidden sm:inline">Free Express Shipping on all pet orders above ₹999! 🐕 🐈</span>
            <span className="sm:hidden">Free Delivery above ₹999!</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Location Selector */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-brand-400 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Deliver to: <strong className="text-white">{location.split(',')[0]}</strong></span>
            </button>

            <Link to="/clinic" className="hidden md:flex items-center gap-1 text-teal-300 hover:text-teal-200 font-medium">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Book Vet Appointment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileNav}
              className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 lg:hidden"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <span className="text-2xl leading-none">🐾</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight leading-none">
                  Paw<span className="text-brand-500">Pet</span>Store
                </span>
                <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 tracking-wider uppercase mt-0.5">
                  Care • Commerce • Wellness
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Desktop / Tablet) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search dog kibble, cat litter, bird cages, brands..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-900 focus:bg-white dark:focus:bg-black text-sm text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 rounded-full pl-11 pr-24 py-2.5 border border-transparent dark:border-zinc-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Clinic Link */}
            <Link
              to="/clinic"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100/80 dark:hover:bg-teal-900/40 px-3.5 py-2 rounded-full border border-teal-200/60 dark:border-teal-800/60 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Veterinary Care</span>
            </Link>

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all active:scale-95 border border-slate-200/80 dark:border-zinc-800"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode (Black)"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Account</span>
                    </Link>

                    <Link
                      to="/account?tab=orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      to="/account?tab=appointments"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Vet Appointments</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/40 hover:bg-amber-50 dark:hover:bg-amber-900/40 font-semibold transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-zinc-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex rounded-full dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 font-semibold text-sm flex items-center gap-2 border border-brand-200/40 dark:border-brand-800/40 transition-all active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="bg-brand-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 dark:border-zinc-900 py-2.5 text-sm font-medium text-slate-700 dark:text-zinc-300">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Home</Link>
            <Link to="/dogs" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5">
              <span>Dogs</span>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 rounded-full font-bold">Popular</span>
            </Link>
            <Link to="/cats" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Cats</Link>
            <Link to="/birds" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Birds</Link>
            <Link to="/products?category=accessories" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Accessories</Link>
            <Link to="/products" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">All Products</Link>
            <Link to="/clinic" className="text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Veterinary Care</span>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-zinc-400">
            <Link to="/about" className="hover:text-slate-800 dark:hover:text-zinc-200 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-slate-800 dark:hover:text-zinc-200 transition-colors">Contact Support</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
