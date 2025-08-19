"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'tr' | 'en' | 'de';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import all translations
import trMessages from '../../messages/tr.json';
import enMessages from '../../messages/en.json';
import deMessages from '../../messages/de.json';

const messages = {
  tr: trMessages,
  en: enMessages,
  de: deMessages,
};

export function LanguageProvider({ 
  children, 
  initialLocale = 'tr' 
}: { 
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Helper function to get nested translation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Turkish if key not found
        value = messages.tr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Update URL when locale changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      
      // Check if first segment is a locale
      if (pathSegments[1] && ['tr', 'en', 'de'].includes(pathSegments[1])) {
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
