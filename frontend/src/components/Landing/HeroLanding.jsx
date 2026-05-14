import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../utils/helpers';
import { HERO_IMAGES } from '../../data/constants';

const HeroLanding = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dark-900"
    >
      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${getImageUrl(HERO_IMAGES[currentImageIndex])}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 px-4 md:px-16 max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center bg-dark-900/20 backdrop-blur-sm">
              <ChefHat className="w-6 h-6 text-gold-500" />
            </div>
            <span className="text-gold-400 font-display tracking-widest uppercase text-sm">
              {t('home.hero.badge')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
            {t('home.hero.title')}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 leading-relaxed font-light drop-shadow-md max-w-2xl">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <Link
              to="/restaurants"
              className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black shadow-lg transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Play className="w-6 h-6 fill-black" aria-hidden="true" />
              {t('home.hero.cta')}
            </Link>

            <Link
              to="/dishes"
              className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-gray-500/30 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-gray-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Info className="w-6 h-6" aria-hidden="true" />
              {t('home.hero.moreInfo')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 end-4 sm:end-10 z-20 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`${t('home.hero.slide')} ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-6 sm:w-8 bg-gold-500'
                : 'w-3 sm:w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroLanding;
