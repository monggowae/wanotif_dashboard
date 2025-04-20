import { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  credits: number;
  image: string;
  validityDays: number; // Number of days the credits are valid
}

export interface Order {
  id: string;
  productId: string;
  buyerName: string;
  buyerPhone: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  expiryDate?: Date; // When the credits will expire
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  credits: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'order_placed' | 'order_accepted' | 'order_rejected' | 'admin_notification' | 'credit_added' | 'error';
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface WhatsAppTemplate {
  id: string;
  type: 'order_placed' | 'order_accepted' | 'order_rejected' | 'admin_notification';
  title: string;
  message: string;
}

export interface Settings {
  whatsappApiKey: string;
  senderPhone: string;
  welcomeCredits: number;
}