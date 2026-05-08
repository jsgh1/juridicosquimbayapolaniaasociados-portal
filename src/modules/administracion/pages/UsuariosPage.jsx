import { ShieldCheck, UserPlus } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Badge } from '../../../shared/components/Badge.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { DataTable } from '../../../shared/components/DataTable.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { users } from '../../../shared/data/mockData.js';

export function UsuariosPage() {
  const { addToast } = useUI();

  return (
    <>
      <PageHeader
        eyebrow="Configuración del sistema"
        title="Administración de usuarios"
        description="Gestión visual de usuarios, roles y permisos granulares que serán conectados al backend en una fase posterior."
        actions={<Button onClick={() => addToast({ title: 'Usuario simulado', message: 'Se abrió el flujo de creación de usuario.' })}><UserPlus size={18} /> Nuevo usuario</Button>}
      />
      <section className="grid grid-3">
        <Card>
          <h2 className="card-title"><ShieldCheck size={18} /> Roles definidos</h2>
          <div className="kpi-list" style={{ marginTop: 14 }}>
            <div className="kpi-row"><span>Administrador</span><Badge>Activo</Badge></div>
            <div className="kpi-row"><span>Abogado</span><Badge>Activo</Badge></div>
            <div className="kpi-row"><span>Abogado</span><Badge>Activo</Badge></div>
          </div>
        </Card>
        <Card className="grid" style={{ gridColumn: 'span 2' }}>
          <h2 className="card-title">Matriz de usuarios</h2>
          <DataTable
            data={users}
            columns={[
              { key: 'name', label: 'Usuario', render: (row) => <strong>{row.name}</strong> },
              { key: 'email', label: 'Correo' },
              { key: 'role', label: 'Rol' },
              { key: 'status', label: 'Estado', render: (row) => <Badge>{row.status}</Badge> }
            ]}
          />
        </Card>
      </section>
    </>
  );
}
