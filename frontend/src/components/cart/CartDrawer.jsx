import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';
import ImageWithFallback from '../common/ImageWithFallback';

export default function CartDrawer() {
  const { 
    items, 
    itemCount, 
    subtotal, 
    shippingFee, 
    totalAmount, 
    freeShippingThreshold, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-black text-slate-800 dark:text-zinc-100 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-100 dark:border-zinc-800">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Pet Cart ({itemCount})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-brand-50/70 dark:bg-brand-950/40 p-3 sm:px-6 border-b border-brand-100 dark:border-brand-900/40">
              <div className="flex items-center gap-2 text-xs font-medium text-brand-800 dark:text-brand-300 mb-1.5">
                <Truck className="w-4 h-4 text-brand-500" />
                {freeShippingLeft === 0 ? (
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">🎉 Congratulations! You have unlocked FREE Shipping!</span>
                ) : (
                  <span>Add <strong className="font-bold">{formatCurrency(freeShippingLeft)}</strong> more for <strong>FREE Delivery</strong></span>
                )}
              </div>
              <div className="w-full bg-brand-200/60 dark:bg-brand-900/60 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xs">
                    Looks like you haven't added anything yet. Explore nutritious food, toys, and accessories for your pet!
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                  className="rounded-full"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-950 hover:border-slate-200 dark:hover:border-zinc-700 transition-colors">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link 
                          to={`/products/${item.productId || item.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-semibold text-slate-800 dark:text-zinc-100 hover:text-brand-600 dark:hover:text-brand-400 line-clamp-2 leading-snug"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(item.price)}</span>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-zinc-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-brand-600 dark:text-brand-400 text-base">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  size="lg" 
                  className="w-full gap-2 shadow-lg shadow-brand-500/25"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full text-center text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white py-1 transition-colors"
                >
                  View Detailed Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
