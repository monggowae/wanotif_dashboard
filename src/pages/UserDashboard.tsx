import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CreditCard, Clock } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { currentUser, orders, notifications } = useAppContext();

  // Get last 5 orders
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get last 5 credit-related notifications
  const creditHistory = notifications
    .filter(n => n.type === 'credit_added')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>

      {/* Credit Balance Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Credit Balance</h2>
            <p className="text-3xl font-bold text-[#25D366] mt-2">
              {currentUser?.credits || 0}
            </p>
          </div>
          <CreditCard className="h-12 w-12 text-[#25D366]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent orders</p>
          )}
        </div>

        {/* Credit Usage History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Credit Activity</h2>
          {creditHistory.length > 0 ? (
            <div className="space-y-4">
              {creditHistory.map(activity => (
                <div key={activity.id} className="flex items-center space-x-3 border-b border-gray-200 pb-4 last:border-0">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent credit activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;