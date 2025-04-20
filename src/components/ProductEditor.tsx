import React, { useState } from 'react';
import { Product } from '../types';
import { Trash2 } from 'lucide-react';

interface ProductEditorProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onDelete }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    onSave(editedProduct);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(product.id);
    setShowDeleteConfirm(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <div className="mt-2">
              <span className="text-gray-700 font-medium">Price: </span>
              <span className="text-gray-900">{formatPrice(product.price)}</span>
            </div>
            <div className="mt-1">
              <span className="text-gray-700 font-medium">Credits: </span>
              <span className="text-gray-900">{product.credits}</span>
            </div>
            <div className="mt-1">
              <span className="text-gray-700 font-medium">Validity: </span>
              <span className="text-gray-900">{product.validityDays} days</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
            <p className="text-red-700 mb-3">Are you sure you want to delete this package?</p>
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Package
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={editedProduct.description}
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (IDR)</label>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
              step="1000"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Credits</label>
            <input
              type="number"
              value={editedProduct.credits}
              onChange={(e) => setEditedProduct({ ...editedProduct, credits: parseInt(e.target.value) })}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Validity (Days)</label>
            <input
              type="number"
              value={editedProduct.validityDays}
              onChange={(e) => setEditedProduct({ ...editedProduct, validityDays: parseInt(e.target.value) })}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={editedProduct.image}
            onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
          />
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;