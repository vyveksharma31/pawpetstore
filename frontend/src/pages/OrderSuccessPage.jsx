import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home, Calendar, Truck } from 'lucide-react';
import { api } from '../services/api';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await api.get(`/orders/${orderId}`);
        if (res.success && res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        // Fallback for demo
      }
    }
    loadOrder();
  }, [orderId]);

  return (
    <div className="bg-slate-50 dark:bg-black py-16 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4">
        
        <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-soft p-8 sm:p-10 text-center space-y-6">
          
          {/* Animated Success Badge */}
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
              Order Confirmed & Processing
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Your pet's favorite essentials have been dispatched to our fulfillment queue.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 p-4 text-xs space-y-2.5 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">Order Reference:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{orderId}</strong>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">Estimated Delivery:</span>
              <span className="text-slate-800 dark:text-zinc-200 font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-500" />
                <span>3 - 4 Business Days</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">Payment Status:</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Confirmed / Cash on Delivery
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/products" className="flex-1">
              <Button size="lg" className="w-full gap-2 shadow-lg shadow-brand-500/20">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/account?tab=orders" className="flex-1">
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Package className="w-4 h-4" />
                <span>View in Account</span>
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
