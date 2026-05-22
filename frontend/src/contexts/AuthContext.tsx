import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

// Tipagens do Usuário que vem da API
interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_subscriber: boolean;
  credits: number;
  created_at: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Efeito executado assim que a aplicação carrega para verificar se o usuário já estava logado antes
  useEffect(() => {
    const storedToken = localStorage.getItem("@NexoAI:token");
    const storedUser = localStorage.getItem("@NexoAI:user");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, userData: User) => {
    // Salvamos o token e os dados no navegador do usuário
    localStorage.setItem("@NexoAI:token", token);
    localStorage.setItem("@NexoAI:user", JSON.stringify(userData));
    setUser(userData);
    
    // Opcional: Redirecionar após logar com sucesso
    navigate("/app");
  };

  const logout = () => {
    localStorage.removeItem("@NexoAI:token");
    localStorage.removeItem("@NexoAI:user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
