import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Award, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizeValue } from '../../utils/helpers';
import { getCarouselItems, imageOnError } from '../../data/images.registry';
import { featuredRestaurants } from '../../data/mockLandingData';

const safeRestaurants = getCarouselItems(featuredRestaurants, {
  maxItems: 6,
  type: 'restaurant',
});

const RestaurantsSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <section className="py-24 bg-dark-900 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            {t('landing.restaurants.title')}
          </h2>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            {t('landing.restaurants.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {safeRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={restaurant._safeImage}
                    alt={localizeValue(restaurant.name, i18n.language)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    onError={imageOnError('restaurant')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent" />

                  {restaurant.kosher && (
                    <div className="absolute top-4 start-4">
                      <span className="px-4 py-2 bg-gold-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {localizeValue(restaurant.kosher, i18n.language)}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {localizeValue(restaurant.name, i18n.language)}
                    </h3>
                    <div className="flex items-center justify-between text-cream-100">
                      {restaurant.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {localizeValue(restaurant.city, i18n.language)}
                        </span>
                      )}
                      {restaurant.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                          {restaurant.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {restaurant.cuisine && (
                    <p className="text-gray-400 mb-4">
                      {localizeValue(restaurant.cuisine, i18n.language)}
                    </p>
                  )}
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="flex min-h-11 w-full items-center justify-center rounded-full bg-gold-500 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                  >
                    {t('landing.restaurants.discover')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/restaurants"
              className="mx-auto flex min-h-11 w-fit items-center gap-2 rounded-full border-2 border-gold-500 px-8 py-4 text-lg font-semibold text-gold-500 transition-all duration-300 hover:bg-gold-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
            >
              {t('landing.restaurants.viewAll')}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RestaurantsSection;
