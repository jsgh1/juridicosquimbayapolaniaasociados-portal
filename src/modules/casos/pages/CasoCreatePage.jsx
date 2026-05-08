import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { Select } from '../../../shared/components/Select.jsx';
import { Textarea } from '../../../shared/components/Textarea.jsx';
import { clients } from '../../../shared/data/mockData.js';
import { useForm } from '../../../shared/hooks/useForm.js';
import { validateCase } from '../../../shared/validators/forms.js';

export function CasoCreatePage() {
  const navigate = useNavigate();
  const { addToast } = useUI();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { title: '', client: '', area: '', priority: '', court: '', description: '' },
    validateCase
  );

  const onSubmit = () => {
    addToast({ title: 'Caso creado', message: 'El caso fue registrado en modo demostración.' });
    navigate('/app/casos');
  };

  return (
    <>
      <PageHeader
        eyebrow="Nuevo caso jurídico"
        title="Crear caso"
        description="Formulario base para registrar un proceso jurídico y validar sus datos principales."
      />
      <Card>
        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Título del caso" name="title" value={values.title} onChange={handleChange} error={errors.title} />
          <Select label="Cliente" name="client" value={values.client} onChange={handleChange} error={errors.client} options={clients.map((client) => client.name)} />
          <Select label="Área jurídica" name="area" value={values.area} onChange={handleChange} error={errors.area} options={['Laboral', 'Civil', 'Comercial', 'Familia', 'Administrativo', 'Tributario']} />
          <Select label="Prioridad" name="priority" value={values.priority} onChange={handleChange} options={['Alta', 'Media', 'Baja']} />
          <Input label="Juzgado / entidad" name="court" value={values.court} onChange={handleChange} />
          <Textarea className="form-row-full" label="Descripción del caso" name="description" value={values.description} onChange={handleChange} error={errors.description} />
          <div className="form-row-full topbar-actions">
            <Button type="submit"><Save size={18} /> Guardar caso</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/app/casos')}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </>
  );
}
