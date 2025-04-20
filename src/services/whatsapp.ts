import { WhatsAppMessagePayload, formatPhoneNumber } from '../config/whatsapp';

export class WhatsAppService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(phone: string, message: string): Promise<boolean> {
    try {
      const payload: WhatsAppMessagePayload = {
        messageType: 'text',
        to: formatPhoneNumber(phone),
        body: message,
        delay: 1
      };

      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `WhatsApp API error (${response.status}): ${response.statusText}`
        );
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`WhatsApp message failed: ${error.message}`);
      }
      throw new Error('Failed to send WhatsApp message');
    }
  }
}