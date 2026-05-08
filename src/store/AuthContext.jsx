import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const demoUser = {
  id: 1,
  name: 'Juan S. Gonzalez',
  email: 'admin@jqpa.com',
  role: 'Administrador',
  avatar: 'JG'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('jqpa-user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({ email }) => {
    const nextUser = { ...demoUser, email: email || demoUser.email };
    setUser(nextUser);
    localStorage.setItem('jqpa-user', JSON.stringify(nextUser));
    localStorage.setItem('jqpa-token', 'frontend-demo-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jqpa-user');
    localStorage.removeItem('jqpa-token');
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
