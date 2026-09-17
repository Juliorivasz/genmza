import { Zap, MapPin, Clock, Star } from 'lucide-react';
import { BUSINESS_NAME } from '../../config/env';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="backdrop-blur-xl bg-gray-950/80 border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">

          {/* ── Brand ── */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/30">
              <Zap size={17} className="text-cyan-400" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                {BUSINESS_NAME}
              </span>
              <span className="hidden text-xs text-gray-600 lg:block leading-none mt-0.5">
                Servicio técnico profesional
              </span>
            </div>
          </div>

          {/* ── Trust signals — only desktop ── */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock size={13} className="text-cyan-400/70" />
              <span>Lun–Sáb 9:00–20:00</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={13} className="text-cyan-400/70" />
              <span>Buenos Aires, Argentina</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400" />
              ))}
              <span className="ml-1 text-gray-400">4.9 · 200+ reseñas</span>
            </div>
          </div>

          {/* ── Mobile tagline ── */}
          <span className="text-xs text-gray-600 sm:block lg:hidden">
            Presupuesto gratis
          </span>
        </div>
      </div>
    </header>
  );
}
