import {
  Monitor,
  BatteryLow,
  Camera,
  Zap,
  Volume2,
  Power,
  Droplets,
  HelpCircle,
  Gauge,
  Bug,
  Keyboard,
  HardDrive,
  RefreshCw,
  Flame,
  Shield,
  EyeOff,
  Layers,
  Square,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import type { Problem } from '../../types';

// ── Icon map by problem id ───────────────────────────────────────────────────
const PROBLEM_ICONS: Record<string, LucideIcon> = {
  // Celulares
  pantalla_rota:     Monitor,
  bateria_agotada:   BatteryLow,
  camara_dañada:     Camera,
  puerto_carga:      Zap,
  microfono_altavoz: Volume2,
  boton_home:        Square,
  no_enciende:       Power,
  agua:              Droplets,
  otro_cel:          HelpCircle,
  // Computadoras
  no_enciende_pc:    Power,
  lenta_pc:          Gauge,
  virus_malware:     Bug,
  pantalla_rota_pc:  Monitor,
  teclado_touchpad:  Keyboard,
  bateria_notebook:  BatteryLow,
  disco_duro:        HardDrive,
  sistema_operativo: RefreshCw,
  sobrecalentamiento: Flame,
  otro_pc:           HelpCircle,
  // Protectores
  vidrio_templado:   Shield,
  vidrio_privacidad: EyeOff,
  lamina_hidrogel:   Layers,
  lamina_mate:       Monitor,
  camara_protector:  Camera,
};

interface ProblemListProps {
  problems: Problem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Two-column chip grid with icon + label + optional time.
 * Auto-advances parent wizard on selection.
 */
export function ProblemList({ problems, selectedId, onSelect }: ProblemListProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {problems.map((problem) => {
        const Icon = PROBLEM_ICONS[problem.id] ?? HelpCircle;
        const isSelected = selectedId === problem.id;

        return (
          <button
            key={problem.id}
            type="button"
            onClick={() => onSelect(problem.id)}
            className={[
              'flex flex-col items-start gap-2 rounded-2xl p-4 text-left',
              'min-h-[90px] transition-all duration-200 active:scale-[0.97]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              isSelected
                ? 'bg-amber-500/15 ring-2 ring-blue-500 text-white shadow-md shadow-amber-500/15'
                : 'bg-black/[0.05] ring-1 ring-white/10 text-white hover:ring-white/25 hover:text-white',
            ].join(' ')}
          >
            {/* Icon */}
            <Icon
              size={18}
              className={isSelected ? 'text-amber-400' : 'text-zinc-500'}
            />

            {/* Label */}
            <span className="text-sm font-medium leading-snug flex-1">
              {problem.label}
            </span>

            {/* Estimated time */}
            {problem.estimatedTime && (
              <span
                className={[
                  'flex items-center gap-1 text-[11px] font-medium',
                  isSelected ? 'text-amber-400' : 'text-zinc-600',
                ].join(' ')}
              >
                <Clock size={10} />
                {problem.estimatedTime}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
