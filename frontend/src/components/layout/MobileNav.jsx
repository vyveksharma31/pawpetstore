import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, User, Package, Calendar, Stethoscope, Heart, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

export default function MobileNav({ isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-black shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300 border-r border-slate-100 dark:border-zinc-800">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-extrabold text-xl text-slate-900 dark:text-white">
              Paw<span className="text-brand-500">Pet</span>Store
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-600">Join PawPetStore for tailored pet care!</p>
              <div className="flex gap-2">
                <Link to="/login" onClick={onClose} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={onClose} className="flex-1">
                  <Button size="sm" className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shop Pet Categories</p>
          
          <Link
            to="/dogs"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🐕</span>
              <span>Dogs & Puppies</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            to="/cats"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🐈</span>
              <span>Cats & Kittens</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            to="/birds"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🦜</span>
              <span>Birds & Parrots</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            to="/products?category=accessories"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🦴</span>
              <span>Supplies & Accessories</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            to="/products"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🛍️</span>
              <span>All Products</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <div className="pt-4 border-t border-slate-100">
            <p className="px-3 text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-2">Pet Health & Care</p>
            <Link
              to="/clinic"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-teal-50 text-teal-800 text-sm font-semibold mb-2"
            >
              <div className="flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>Book Vet Care</span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-600" />
            </Link>
          </div>

          {isAuthenticated && (
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">My Account</p>
              <Link to="/account" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </Link>
              <Link to="/account?tab=orders" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <Package className="w-4 h-4 text-slate-400" />
                <span>My Orders</span>
              </Link>
              <Link to="/account?tab=appointments" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>My Appointments</span>
              </Link>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 space-y-1 text-sm text-slate-600">
            <Link to="/about" onClick={onClose} className="block p-3 hover:text-slate-900">About PawPetStore</Link>
            <Link to="/contact" onClick={onClose} className="block p-3 hover:text-slate-900">Contact & Support</Link>
          </div>
        </div>

        {/* Drawer Footer */}
        {isAuthenticated && (
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
