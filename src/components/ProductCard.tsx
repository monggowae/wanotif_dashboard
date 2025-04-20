import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Product } from '../types';
import NotificationBubble from './NotificationBubble';
import { X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addOrder, settings } = useAppContext();
  const [isOrdering, setIsOrdering] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!settings.whatsappApiKey || !settings.senderPhone) {
      setNotification({
        message: 'WhatsApp API settings not configured. Please contact the administrator.',
        type: 'error'
      });
      return;
    }
    setIsOrdering(true);
    setShowDetails(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addOrder(product.id, buyerName, buyerPhone);
      setIsOrdering(false);
      setNotification({
        message: 'Order placed successfully! Check your WhatsApp for confirmation.',
        type: 'success'
      });
      setBuyerName('');
      setBuyerPhone('');
    } catch (error) {
      let errorMessage = 'Failed to place order. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotification({
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="relative flex flex-col h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl h-full">
        <div 
          className="cursor-pointer h-full"
          onClick={() => setShowDetails(true)}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button
              onClick={handleOrderClick}
              className="w-full px-4 py-2 bg-[#25D366] text-white rounded hover:bg-[#128C7E] transition-colors"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Details Modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4 md:p-6"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-50"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="ml-2 text-xl font-bold text-[#25D366]">{formatPrice(product.price)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Credits:</span>
                      <span className="ml-2">{product.credits} credits</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Validity Period:</span>
                      <span className="ml-2">{product.validityDays} days</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleOrderClick}
                    className="mt-6 w-full px-4 py-2 bg-[#25D366] text-white rounded hover:bg-[#128C7E] transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Order Form Modal */}
      {isOrdering && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOrdering(false)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Order {product.name}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOrdering(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {notification && (
        <NotificationBubble
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ProductCard;