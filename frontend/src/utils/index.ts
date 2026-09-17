// ============================================================
// Utility helpers
// ============================================================

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Builds a WhatsApp deep-link URL with a pre-filled message.
 */
export function buildWhatsAppURL(
  phone: string,
  message: string,
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Strips non-numeric characters from a phone string.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
