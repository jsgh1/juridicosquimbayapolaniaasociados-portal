import { AppRouter } from '../router/AppRouter.jsx';
import { UIProvider } from '../store/UIContext.jsx';
import { AuthProvider } from '../store/AuthContext.jsx';
import { ToastContainer } from '../shared/components/ToastContainer.jsx';

export function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
      </AuthProvider>
    </UIProvider>
  );
}
