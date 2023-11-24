import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    // Lógica de login, por exemplo, ao verificar um token JWT.
    setAuthenticated(true);
  };

  const logout = () => {
    // Lógica de logout, por exemplo, limpar o token JWT.
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

