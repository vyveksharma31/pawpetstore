import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';
import ImageWithFallback from '../common/ImageWithFallback';
import Badge from '../common/Badge';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const productId = product.id || product._id;
  const isWishlisted = isInWishlist(productId);
  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200/80 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-soft-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <Link to={`/products/${productId}`} className="relative block aspect-square bg-slate-50 dark:bg-zinc-900 overflow-hidden">
        <ImageWithFallback
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors backdrop-blur-md ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 dark:bg-zinc-900/80 text-slate-400 dark:text-zinc-400 hover:text-rose-500 hover:bg-white dark:hover:bg-zinc-800'
          }`}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-zinc-200 bg-slate-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded-md border border-slate-100 dark:border-zinc-800">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating || '4.5'}</span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal">({product.reviewCount || 0})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/products/${productId}`}
            className="text-sm font-semibold text-slate-800 dark:text-zinc-100 hover:text-brand-600 dark:hover:text-brand-400 line-clamp-2 leading-snug transition-colors mb-2"
          >
            {product.name}
          </Link>

          {/* Stock Availability indicator */}
          {isLowStock && (
            <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mb-2">
              ⚠️ Only {product.stock} items left in stock!
            </p>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-slate-400 dark:text-zinc-500 line-through font-normal">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : isOutOfStock
                ? 'bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-600 cursor-not-allowed'
                : 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow'
            }`}
            title="Add to Cart"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
