import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { restaurantAPI } from '../services/api';
import {
  MapPin,
  Phone,
  Globe,
  ArrowLeft,
  Star,
  Award,
  Clock,
  Navigation,
  Calendar,
} from 'lucide-react';
import PremiumDishCard from '../components/Dishes/PremiumDishCard';
import SkeletonCard from '../components/UI/SkeletonCard';
import Toast from '../components/UI/Toast';
import ReservationModal from '../components/Reservations/ReservationModal';
import { mockRestaurantDetails } from '../data/mockRestaurantDetails';
import { mockDishes } from '../data/mockDishes';
import { getImageUrl, localizeValue } from '../utils/helpers';

const RestaurantDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [reservationOpen, setReservationOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Try to fetch from API first
      try {
        const response = await restaurantAPI.getById(id);
        if (response.data) {
          setRestaurant(response.data);
          setDishes(response.data.dishes || []);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to mock
      }

      // Mock fallback
      if (mockRestaurantDetails[id]) {
        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        const detail = mockRestaurantDetails[id];
        const canonicalDishes = Object.values(mockDishes).filter(
          (dish) => dish.restaurant?._id === id
        );
        setRestaurant(detail);
        setDishes(canonicalDishes);
      } else {
        // Handle not found
      }
    } catch (error) {
      setToast({ show: true, message: t('restaurantDetail.loadErrorToast'), type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-dark-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('restaurantDetail.notFound')}
          </h2>
          <Link to="/restaurants" className="text-gold-500 hover:underline">
            {t('restaurantDetail.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pb-24 md:pb-0">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {restaurant.coverImage ? (
          <img
            src={getImageUrl(restaurant.coverImage)}
            alt={
              restaurant.coverImageAlt ||
              restaurant.imageAlt ||
              localizeValue(restaurant.name, i18n.language)
            }
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-white/20 text-4xl font-display">FoodApp</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/restaurants"
            className="inline-flex items-center text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('restaurantDetail.back')}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8"
          >
            <div className="relative">
              <img
                src={getImageUrl(restaurant.logo) || '/default-restaurant.jpg'}
                alt={restaurant.imageAlt || localizeValue(restaurant.name, i18n.language)}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white/20 shadow-xl object-cover bg-white"
              />
              <div className="absolute -bottom-3 -right-3 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                {restaurant.rating?.average
                  ? restaurant.rating.average.toFixed(1)
                  : t('common.new')}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-3 leading-tight">
                {localizeValue(restaurant.name, i18n.language)}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-cream-100 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  {localizeValue(restaurant.address?.city, i18n.language)},{' '}
                  {restaurant.address?.street}
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold-400" />
                  {localizeValue(restaurant.cacherout, i18n.language)}
                </div>
                {restaurant.priceRange && (
                  <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-gold-400 font-semibold">
                    {restaurant.priceRange}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content - Menu */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-gold-500 rounded-full mr-3"></span>
              {t('restaurantDetail.menu')}
            </h2>

            {dishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dishes.map((dish, index) => (
                  <motion.div
                    key={dish._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PremiumDishCard dish={dish} showToast={showToast} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">{t('restaurantDetail.noDishes')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Info */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {t('restaurantDetail.about')}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {localizeValue(restaurant.description, i18n.language)}
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-6">
              <a
                href={`tel:${restaurant.phone}`}
                aria-label={`${t('restaurantDetail.cta.call')} ${localizeValue(restaurant.name, i18n.language)}`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full transition-all shadow-xl shadow-gold-500/20"
              >
                <Phone className="w-5 h-5" />
                {t('restaurantDetail.cta.call')}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.address?.street || ''} ${restaurant.address?.city || ''}`.trim())}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('restaurantDetail.cta.directions')} ${localizeValue(restaurant.name, i18n.language)}`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-dark-900 hover:bg-gray-800 text-white font-bold rounded-full transition-all shadow-lg"
              >
                <Navigation className="w-5 h-5" />
                {t('restaurantDetail.cta.directions')}
              </a>
              <button
                type="button"
                onClick={() => setReservationOpen(true)}
                aria-label={`${t('restaurantDetail.cta.reserve')} ${localizeValue(restaurant.name, i18n.language)}`}
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white font-bold rounded-full transition-all"
              >
                <Calendar className="w-5 h-5" />
                {t('restaurantDetail.cta.reserve')}
              </button>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 border border-dark-900 dark:border-gray-500 text-dark-900 dark:text-white hover:bg-dark-900 hover:text-white font-bold rounded-full transition-all"
              >
                <Globe className="w-5 h-5" />
                {t('restaurantDetail.cta.contact')}
              </Link>
            </div>

            <div className="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-6">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <div className="w-10 h-10 rounded-full bg-cream-50 dark:bg-gray-700 flex items-center justify-center text-gold-500 dark:text-gold-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">
                    {t('restaurantDetail.info.phone')}
                  </span>
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="hover:text-gold-600 transition-colors"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </div>

              {restaurant.website && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <div className="w-10 h-10 rounded-full bg-cream-50 dark:bg-gray-700 flex items-center justify-center text-gold-500 dark:text-gold-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">
                      {t('restaurantDetail.info.website')}
                    </span>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-600 transition-colors truncate max-w-[200px] block"
                    >
                      {t('restaurantDetail.info.visitWebsite')}
                    </a>
                  </div>
                </div>
              )}

              {restaurant.openingHours && (
                <div className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                  <div className="w-10 h-10 rounded-full bg-cream-50 dark:bg-gray-700 flex items-center justify-center text-gold-500 dark:text-gold-400 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">
                      {t('restaurantDetail.info.hours')}
                    </span>
                    <ul className="text-sm space-y-1">
                      <li>{t('restaurantDetail.info.opening.sunThu')}</li>
                      <li>{t('restaurantDetail.info.opening.fri')}</li>
                      <li>{t('restaurantDetail.info.opening.sat')}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                {t('restaurantDetail.info.cuisines')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine?.map((cuisine, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cream-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={hideToast} />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        restaurant={restaurant}
      />
    </div>
  );
};

export default RestaurantDetail;
