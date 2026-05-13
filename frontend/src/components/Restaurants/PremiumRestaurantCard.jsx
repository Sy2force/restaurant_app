import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Award, Phone, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizeValue } from '../../utils/helpers';
import { getSafeImage, imageOnError } from '../../data/images.registry';

const PremiumRestaurantCard = ({ restaurant }) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-gold-500/30">
        <Link
          to={`/restaurants/${restaurant._id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <div className="relative h-72 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7 }}
              src={getSafeImage(
                restaurant.coverImage || restaurant.logo || restaurant.imageUrl,
                'restaurant'
              )}
              alt={restaurant.imageAlt || localizeValue(restaurant.name, i18n.language)}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={imageOnError('restaurant')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {restaurant.cacherout && (
              <div className="absolute top-4 start-4">
                <span className="px-4 py-2 bg-gold-500 text-white text-sm font-bold rounded-full shadow-xl flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {localizeValue(restaurant.cacherout, i18n.language)}
                </span>
              </div>
            )}

            {restaurant.rating?.average > 0 && (
              <div className="absolute top-4 end-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                <span className="font-bold text-gray-900">
                  {restaurant.rating.average.toFixed(1)}
                </span>
              </div>
            )}

            <div className="absolute bottom-0 start-0 end-0 p-6">
              <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-1">
                {localizeValue(restaurant.name, i18n.language)}
              </h3>
              {(restaurant.address?.city || restaurant.address?.street) && (
                <p className="flex items-center gap-2 text-cream-100 text-sm truncate max-w-full">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {[
                    localizeValue(restaurant.address?.city, i18n.language),
                    restaurant.address?.street,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              )}
            </div>
          </div>
        </Link>

        <div className="p-6 bg-gradient-to-br from-white to-cream-50 dark:from-gray-800 dark:to-dark-900">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {localizeValue(restaurant.description, i18n.language)}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.cuisine?.slice(0, 3).map((cuisine) => (
              <span
                key={cuisine}
                className="px-3 py-1 bg-olive-100 dark:bg-olive-900 text-olive-700 dark:text-olive-200 text-xs rounded-full font-medium"
              >
                {localizeValue(cuisine, i18n.language)}
              </span>
            ))}
          </div>

          {restaurant.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{restaurant.phone}</span>
            </div>
          )}

          <Link
            to={`/restaurants/${restaurant._id}`}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 py-3 font-semibold text-white shadow-md transition-all hover:from-gold-600 hover:to-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
            {t('restaurantsPage.viewDetails')}
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default PremiumRestaurantCard;
