import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../../store/AuthContext.jsx';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { useForm } from '../../../shared/hooks/useForm.js';
import { validateAuth } from '../../../shared/validators/forms.js';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast, t } = useUI();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: 'admin@jqpa.com', password: '123456' },
    (formValues) => validateAuth(formValues, 'login')
  );

  const onSubmit = (formValues) => {
    login(formValues);
    addToast({ title: 'Bienvenido a JQPA', message: 'Inicio de sesión simulado correctamente.' });
    navigate(location.state?.from?.pathname || '/app/dashboard', { replace: true });
  };

  return (
    <Card className="auth-card">
      <p className="page-eyebrow">{t('auth.login.eyebrow')}</p>
      <h2 className="page-title">{t('auth.login.title')}</h2>
      <p className="page-description">{t('auth.login.description')}</p>
      <form className="grid" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 22 }}>
        <Input label={t('auth.login.email')} name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <Input label={t('auth.login.password')} name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
        <Button full type="submit">
          <LogIn size={18} />
          {t('auth.login.submit')}
        </Button>
      </form>
      <div className="auth-links">
        <Link to="/registro">{t('auth.login.createAccount')}</Link>
        <Link to="/recuperar">{t('auth.login.forgotPassword')}</Link>
      </div>
    </Card>
  );
}
