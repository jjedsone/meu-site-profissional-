import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import '../style/Toast.css';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type] || Info;

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <Icon className="toast-icon" />
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;

