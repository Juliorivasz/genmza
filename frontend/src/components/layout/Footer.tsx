import { Link } from 'react-router-dom';
import { Smartphone, MessageCircle, Mail } from 'lucide-react';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from '../../config/env';
import { buildWhatsAppURL, sanitizePhone } from '../../utils';

export function Footer() {
  const year = new Date().getFullYear();
  const waUrl = buildWhatsAppURL(
    sanitizePhone(WHATSAPP_NUMBER),
    `¡Hola, ${BUSINESS_NAME}! Quiero hacer una consulta.`,
  );

  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-black/[0.03]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit" onClick={() => window.scrollTo(0,0)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-500/40">
                <Smartphone size={15} className="text-amber-500" />
              </div>
              <span className="font-extrabold text-white">{BUSINESS_NAME}</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Servicio técnico profesional de celulares y computadoras en Mendoza. Rápido, confiable y con garantía.
            </p>
          </div>

          {/* Contact col */}
          <div className="sm:justify-self-end">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-600">
              Contacto
            </p>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageCircle size={16} className="text-emerald-400" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contacto@genmza.com.ar" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} className="text-amber-400" />
                  contacto@genmza.com.ar
                </a>
              </li>
              <li className="flex items-center gap-2">
                📍 Mendoza, Argentina
              </li>
              <li className="flex items-center gap-2">
                ⏱️ Lunes a Viernes, 9 a 15hs
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-700">
            © {year} {BUSINESS_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-700">
            Diseño con ❤️ en Mendoza
          </p>
        </div>
      </div>
    </footer>
  );
}
