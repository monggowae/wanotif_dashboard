import { useCallback } from 'react';
import { WhatsAppService } from '../services/whatsapp';
import { useAppContext } from '../contexts/AppContext';

export const useWhatsApp = () => {
  const { settings } = useAppContext();

  const sendMessage = useCallback(async (phone: string, message: string): Promise<boolean> => {
    if (!settings.whatsappApiKey) {
      throw new Error('WhatsApp API key not configured');
    }

    if (!navigator.onLine) {
      throw new Error('No internet connection available');
    }

    const whatsapp = new WhatsAppService(settings.whatsappApiKey);
    return whatsapp.sendMessage(phone, message);
  }, [settings.whatsappApiKey]);

  return {
    sendMessage,
    isConfigured: Boolean(settings.whatsappApiKey && settings.senderPhone)
  };
};