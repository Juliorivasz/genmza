import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  as?: 'div' | 'button' | 'li';
}

/**
 * Glassmorphism card — the visual cornerstone of the design system.
 * Uses a semi-transparent, blurred background for a premium "frosted glass" look.
 */
export function Card({
  children,
  className = '',
  selected = false,
  onClick,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={[
        // Base glass surface
        'relative overflow-hidden rounded-2xl',
        'bg-black/5 backdrop-blur-md',
        'border transition-all duration-300',

        // Selected state — cyan glow
        selected
          ? 'border-blue-500 shadow-lg shadow-amber-500/20 ring-1 ring-amber-500/50'
          : 'border-white/10 hover:border-white/20 hover:shadow-md hover:shadow-black/30',

        // Cursor
        onClick ? 'cursor-pointer active:scale-[0.98]' : '',

        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Subtle inner glow when selected */}
      {selected && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-amber-500/5" />
      )}
      {children}
    </Tag>
  );
}
