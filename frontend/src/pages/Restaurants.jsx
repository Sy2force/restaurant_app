import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PremiumRestaurantCard from '../components/Restaurants/PremiumRestaurantCard';
import RestaurantStickyFilters from '../components/Restaurants/RestaurantStickyFilters';
import SkeletonCard from '../components/UI/SkeletonCard';
import Toast from '../components/UI/Toast';
import Button from '../components/UI/Button';
import { filterRestaurants } from '../services/restaurant.service';

const sortRestaurants = (items) =>
  [...items].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));

const Restaurants = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchRestaurants = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setPage(1);
        } else {
          setLoadingMore(true);
        }

        // Service layer: tries API first, falls back to mock automatically
        const data = await filterRestaurants(filters);
        const sorted = sortRestaurants(data);

        // Dedupe by _id then by coverImage to avoid visual duplicates
        const seenIds = new Set();
        const seenImages = new Set();
        const unique = sorted.filter((r) => {
          const id = r._id || r.slug;
          if (!id || seenIds.has(id)) return false;
          const img = r.coverImage || r.imageUrl || r.logo;
          if (img && seenImages.has(img)) return false;
          seenIds.add(id);
          if (img) seenImages.add(img);
          return true;
        });

        setHasMore(false); // single-page render with mock fallback
        if (reset) {
          setRestaurants(unique);
        } else {
          setRestaurants((prev) => {
            const existing = new Set(prev.map((item) => item._id));
            return [...prev, ...unique.filter((item) => !existing.has(item._id))];
          });
        }
      } catch {
        setRestaurants([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchRestaurants(true);
  }, [fetchRestaurants]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRestaurants(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      if (!value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900">
      <div className="relative pt-32 pb-24 bg-gradient-to-r from-coffee-900 via-dark-900 to-coffee-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940')] bg-cover bg-center bg-fixed opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-cream-50 dark:to-dark-900"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full mb-6 shadow-lg shadow-gold-500/20">
              <Store className="w-4 h-4" />
              <span className="font-semibold tracking-wide text-sm uppercase">
                {t('restaurantsPage.hero.badge')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {t('restaurantsPage.hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500">
                {t('restaurantsPage.hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cream-200 max-w-3xl mx-auto font-light leading-relaxed">
              {t('restaurantsPage.hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <RestaurantStickyFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeCount={activeFilterCount}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-cream-200"
          >
            <div className="bg-cream-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
              {t('restaurantsPage.noResults')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-light">
              {t('restaurantsPage.noResultsDesc')}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PremiumRestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center pb-24 md:pb-20">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-10 py-4 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white transition-all duration-300 uppercase tracking-widest font-semibold text-sm"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      {t('common.loading')}
                    </>
                  ) : (
                    t('restaurantsPage.loadMore')
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={hideToast} />
    </div>
  );
};

export default Restaurants;
