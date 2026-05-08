import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { clients } from '../../../shared/data/mockData.js';
import { formatDate, normalizeText } from '../../../shared/utils/formatters.js';

export function ClientesListPage() {
  const { t } = useUI();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = normalizeText(query);
    return clients.filter((client) =>
      [client.name, client.document, client.email, client.city, client.status]
        .map(normalizeText)
        .some((value) => value.includes(normalized))
    );
  }, [query]);

  const columns = [
    { key: 'name', label: 'Cliente', render: (row) => <strong>{row.name}</strong> },
    { key: 'document', label: 'Documento' },
    { key: 'type', label: 'Tipo' },
    { key: 'city', label: 'Ciudad' },
    { key: 'cases', label: 'Casos' },
    { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> },
    { key: 'lastUpdate', label: 'Actualizado', render: (row) => formatDate(row.lastUpdate) },
    {
      key: 'actions',
      label: 'Acciones',
      render: (row) => (
        <Link to={`/app/clientes/${row.id}`}>
          <Button variant="secondary"><Eye size={16} /> Ver</Button>
        </Link>
      )
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Módulo clientes"
        title={t('clients.title')}
        description="Registro, búsqueda y consulta de clientes naturales o jurídicos con información asociada a casos y documentos."
        actions={<Link to="/app/clientes/nuevo"><Button><Plus size={18} /> {t('actions.newClient')}</Button></Link>}
      />
      <Card>
        <div className="toolbar">
          <Input className="search-box" label="Buscar cliente" placeholder="Nombre, documento, correo, ciudad..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <span className="badge badge-neutral">{filtered.length} registros</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </Card>
    </>
  );
}
