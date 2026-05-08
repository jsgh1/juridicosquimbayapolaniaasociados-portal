import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { AuthLayout } from '../layouts/AuthLayout.jsx';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { LoginPage } from '../modules/auth/pages/LoginPage.jsx';
import { RegisterPage } from '../modules/auth/pages/RegisterPage.jsx';
import { RecoverPasswordPage } from '../modules/auth/pages/RecoverPasswordPage.jsx';
import { DashboardPage } from '../modules/dashboard/pages/DashboardPage.jsx';
import { ClientesListPage } from '../modules/clientes/pages/ClientesListPage.jsx';
import { ClienteCreatePage } from '../modules/clientes/pages/ClienteCreatePage.jsx';
import { ClienteDetailPage } from '../modules/clientes/pages/ClienteDetailPage.jsx';
import { CasosListPage } from '../modules/casos/pages/CasosListPage.jsx';
import { CasoCreatePage } from '../modules/casos/pages/CasoCreatePage.jsx';
import { CasoDetailPage } from '../modules/casos/pages/CasoDetailPage.jsx';
import { DocumentosPage } from '../modules/documentos/pages/DocumentosPage.jsx';
import { ActividadesPage } from '../modules/actividades/pages/ActividadesPage.jsx';
import { CalculadoraLaboralPage } from '../modules/calculadoras/pages/CalculadoraLaboralPage.jsx';
import { ReportesPage } from '../modules/reportes/pages/ReportesPage.jsx';
import { UsuariosPage } from '../modules/administracion/pages/UsuariosPage.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/recuperar" element={<RecoverPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clientes" element={<ClientesListPage />} />
          <Route path="clientes/nuevo" element={<ClienteCreatePage />} />
          <Route path="clientes/:id" element={<ClienteDetailPage />} />
          <Route path="casos" element={<CasosListPage />} />
          <Route path="casos/nuevo" element={<CasoCreatePage />} />
          <Route path="casos/:id" element={<CasoDetailPage />} />
          <Route path="documentos" element={<DocumentosPage />} />
          <Route path="actividades" element={<ActividadesPage />} />
          <Route path="calculadora-laboral" element={<CalculadoraLaboralPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          <Route path="administracion" element={<UsuariosPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
