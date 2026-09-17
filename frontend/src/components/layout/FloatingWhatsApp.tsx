import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER, BUSINESS_NAME } from '../../config/env';
import { buildWhatsAppURL, sanitizePhone } from '../../utils';

/**
 * Floating WhatsApp button — fixed bottom-right.
 * Mobile: pulsing green circle.
 * Desktop: on hover expands left to reveal "¿Necesitás ayuda?" label.
 * Click opens WhatsApp with a greeting message.
 */
export function FloatingWhatsApp() {
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered]     = useState(false);

  if (dismissed) return null;

  const phone = sanitizePhone(WHATSAPP_NUMBER);
  const url   = buildWhatsAppURL(
    phone,
    `¡Hola, ${BUSINESS_NAME}! 👋 Necesito ayuda, ¿me pueden atender?`,
  );

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-2 lg:bottom-8 lg:right-8">

      {/* Dismiss button — only visible when hovered on desktop */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className={[
          'flex h-6 w-6 items-center justify-center rounded-full bg-gray-800/80 text-gray-400 hover:text-white transition-all duration-200 border border-white/10',
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
          'hidden lg:flex',
        ].join(' ')}
        aria-label="Cerrar"
      >
        <X size={11} />
      </button>

      {/* Main button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chatear por WhatsApp"
        className={[
          'group relative flex items-center overflow-hidden',
          'rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40',
          'hover:bg-emerald-400 active:scale-95 transition-all duration-300',
          // Expand width on desktop hover
          'h-14 w-14 lg:hover:w-52',
          'lg:transition-[width,box-shadow] lg:duration-300',
        ].join(' ')}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30 lg:group-hover:animate-none" />

        {/* Icon — always visible, pushes right when expanded */}
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <MessageCircle size={26} />
        </span>

        {/* Label — only visible on desktop hover */}
        <span
          className={[
            'relative hidden lg:block whitespace-nowrap pr-4 text-sm font-bold leading-tight',
            'transition-all duration-300',
            hovered ? 'opacity-100' : 'opacity-0 -translate-x-2',
          ].join(' ')}
        >
          ¿Necesitás ayuda?
        </span>
      </a>
    </div>
  );
}
