import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ExternalLink } from 'lucide-react';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { activities, cases, documents } from '../../../shared/data/mockData.js';
import { formatDate } from '../../../shared/utils/formatters.js';

const tabs = ['Resumen', 'Documentos', 'Actividades', 'Audiencias'];

export function CasoDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState('Resumen');
  const item = cases.find((caseItem) => caseItem.id === id) || cases[0];
  const caseDocuments = documents.filter((doc) => doc.caseId === item.id);
  const caseActivities = activities.filter((activity) => activity.caseId === item.id);

  return (
    <>
      <PageHeader
        eyebrow="Detalle del proceso"
        title={item.title}
        description={`${item.id} · ${item.client} · ${item.area}`}
        actions={<Link to="/app/casos"><Button variant="secondary"><ArrowLeft size={18} /> Volver</Button></Link>}
      />
      <div className="tabs">
        {tabs.map((itemTab) => (
          <button className={`tab-button ${tab === itemTab ? 'active' : ''}`} key={itemTab} onClick={() => setTab(itemTab)}>
            {itemTab}
          </button>
        ))}
      </div>

      {tab === 'Resumen' && (
        <section className="grid grid-3">
          <Card>
            <h2 className="card-title">Estado del caso</h2>
            <p><Badge>{item.status}</Badge></p>
            <p className="card-muted"><strong>Prioridad:</strong> <Badge>{item.priority}</Badge></p>
            <p className="card-muted"><strong>Responsable:</strong> {item.lawyer}</p>
          </Card>
          <Card>
            <h2 className="card-title">Avance</h2>
            <p className="stat-value">{item.progress}%</p>
            <div className="progress" style={{ '--value': `${item.progress}%` }}><span /></div>
          </Card>
          <Card>
            <h2 className="card-title">Rama judicial</h2>
            <p className="card-muted">{item.court}</p>
            <Button variant="secondary" style={{ marginTop: 12 }}><ExternalLink size={16} /> Enlace simulado</Button>
          </Card>
        </section>
      )}

      {tab === 'Documentos' && (
        <Card>
          <h2 className="card-title">Documentos del caso</h2>
          <DataTable
            data={caseDocuments}
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'type', label: 'Tipo' },
              { key: 'size', label: 'Tamaño' },
              { key: 'uploadedAt', label: 'Fecha', render: (row) => formatDate(row.uploadedAt) },
              { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
            ]}
            emptyMessage="No hay documentos para este caso."
          />
        </Card>
      )}

      {tab === 'Actividades' && (
        <Card>
          <h2 className="card-title">Historial de actividades</h2>
          <DataTable
            data={caseActivities}
            columns={[
              { key: 'title', label: 'Actividad' },
              { key: 'date', label: 'Fecha', render: (row) => formatDate(row.date) },
              { key: 'hours', label: 'Horas' },
              { key: 'billable', label: 'Facturable', render: (row) => (row.billable ? 'Sí' : 'No') },
              { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
            ]}
            emptyMessage="No hay actividades para este caso."
          />
        </Card>
      )}

      {tab === 'Audiencias' && (
        <Card>
          <h2 className="card-title">Calendario procesal</h2>
          <div className="kpi-row">
            <div>
              <strong>Próxima audiencia o término</strong>
              <p className="card-muted">{item.court}</p>
            </div>
            <span className="badge badge-warning"><CalendarDays size={14} /> {formatDate(item.nextHearing)}</span>
          </div>
        </Card>
      )}
    </>
  );
}
