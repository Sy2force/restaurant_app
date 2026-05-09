import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Code2,
  Layout,
  Layers,
  Zap,
  CheckCircle,
  Target,
  Rocket,
  Globe,
  Smartphone,
  Database,
  TestTube,
  Cpu,
} from 'lucide-react';

const AboutProject = () => {
  const { t } = useTranslation();

  const techStack = [
    { name: t('aboutProject.techStack.react'), icon: Code2 },
    { name: t('aboutProject.techStack.vite'), icon: Zap },
    { name: t('aboutProject.techStack.tailwind'), icon: Layers },
    { name: t('aboutProject.techStack.router'), icon: Layout },
    { name: t('aboutProject.techStack.zustand'), icon: Database },
    { name: t('aboutProject.techStack.i18next'), icon: Globe },
    { name: t('aboutProject.techStack.framer'), icon: Smartphone },
    { name: t('aboutProject.techStack.vitest'), icon: TestTube },
    { name: t('aboutProject.techStack.playwright'), icon: Cpu },
  ];

  const features = [
    t('aboutProject.features.landing'),
    t('aboutProject.features.restaurants'),
    t('aboutProject.features.dishes'),
    t('aboutProject.features.details'),
    t('aboutProject.features.auth'),
    t('aboutProject.features.contact'),
    t('aboutProject.features.responsive'),
    t('aboutProject.features.dark'),
    t('aboutProject.features.multilingual'),
    t('aboutProject.features.mock'),
    t('aboutProject.features.e2e'),
  ];

  const challenges = [
    t('aboutProject.challenges.responsive'),
    t('aboutProject.challenges.sync'),
    t('aboutProject.challenges.navigation'),
    t('aboutProject.challenges.reuse'),
    t('aboutProject.challenges.testing'),
    t('aboutProject.challenges.build'),
  ];

  const architecture = [
    t('aboutProject.architecture.components'),
    t('aboutProject.architecture.pages'),
    t('aboutProject.architecture.services'),
    t('aboutProject.architecture.store'),
    t('aboutProject.architecture.utils'),
    t('aboutProject.architecture.data'),
    t('aboutProject.architecture.i18n'),
    t('aboutProject.architecture.e2e'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white dark:from-dark-900 dark:to-gray-900 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-cream-100 mb-4">
            {t('aboutProject.title')}
          </h1>
          <p className="text-xl text-gold-500 font-semibold mb-6">{t('aboutProject.subtitle')}</p>
        </motion.div>

        {/* Presentation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg border border-gold-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            {t('aboutProject.presentation.title')}
          </h2>
          <p className="text-gray-700 dark:text-cream-100 leading-relaxed">
            {t('aboutProject.presentation.content')}
          </p>
        </motion.section>

        {/* Objectives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg border border-gold-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-4 flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            {t('aboutProject.objectives.title')}
          </h2>
          <p className="text-gray-700 dark:text-cream-100 leading-relaxed">
            {t('aboutProject.objectives.content')}
          </p>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            {t('aboutProject.techStack.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-3"
              >
                <tech.icon className="w-8 h-8 text-gold-500" />
                <span className="text-sm font-semibold text-gray-800 dark:text-cream-100 text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg border border-gold-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            {t('aboutProject.features.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.03 }}
                className="flex items-center gap-2 text-gray-700 dark:text-cream-100"
              >
                <div className="w-2 h-2 bg-gold-500 rounded-full" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg border border-gold-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-6 flex items-center gap-2">
            <Layout className="w-6 h-6" />
            {t('aboutProject.architecture.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {architecture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="bg-cream-50 dark:bg-gray-700 rounded-lg p-3 text-center border border-gold-500/10"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-cream-100">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg border border-gold-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            {t('aboutProject.challenges.title')}
          </h2>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-3 text-gray-700 dark:text-cream-100"
              >
                <div className="w-8 h-8 bg-gold-500/10 rounded-full flex items-center justify-center">
                  <span className="text-gold-500 font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-sm">{challenge}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Result */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-gold-500/10 to-olive-500/10 dark:from-gold-500/20 dark:to-olive-500/20 rounded-2xl p-8 shadow-lg border border-gold-500/30"
        >
          <h2 className="text-2xl font-display font-bold text-gold-500 mb-4 flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            {t('aboutProject.result.title')}
          </h2>
          <p className="text-gray-800 dark:text-cream-100 leading-relaxed font-medium">
            {t('aboutProject.result.content')}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutProject;
