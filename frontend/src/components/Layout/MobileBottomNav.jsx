import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, UtensilsCrossed, Compass, Heart, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

/**
 * App-like fixed bottom navigation for mobile viewports.
 * Hidden on md+ screens (desktop uses the top Navbar).
 */
const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const items = [
    { to: '/', label: t('nav.home'), icon: Home, exact: true },
    { to: '/dishes', label: t('nav.dishes'), icon: UtensilsCrossed },
    { to: '/explore', label: t('nav.explore'), icon: Compass },
    {
      to: isAuthenticated ? '/favorites' : '/login',
      label: t('nav.favorites'),
      icon: Heart,
    },
    {
      to: isAuthenticated ? '/profile' : '/login',
      label: isAuthenticated ? t('nav.profile') : t('nav.login'),
      icon: User,
    },
  ];

  // Hide bottom nav on auth screens (login/register/forgot/reset) to maximize form space.
  const hideOn = ['/login', '/register', '/forgot-password', '/reset-password'];
  if (hideOn.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          return (
            <li key={item.to + item.label}>
              <NavLink
                to={item.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-[0.65rem] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-gold-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`}
                  aria-hidden="true"
                />
                <span className="truncate max-w-[64px] leading-tight">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
