import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface ToastData {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastData, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToast] = useState<ToastData[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastData, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setToast(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToast(state => state.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
