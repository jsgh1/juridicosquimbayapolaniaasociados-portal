import { Languages } from 'lucide-react';
import { useUI } from '../../store/UIContext.jsx';
import { Button } from './Button.jsx';

export function LanguageToggle() {
  const { language, setLanguage } = useUI();

  return (
    <Button variant="secondary" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} title="Cambiar idioma">
      <Languages size={18} />
      {language === 'es' ? 'ES' : 'EN'}
    </Button>
  );
}
