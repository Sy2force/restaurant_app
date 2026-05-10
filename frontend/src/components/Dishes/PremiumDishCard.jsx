import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Share2, MapPin, Star, Award } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { likeAPI, authAPI } from '../../services/api';
import { getImageUrl, localizeValue } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

const PremiumDishCard = ({ dish, onLike, onFavorite, onShare, showToast }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(dish.rating?.count || 0);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await likeAPI.toggleLike('dishes', dish._id);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      onLike?.(dish._id);
      showToast?.(response.data.liked ? t('common.liked') : t('common.unliked'), 'success');
    } catch {
      showToast?.(t('common.errorLike'), 'error');
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorited) {
        await authAPI.removeFromFavorites('dishes', dish._id);
        setIsFavorited(false);
        showToast?.(t('common.removedFromFavorites'), 'info');
      } else {
        await authAPI.addToFavorites('dishes', dish._id);
        setIsFavorited(true);
        showToast?.(t('common.addedToFavorites'), 'success');
      }
      onFavorite?.(dish._id);
    } catch {
      showToast?.(t('common.errorFavorite'), 'error');
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/dishes/${dish._id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => showToast?.(t('common.linkCopied'), 'success'))
        .catch(() => showToast?.(url, 'info'));
    } else {
      showToast?.(url, 'info');
    }
    onShare?.(dish._id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="bg-cream-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-gold-500/30">
        <div className="relative">
          <Link
            to={`/dishes/${dish._id}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <div className="relative h-64 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src={getImageUrl(dish.image)}
                alt={dish.imageAlt || localizeValue(dish.name, i18n.language)}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 start-3 flex gap-2">
                <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {localizeValue(dish.cacherout, i18n.language)}
                </span>
                {dish.isVegetarian && (
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-md">
                    {localizeValue('Végétarien', i18n.language)}
                  </span>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-gold-400 transition-colors line-clamp-1">
                  {localizeValue(dish.name, i18n.language)}
                </h3>
                <p className="text-cream-100 text-sm flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {localizeValue(dish.restaurant?.name, i18n.language) ||
                    t('common.restaurant')} • {localizeValue(dish.region, i18n.language)}
                </p>
              </div>
            </div>
          </Link>

          <div className="absolute top-3 end-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              aria-label={t('common.likeDish')}
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
                }`}
                aria-hidden="true"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              aria-label={t('common.saveDish')}
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isFavorited ? 'fill-gold-500 text-gold-500' : 'text-gray-600 dark:text-gray-300'
                }`}
                aria-hidden="true"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              aria-label={t('common.share')}
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-br from-white to-cream-50 dark:from-gray-800 dark:to-dark-900">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {localizeValue(dish.description, i18n.language)}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gold-600 dark:text-gold-400">
              ₪{dish.price}
            </span>
            {dish.rating?.average > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-gold-500 text-gold-500" aria-hidden="true" />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  {dish.rating.average.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>
                {likesCount} {t('common.likes')}
              </span>
            </div>
            <span className="px-3 py-1 bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-200 text-xs rounded-full font-medium">
              {localizeValue(dish.category, i18n.language)}
            </span>
          </div>

          <Link
            to={`/dishes/${dish._id}`}
            className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 py-3 font-semibold text-white shadow-md transition-all hover:from-gold-600 hover:to-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            {t('dishesPage.viewDish')}
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default PremiumDishCard;
