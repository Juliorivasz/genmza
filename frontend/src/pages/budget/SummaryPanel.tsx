import {
  MessageCircle,
  CheckCircle2,
  Clock,
  Smartphone,
  Wrench,
  Cpu,
  ChevronRight,
  Shield,
  Zap,
  HeartHandshake,
} from 'lucide-react';
import type { Service } from '../../types';

interface SummaryPanelProps {
  selectedService: Service | undefined;
  problemLabel: string | undefined;
  problemTime: string | undefined;
  deviceBrand: string;
  deviceModel: string;
  isReady: boolean;
  onSubmit: () => void;
}

/** Single trust badge item */
function TrustBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-zinc-400">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/5">
        <Icon size={14} className="text-amber-500" />
      </div>
      {text}
    </div>
  );
}

/** A single summary row */
function SummaryRow({
  icon: Icon,
  label,
  value,
  done,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  done: boolean;
}) {
  return (
    <div
      className={[
        'flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-300',
        done ? 'bg-black/5' : 'opacity-40',
      ].join(' ')}
    >
      <div
        className={[
          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          done ? 'bg-amber-500/15 text-amber-500' : 'bg-black/5 text-zinc-600',
        ].join(' ')}
      >
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
          {label}
        </p>
        <p
          className={[
            'mt-0.5 truncate text-sm font-medium',
            done ? 'text-white' : 'text-zinc-600',
          ].join(' ')}
        >
          {done ? value : '—'}
        </p>
      </div>
      {done && <CheckCircle2 size={14} className="mt-1 shrink-0 text-amber-500" />}
    </div>
  );
}

/**
 * DESKTOP ONLY (hidden on mobile with `hidden lg:flex`).
 * Sticky right-column panel that shows a live preview of the consultation
 * and the primary WhatsApp CTA button.
 */
export function SummaryPanel({
  selectedService,
  problemLabel,
  problemTime,
  deviceBrand,
  deviceModel,
  isReady,
  onSubmit,
}: SummaryPanelProps) {
  return (
    /* hidden on mobile, sticky sidebar on desktop */
    <aside className="hidden lg:flex flex-col gap-5 sticky top-24 h-fit">

      {/* ── Live summary card ── */}
      <div className="rounded-2xl border border-white/10 bg-black/5 backdrop-blur-md p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Tu consulta
          </h3>
          {isReady && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <CheckCircle2 size={10} />
              Lista
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <SummaryRow
            icon={Wrench}
            label="Servicio"
            value={selectedService?.title ?? ''}
            done={Boolean(selectedService)}
          />
          <SummaryRow
            icon={Cpu}
            label="Problema"
            value={problemLabel ?? ''}
            done={Boolean(problemLabel)}
          />
          <SummaryRow
            icon={Smartphone}
            label="Equipo"
            value={`${deviceBrand} ${deviceModel}`}
            done={Boolean(deviceBrand && deviceModel.trim())}
          />
        </div>

        {/* Estimated time badge */}
        {problemTime && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-500/20 bg-amber-500/5 px-3 py-2.5">
            <Clock size={14} className="text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                Tiempo estimado
              </p>
              <p className="text-sm font-semibold text-white">{problemTime}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── WhatsApp CTA button ── */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isReady}
        className={[
          'w-full flex items-center justify-between rounded-2xl px-6 py-4',
          'font-bold text-base transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          'disabled:opacity-35 disabled:cursor-not-allowed',
          isReady
            ? [
                'bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.98]',
                'shadow-xl shadow-emerald-500/30 focus-visible:ring-emerald-400',
              ].join(' ')
            : 'bg-black/5 border border-white/10 text-zinc-500 cursor-not-allowed',
        ].join(' ')}
      >
        <div className="flex items-center gap-3">
          <MessageCircle size={22} className={isReady ? 'text-white' : 'text-zinc-600'} />
          <div className="text-left">
            <div className="font-bold leading-none">Consultar por WhatsApp</div>
            <div className={['mt-1 text-xs font-normal leading-none', isReady ? 'text-emerald-100' : 'text-zinc-600'].join(' ')}>
              {isReady ? '¡Completaste todos los pasos!' : 'Completá los 3 pasos primero'}
            </div>
          </div>
        </div>
        <ChevronRight size={20} className={isReady ? 'text-white' : 'text-zinc-600'} />
      </button>

      {/* ── Trust badges ── */}
      <div className="rounded-2xl border border-white/5 bg-black/3 p-4 flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">
          ¿Por qué elegirnos?
        </p>
        <TrustBadge icon={Zap} text="Presupuesto sin cargo" />
        <TrustBadge icon={Shield} text="Atención personalizada y directa" />
        <TrustBadge icon={HeartHandshake} text="Transparencia total" />
      </div>
    </aside>
  );
}
