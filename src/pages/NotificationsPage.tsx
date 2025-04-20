import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import NotificationItem from '../components/NotificationItem';

const NotificationsPage: React.FC = () => {
  const { notifications } = useAppContext();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No notifications yet.</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;