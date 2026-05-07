import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/UI/Button';

const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-display font-bold text-gold-500 mb-4">403</h1>
      <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
        {t('unauthorized.title')}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">{t('unauthorized.desc')}</p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline">{t('unauthorized.backHome')}</Button>
        </Link>
        <Link to="/login">
          <Button variant="primary">{t('unauthorized.loginOther')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
