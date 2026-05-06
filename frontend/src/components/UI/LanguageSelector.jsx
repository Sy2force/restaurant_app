import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'he', label: 'עברית', flag: '🇮🇱' },
  ];

  const currentLang = i18n.language || 'en';

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-cream-300 text-sm mr-2">{t('settings.general.defaultLanguage')}:</span>
      <div className="flex gap-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentLang === lang.code
                ? 'bg-gold-500 text-dark-900'
                : 'bg-dark-800 text-cream-300 hover:bg-dark-700'
            }`}
            title={lang.label}
          >
            <span className="mr-1">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
