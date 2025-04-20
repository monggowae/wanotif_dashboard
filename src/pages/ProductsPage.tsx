import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const { products } = useAppContext();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our range of professional services and place an order to get started.
          You'll receive WhatsApp notifications throughout the order process.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;