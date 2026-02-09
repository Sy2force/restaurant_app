import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const ProtectedRoute = ({ children, requireBusiness, requireAdmin }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        {t('common.loading')}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireBusiness && !user?.isBusiness && !user?.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
