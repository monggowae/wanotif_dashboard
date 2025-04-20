import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, Notification, WhatsAppTemplate, Settings, User } from '../types';
import { defaultProducts } from '../data/products';
import { defaultWhatsAppTemplates } from '../data/whatsappTemplates';
import { WhatsAppService } from '../services/whatsapp';

interface AppState {
  products: Product[];
  orders: Order[];
  notifications: Notification[];
  whatsappTemplates: WhatsAppTemplate[];
  settings: Settings;
  currentUser: User | null;
}

interface AppContextType extends AppState {
  addOrder: (productId: string, buyerName: string, buyerPhone: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: 'accepted' | 'rejected') => void;
  updateWhatsAppTemplate: (template: WhatsAppTemplate) => void;
  markNotificationAsRead: (notificationId: string) => void;
  updateSettings: (settings: Settings) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const STORAGE_KEYS = {
  PRODUCTS: 'products',
  CURRENT_USER: 'currentUser',
  WHATSAPP_TEMPLATES: 'whatsappTemplates',
  SETTINGS: 'settings'
} as const;

const getStoredData = <T,>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => ({
    products: getStoredData(STORAGE_KEYS.PRODUCTS, defaultProducts),
    orders: [],
    notifications: [],
    whatsappTemplates: getStoredData(STORAGE_KEYS.WHATSAPP_TEMPLATES, defaultWhatsAppTemplates),
    settings: getStoredData(STORAGE_KEYS.SETTINGS, { whatsappApiKey: '', senderPhone: '' }),
    currentUser: getStoredData(STORAGE_KEYS.CURRENT_USER, {
      id: '1',
      name: 'Demo User',
      phone: '',
      credits: 0,
      createdAt: new Date()
    })
  }));

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WHATSAPP_TEMPLATES, JSON.stringify(state.whatsappTemplates));
  }, [state.whatsappTemplates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
  }, [state.settings]);

  const sendWhatsAppMessage = async (phone: string, message: string): Promise<boolean> => {
    if (!state.settings.whatsappApiKey) {
      throw new Error('WhatsApp API key not configured');
    }

    const whatsapp = new WhatsAppService(state.settings.whatsappApiKey);
    return whatsapp.sendMessage(phone, message);
  };

  const formatWhatsAppMessage = (template: WhatsAppTemplate, variables: Record<string, string>) => {
    let message = template.message;
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    return message;
  };

  const addNotification = (type: Notification['type'], message: string) => {
    setState(prev => ({
      ...prev,
      notifications: [{
        id: Date.now().toString(),
        type,
        message,
        read: false,
        createdAt: new Date()
      }, ...prev.notifications]
    }));
  };

  const updateProduct = (updatedProduct: Product) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    }));
  };

  const addProduct = (newProduct: Product) => {
    setState(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const deleteProduct = (productId: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const addOrder = async (productId: string, buyerName: string, buyerPhone: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    const newOrder: Order = {
      id: Date.now().toString(),
      productId,
      buyerName,
      buyerPhone,
      status: 'pending',
      createdAt: new Date()
    };
    
    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
    
    try {
      const buyerTemplate = state.whatsappTemplates.find(t => t.type === 'order_placed');
      if (buyerTemplate) {
        const message = formatWhatsAppMessage(buyerTemplate, {
          customer_name: buyerName,
          product_name: product.name,
          order_id: newOrder.id
        });
        
        await sendWhatsAppMessage(buyerPhone, message);
        addNotification('order_placed', `To ${buyerPhone}: ${message}`);
      }
      
      const adminTemplate = state.whatsappTemplates.find(t => t.type === 'admin_notification');
      if (adminTemplate && state.settings.senderPhone) {
        const message = formatWhatsAppMessage(adminTemplate, {
          customer_name: buyerName,
          product_name: product.name,
          order_id: newOrder.id
        });
        
        await sendWhatsAppMessage(state.settings.senderPhone, message);
        addNotification('admin_notification', message);
      }
    } catch (error) {
      if (error instanceof Error) {
        addNotification('error', `Failed to send WhatsApp messages: ${error.message}`);
      }
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'accepted' | 'rejected') => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const product = state.products.find(p => p.id === order.productId);
    if (!product) return;

    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? { ...o, status } : o)
    }));

    if (status === 'accepted') {
      setState(prev => ({
        ...prev,
        currentUser: prev.currentUser ? {
          ...prev.currentUser,
          credits: prev.currentUser.credits + product.credits
        } : null
      }));
      addNotification('credit_added', `Added ${product.credits} credits to your balance`);
    }
    
    try {
      const template = state.whatsappTemplates.find(t => t.type === `order_${status}`);
      if (template) {
        const message = formatWhatsAppMessage(template, {
          customer_name: order.buyerName,
          product_name: product.name,
          order_id: order.id
        });
        
        await sendWhatsAppMessage(order.buyerPhone, message);
        addNotification(`order_${status}` as Notification['type'], `To ${order.buyerPhone}: ${message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        addNotification('error', `Failed to send status update message: ${error.message}`);
      }
    }
  };

  const updateWhatsAppTemplate = (template: WhatsAppTemplate) => {
    setState(prev => ({
      ...prev,
      whatsappTemplates: prev.whatsappTemplates.map(t => t.id === template.id ? template : t)
    }));
  };

  const updateSettings = (newSettings: Settings) => {
    setState(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    }));
  };

  const unreadNotificationsCount = state.notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        ...state,
        addOrder,
        updateOrderStatus,
        updateWhatsAppTemplate,
        markNotificationAsRead,
        updateSettings,
        updateProduct,
        addProduct,
        deleteProduct,
        unreadNotificationsCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};