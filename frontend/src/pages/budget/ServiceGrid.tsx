import {
  Smartphone,
  Laptop,
  Shield,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '../../types';

const ICON_MAP: Record<string, LucideIcon> = { Smartphone, Laptop, Shield };

interface ServiceGridProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: Service['id']) => void;
}

export function ServiceGrid({ services, selectedId, onSelect }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Smartphone;
        const isSelected = selectedId === service.id;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={[
              'relative overflow-hidden rounded-2xl text-left transition-all duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              'active:scale-[0.97]',
              isSelected
                ? 'ring-2 ring-blue-500 shadow-lg shadow-amber-500/20'
                : 'ring-1 ring-white/10 hover:ring-white/25',
            ].join(' ')}
          >
            {/* Background image */}
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}

            {/* Dark overlay — darker when not selected, slightly lighter when selected */}
            <div
              className={[
                'absolute inset-0 transition-colors duration-300',
                isSelected ? 'bg-zinc-950/55' : 'bg-zinc-950/70',
              ].join(' ')}
            />

            {/* Selected tint */}
            {isSelected && (
              <div className="absolute inset-0 bg-amber-500/15" />
            )}

            {/* Content */}
            <div className="relative flex flex-col gap-3 p-5 min-h-[160px] sm:min-h-[180px]">
              {/* Icon bubble */}
              <div
                className={[
                  'flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300',
                  isSelected
                    ? 'bg-amber-500/30 text-amber-400 ring-1 ring-amber-500/50'
                    : 'bg-black/10 text-white/70',
                ].join(' ')}
              >
                <Icon size={22} />
              </div>

              {/* Text */}
              <div className="mt-auto">
                <p
                  className={[
                    'text-base font-bold leading-tight transition-colors duration-300',
                    isSelected ? 'text-white' : 'text-white/90',
                  ].join(' ')}
                >
                  {service.title}
                </p>
                <p className="mt-1 text-xs text-white/50">{service.subtitle}</p>
              </div>
            </div>

            {/* Checkmark badge */}
            {isSelected && (
              <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                <CheckCircle2 size={14} className="text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
