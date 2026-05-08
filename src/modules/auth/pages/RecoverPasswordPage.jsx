import { Link, useNavigate } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { useForm } from '../../../shared/hooks/useForm.js';
import { validateAuth } from '../../../shared/validators/forms.js';

export function RecoverPasswordPage() {
  const navigate = useNavigate();
  const { addToast, t } = useUI();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '' },
    (formValues) => validateAuth(formValues, 'recover')
  );

  const onSubmit = () => {
    addToast({ title: 'Correo enviado', message: 'Se simuló el envío del enlace de recuperación.' });
    navigate('/login');
  };

  return (
    <Card className="auth-card">
      <p className="page-eyebrow">{t('auth.recover.eyebrow')}</p>
      <h2 className="page-title">{t('auth.recover.title')}</h2>
      <p className="page-description">{t('auth.recover.description')}</p>
      <form className="grid" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 22 }}>
        <Input label={t('auth.recover.email')} name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <Button full type="submit">
          <MailCheck size={18} />
          {t('auth.recover.submit')}
        </Button>
      </form>
      <div className="auth-links">
        <Link to="/login">{t('auth.recover.back')}</Link>
      </div>
    </Card>
  );
}
