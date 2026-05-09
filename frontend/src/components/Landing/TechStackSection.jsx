import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Layout, Layers, Zap, Globe, Smartphone, TestTube, Cpu } from 'lucide-react';

const TechStackSection = () => {
  const { t } = useTranslation();

  const techStack = [
    { name: t('techStack.react'), icon: Code2, color: 'from-blue-500 to-blue-600' },
    { name: t('techStack.vite'), icon: Zap, color: 'from-purple-500 to-purple-600' },
    { name: t('techStack.tailwind'), icon: Layers, color: 'from-cyan-500 to-cyan-600' },
    { name: t('techStack.router'), icon: Layout, color: 'from-red-500 to-red-600' },
    { name: t('techStack.zustand'), icon: Smartphone, color: 'from-green-500 to-green-600' },
    { name: t('techStack.i18next'), icon: Globe, color: 'from-indigo-500 to-indigo-600' },
    { name: t('techStack.framer'), icon: Smartphone, color: 'from-pink-500 to-pink-600' },
    { name: t('techStack.vitest'), icon: TestTube, color: 'from-yellow-500 to-yellow-600' },
    { name: t('techStack.playwright'), icon: Cpu, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-cream-100 mb-4">
            {t('techStack.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-cream-200">{t('techStack.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center`}
              >
                <tech.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center font-semibold text-gray-800 dark:text-cream-100">
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
