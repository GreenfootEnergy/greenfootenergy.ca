import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useLocation } from "wouter";
import { en, TranslationKeys } from "./translations/en";
import { fr } from "./translations/fr";
import { urlTranslations, reverseUrlTranslations } from "./urlTranslations";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  localizedPath: (path: string) => string;
  stripLanguagePrefix: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationKeys> = {
  en,
  fr,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  
  const getLanguageFromPath = (): Language => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/fr-ca/") || path === "/fr-ca") {
        return "fr";
      }
    }
    return "en";
  };

  const [language, setLanguageState] = useState<Language>(() => {
    const pathLang = getLanguageFromPath();
    if (pathLang === "fr") return "fr";
    
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved && (saved === "en" || saved === "fr")) {
        return saved;
      }
    }
    return "en";
  });

  useEffect(() => {
    const pathLang = getLanguageFromPath();
    if (pathLang !== language) {
      setLanguageState(pathLang);
      localStorage.setItem("language", pathLang);
    }
  }, [location]);

  const stripLanguagePrefix = useCallback((path: string): string => {
    if (path.startsWith("/fr-ca/")) {
      return path.slice(6);
    }
    if (path === "/fr-ca") {
      return "/";
    }
    return path;
  }, []);

  const localizedPath = useCallback((path: string): string => {
    const cleanPath = stripLanguagePrefix(path);
    if (language === "fr") {
      if (cleanPath === "/") return "/fr-ca";
      // Handle hash fragments (e.g., /about-us#makeover)
      const [basePath, hash] = cleanPath.split("#");
      const translatedBase = urlTranslations[basePath] || basePath;
      const fullPath = hash ? `${translatedBase}#${hash}` : translatedBase;
      return `/fr-ca${fullPath}`;
    }
    return cleanPath;
  }, [language, stripLanguagePrefix]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en";
    
    const currentPath = stripLanguagePrefix(window.location.pathname);
    if (lang === "fr") {
      // Switching to French: translate English path to French
      const [basePath, hash] = currentPath.split("#");
      const translatedBase = urlTranslations[basePath] || basePath;
      const fullPath = hash ? `${translatedBase}#${hash}` : translatedBase;
      const newPath = currentPath === "/" ? "/fr-ca" : `/fr-ca${fullPath}`;
      setLocation(newPath);
    } else {
      // Switching to English: translate French path back to English
      const [basePath, hash] = currentPath.split("#");
      const translatedBase = reverseUrlTranslations[basePath] || basePath;
      const fullPath = hash ? `${translatedBase}#${hash}` : translatedBase;
      setLocation(fullPath);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === "fr" ? "fr-CA" : "en";
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localizedPath, stripLanguagePrefix }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}

export function useLocalizedPath() {
  const { localizedPath } = useLanguage();
  return localizedPath;
}
