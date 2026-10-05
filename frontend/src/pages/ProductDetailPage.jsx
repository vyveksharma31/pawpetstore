import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Zap, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscount } from '../utils/formatCurrency';
import ImageWithFallback from '../components/common/ImageWithFallback';
import Button from '../components/common/Button';
import ProductCard from '../components/product/ProductCard';
import { PageLoader } from '../components/common/Loader';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const res = await api.get(`/products/${id}`);
        if (res.success && res.data) {
          setProduct(res.data.product);
          setRelated(res.data.related || []);
          setSelectedImage(0);
          setQuantity(1);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <PageLoader message="Fetching product specifications & stock..." />;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <span className="text-4xl">😿</span>
        <h2 className="text-xl font-bold text-slate-800">Pet Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          The requested product may have been archived or does not exist.
        </p>
        <Link to="/products">
          <Button variant="primary" className="rounded-full">Back to Product Catalog</Button>
        </Link>
      </div>
    );
  }

  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 dark:bg-black py-8 min-h-screen text-slate-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 mb-6 overflow-x-auto whitespace-nowrap pb-1">
          <Link to="/" className="hover:text-slate-800 dark:hover:text-zinc-200">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-zinc-700" />
          <Link to={`/products?petType=${product.petType}`} className="hover:text-slate-800 dark:hover:text-zinc-200 capitalize">
            {product.petType}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-zinc-700" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-800 dark:hover:text-zinc-200">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-zinc-700" />
          <span className="text-slate-700 dark:text-zinc-300 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Main Card */}
        <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xs p-6 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Active Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                <ImageWithFallback
                  src={product.images?.[selectedImage] || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {product.images?.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-brand-500 ring-2 ring-brand-500/20'
                          : 'border-slate-100 dark:border-zinc-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Purchase Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Stock Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-md">
                    {product.brand}
                  </span>

                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                      Only {product.stock} items left!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Rating & Review Counter */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 4.5)
                            ? 'fill-amber-400'
                            : 'text-slate-200 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">{product.rating || '4.8'}</span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    ({product.reviewCount || 120} verified customer reviews)
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(discountedPrice)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-base text-slate-400 dark:text-zinc-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        You save {formatCurrency(product.price - discountedPrice)}
                      </span>
                    </>
                  )}
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500 ml-auto font-medium">Inclusive of all taxes</span>
                </div>

                {/* Suitable Breeds Highlight */}
                {product.breedSuitability?.length > 0 && (
                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block mb-1.5">
                      Suitable Breeds:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.breedSuitability.map((b, i) => (
                        <span key={i} className="text-xs bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-medium px-2.5 py-1 rounded-lg">
                          🐾 {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-slate-900 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Buy Now */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    size="lg"
                    className="flex-1 gap-2 shadow-lg shadow-brand-500/20"
                  >
                    {added ? <Check className="w-5 h-5 text-white" /> : <ShoppingBag className="w-5 h-5" />}
                    <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    size="lg"
                    variant="secondary"
                    className="flex-1 gap-2 shadow-lg shadow-teal-600/20"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Instant Checkout</span>
                  </Button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'border-rose-200 bg-rose-50 text-rose-500'
                        : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-400 dark:text-zinc-400'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Delivery & Trust Highlights */}
              <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Free Express Delivery over ₹999</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>100% Genuine Guaranteed</span>
                </div>
              </div>

            </div>

          </div>

          {/* Tabbed Specifications Section */}
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-6 text-sm font-bold">
              {[
                { id: 'overview', label: 'Product Description' },
                { id: 'specs', label: 'Nutritional & Tech Specs' },
                { id: 'delivery', label: 'Shipping & Returns' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-500 text-brand-600'
                      : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              {activeTab === 'overview' && (
                <div className="space-y-4 max-w-3xl">
                  <p>{product.description}</p>
                  <p>
                    Formulated under strict veterinary supervision to ensure optimal bio-availability, high protein absorption, and essential micronutrient density.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="max-w-2xl">
                  <div className="divide-y divide-slate-100 dark:divide-zinc-800 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="flex px-4 py-3 text-xs">
                          <span className="w-1/3 font-bold text-slate-700 dark:text-zinc-300">{key}</span>
                          <span className="w-2/3 text-slate-600 dark:text-zinc-400">{val}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-xs text-slate-400 dark:text-zinc-500">Standard specifications apply.</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-3 max-w-2xl text-xs text-slate-600 dark:text-zinc-400">
                  <p>• Orders are dispatched within 24 hours from our regional climate-controlled fulfillment hub.</p>
                  <p>• Standard transit time: 2 to 4 business days across metro locations.</p>
                  <p>• Hassle-free 7-day return policy for unopened dry pet products and accessories.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Recommended Companions Also Loved
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((rel) => (
                <ProductCard key={rel.id || rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
