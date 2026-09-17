import { Link } from 'react-router-dom';
import { Zap, MessageCircle } from 'lucide-react';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from '../../config/env';
import { buildWhatsAppURL, sanitizePhone } from '../../utils';

const FOOTER_LINKS = [
  { label: 'Servicios',  href: '/#servicios' },
  { label: 'Nosotros',   href: '/#nosotros' },
  { label: 'Ubicación',  href: '/#ubicacion' },
  { label: 'Presupuestar', href: '/presupuesto' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const waUrl = buildWhatsAppURL(
    sanitizePhone(WHATSAPP_NUMBER),
    `¡Hola, ${BUSINESS_NAME}! Quiero hacer una consulta.`,
  );

  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/15 ring-1 ring-cyan-400/40">
                <Zap size={15} className="text-cyan-400" />
              </div>
              <span className="font-extrabold text-white">{BUSINESS_NAME}</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Servicio técnico profesional de celulares y computadoras. Rápido, confiable y con garantía.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2 mt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Links col */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-600">
              Navegación
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-600">
              Contacto
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-500">
              <li>📞 {`+${WHATSAPP_NUMBER}`}</li>
              <li>🕐 Lun–Sáb · 9:00 a 20:00</li>
              <li>📍 Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-700">
            © {year} {BUSINESS_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-700">
            Diseño con ❤️ en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
