import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState, User } from '../types/auth';

interface AuthContextType extends AuthState {
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });
  const navigate = useNavigate();

  const register = useCallback(async (data: { name: string; email: string; password: string }) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implement Firebase registration
      // For now, just simulate a successful registration
      setState(prev => ({
        ...prev,
        loading: false,
        user: {
          id: '1',
          email: data.email,
          name: data.name,
          photoURL: null,
        },
      }));
      navigate('/');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao criar conta',
      }));
    }
  }, [navigate]);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implement Firebase login
      setState(prev => ({
        ...prev,
        loading: false,
        user: {
          id: '1',
          email,
          name: 'User',
          photoURL: null,
        },
      }));
      navigate('/');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao fazer login',
      }));
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implement Firebase logout
      setState(prev => ({
        ...prev,
        loading: false,
        user: null,
      }));
      navigate('/login');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao fazer logout',
      }));
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);