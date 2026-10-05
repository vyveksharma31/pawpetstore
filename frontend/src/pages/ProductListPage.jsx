import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, RotateCcw, PackageX } from 'lucide-react';
import { api } from '../services/api';
import FilterSidebar from '../components/catalog/FilterSidebar';
import SortDropdown from '../components/catalog/SortDropdown';
import ActiveFilterChips from '../components/catalog/ActiveFilterChips';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeletonGrid } from '../components/common/Loader';
import Button from '../components/common/Button';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedPetType, setSelectedPetType] = useState(searchParams.get('petType') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBreed, setSelectedBreed] = useState(searchParams.get('breed') || '');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state to URL params
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedPetType !== 'all') params.petType = selectedPetType;
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (selectedBreed) params.breed = selectedBreed;
    if (sortBy !== 'featured') params.sort = sortBy;
    if (page > 1) params.page = page;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedPetType, selectedCategory, selectedBreed, sortBy, page]);

  // Fetch Products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page,
          limit: 12,
          sort: sortBy,
        });

        if (selectedPetType && selectedPetType !== 'all') queryParams.append('petType', selectedPetType);
        if (selectedCategory && selectedCategory !== 'all') queryParams.append('category', selectedCategory);
        if (selectedBreed) queryParams.append('breed', selectedBreed);
        if (searchQuery) queryParams.append('search', searchQuery);
        if (maxPrice < 10000) queryParams.append('maxPrice', maxPrice);

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.success) {
          let items = res.data || [];
          if (selectedRating) {
            items = items.filter(p => p.rating >= selectedRating);
          }
          setProducts(items);
          setMeta(res.meta || { total: items.length, totalPages: 1 });
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedPetType, selectedCategory, selectedBreed, searchQuery, maxPrice, selectedRating, sortBy, page]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPetType('all');
    setSelectedCategory('all');
    setSelectedBreed('');
    setMaxPrice(10000);
    setSelectedRating(null);
    setSortBy('featured');
    setPage(1);
  };

  return (
    <div className="bg-slate-50 dark:bg-black py-8 min-h-screen text-slate-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-800 dark:text-zinc-200 font-semibold capitalize">
              {selectedPetType !== 'all' ? `${selectedPetType} Store` : 'All Products'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
                {selectedCategory !== 'all' ? selectedCategory : selectedPetType !== 'all' ? `${selectedPetType} Products` : 'All Pet Products'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Showing {products.length} of {meta.total || products.length} curated essentials
              </p>
            </div>

            {/* Actions: Mobile Filter Trigger & Sort Dropdown */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
              >
                <Filter className="w-3.5 h-3.5 text-brand-500" />
                <span>Filters</span>
              </button>

              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filter Sidebar (Desktop + Mobile Drawer) */}
          <div className="lg:col-span-3">
            <FilterSidebar
              selectedPetType={selectedPetType}
              setSelectedPetType={setSelectedPetType}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              onResetFilters={handleResetFilters}
              isOpenOnMobile={mobileFilterOpen}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>

          {/* Product Listing Main Area */}
          <div className="lg:col-span-9">
            
            {/* Active Filter Chips */}
            <ActiveFilterChips
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              petType={selectedPetType}
              onClearPetType={() => setSelectedPetType('all')}
              category={selectedCategory}
              onClearCategory={() => setSelectedCategory('all')}
              rating={selectedRating}
              onClearRating={() => setSelectedRating(null)}
              onResetAll={handleResetFilters}
            />

            {/* Loading / Results View */}
            {loading ? (
              <ProductSkeletonGrid count={8} />
            ) : products.length === 0 ? (
              /* Empty State */
              <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-12 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-3xl">
                  <PackageX className="w-10 h-10 text-slate-400 dark:text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching pet products found</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto mt-1">
                    Try adjusting your filters, clearing your search keywords, or selecting a broader category.
                  </p>
                </div>
                <Button onClick={handleResetFilters} variant="primary" className="rounded-full">
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  <span>Reset All Filters</span>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id || product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {meta.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400 px-4">
                      Page {page} of {meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= meta.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
