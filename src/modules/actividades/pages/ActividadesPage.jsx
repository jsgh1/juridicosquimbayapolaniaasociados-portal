import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { activities } from '../../../shared/data/mockData.js';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters.js';

export function ActividadesPage() {
  const { addToast } = useUI();
  const [rate, setRate] = useState(120000);
  const billable = useMemo(() => activities.filter((item) => item.billable), []);
  const totalHours = billable.reduce((sum, item) => sum + item.hours, 0);

  return (
    <>
      <PageHeader
        eyebrow="Tiempo y facturación"
        title="Actividades"
        description="Registro de actuaciones, tiempo invertido y clasificación entre actividades facturables y no facturables."
        actions={<Button onClick={() => addToast({ title: 'Actividad simulada', message: 'Se registró una nueva actividad de demostración.' })}><Plus size={18} /> Registrar actividad</Button>}
      />
      <section className="grid grid-3">
        <Card>
          <p className="stat-label">Horas facturables</p>
          <p className="stat-value">{totalHours}</p>
        </Card>
        <Card>
          <p className="stat-label">Valor hora</p>
          <Input label="Tarifa" type="number" value={rate} onChange={(event) => setRate(Number(event.target.value))} />
        </Card>
        <Card>
          <p className="stat-label">Estimado a facturar</p>
          <p className="stat-value">{formatCurrency(totalHours * rate)}</p>
        </Card>
      </section>
      <Card style={{ marginTop: 18 }}>
        <DataTable
          data={activities}
          columns={[
            { key: 'title', label: 'Actividad', render: (row) => <strong>{row.title}</strong> },
            { key: 'caseId', label: 'Caso' },
            { key: 'date', label: 'Fecha', render: (row) => formatDate(row.date) },
            { key: 'hours', label: 'Horas' },
            { key: 'billable', label: 'Facturable', render: (row) => (row.billable ? 'Sí' : 'No') },
            { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
          ]}
        />
      </Card>
    </>
  );
}
