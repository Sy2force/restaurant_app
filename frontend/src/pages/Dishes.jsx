import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ChefHat, Flame, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dishAPI } from '../services/api';
import PremiumDishCard from '../components/Dishes/PremiumDishCard';
import StickyFilters from '../components/Dishes/StickyFilters';
import QuickActions from '../components/Dishes/QuickActions';
import SkeletonCard from '../components/UI/SkeletonCard';
import Toast from '../components/UI/Toast';
import Button from '../components/UI/Button';
import { getImageUrl } from '../utils/helpers';
import { mockDishes } from '../data/mockDishes';

const Dishes = () => {
  const { t } = useTranslation();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [featuredDishes, setFeaturedDishes] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchDishes = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setPage(1);
        } else {
          setLoadingMore(true);
        }

        let data = [];
        let apiSuccess = false;

        // Try API call
        try {
          const params = {
            limit: 12,
            page: reset ? 1 : page,
            ...filters,
          };
          const response = await dishAPI.getAll(params);
          if (response.data && response.data.dishes) {
            data = response.data.dishes;
            apiSuccess = true;
            setHasMore(response.data.dishes.length === 12);
          }
        } catch (apiError) {
          // API error
        }

        if (!apiSuccess) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          // Convert mockDishes object to array
          let filteredData = Object.values(mockDishes);

          if (filters.category) {
            filteredData = filteredData.filter((d) => d.category === filters.category);
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredData = filteredData.filter(
              (d) =>
                d.name.toLowerCase().includes(searchLower) ||
                d.description.toLowerCase().includes(searchLower) ||
                d.restaurant.name.toLowerCase().includes(searchLower)
            );
          }
          if (filters.cacherout) {
            filteredData = filteredData.filter((d) => d.cacherout === filters.cacherout);
          }
          if (filters.isVegetarian) {
            filteredData = filteredData.filter((d) => d.isVegetarian);
          }
          if (filters.region || filters.city) {
            const regionFilter = filters.region || filters.city;
            filteredData = filteredData.filter((d) => d.region === regionFilter);
          }
          data = filteredData;
          setHasMore(false);
        }

        if (reset) {
          const isDefaultView = Object.keys(filters).length === 0;
          if (isDefaultView && !apiSuccess) {
            const featuredSlice = Object.values(mockDishes).slice(0, 3);
            const featuredIds = new Set(featuredSlice.map((d) => d._id));
            setDishes(data.filter((d) => !featuredIds.has(d._id)));
          } else {
            setDishes(data);
          }
        } else {
          setDishes((prev) => {
            const existingIds = new Set(prev.map((item) => item._id));
            const newItems = data.filter((item) => !existingIds.has(item._id));
            return [...prev, ...newItems];
          });
        }
      } catch (error) {
        console.error('Erreur chargement plats:', error);
        showToast(t('dashboard.forms.errors.load'), 'error');
        setDishes(Object.values(mockDishes));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters, page]
  );

  useEffect(() => {
    fetchDishes(true);
    setFeaturedDishes(Object.values(mockDishes).slice(0, 3));
  }, [fetchDishes, filters]);

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

  const handleQuickFilter = (quickFilter) => {
    setFilters(quickFilter);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900">
      <div className="relative pt-32 pb-24 bg-gradient-to-r from-coffee-900 via-dark-900 to-coffee-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2940')] bg-cover bg-center bg-fixed opacity-30 mix-blend-overlay"></div>
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
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold tracking-wide text-sm uppercase">
                {t('dishesPage.hero.badge')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {t('dishesPage.hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500">
                {t('dishesPage.hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cream-200 max-w-3xl mx-auto font-light leading-relaxed">
              {t('dishesPage.hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        {!loading && featuredDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-900 rounded-full text-white shadow-lg">
                <ChefHat className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                {t('dishesPage.chefsChoice')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDishes.map((dish) => (
                <motion.div
                  key={`featured-${dish._id}`}
                  whileHover={{ y: -5 }}
                  className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer bg-white dark:bg-gray-800"
                >
                  <div className="absolute top-0 right-0 z-10 p-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-900 flex items-center gap-1 shadow-sm">
                      <Flame className="w-3 h-3" /> {t('dishesPage.trending')}
                    </div>
                  </div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={getImageUrl(dish.image)}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940';
                      }}
                    />
                  </div>
                  <div className="p-4 border-b-4 border-gold-500">
                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                      {dish.name}
                    </h3>
                    <p className="text-olive-600 text-sm font-medium flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> {dish.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <QuickActions onQuickFilter={handleQuickFilter} />

        <StickyFilters
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
        ) : dishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-cream-300"
          >
            <div className="bg-cream-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
              {t('dishesPage.noResults')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-light">
              {t('dishesPage.noResultsDesc')}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {dishes.map((dish, index) => (
                <motion.div
                  key={dish._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PremiumDishCard
                    dish={dish}
                    onLike={() => {}}
                    onFavorite={() => {}}
                    onShare={() => {}}
                    showToast={showToast}
                  />
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center pb-20">
                <Button
                  variant="outline"
                  onClick={() => fetchDishes(false)}
                  disabled={loadingMore}
                  className="px-10 py-4 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white transition-all duration-300 uppercase tracking-widest font-semibold text-sm"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ms-2 rtl:mr-2 rtl:ms-0" />
                      {t('common.loading')}
                    </>
                  ) : (
                    t('dishesPage.loadMore')
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

export default Dishes;
