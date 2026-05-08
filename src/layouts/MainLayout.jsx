import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { appIdentity, menuItems } from '../app/config/menu.js';
import { useAuth } from '../store/AuthContext.jsx';
import { useUI } from '../store/UIContext.jsx';
import { Button } from '../shared/components/Button.jsx';
import { ThemeToggle } from '../shared/components/ThemeToggle.jsx';
import { LanguageToggle } from '../shared/components/LanguageToggle.jsx';

export function MainLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, addToast } = useUI();
  const location = useLocation();

  const currentItem = menuItems.find((item) => location.pathname.startsWith(item.path));

  const handleLogout = () => {
    logout();
    addToast({ title: 'Sesión cerrada', message: 'Has salido del sistema correctamente.' });
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">{appIdentity.shortName.slice(0, 2)}</div>
          <div>
            <h2 className="brand-name">{appIdentity.name}</h2>
            <p className="brand-slogan">{appIdentity.slogan}</p>
          </div>
        </div>
        <nav className="nav-list" aria-label="Navegación principal">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink className="nav-link" key={item.path} to={item.path} onClick={() => setOpen(false)}>
                <Icon size={19} />
                <span>{t(item.labelKey)}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button className="mobile-menu-button" variant="secondary" onClick={() => setOpen((value) => !value)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <div>
              <h1 className="topbar-title">{currentItem ? t(currentItem.labelKey) : 'JQPA'}</h1>
              <p className="topbar-subtitle">{t('topbar.subtitle')}</p>
            </div>
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
            <LanguageToggle />
            <span className="badge badge-neutral">{user?.role}</span>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut size={18} />
              {t('actions.logout')}
            </Button>
          </div>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
