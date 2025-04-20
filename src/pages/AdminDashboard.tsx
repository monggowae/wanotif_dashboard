import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Plus, Search } from 'lucide-react';
import TemplateEditor from '../components/TemplateEditor';
import ApiSettings from '../components/ApiSettings';
import ProductEditor from '../components/ProductEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';

const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    whatsappTemplates, 
    updateWhatsAppTemplate, 
    settings, 
    updateSettings, 
    products, 
    updateProduct,
    deleteProduct, 
    addProduct,
    updateOrderStatus 
  } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
                       (!endDate || new Date(order.createdAt) <= new Date(endDate));
    const matchesSearch = !searchQuery || 
                         order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.buyerPhone.includes(searchQuery);
    return matchesStatus && matchesDate && matchesSearch;
  });

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: 'New Credit Package',
      description: 'Description of the credit package',
      price: 0,
      credits: 0,
      image: 'https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg'
    };
    addProduct(newProduct);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-[#25D366] text-[#25D366]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders Management
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-[#25D366] text-[#25D366]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products Management
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-[#25D366] text-[#25D366]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              WhatsApp Templates
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-[#25D366] text-[#25D366]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'orders' && (
        <div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map(order => {
                  const product = products.find(p => p.id === order.productId);
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.buyerName}</div>
                        <div className="text-sm text-gray-500">{order.buyerPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateOrderStatus(order.id, 'accepted')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Products Management</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Package
            </button>
          </div>
          
          <div className="space-y-6">
            {products.map(product => (
              <ProductEditor 
                key={product.id} 
                product={product}
                onSave={updateProduct}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'templates' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">WhatsApp Message Templates</h2>
          <p className="text-gray-600 mb-6">
            Customize the WhatsApp messages sent to customers and admins.
          </p>
          
          <div className="space-y-6">
            {whatsappTemplates.map(template => (
              <TemplateEditor 
                key={template.id} 
                template={template} 
                onSave={updateWhatsAppTemplate} 
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">WhatsApp API Settings</h2>
          <ApiSettings settings={settings} onSave={updateSettings} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;