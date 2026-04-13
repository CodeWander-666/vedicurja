'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'common.home': 'Home',
    'common.freeAITools': 'Free AI Tools',
    'common.services': 'Services',
    'common.learnVastu': 'Learn Vastu',
    'common.blogs': 'Blogs',
    'common.testimonials': 'Testimonials',
    'common.profile': 'Profile',
    'common.consult': 'Consult the Acharya',
    'common.signIn': 'Sign In',
    'hero.title1': 'Ancient Wisdom.',
    'hero.title2': 'Modern Precision.',
    'hero.subtitle': 'Guided by Acharya [Name], rooted in the sacred geometry of Uttar Pradesh.',
    'hero.cta': 'Discover Your Space',
    'language.select': 'Select your language',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.spanish': 'Español',
    'language.french': 'Français',
  },
  hi: {
    'common.home': 'होम',
    'common.freeAITools': 'मुफ्त AI उपकरण',
    'common.services': 'सेवाएं',
    'common.learnVastu': 'वास्तु सीखें',
    'common.blogs': 'ब्लॉग',
    'common.testimonials': 'प्रशंसापत्र',
    'common.profile': 'प्रोफ़ाइल',
    'common.consult': 'आचार्य से परामर्श करें',
    'common.signIn': 'साइन इन करें',
    'hero.title1': 'प्राचीन ज्ञान।',
    'hero.title2': 'आधुनिक परिशुद्धता।',
    'hero.subtitle': 'आचार्य [नाम] द्वारा निर्देशित, उत्तर प्रदेश की पवित्र ज्यामिति में निहित।',
    'hero.cta': 'अपना स्थान खोजें',
    'language.select': 'अपनी भाषा चुनें',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.spanish': 'Español',
    'language.french': 'Français',
  },
  es: {
    'common.home': 'Inicio',
    'common.freeAITools': 'Herramientas IA',
    'common.services': 'Servicios',
    'common.learnVastu': 'Aprender Vastu',
    'common.blogs': 'Blogs',
    'common.testimonials': 'Testimonios',
    'common.profile': 'Perfil',
    'common.consult': 'Consultar',
    'common.signIn': 'Iniciar sesión',
    'hero.title1': 'Sabiduría Ancestral.',
    'hero.title2': 'Precisión Moderna.',
    'hero.subtitle': 'Guiado por Acharya, arraigado en la geometría sagrada.',
    'hero.cta': 'Descubre tu espacio',
    'language.select': 'Selecciona tu idioma',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.spanish': 'Español',
    'language.french': 'Français',
  },
  fr: {
    'common.home': 'Accueil',
    'common.freeAITools': 'Outils IA',
    'common.services': 'Services',
    'common.learnVastu': 'Apprendre',
    'common.blogs': 'Blogs',
    'common.testimonials': 'Témoignages',
    'common.profile': 'Profil',
    'common.consult': 'Consulter',
    'common.signIn': 'Connexion',
    'hero.title1': 'Sagesse Ancienne.',
    'hero.title2': 'Précision Moderne.',
    'hero.subtitle': 'Guidé par Acharya, ancré dans la géométrie sacrée.',
    'hero.cta': 'Découvrez votre espace',
    'language.select': 'Choisissez votre langue',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.spanish': 'Español',
    'language.french': 'Français',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'hi', 'es', 'fr'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
