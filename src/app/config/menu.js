import {
  Activity,
  BarChart3,
  Briefcase,
  Calculator,
  FileText,
  Home,
  Scale,
  Settings,
  Users
} from 'lucide-react';

export const menuItems = [
  { labelKey: 'nav.dashboard', path: '/app/dashboard', icon: Home },
  { labelKey: 'nav.clients', path: '/app/clientes', icon: Users },
  { labelKey: 'nav.cases', path: '/app/casos', icon: Briefcase },
  { labelKey: 'nav.documents', path: '/app/documentos', icon: FileText },
  { labelKey: 'nav.activities', path: '/app/actividades', icon: Activity },
  { labelKey: 'nav.calculator', path: '/app/calculadora-laboral', icon: Calculator },
  { labelKey: 'nav.reports', path: '/app/reportes', icon: BarChart3 },
  { labelKey: 'nav.admin', path: '/app/administracion', icon: Settings }
];

export const appIdentity = {
  name: 'JQPA',
  shortName: 'JQPA',
  slogan: 'Gestión jurídica modular'
};
