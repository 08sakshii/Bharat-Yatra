

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed bottom-6 left-6 ${colors[type]} text-white p-4 rounded-xl shadow-2xl flex items-center space-x-3 max-w-md z-[9999] animate-slideIn`}>
      {icons[type]}
      <p className="flex-1 font-semibold">{message}</p>
      <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;