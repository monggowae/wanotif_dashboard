import { WhatsAppTemplate } from '../types';

export const defaultWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: 'order_placed',
    type: 'order_placed',
    title: 'Order Confirmation',
    message: 'Hello {customer_name}, thank you for your order of {product_name}! Your order #{order_id} is now being processed. We will notify you once it\'s approved.'
  },
  {
    id: 'order_accepted',
    type: 'order_accepted',
    title: 'Order Accepted',
    message: 'Good news, {customer_name}! Your order #{order_id} for {product_name} has been accepted and is now being processed. Thank you for choosing our services!'
  },
  {
    id: 'order_rejected',
    type: 'order_rejected',
    title: 'Order Rejected',
    message: 'Hello {customer_name}, we regret to inform you that your order #{order_id} for {product_name} could not be processed at this time. Please contact our support team for more information.'
  },
  {
    id: 'admin_notification',
    type: 'admin_notification',
    title: 'New Order Notification',
    message: 'New order #{order_id} received from {customer_name} for {product_name}. Please review and take appropriate action.'
  }
];