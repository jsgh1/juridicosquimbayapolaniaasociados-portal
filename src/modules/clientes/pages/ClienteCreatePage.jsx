import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { Select } from '../../../shared/components/Select.jsx';
import { Textarea } from '../../../shared/components/Textarea.jsx';
import { useForm } from '../../../shared/hooks/useForm.js';
import { validateClient } from '../../../shared/validators/forms.js';

export function ClienteCreatePage() {
  const navigate = useNavigate();
  const { addToast } = useUI();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', document: '', email: '', phone: '', city: '', type: '', notes: '' },
    validateClient
  );

  const onSubmit = () => {
    addToast({ title: 'Cliente registrado', message: 'El cliente fue guardado en modo demostración.' });
    navigate('/app/clientes');
  };

  return (
    <>
      <PageHeader
        eyebrow="Nuevo cliente"
        title="Registrar cliente"
        description="Formulario principal para crear clientes y validar campos obligatorios antes de conectar con la API."
      />
      <Card>
        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nombre o razón social" name="name" value={values.name} onChange={handleChange} error={errors.name} />
          <Input label="Documento/NIT" name="document" value={values.document} onChange={handleChange} error={errors.document} />
          <Select label="Tipo de cliente" name="type" value={values.type} onChange={handleChange} options={['Persona natural', 'Persona jurídica']} />
          <Input label="Ciudad" name="city" value={values.city} onChange={handleChange} error={errors.city} />
          <Input label="Correo" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
          <Input label="Teléfono" name="phone" value={values.phone} onChange={handleChange} error={errors.phone} />
          <Textarea className="form-row-full" label="Observaciones" name="notes" value={values.notes} onChange={handleChange} />
          <div className="form-row-full topbar-actions">
            <Button type="submit"><Save size={18} /> Guardar cliente</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/app/clientes')}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </>
  );
}
