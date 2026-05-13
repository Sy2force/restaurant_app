import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import useLanguageDirection from '../../hooks/useLanguageDirection';

const Layout = () => {
  const { isRTL } = useLanguageDirection();
  const healthCheckRan = useRef(false);

  useEffect(() => {
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.DEV &&
      !healthCheckRan.current
    ) {
      healthCheckRan.current = true;
      Promise.all([
        import('../../utils/dataHealthCheck'),
        import('../../data/mockRestaurants'),
        import('../../data/mockDishes'),
        import('../../i18n/locales/fr.json'),
        import('../../i18n/locales/en.json'),
        import('../../i18n/locales/he.json'),
      ])
        .then(([health, restaurants, dishes, fr, en, he]) => {
          health.runDataHealthCheck({
            restaurants: restaurants.mockRestaurants || [],
            dishes: Object.values(dishes.mockDishes || {}),
            locales: { fr: fr.default, en: en.default, he: he.default },
          });
        })
        .catch(() => {
          /* health check is optional in dev */
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
