import { Moon, Sun } from 'lucide-react';
import { useUI } from '../../store/UIContext.jsx';
import { Button } from './Button.jsx';

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useUI();
  const isLight = theme === 'light';

  return (
    <Button variant="secondary" onClick={toggleTheme} title="Cambiar tema">
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
      {isLight ? t('theme.dark') : t('theme.light')}
    </Button>
  );
}
