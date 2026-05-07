import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const ProtectedRoute = ({ children, requireBusiness, requireAdmin }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, loading } = useAuthStore();
  const location = useLocation();
  const isAdmin = user?.isAdmin || user?.role === 'admin';
  const isBusiness = user?.isBusiness || user?.role === 'business';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-dark-900 text-olive-700 dark:text-cream-50">
        {t('common.loading')}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireBusiness && !isBusiness && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
