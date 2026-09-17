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
        'bg-white/5 backdrop-blur-md',
        'border transition-all duration-300',

        // Selected state — cyan glow
        selected
          ? 'border-cyan-400 shadow-lg shadow-cyan-400/20 ring-1 ring-cyan-400/50'
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
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/5" />
      )}
      {children}
    </Tag>
  );
}
