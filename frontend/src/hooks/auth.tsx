import React, { createContext, useCallback, useContext, useState } from 'react';
import { main } from '../services/api';

interface SignInCreadentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCreadentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Friendletter:token');
    const user = localStorage.getItem('@Friendletter:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await main.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Friendletter:token', token);
    localStorage.setItem('@Friendletter:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Friendletter:token');
    localStorage.removeItem('@Friendletter:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
