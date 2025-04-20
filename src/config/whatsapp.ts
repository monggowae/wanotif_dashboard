export interface WhatsAppMessagePayload {
  messageType: 'text';
  to: string;
  body: string;
  delay: number;
}

export const formatPhoneNumber = (phone: string): string => {
  return phone.startsWith('+') ? phone.substring(1) : phone;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};