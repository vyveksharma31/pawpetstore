import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Calendar,
  MapPin,
  Heart,
  LogOut,
  Shield,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';
import ProfileTab from '../components/account/ProfileTab';
import OrdersTab from '../components/account/OrdersTab';
import AppointmentsTab from '../components/account/AppointmentsTab';
import AddressesTab from '../components/account/AddressesTab';
import WishlistTab from '../components/account/WishlistTab';
import { PageLoader } from '../components/common/Loader';

export default function AccountPage() {
  const { user, logout, updateUser, isAdmin } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(tabParam);

  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        if (activeTab === 'orders' && orders.length === 0) {
          const res = await api.get('/orders/my-orders');
          if (res.success && res.data) setOrders(res.data);
        } else if (activeTab === 'appointments' && appointments.length === 0) {
          const res = await api.get('/clinic/appointments/my-appointments');
          if (res.success && res.data) setAppointments(res.data);
        }
      } catch (err) {
        console.error('Failed to load user portal data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, [activeTab]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen py-10 text-slate-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Customer Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Manage your orders, veterinary consultations, shipping addresses, and favorites.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-600/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Card */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100 dark:border-zinc-800">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-brand-500/20">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">{user?.name}</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">{user?.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {user?.role || 'Customer'}
                  </span>
                  {isAdmin && (
                    <span className="inline-block bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Admin Access
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => handleTabChange('profile')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Profile Overview</span>
                </div>
              </button>

              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Order History</span>
                </div>
                {orders.length > 0 && (
                  <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-bold">
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabChange('appointments')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  activeTab === 'appointments'
                    ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>Vet Appointments</span>
                </div>
                {appointments.length > 0 && (
                  <span className="text-[10px] bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-full text-teal-800 dark:text-teal-300 font-bold">
                    {appointments.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabChange('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                {(user?.addresses?.length || 0) > 0 && (
                  <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-bold">
                    {user.addresses.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabChange('wishlist')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  activeTab === 'wishlist'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist Items</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full text-rose-700 dark:text-rose-300 font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-2xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Account</span>
              </button>
            </div>
          </div>

          {/* Right Content Tab */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
            {loading ? (
              <div className="py-16">
                <PageLoader />
              </div>
            ) : (
              <>
                {activeTab === 'profile' && (
                  <ProfileTab user={user} onUserUpdated={updateUser} />
                )}

                {activeTab === 'orders' && (
                  <OrdersTab orders={orders} />
                )}

                {activeTab === 'appointments' && (
                  <AppointmentsTab appointments={appointments} />
                )}

                {activeTab === 'addresses' && (
                  <AddressesTab user={user} onUserUpdated={updateUser} />
                )}

                {activeTab === 'wishlist' && (
                  <WishlistTab />
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
