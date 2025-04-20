import React from 'react';
import { MessageSquare, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Notification } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markNotificationAsRead } = useAppContext();
  
  const getIcon = () => {
    switch (notification.type) {
      case 'order_placed':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'order_accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'order_rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'admin_notification':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handleClick = () => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
  };
  
  return (
    <div 
      className={`p-4 rounded-lg mb-3 border-l-4 cursor-pointer transition-all duration-300 ${
        notification.read ? 'bg-gray-50 border-gray-300' : 'bg-white border-blue-500 shadow-md'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0 ml-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;