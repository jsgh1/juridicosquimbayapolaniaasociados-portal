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
import { Select } from '../../../shared/components/Select.jsx';
import { cases } from '../../../shared/data/mockData.js';
import { formatDate, normalizeText } from '../../../shared/utils/formatters.js';

export function CasosListPage() {
  const { t } = useUI();
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');

  const filtered = useMemo(() => {
    const normalized = normalizeText(query);
    return cases.filter((item) => {
      const matchesText = [item.id, item.title, item.client, item.status, item.area].map(normalizeText).some((value) => value.includes(normalized));
      const matchesArea = area ? item.area === area : true;
      return matchesText && matchesArea;
    });
  }, [query, area]);

  return (
    <>
      <PageHeader
        eyebrow="Módulo casos"
        title={t('cases.title')}
        description="Creación, búsqueda y seguimiento visual de procesos jurídicos por cliente, área y estado."
        actions={<Link to="/app/casos/nuevo"><Button><Plus size={18} /> {t('actions.newCase')}</Button></Link>}
      />
      <Card>
        <div className="toolbar">
          <Input className="search-box" label="Buscar caso" placeholder="ID, cliente, estado, título..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Select label="Área jurídica" value={area} onChange={(event) => setArea(event.target.value)} options={['Laboral', 'Comercial', 'Familia', 'Civil']} />
          <span className="badge badge-neutral">{filtered.length} registros</span>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: 'id', label: 'Radicado interno', render: (row) => <strong>{row.id}</strong> },
            { key: 'title', label: 'Caso' },
            { key: 'client', label: 'Cliente' },
            { key: 'area', label: 'Área' },
            { key: 'priority', label: 'Prioridad', render: (row) => <Badge>{row.priority}</Badge> },
            { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> },
            { key: 'nextHearing', label: 'Próxima fecha', render: (row) => formatDate(row.nextHearing) },
            { key: 'actions', label: 'Acciones', render: (row) => <Link to={`/app/casos/${row.id}`}><Button variant="secondary"><Eye size={16} /> Ver</Button></Link> }
          ]}
        />
      </Card>
    </>
  );
}
