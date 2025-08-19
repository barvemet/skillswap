'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'tr' | 'en' | 'de';

// Çok seviyeli sözlük yapısı
type Dict = { [key: string]: string | Dict };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// JSON çevirileri içe aktar
import trMessages from '../../messages/tr.json';
import enMessages from '../../messages/en.json';
import deMessages from '../../messages/de.json';

// messages'i tipli hale getir (resolveJsonModule açık değilse as Dict kullanımı sorun çözür)
const messages: Record<Locale, Dict> = {
  tr: trMessages as Dict,
  en: enMessages as Dict,
  de: deMessages as Dict,
};

// Belirtilen sözlük içinde "a.b.c" gibi bir yolu çözen yardımcı
function resolvePath(dict: Dict, path: string): string | undefined {
  const keys = path.split('.');
  let value: string | Dict | undefined = dict;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Dict)[k] as string | Dict | undefined;
    } else {
      return undefined;
    }
  }

  return typeof value === 'string' ? value : undefined;
}

export function LanguageProvider({
  children,
  initialLocale = 'tr',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Güvenli t() fonksiyonu: önce aktif dil, yoksa TR fallback, o da yoksa anahtarın kendisi
  const t = (key: string): string => {
    const fromActive = resolvePath(messages[locale], key);
    if (fromActive !== undefined) return fromActive;

    const fromTR = resolvePath(messages.tr, key);
    if (fromTR !== undefined) return fromTR;

    return key;
  };

  // Locale değişince URL'yi güncelle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');

      if (pathSegments[1] && (['tr', 'en', 'de'] as Locale[]).includes(pathSegments[1] as Locale)) {
        pathSegments[1] = locale;
      } else {
        pathSegments.splice(1, 0, locale);
      }

      const newPath = pathSegments.join('/');
      if (newPath !== currentPath) {
        window.history.pushState({}, '', newPath);
      }
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
