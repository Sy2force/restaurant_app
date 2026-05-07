import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex items-center justify-center p-4 pt-24">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="text-9xl font-display font-bold text-gold-500/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <UtensilsCrossed className="w-24 h-24 text-gold-500 rotate-45" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">{t('notFound.text')}</p>

          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-500 px-8 py-3 font-bold text-white shadow-lg transition-colors hover:bg-gold-600 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            {t('notFound.button')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
