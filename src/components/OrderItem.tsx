import React from 'react';
import { Check, X } from 'lucide-react';
import { Order } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { products, updateOrderStatus } = useAppContext();
  
  const product = products.find(p => p.id === order.productId);
  
  if (!product) return null;
  
  const handleAccept = () => {
    updateOrderStatus(order.id, 'accepted');
  };
  
  const handleReject = () => {
    updateOrderStatus(order.id, 'rejected');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-l-transparent transition-all duration-300 hover:shadow-lg"
      style={{ 
        borderLeftColor: 
          order.status === 'pending' ? '#F59E0B' : 
          order.status === 'accepted' ? '#10B981' : 
          '#EF4444' 
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <h3 className="font-medium text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm">Order #{order.id}</p>
          <p className="text-gray-600 text-sm">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div className="mt-3 sm:mt-0">
          <p className="text-sm font-medium">
            Customer: {order.buyerName}
          </p>
          <p className="text-sm text-gray-600">
            Phone: {order.buyerPhone}
          </p>
          <p className="text-sm">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {order.status === 'pending' ? 'Pending' :
               order.status === 'accepted' ? 'Accepted' : 'Rejected'}
            </span>
          </p>
        </div>
      </div>
      
      {order.status === 'pending' && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleReject}
            className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded hover:bg-red-50"
          >
            <X size={16} className="mr-1" />
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Check size={16} className="mr-1" />
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;