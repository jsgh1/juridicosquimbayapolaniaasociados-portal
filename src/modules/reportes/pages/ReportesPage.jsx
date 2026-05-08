import { Download, FileSpreadsheet } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { Select } from '../../../shared/components/Select.jsx';
import { activities, cases, clients, documents } from '../../../shared/data/mockData.js';

export function ReportesPage() {
  const { addToast } = useUI();

  const exportReport = (type) => {
    addToast({ title: `Exportación ${type}`, message: 'La descarga se simuló para esta entrega frontend.' });
  };

  return (
    <>
      <PageHeader
        eyebrow="Informes ejecutivos"
        title="Reportes"
        description="Panel de reportes con filtros y simulación de exportación a PDF, Excel y Word."
      />
      <section className="grid grid-3">
        <Card>
          <h2 className="card-title">Reporte de clientes</h2>
          <p className="card-muted">Clientes activos, inactivos y casos relacionados.</p>
          <p className="stat-value">{clients.length}</p>
          <Button onClick={() => exportReport('PDF')}><Download size={18} /> Exportar PDF</Button>
        </Card>
        <Card>
          <h2 className="card-title">Reporte de casos</h2>
          <p className="card-muted">Procesos por área, estado, prioridad y responsable.</p>
          <p className="stat-value">{cases.length}</p>
          <Button variant="secondary" onClick={() => exportReport('Excel')}><FileSpreadsheet size={18} /> Exportar Excel</Button>
        </Card>
        <Card>
          <h2 className="card-title">Reporte de actividad</h2>
          <p className="card-muted">Horas invertidas, facturables y no facturables.</p>
          <p className="stat-value">{activities.length}</p>
          <Button variant="secondary" onClick={() => exportReport('Word')}><Download size={18} /> Exportar Word</Button>
        </Card>
      </section>
      <Card style={{ marginTop: 18 }}>
        <h2 className="card-title">Filtros del reporte</h2>
        <div className="form-grid" style={{ marginTop: 16 }}>
          <Select label="Módulo" options={['Clientes', 'Casos', 'Documentos', 'Actividades']} />
          <Select label="Periodo" options={['Últimos 7 días', 'Últimos 30 días', 'Este mes', 'Este año']} />
          <Select label="Formato" options={['PDF', 'Excel', 'Word']} />
          <div className="field">
            <label>Total documentos</label>
            <span className="badge badge-neutral">{documents.length} archivos</span>
          </div>
        </div>
      </Card>
    </>
  );
}
