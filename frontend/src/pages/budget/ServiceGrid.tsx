import {
  Smartphone,
  Laptop,
  Shield,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import type { Service } from '../../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Laptop,
  Shield,
};

interface ServiceGridProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: Service['id']) => void;
}

export function ServiceGrid({ services, selectedId, onSelect }: ServiceGridProps) {
  return (
    /*
     * Mobile:  1 column
     * sm:      3 columns (3 cards fit nicely side by side from 640px)
     * On desktop the parent column constrains the width, so sm:grid-cols-3
     * still works perfectly inside the form column.
     */
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Smartphone;
        const isSelected = selectedId === service.id;

        return (
          <Card
            key={service.id}
            as="button"
            selected={isSelected}
            onClick={() => onSelect(service.id)}
            className="p-5 text-left w-full"
          >
            <div className="flex flex-col gap-3">
              {/* Icon */}
              <div
                className={[
                  'flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300',
                  isSelected ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-gray-400',
                ].join(' ')}
              >
                <Icon size={24} />
              </div>

              {/* Text */}
              <div>
                <p className={[
                  'text-base font-semibold leading-tight transition-colors duration-300',
                  isSelected ? 'text-white' : 'text-gray-200',
                ].join(' ')}>
                  {service.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">{service.subtitle}</p>
              </div>

              {/* Problem count badge */}
              <span className={[
                'w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300',
                isSelected
                  ? 'bg-cyan-400/15 text-cyan-400'
                  : 'bg-white/5 text-gray-600',
              ].join(' ')}>
                {service.problems.length} opciones
              </span>
            </div>

            {/* Selected checkmark */}
            {isSelected && (
              <CheckCircle2 size={16} className="absolute top-3 right-3 text-cyan-400" />
            )}
          </Card>
        );
      })}
    </div>
  );
}
