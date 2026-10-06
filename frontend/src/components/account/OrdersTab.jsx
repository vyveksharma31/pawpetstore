import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ExternalLink, Clock, CheckCircle2, Truck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';

export default function OrdersTab({ orders = [] }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return (
          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="w-3 h-3" />
            Shipped
          </span>
        );
      default:
        return (
          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {status || 'Confirmed'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order History</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
          Review your completed purchases, active shipments, and delivery invoices.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-slate-50 dark:bg-zinc-900/40 rounded-3xl p-12 text-center border border-slate-100 dark:border-zinc-800 space-y-3">
          <Package className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">No Orders Placed Yet</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Your shopping bags are waiting! Explore our premium nutrition and pet supplies today.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button size="sm" className="rounded-full">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 bg-white dark:bg-zinc-950 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{order.orderNumber}</span>
                  <span className="text-slate-400 dark:text-zinc-500 ml-2">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {getStatusBadge(order.orderStatus)}
              </div>

              {/* Order Items */}
              <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-zinc-200">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Summary Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 dark:text-zinc-400">
                  Paid via: <strong className="uppercase font-semibold text-slate-700 dark:text-zinc-300">{order.paymentMethod || 'COD'}</strong>
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Order Total:</span>
                  <strong className="text-base font-black text-slate-900 dark:text-white">
                    {formatCurrency(order.totalAmount)}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
