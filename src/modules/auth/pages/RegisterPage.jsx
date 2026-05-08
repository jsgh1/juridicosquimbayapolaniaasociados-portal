import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { useForm } from '../../../shared/hooks/useForm.js';
import { validateAuth } from '../../../shared/validators/forms.js';

export function RegisterPage() {
  const navigate = useNavigate();
  const { addToast, t } = useUI();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    (formValues) => validateAuth(formValues, 'register')
  );

  const onSubmit = () => {
    addToast({ title: 'Registro simulado', message: 'La cuenta fue preparada. Ahora puedes iniciar sesión.' });
    navigate('/login');
  };

  return (
    <Card className="auth-card">
      <p className="page-eyebrow">{t('auth.register.eyebrow')}</p>
      <h2 className="page-title">{t('auth.register.title')}</h2>
      <p className="page-description">{t('auth.register.description')}</p>
      <form className="grid" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 22 }}>
        <Input label={t('auth.register.name')} name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <Input label={t('auth.register.email')} name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <Input label={t('auth.register.password')} name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
        <Button full type="submit">
          <UserPlus size={18} />
          {t('auth.register.submit')}
        </Button>
      </form>
      <div className="auth-links">
        <Link to="/login">{t('auth.register.hasAccount')}</Link>
      </div>
    </Card>
  );
}
