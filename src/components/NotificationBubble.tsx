import React, { useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationBubbleProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const NotificationBubble: React.FC<NotificationBubbleProps> = ({ 
  message, 
  type = 'info',
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-[#25D366]" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-[#25D366]';
    }
  };
  
  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full animate-slideIn z-50 border-l-4 ${getBorderColor()}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBubble;