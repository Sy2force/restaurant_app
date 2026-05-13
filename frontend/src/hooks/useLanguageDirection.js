import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Synchronises <html lang> and <html dir> with the current i18n language.
 * Returns helpers for components that need explicit RTL awareness.
 *
 * Usage:
 *   const { isRTL, language, dir } = useLanguageDirection();
 */
const RTL_LANGUAGES = new Set(['he', 'ar', 'fa', 'ur']);

export const useLanguageDirection = () => {
  const { i18n } = useTranslation();
  const language = i18n?.language || 'en';
  const baseLang = language.split('-')[0];
  const isRTL = RTL_LANGUAGES.has(baseLang);
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = baseLang;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [baseLang, dir]);

  return useMemo(() => ({ isRTL, language: baseLang, dir }), [isRTL, baseLang, dir]);
};

export default useLanguageDirection;
