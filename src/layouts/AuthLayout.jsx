import { Outlet } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { ThemeToggle } from '../shared/components/ThemeToggle.jsx';
import { LanguageToggle } from '../shared/components/LanguageToggle.jsx';
import { useUI } from '../store/UIContext.jsx';

export function AuthLayout() {
  const { t } = useUI();

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="brand">
          <div className="brand-mark">JQ</div>
          <div>
            <h2 className="brand-name">JQPA</h2>
            <p className="brand-slogan">{t('auth.brand.slogan')}</p>
          </div>
        </div>

        <div className="auth-icon-badge" aria-hidden="true">
          <Scale size={32} />
        </div>

        <h1>{t('auth.hero.title')}</h1>
        <p>{t('auth.hero.description')}</p>
        <div className="topbar-actions">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </section>
      <section className="auth-card-wrap">
        <Outlet />
      </section>
    </main>
  );
}
