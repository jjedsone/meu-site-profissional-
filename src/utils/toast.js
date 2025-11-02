// Sistema de gerenciamento de toasts

let toastListeners = [];

export const toast = {
  // Mostrar toast genérico
  show: (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    toastListeners.forEach((listener) => {
      listener({ id, message, type, duration });
    });
    return id;
  },

  // Métodos específicos
  success: (message, duration = 5000) => {
    return toast.show(message, 'success', duration);
  },

  error: (message, duration = 5000) => {
    return toast.show(message, 'error', duration);
  },

  warning: (message, duration = 5000) => {
    return toast.show(message, 'warning', duration);
  },

  info: (message, duration = 5000) => {
    return toast.show(message, 'info', duration);
  },

  // Registrar listener
  subscribe: (listener) => {
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  },
};

