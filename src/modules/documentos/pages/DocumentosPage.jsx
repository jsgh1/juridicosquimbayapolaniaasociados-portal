import { Upload } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { documents } from '../../../shared/data/mockData.js';
import { formatDate } from '../../../shared/utils/formatters.js';

export function DocumentosPage() {
  const { addToast } = useUI();

  return (
    <>
      <PageHeader
        eyebrow="Repositorio jurídico"
        title="Documentos"
        description="Gestión visual de documentos de clientes y casos: poderes, pruebas, actas, demandas y anexos."
        actions={<Button onClick={() => addToast({ title: 'Carga simulada', message: 'El documento fue validado visualmente en frontend.' })}><Upload size={18} /> Cargar documento</Button>}
      />
      <Card>
        <DataTable
          data={documents}
          columns={[
            { key: 'name', label: 'Documento', render: (row) => <strong>{row.name}</strong> },
            { key: 'caseId', label: 'Caso' },
            { key: 'type', label: 'Tipo' },
            { key: 'size', label: 'Tamaño' },
            { key: 'uploadedAt', label: 'Fecha de carga', render: (row) => formatDate(row.uploadedAt) },
            { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
          ]}
        />
      </Card>
    </>
  );
}
