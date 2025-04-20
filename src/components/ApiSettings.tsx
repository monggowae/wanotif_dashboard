import React, { useState } from 'react';
import { Settings } from '../types';
import { validatePhoneNumber } from '../config/whatsapp';

interface ApiSettingsProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ settings, onSave }) => {
  const [apiKey, setApiKey] = useState(settings.whatsappApiKey);
  const [senderPhone, setSenderPhone] = useState(settings.senderPhone);
  const [welcomeCredits, setWelcomeCredits] = useState(settings.welcomeCredits || 0);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }

    setError(null);
    onSave({
      ...settings,
      whatsappApiKey: apiKey,
    });
    setShowSuccess('apiKey');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleSaveSenderPhone = () => {
    if (!validatePhoneNumber(senderPhone)) {
      setError('Invalid phone number format');
      return;
    }

    setError(null);
    onSave({
      ...settings,
      senderPhone: senderPhone,
    });
    setShowSuccess('phone');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleSaveWelcomeCredits = () => {
    if (welcomeCredits < 0) {
      setError('Welcome credits cannot be negative');
      return;
    }

    setError(null);
    onSave({
      ...settings,
      welcomeCredits: welcomeCredits
    });
    setShowSuccess('credits');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">WhatsApp API Settings</h3>
        
        <div className="mb-6">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Starsender API Key
          </label>
          <div className="flex space-x-2">
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              placeholder="Enter your Starsender API key"
            />
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] whitespace-nowrap"
            >
              Save API Key
            </button>
          </div>
          {showSuccess === 'apiKey' && (
            <p className="mt-2 text-sm text-green-600">API Key saved successfully!</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Sender WhatsApp Number
          </label>
          <div className="flex space-x-2">
            <input
              type="tel"
              id="senderPhone"
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              placeholder="Enter sender WhatsApp number"
            />
            <button
              onClick={handleSaveSenderPhone}
              className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] whitespace-nowrap"
            >
              Save Phone
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Format: Country code without + (e.g., 628123456789)
          </p>
          {showSuccess === 'phone' && (
            <p className="mt-2 text-sm text-green-600">Phone number saved successfully!</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Settings</h3>
        <div className="mb-6">
          <label htmlFor="welcomeCredits" className="block text-sm font-medium text-gray-700 mb-2">
            Welcome Credits
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="welcomeCredits"
              value={welcomeCredits}
              onChange={(e) => setWelcomeCredits(parseInt(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              placeholder="Enter welcome credits amount"
              min="0"
            />
            <button
              onClick={handleSaveWelcomeCredits}
              className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] whitespace-nowrap"
            >
              Save Credits
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Credits given to new users upon registration
          </p>
          {showSuccess === 'credits' && (
            <p className="mt-2 text-sm text-green-600">Welcome credits saved successfully!</p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default ApiSettings;