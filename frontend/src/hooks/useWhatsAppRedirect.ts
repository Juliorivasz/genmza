import { useCallback } from 'react';
import { WHATSAPP_NUMBER, BUSINESS_NAME } from '../config/env';
import { buildWhatsAppURL, sanitizePhone } from '../utils';
import type { BudgetFormValues } from '../types';

interface UseWhatsAppRedirectReturn {
  redirect: (data: BudgetFormValues, problemLabel: string, serviceTitle: string) => void;
}

/**
 * Custom hook that builds a friendly WhatsApp message from the budget
 * form data and opens the WhatsApp deep-link in a new tab.
 */
export function useWhatsAppRedirect(): UseWhatsAppRedirectReturn {
  const redirect = useCallback(
    (data: BudgetFormValues, problemLabel: string, serviceTitle: string) => {
      const phone = sanitizePhone(WHATSAPP_NUMBER);

      const lines: string[] = [
        `¡Hola, ${BUSINESS_NAME}! 👋`,
        '',
        `Quiero consultar por un presupuesto:`,
        '',
        `🔧 *Servicio:* ${serviceTitle}`,
        `❗ *Problema:* ${problemLabel}`,
        `📱 *Modelo del equipo:* ${data.deviceModel || 'No especificado'}`,
        '',
        `¿Me podrían dar más información? ¡Gracias!`,
      ];

      const message = lines.join('\n');
      const url = buildWhatsAppURL(phone, message);

      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [],
  );

  return { redirect };
}
