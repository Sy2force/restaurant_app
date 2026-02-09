import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Store, UtensilsCrossed, BookOpen, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI, usersAPI } from '../services/api';
import PremiumRestaurantCard from '../components/Restaurants/PremiumRestaurantCard';
import PremiumDishCard from '../components/Dishes/PremiumDishCard';
import RecipeCard from '../components/UI/RecipeCard';
import PremiumBookCard from '../components/RecipeBooks/PremiumBookCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { mockFavorites } from '../data/mockFavorites';

const Favorites = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      try {
        const response = await usersAPI.getFavorites();
        if (response.data) {
          setFavorites(response.data);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        // Mock data fallback
      }

      // Mock data fallback
      setTimeout(() => {
        setFavorites(mockFavorites);
        setLoading(false);
      }, 800);
    } catch (error) {
      setToast({ show: true, message: t('favorites.loadError'), type: 'error' });
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemoveFavorite = async (type, itemId) => {
    try {
      await authAPI.removeFromFavorites(type, itemId);
      setFavorites((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item._id !== itemId),
      }));
      setToast({ show: true, message: t('favorites.removeSuccess'), type: 'success' });
    } catch (error) {
      setToast({ show: true, message: t('favorites.removeError'), type: 'error' });
    }
  };

  const tabs = [
    {
      key: 'restaurants',
      label: t('nav.restaurants'),
      icon: Store,
      count: favorites?.restaurants?.length || 0,
    },
    {
      key: 'dishes',
      label: t('nav.dishes'),
      icon: UtensilsCrossed,
      count: favorites?.dishes?.length || 0,
    },
    {
      key: 'recipes',
      label: t('nav.recipes'),
      icon: BookOpen,
      count: favorites?.recipes?.length || 0,
    },
    {
      key: 'recipeBooks',
      label: t('nav.recipeBooks'),
      icon: Book,
      count: favorites?.recipeBooks?.length || 0,
    },
  ];

  if (loading) return <LoadingSpinner fullScreen />;

  const renderContent = () => {
    const items = favorites?.[activeTab] || [];

    if (items.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-gray-50 dark:bg-gray-700/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-300 dark:text-gray-500" />
          </div>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
            {t('favorites.empty.title')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 font-light mb-8 max-w-md mx-auto">
            {t('favorites.empty.desc')}
          </p>
          <Link to="/explore">
            <button className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full transition-colors inline-flex items-center gap-2">
              {t('favorites.empty.button')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      );
    }

    return (
      <div
        className={`grid grid-cols-1 ${activeTab === 'recipeBooks' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}
      >
        {activeTab === 'restaurants' &&
          items.map((restaurant, index) => (
            <motion.div
              key={restaurant._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PremiumRestaurantCard restaurant={restaurant} />
            </motion.div>
          ))}
        {activeTab === 'dishes' &&
          items.map((dish, index) => (
            <motion.div
              key={dish._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PremiumDishCard
                dish={dish}
                onFavorite={() => handleRemoveFavorite('dishes', dish._id)}
              />
            </motion.div>
          ))}
        {activeTab === 'recipes' &&
          items.map((recipe, index) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RecipeCard
                recipe={recipe}
                onLike={() => handleRemoveFavorite('recipes', recipe._id)}
              />
            </motion.div>
          ))}
        {activeTab === 'recipeBooks' &&
          items.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <PremiumBookCard book={book} />
            </motion.div>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pt-32 pb-12">
      {/* Hero Header */}
      <div className="bg-olive-900 h-64 absolute top-0 left-0 right-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream-50 dark:to-dark-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-gold-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-semibold tracking-wide text-sm uppercase">
              {t('favorites.badge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('favorites.title')}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light">
            {t('favorites.subtitle')}
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 mb-12 max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 justify-center min-w-[140px] ${
                    activeTab === tab.key
                      ? 'bg-gold-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {renderContent()}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default Favorites;
