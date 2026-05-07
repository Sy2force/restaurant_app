import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Share2, Printer, CheckCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { recipeAPI } from '../services/api';
import Toast from '../components/UI/Toast';
import SkeletonCard from '../components/UI/SkeletonCard';
import { mockRecipeDetails } from '../data/mockRecipeDetails';
import { getImageUrl } from '../utils/helpers';

const RecipeDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [servings, setServings] = useState(4); // Default servings
  const [moreRecipes, setMoreRecipes] = useState([]);

  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    try {
      let apiSuccess = false;
      try {
        const response = await recipeAPI.getById(id);
        if (response.data) {
          setRecipe(response.data);
          setServings(response.data.servings || 4);
          apiSuccess = true;
        }
      } catch {
        // API error fetching recipe, using mock
      }

      if (apiSuccess) {
        setLoading(false);
        return;
      }

      if (mockRecipeDetails[id]) {
        // Simulate loading delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 600));
        setRecipe(mockRecipeDetails[id]);
        setServings(mockRecipeDetails[id].servings);
      } else {
        // fallback to first if not found in mock and API failed
        // setRecipe(mockRecipeDetails['1']);
        // setServings(mockRecipeDetails['1'].servings);
      }
    } catch (error) {
      setToast({ show: true, message: t('recipeDetail.loadError'), type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    if (recipe) {
      // Mock more recipes from same author
      const mockMore = [
        {
          _id: '201',
          title: 'Salade de Grenades',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940',
          prepTime: 15,
          cookTime: 0,
          difficulty: 'Facile',
          category: 'Entrée',
          cacherout: 'Pareve',
          region: 'Galilée',
        },
        {
          _id: '202',
          title: 'Aubergines Brûlées',
          image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee397?q=80&w=2835',
          prepTime: 20,
          cookTime: 40,
          difficulty: 'Moyen',
          category: 'Plat Principal',
          cacherout: 'Pareve',
          region: 'Tel Aviv',
        },
        {
          _id: '203',
          title: 'Riz aux Lentilles',
          image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=2787',
          prepTime: 10,
          cookTime: 30,
          difficulty: 'Facile',
          category: 'Accompagnement',
          cacherout: 'Pareve',
          region: 'Jérusalem',
        },
      ];
      setMoreRecipes(mockMore.filter((r) => r._id !== recipe._id));
    }
  }, [recipe]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const adjustServings = (newServings) => {
    if (newServings < 1) return;
    setServings(newServings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-dark-900 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!recipe) return <div>{t('recipeDetail.notFound')}</div>;

  const scalingFactor = servings / recipe.servings;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900">
      {/* Back Button */}
      <div className="absolute top-24 left-4 z-20 md:left-8">
        <Link
          to="/explore"
          className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gold-500 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 ms-2 rtl:mr-2 rtl:ms-0 rtl:rotate-180" />
          {t('common.back')}
        </Link>
      </div>

      {/* Hero Banner for Dish */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={getImageUrl(recipe.image)}
          alt={recipe.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-gold-500 text-white text-sm font-bold rounded-full shadow-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight break-words">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-gold-400" />
                <span className="font-medium">{recipe.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-gold-400" />
                <span>
                  {recipe.prepTime + recipe.cookTime} {t('common.min')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-gold-400" />
                <span>
                  {recipe.servings} {t('details.servings')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Ingredients & Tools */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                {t('details.ingredients')}
              </h3>
              <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => adjustServings(servings - 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded shadow-sm transition-all"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold">{servings}</span>
                <button
                  onClick={() => adjustServings(servings + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded shadow-sm transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <ul className="space-y-4">
              {recipe.ingredients.map((ing, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    checkedIngredients[index]
                      ? 'bg-green-50 dark:bg-green-900/20 opacity-70'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => toggleIngredient(index)}
                >
                  <div
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      checkedIngredients[index]
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {checkedIngredients[index] && <CheckCircle className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`font-bold ${checkedIngredients[index] ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}
                    >
                      {ing.amount
                        ? (parseFloat(ing.amount) * scalingFactor).toFixed(
                            ing.amount.includes('.') ? 1 : 0
                          )
                        : ''}{' '}
                      {ing.unit}
                    </span>
                    <span
                      className={`block text-sm ${checkedIngredients[index] ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      {ing.item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors">
                <Printer className="w-4 h-4" />
                {t('common.print')}
              </button>
              <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors">
                <Share2 className="w-4 h-4" />
                {t('common.share')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 mb-10">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
                {t('details.instructions')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed italic border-l-4 border-gold-500 pl-6">
                "{recipe.description}"
              </p>

              <div className="space-y-8">
                {recipe.instructions.map((step, index) => (
                  <div
                    key={index}
                    className={`relative pl-8 md:pl-12 transition-all duration-500 ${
                      activeStep === index ? 'opacity-100 scale-100' : 'opacity-80'
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Step Number Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                    <div
                      className={`absolute left-[-12px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-gold-500 text-white scale-125 shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {step.step}
                    </div>

                    <div
                      className={`p-6 rounded-2xl transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-cream-50 dark:bg-gray-700/50 shadow-md translate-x-2'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {t('details.step')} {step.step}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef's Note or Tips could go here */}
            {recipe.chefNote && (
              <div className="bg-olive-800 rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-500">
                    <img
                      src={getImageUrl(recipe.author.image)}
                      alt={recipe.author.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          'https://ui-avatars.com/api/?name=' + (recipe.author.name || 'Chef');
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {t('details.chefsNote')}
                    </h3>
                    <p className="text-olive-100 italic">"{recipe.chefNote}"</p>
                  </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 text-white/5">
                  <ChefHat className="w-64 h-64" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* More from Author Section */}
      {moreRecipes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8"
          >
            {t('details.moreFromAuthor', { author: recipe.author.name })}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreRecipes.map((moreRecipe, index) => (
              <motion.div
                key={moreRecipe._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(moreRecipe.image)}
                      alt={moreRecipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940';
                      }}
                    />
                    <Link
                      to="/recipes"
                      className="absolute top-28 left-4 md:left-8 z-20 inline-flex items-center text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm text-olive-700">
                      {moreRecipe.difficulty}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {moreRecipe.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {moreRecipe.prepTime + moreRecipe.cookTime} {t('common.min')}
                      </span>
                    </div>
                  </div>
                </div>
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

export default RecipeDetail;
