import { useState, useEffect } from 'react';
import { toast } from '../utils/toast';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((newToast) => {
      setToasts((prev) => [...prev, newToast]);
    });

    return unsubscribe;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, removeToast };
};

