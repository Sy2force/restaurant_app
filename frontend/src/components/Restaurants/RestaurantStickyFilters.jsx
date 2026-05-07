import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CITIES, CACHEROUT, CUISINES, PRICE_RANGES } from '../../utils/constants';

const RestaurantStickyFilters = ({ filters, onFilterChange, onClearFilters, activeCount }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-20 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-lg rounded-2xl mb-8"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {t('filters.title')}
            {activeCount > 0 && (
              <span className="px-2 py-0.5 bg-gold-500 text-white rounded-full text-xs">
                {activeCount}
              </span>
            )}
          </button>
          {activeCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gold-600 hover:text-gold-700 dark:text-gold-400 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              {t('filters.clearAll')}
            </button>
          )}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.city')}
              </label>
              <select
                value={filters.city || ''}
                onChange={(e) => onFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">{t('filters.all')}</option>
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.cacherout')}
              </label>
              <select
                value={filters.cacherout || ''}
                onChange={(e) => onFilterChange('cacherout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">{t('filters.all')}</option>
                {CACHEROUT.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.cuisine')}
              </label>
              <select
                value={filters.cuisine || ''}
                onChange={(e) => onFilterChange('cuisine', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">{t('filters.all')}</option>
                {CUISINES.map((cuisine) => (
                  <option key={cuisine.value} value={cuisine.value}>
                    {cuisine.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.priceRange')}
              </label>
              <select
                value={filters.priceRange || ''}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">{t('filters.all')}</option>
                {PRICE_RANGES.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RestaurantStickyFilters;
