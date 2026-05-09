import { motion } from 'framer-motion';
import { Search, Sparkles, MapPin, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdvantagesSection = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Search,
      title: t('landing.advantages.findQuickly.title'),
      description: t('landing.advantages.findQuickly.description'),
    },
    {
      icon: Sparkles,
      title: t('landing.advantages.discoverPopular.title'),
      description: t('landing.advantages.discoverPopular.description'),
    },
    {
      icon: MapPin,
      title: t('landing.advantages.filterPreferences.title'),
      description: t('landing.advantages.filterPreferences.description'),
    },
    {
      icon: Code,
      title: t('landing.advantages.portfolio.title'),
      description: t('landing.advantages.portfolio.description'),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('landing.advantages.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('landing.advantages.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-cream-50 dark:bg-gray-700 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gold-100 dark:bg-gold-900/30 rounded-2xl flex items-center justify-center">
                <advantage.icon className="w-8 h-8 text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
