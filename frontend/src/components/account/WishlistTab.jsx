import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';
import ImageWithFallback from '../common/ImageWithFallback';
import Button from '../common/Button';

export default function WishlistTab() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id || product._id);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 dark:border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Saved Wishlist</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Keep an eye on favorite nutrition, accessories, and pet toys.
          </p>
        </div>

        {items.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
            {items.length} {items.length === 1 ? 'item saved' : 'items saved'}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-slate-50 dark:bg-zinc-900/40 rounded-3xl p-12 text-center border border-slate-100 dark:border-zinc-800 space-y-3">
          <Heart className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Your Wishlist is Empty</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Tap the heart icon on any product to save it here for later.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button size="sm" className="rounded-full gap-1.5">
                <span>Explore Pet Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((prod) => {
            const prodId = prod.id || prod._id;
            const finalPrice = calculateDiscount(prod.price, prod.discountPercentage);
            const isOutOfStock = prod.stock <= 0;

            return (
              <div
                key={prodId}
                className="bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-50 dark:bg-zinc-900 overflow-hidden">
                    <ImageWithFallback
                      src={prod.images?.[0] || prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(prodId)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-400 hover:text-red-600 transition-colors shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-1.5">
                    {prod.brand && (
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">
                        {prod.brand}
                      </span>
                    )}
                    <Link
                      to={`/products/${prodId}`}
                      className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {prod.name}
                    </Link>

                    <div className="flex items-center gap-2 pt-1">
                      <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(finalPrice)}
                      </strong>
                      {prod.discountPercentage > 0 && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatCurrency(prod.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Button
                    size="sm"
                    onClick={() => handleMoveToCart(prod)}
                    disabled={isOutOfStock}
                    className="w-full rounded-2xl gap-1.5 text-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isOutOfStock ? 'Out of Stock' : 'Move to Bag'}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
