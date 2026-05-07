import { Link } from 'react-router-dom';
import { Clock, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureUnavailable = ({
  titleKey = 'comingSoon.title',
  descriptionKey = 'comingSoon.text',
}) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex items-center justify-center px-4 pt-28 pb-24">
      <div className="max-w-xl text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-8 md:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
          <Clock className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
          {t(titleKey)}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{t(descriptionKey)}</p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-white shadow-lg shadow-gold-500/20 transition-colors hover:bg-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          {t('notFound.button')}
        </Link>
      </div>
    </div>
  );
};

export default FeatureUnavailable;
