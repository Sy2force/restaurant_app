import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dishAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Heart, MapPin, Star, ArrowLeft, Share2, Award, Clock, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Toast from '../components/UI/Toast';
import SkeletonCard from '../components/UI/SkeletonCard';
import { mockDishes } from '../data/mockDishes';
import { getImageUrl } from '../utils/helpers';

const DishDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();
  const [moreDishes, setMoreDishes] = useState([]);
  const [dish, setDish] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(true);

  const fetchDish = useCallback(async () => {
    try {
      // Check if it's a mock ID first
      if (mockDishes[id]) {
        // Simulate loading delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDish(mockDishes[id]);
        return;
      }

      const response = await dishAPI.getById(id);
      setDish(response.data);
    } catch (error) {
      // fallback to first mock dish if ID fails but looks somewhat valid or just error
      setToast({ show: true, message: t('dishDetail.loadError'), type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchMoreDishes = useCallback(async () => {
    if (!dish || !dish.restaurant) return;

    // In a real app, this would be an API call like: dishAPI.getByRestaurant(dish.restaurant._id)
    // For now, we mock it using random ones but ensure they don't have IDs that collide with the current dish
    const mockDishes = [
      {
        _id: '901',
        name: 'Salade Fatoush',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787',
        price: 42,
        cacherout: dish.cacherout,
        rating: { average: 4.6, count: 85 },
      },
      {
        _id: '902',
        name: "Kebab d'Agneau",
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787',
        price: 68,
        cacherout: dish.cacherout,
        rating: { average: 4.8, count: 120 },
      },
      {
        _id: '903',
        name: 'Chou-fleur Rôti',
        image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2940',
        price: 35,
        cacherout: dish.cacherout,
        rating: { average: 4.7, count: 95 },
      },
      {
        _id: '904',
        name: 'Poulet Grillé',
        image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=2925',
        price: 40,
        cacherout: dish.cacherout,
        rating: { average: 4.5, count: 80 },
      },
      {
        _id: '905',
        name: 'Tarte aux Fruits',
        image: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?q=80&w=2942',
        price: 30,
        cacherout: dish.cacherout,
        rating: { average: 4.4, count: 70 },
      },
    ];
    setMoreDishes(mockDishes.filter((d) => d._id !== id));
  }, [dish, id]);

  useEffect(() => {
    fetchDish();
  }, [fetchDish]);

  useEffect(() => {
    if (dish && dish.restaurant) {
      fetchMoreDishes();
    }
  }, [dish, fetchMoreDishes]);

  // Mock function for like - real implementation would call API
  const handleLike = async () => {
    if (!isAuthenticated) {
      setToast({ show: true, message: t('common.loginToLike'), type: 'info' });
      return;
    }

    try {
      // await dishAPI.like(id); // Assuming this endpoint exists
      setIsLiked(!isLiked);
      setToast({ show: true, message: isLiked ? t('common.unliked') : t('common.liked'), type: 'success' });
    } catch (error) {
      // Error liking dish
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setToast({ show: true, message: t('common.linkCopied'), type: 'success' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-dark-900 py-20 px-4 pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex items-center justify-center pb-24 md:pb-0">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('dishDetail.notFound')}
          </h2>
          <Link to="/dishes" className="text-gold-500 hover:underline">
            {t('dishDetail.backList')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pb-24 md:pb-0">
      {/* Hero Banner for Dish */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={getImageUrl(dish.image)}
          alt={dish.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        <div className="absolute top-28 left-4 md:left-8 z-20">
          <Link
            to="/dishes"
            className="inline-flex items-center text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5 ms-2 rtl:mr-2 rtl:ms-0 rtl:rotate-180" />
            {t('dishDetail.backMenu')}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-gold-500 text-white text-sm font-bold rounded-full shadow-lg">
                {dish.category}
              </span>
              <span className="px-4 py-1.5 bg-olive-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                <Award className="w-4 h-4" />
                {dish.cacherout}
              </span>
              {dish.isVegetarian && (
                <span className="px-4 py-1.5 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
                  {t('dishDetail.badges.vegetarian')}
                </span>
              )}
              {dish.isVegan && (
                <span className="px-4 py-1.5 bg-green-700 text-white text-sm font-bold rounded-full shadow-lg">
                  {t('dishDetail.badges.vegan')}
                </span>
              )}
              {dish.isGlutenFree && (
                <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                  {t('dishDetail.badges.glutenFree')}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight break-words">
              {dish.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-cream-100 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-400" />
                {dish.region}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-400" />
                {dish.season}
              </div>
              {dish.rating?.average > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <span className="font-semibold">{dish.rating.average.toFixed(1)}</span>
                  <span className="text-sm opacity-80">
                    ({dish.rating.count} {t('common.reviews')})
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
              <span className="text-4xl font-display font-bold text-gold-500">₪{dish.price}</span>
              <div className="flex gap-3">
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-full transition-all shadow-md ${
                    isLiked
                      ? 'bg-red-50 text-red-500'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full transition-all shadow-md"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {t('dishDetail.about')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {dish.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-cream-50 dark:bg-gray-700 rounded-2xl text-center">
                <span className="block text-olive-600 font-bold text-sm uppercase mb-1">
                  {t('dishDetail.badges.type')}
                </span>
                <span className="font-display font-semibold text-gray-900 dark:text-white">
                  {dish.category}
                </span>
              </div>
              <div className="p-4 bg-cream-50 dark:bg-gray-700 rounded-2xl text-center">
                <span className="block text-olive-600 font-bold text-sm uppercase mb-1">
                  {t('dishDetail.badges.region')}
                </span>
                <span className="font-display font-semibold text-gray-900 dark:text-white">
                  {dish.region}
                </span>
              </div>
              <div className="p-4 bg-cream-50 dark:bg-gray-700 rounded-2xl text-center">
                <span className="block text-olive-600 font-bold text-sm uppercase mb-1">
                  {t('dishDetail.badges.season')}
                </span>
                <span className="font-display font-semibold text-gray-900 dark:text-white">
                  {dish.season}
                </span>
              </div>
              <div className="p-4 bg-cream-50 dark:bg-gray-700 rounded-2xl text-center">
                <span className="block text-olive-600 font-bold text-sm uppercase mb-1">
                  {t('dishDetail.badges.vegetarian')}
                </span>
                <span className="font-display font-semibold text-gray-900 dark:text-white">
                  {dish.isVegetarian ? t('dishDetail.badges.yes') : t('dishDetail.badges.no')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar / Restaurant Info */}
        <div className="lg:col-span-1">
          {dish.restaurant && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24"
            >
              <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-gold-500 rounded-full ms-3 rtl:mr-3 rtl:ms-0"></span>
                {t('dishDetail.proposedBy')}
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={getImageUrl(dish.restaurant.logo)}
                  alt={dish.restaurant.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940';
                  }}
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {dish.restaurant.name}
                  </h4>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 ms-1 rtl:mr-1 rtl:ms-0" />
                    {dish.restaurant.address?.city || dish.restaurant.city}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {dish.restaurant.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t('dishDetail.cacherout')}</span>
                  <span className="font-semibold text-gold-500">{dish.restaurant.cacherout}</span>
                </div>
              </div>

              <Link
                to={dish.restaurant?._id ? `/restaurants/${dish.restaurant._id}` : '/restaurants'}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold-500 hover:bg-gold-600 text-white text-center font-bold rounded-full transition-all shadow-lg shadow-gold-500/20"
              >
                <Store className="w-5 h-5" />
                {t('dishDetail.viewRestaurant')}
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* More from this restaurant section */}
      {moreDishes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8"
          >
            {t('dishDetail.moreFrom', { name: dish.restaurant?.name })}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreDishes.map((moreDish, index) => (
              <motion.div
                key={moreDish._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Simplified card or reuse PremiumDishCard with overrides */}
                <Link to={`/dishes/${moreDish._id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(moreDish.image)}
                        alt={moreDish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                        {moreDish.rating.average} ★
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {moreDish.name}
                      </h4>
                      <p className="text-gold-500 font-bold">₪{moreDish.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default DishDetail;
