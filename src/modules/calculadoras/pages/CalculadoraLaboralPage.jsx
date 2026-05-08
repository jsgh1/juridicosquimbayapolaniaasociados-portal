import { useMemo, useState } from 'react';
import { Calculator, FileText } from 'lucide-react';
import { useUI } from '../../../store/UIContext.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Input } from '../../../shared/components/Input.jsx';
import { PageHeader } from '../../../shared/components/PageHeader.jsx';
import { Select } from '../../../shared/components/Select.jsx';
import { legalConstants } from '../../../shared/data/mockData.js';
import { formatCurrency } from '../../../shared/utils/formatters.js';

export function CalculadoraLaboralPage() {
  const { addToast } = useUI();
  const [salary, setSalary] = useState(1800000);
  const [days, setDays] = useState(180);
  const [transport, setTransport] = useState(200000);
  const [contractType, setContractType] = useState('Indefinido');

  const result = useMemo(() => {
    const base = Number(salary) + Number(transport);
    const cesantias = (base * Number(days)) / 360;
    const intereses = cesantias * 0.12 * (Number(days) / 360);
    const prima = (base * Number(days)) / 360;
    const vacaciones = (Number(salary) * Number(days)) / 720;
    const total = cesantias + intereses + prima + vacaciones;
    return { cesantias, intereses, prima, vacaciones, total };
  }, [salary, days, transport]);

  return (
    <>
      <PageHeader
        eyebrow="Calculadora jurídica"
        title="Calculadora laboral básica"
        description="Simulación frontend de liquidación laboral para demostrar cálculos, validaciones visuales y generación futura de reportes PDF."
        actions={<Button onClick={() => addToast({ title: 'Reporte generado', message: 'Se simuló la generación del reporte de cálculo.' })}><FileText size={18} /> Generar reporte</Button>}
      />
      <section className="grid grid-2">
        <Card>
          <h2 className="card-title">Datos del cálculo</h2>
          <form className="form-grid" style={{ marginTop: 16 }}>
            <Input label="Salario mensual" type="number" value={salary} onChange={(event) => setSalary(event.target.value)} />
            <Input label="Auxilio transporte" type="number" value={transport} onChange={(event) => setTransport(event.target.value)} />
            <Input label="Días trabajados" type="number" value={days} onChange={(event) => setDays(event.target.value)} />
            <Select label="Tipo de contrato" value={contractType} onChange={(event) => setContractType(event.target.value)} options={['Indefinido', 'Fijo', 'Obra o labor']} />
          </form>
          <p className="card-muted" style={{ marginTop: 14 }}>
            Nota: cálculo académico aproximado para exposición frontend. La versión final debe validar reglas legales con backend y constantes actualizadas.
          </p>
        </Card>

        <Card>
          <h2 className="card-title"><Calculator size={18} /> Resultado estimado</h2>
          <div className="kpi-list" style={{ marginTop: 16 }}>
            <div className="kpi-row"><span>Cesantías</span><strong>{formatCurrency(result.cesantias)}</strong></div>
            <div className="kpi-row"><span>Intereses de cesantías</span><strong>{formatCurrency(result.intereses)}</strong></div>
            <div className="kpi-row"><span>Prima de servicios</span><strong>{formatCurrency(result.prima)}</strong></div>
            <div className="kpi-row"><span>Vacaciones</span><strong>{formatCurrency(result.vacaciones)}</strong></div>
            <div className="kpi-row"><span>Total estimado</span><strong>{formatCurrency(result.total)}</strong></div>
          </div>
        </Card>
      </section>
      <Card style={{ marginTop: 18 }}>
        <h2 className="card-title">Constantes legales usadas en la demo</h2>
        <div className="grid grid-4" style={{ marginTop: 14 }}>
          {legalConstants.map((constant) => (
            <div className="kpi-row" key={constant.label}>
              <span>{constant.label}</span>
              <strong>{constant.value}</strong>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
