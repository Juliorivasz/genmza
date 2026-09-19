import { MessageCircle, ChevronRight } from 'lucide-react';

interface StickyCtaProps {
  onClick: () => void;
  disabled?: boolean;
  ready?: boolean;
}

/**
 * MOBILE ONLY: Sticky bottom Call-To-Action bar.
 * Hidden on lg+ (desktop uses the SummaryPanel CTA instead).
 *
 * Transitions from disabled grey → glowing WhatsApp green when ready.
 */
export function StickyCta({ onClick, disabled = false, ready = false }: StickyCtaProps) {
  return (
    /* lg:hidden — invisible on desktop */
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-safe-bottom pb-6 pt-4 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={[
          'w-full flex items-center justify-between',
          'rounded-2xl px-6 py-4 text-base font-bold',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
          'active:scale-[0.98]',
          ready
            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 hover:bg-emerald-400 focus-visible:ring-emerald-400'
            : 'bg-white/10 text-zinc-400 border border-white/10 focus-visible:ring-blue-500',
        ].join(' ')}
      >
        <div className="flex items-center gap-3">
          <MessageCircle size={22} className={ready ? 'text-white' : 'text-zinc-500'} />
          <div className="text-left">
            <div className="text-base font-bold leading-none">
              Consultar por WhatsApp
            </div>
            <div className={['mt-0.5 text-xs font-normal leading-none', ready ? 'text-emerald-100' : 'text-zinc-600'].join(' ')}>
              {ready ? '¡Listo para enviar!' : 'Completá el formulario para continuar'}
            </div>
          </div>
        </div>
        <ChevronRight size={20} className={ready ? 'text-white' : 'text-zinc-600'} />
      </button>
    </div>
  );
}
