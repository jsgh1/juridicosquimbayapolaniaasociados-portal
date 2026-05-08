import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, FileText, Mail, Phone } from 'lucide-react';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { cases, clients, documents } from '../../../shared/data/mockData.js';
import { formatDate } from '../../../shared/utils/formatters.js';

export function ClienteDetailPage() {
  const { id } = useParams();
  const client = clients.find((item) => item.id === Number(id)) || clients[0];
  const clientCases = cases.filter((item) => item.client === client.name);
  const clientDocuments = documents.filter((doc) => clientCases.some((item) => item.id === doc.caseId));

  return (
    <>
      <PageHeader
        eyebrow="Perfil del cliente"
        title={client.name}
        description="Vista 360 del cliente con casos, documentos y datos principales."
        actions={<Link to="/app/clientes"><Button variant="secondary"><ArrowLeft size={18} /> Volver</Button></Link>}
      />

      <section className="grid grid-3">
        <Card>
          <h2 className="card-title">Información principal</h2>
          <p className="card-muted"><strong>Documento:</strong> {client.document}</p>
          <p className="card-muted"><strong>Tipo:</strong> {client.type}</p>
          <p className="card-muted"><strong>Ciudad:</strong> {client.city}</p>
          <p style={{ marginTop: 12 }}><Badge>{client.status}</Badge></p>
        </Card>
        <Card>
          <h2 className="card-title">Contacto</h2>
          <p className="card-muted"><Mail size={15} /> {client.email}</p>
          <p className="card-muted"><Phone size={15} /> {client.phone}</p>
          <p className="card-muted">Actualizado: {formatDate(client.lastUpdate)}</p>
        </Card>
        <Card>
          <h2 className="card-title">Resumen jurídico</h2>
          <p className="card-muted"><Briefcase size={15} /> {clientCases.length} casos asociados</p>
          <p className="card-muted"><FileText size={15} /> {clientDocuments.length} documentos asociados</p>
        </Card>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <Card>
          <h2 className="card-title">Casos asociados</h2>
          <DataTable
            data={clientCases}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'title', label: 'Caso' },
              { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
            ]}
            emptyMessage="Este cliente no tiene casos asociados."
          />
        </Card>
        <Card>
          <h2 className="card-title">Documentos asociados</h2>
          <DataTable
            data={clientDocuments}
            columns={[
              { key: 'name', label: 'Documento' },
              { key: 'type', label: 'Tipo' },
              { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
            ]}
            emptyMessage="Este cliente no tiene documentos asociados."
          />
        </Card>
      </section>
    </>
  );
}
