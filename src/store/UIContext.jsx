import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../shared/i18n/translations.js';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('jqpa-theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('jqpa-language') || 'es');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('jqpa-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('jqpa-language', language);
  }, [language]);

  const t = (key) => translations[language]?.[key] || translations.es[key] || key;

  const addToast = ({ type = 'success', title, message }) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3800);
  };

  const value = useMemo(
    () => ({
      theme,
      language,
      toasts,
      t,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
      setLanguage,
      addToast
    }),
    [theme, language, toasts]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI debe usarse dentro de UIProvider');
  }
  return context;
}
