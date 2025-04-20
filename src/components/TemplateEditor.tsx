import React, { useState } from 'react';
import { WhatsAppTemplate } from '../types';
import { MessageSquare } from 'lucide-react';

interface TemplateEditorProps {
  template: WhatsAppTemplate;
  onSave: (updatedTemplate: WhatsAppTemplate) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onSave }) => {
  const [message, setMessage] = useState(template.message);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSave = () => {
    onSave({ ...template, message });
    setIsEditing(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  // Define available variables for each template type
  const getVariablesHelp = () => {
    const commonVars = ['{customer_name}', '{product_name}', '{order_id}'];
    
    return (
      <div className="mt-2 text-sm text-gray-600">
        <p>Available variables:</p>
        <ul className="list-disc pl-5 mt-1">
          {commonVars.map(variable => (
            <li key={variable}>{variable}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <MessageSquare className="h-5 w-5 text-[#25D366] mr-2" />
        <h3 className="text-lg font-medium text-gray-800">{template.title}</h3>
      </div>
      
      {isEditing ? (
        <>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366] h-32"
          />
          {getVariablesHelp()}
          <div className="mt-3 flex justify-end space-x-2">
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
              Save Template
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 whitespace-pre-wrap">
            {message}
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Edit Template
            </button>
          </div>
        </>
      )}
      
      {saveSuccess && (
        <div className="mt-3 text-sm text-green-600 flex items-center">
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Template saved successfully!
        </div>
      )}
    </div>
  );
};

// Small CheckCircle icon component
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default TemplateEditor;