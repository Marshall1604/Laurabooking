'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Locale, SUPPORTED_LOCALES, DICTIONARY, getTranslation } from './index';

interface I18nContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string) => string;
  supportedLocales: typeof SUPPORTED_LOCALES;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelis_locale') as Locale;
      if (saved && ['en', 'zh-CN', 'ko', 'vi'].includes(saved)) {
        setLocaleState(saved);
      }
    } catch {}
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('aurelis_locale', newLocale);
      document.cookie = `aurelis_locale=${newLocale}; path=/; max-age=31536000`;
    } catch {}
  };

  const t = (key: string) => getTranslation(locale, key);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, supportedLocales: SUPPORTED_LOCALES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
