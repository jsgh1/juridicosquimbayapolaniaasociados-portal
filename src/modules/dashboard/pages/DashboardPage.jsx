import { Activity, Briefcase, CalendarDays, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUI } from '../../../store/UIContext.jsx';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { StatCard } from '../../../shared/components/StatCard.jsx';
import { activities, cases, clients, documents } from '../../../shared/data/mockData.js';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters.js';

export function DashboardPage() {
  const { t } = useUI();
  const activeCases = cases.filter((item) => item.status !== 'Cerrado');
  const billableHours = activities.filter((item) => item.billable).reduce((sum, item) => sum + item.hours, 0);

  return (
    <>
      <PageHeader
        eyebrow="Resumen ejecutivo"
        title={t('dashboard.title')}
        description={t('dashboard.description')}
        actions={
          <>
            <Link to="/app/clientes/nuevo"><Button>{t('actions.newClient')}</Button></Link>
            <Link to="/app/casos/nuevo"><Button variant="secondary">{t('actions.newCase')}</Button></Link>
          </>
        }
      />

      <section className="grid grid-4">
        <StatCard label="Clientes activos" value={clients.filter((client) => client.status === 'Activo').length} trend="Base jurídica organizada" icon={Users} />
        <StatCard label="Casos abiertos" value={activeCases.length} trend="Seguimiento por prioridad" icon={Briefcase} />
        <StatCard label="Documentos" value={documents.length} trend="Repositorio simulado" icon={FileText} />
        <StatCard label="Horas facturables" value={billableHours} trend={formatCurrency(billableHours * 120000)} icon={Activity} />
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <Card>
          <h2 className="card-title">Casos prioritarios</h2>
          <p className="card-muted">Avance y estado de los procesos más importantes.</p>
          <div className="kpi-list" style={{ marginTop: 16 }}>
            {cases.slice(0, 3).map((item) => (
              <div className="kpi-row" key={item.id}>
                <div style={{ flex: 1 }}>
                  <strong>{item.id}</strong>
                  <p className="card-muted">{item.title}</p>
                  <div className="progress" style={{ '--value': `${item.progress}%` }}><span /></div>
                </div>
                <Badge>{item.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="card-title">Próximas audiencias y términos</h2>
          <p className="card-muted">Vista rápida para preparar la semana.</p>
          <div className="kpi-list" style={{ marginTop: 16 }}>
            {cases.filter((item) => item.nextHearing !== 'Sin audiencia').map((item) => (
              <div className="kpi-row" key={item.id}>
                <div>
                  <strong>{item.client}</strong>
                  <p className="card-muted">{item.court}</p>
                </div>
                <span className="badge badge-warning"><CalendarDays size={14} /> {formatDate(item.nextHearing)}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
