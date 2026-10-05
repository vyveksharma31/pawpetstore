import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import ImageWithFallback from '../components/common/ImageWithFallback';
import Button from '../components/common/Button';

export default function CartPage() {
  const { 
    items, 
    itemCount, 
    subtotal, 
    shippingFee, 
    totalAmount, 
    freeShippingThreshold, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const finalPayable = Math.max(0, totalAmount - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'PAWFIRST') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "PAWFIRST" for 10% off!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100">
        <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-soft flex items-center justify-center text-4xl mb-6">
          🛒
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm mt-2 mb-6">
          You haven’t added any pet food, toys, or supplies to your shopping cart yet.
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-full gap-2 shadow-lg shadow-brand-500/20">
            <span>Explore All Pet Products</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-black py-10 min-h-screen text-slate-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Review your selections before proceeding to checkout</p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-600 hover:text-red-700 self-start sm:self-auto flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-4 mb-8 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            {freeShippingLeft === 0 ? (
              <p className="text-xs font-bold text-emerald-700">
                🎉 Awesome! Your order qualifies for FREE Express Delivery!
              </p>
            ) : (
              <p className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                Add <strong className="font-bold text-brand-600">{formatCurrency(freeShippingLeft)}</strong> more to your cart to unlock <strong>FREE Express Shipping</strong>!
              </p>
            )}
          </div>
        </div>

        {/* Main Grid: Cart Items & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shrink-0">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <Link
                    to={`/products/${item.productId || item.id}`}
                    className="block text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-1 mt-0.5"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Pet: <span className="capitalize">{item.petType}</span></p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-slate-400 dark:text-zinc-500 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-zinc-900">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-800 dark:text-zinc-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white sm:hidden">
                      Total: {formatCurrency(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 dark:text-zinc-500 hover:text-red-500 p-1 transition-colors"
                      title="Remove from Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping For Other Pets</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-3">
              <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider block">
                Have a Promo Code?
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try 'PAWFIRST'"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs uppercase font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <Button type="submit" variant="outline" size="sm">Apply</Button>
              </form>
              {couponApplied && (
                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon PAWFIRST applied: 10% discount!</span>
                </p>
              )}
              {couponError && <p className="text-xs text-red-500">{couponError}</p>}
            </div>

            {/* Calculations Card */}
            <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Cart Items ({itemCount})</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (10%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-xl text-brand-600">{formatCurrency(finalPayable)}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                size="lg"
                className="w-full gap-2 shadow-lg shadow-brand-500/25"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="pt-2 text-[11px] text-slate-400 dark:text-zinc-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Safe & Secure Checkout • Cash on Delivery Available</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
