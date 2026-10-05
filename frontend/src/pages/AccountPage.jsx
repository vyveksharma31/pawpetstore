import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Package, Calendar, MapPin, LogOut, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/common/Button';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (activeTab === 'orders') {
          const res = await api.get('/orders/my-orders');
          if (res.success && res.data) setOrders(res.data);
        } else if (activeTab === 'appointments') {
          const res = await api.get('/clinic/appointments/my-appointments');
          if (res.success && res.data) setAppointments(res.data);
        }
      } catch (err) {
        console.error('Failed to load user records:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeTab]);

  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen py-10 text-slate-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Card */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100 dark:border-zinc-800">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-brand-500/20">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">{user?.name}</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {user?.role || 'Customer'}
                </span>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Personal Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders History</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  activeTab === 'appointments'
                    ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-900/60'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Vet Appointments</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Content Tab */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">
                  Account Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-400 dark:text-zinc-500 block font-medium">Full Name</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{user?.name}</strong>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-400 dark:text-zinc-500 block font-medium">Registered Email</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{user?.email}</strong>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-400 dark:text-zinc-500 block font-medium">Phone Number</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{user?.phone || 'Not added'}</strong>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-400 dark:text-zinc-500 block font-medium">Account Role</span>
                    <strong className="text-slate-900 dark:text-white text-sm capitalize">{user?.role || 'Customer'}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">
                  Past Orders ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 dark:text-zinc-500 space-y-2">
                    <Package className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-700" />
                    <p className="text-xs">No orders placed yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord._id} className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-zinc-900/50 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{ord.orderNumber}</span>
                            <span className="text-slate-400 dark:text-zinc-500 ml-2">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {ord.orderStatus || 'Confirmed'}
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
                          {ord.items?.map((item, idx) => (
                            <div key={idx} className="py-1.5 flex justify-between">
                              <span className="text-slate-700 dark:text-zinc-300">{item.name} x {item.quantity}</span>
                              <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 dark:border-zinc-800 flex justify-between items-center text-xs">
                          <span className="text-slate-500 dark:text-zinc-400 font-medium">Paid via {ord.paymentMethod?.toUpperCase()}</span>
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">Total: {formatCurrency(ord.totalAmount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">
                  Veterinary Appointments ({appointments.length})
                </h3>

                {appointments.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 dark:text-zinc-500 space-y-2">
                    <Calendar className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-700" />
                    <p className="text-xs">No upcoming clinic appointments.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="border border-teal-100 dark:border-teal-900/50 rounded-2xl p-4 bg-teal-50/30 dark:bg-teal-950/20 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-teal-900 dark:text-teal-300">{apt.serviceName}</span>
                          <span className="bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {apt.status || 'Confirmed'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-300">
                          Pet: <strong>{apt.petName}</strong> ({apt.petType}) • Scheduled: <strong>{apt.date}</strong> at <strong>{apt.timeSlot}</strong>
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-zinc-500">Ref: {apt.bookingReference}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
