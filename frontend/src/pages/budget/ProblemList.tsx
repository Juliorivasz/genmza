import { Clock } from 'lucide-react';
import type { Problem } from '../../types';

interface ProblemListProps {
  problems: Problem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Renders problems as a scrollable pill-button list.
 * Animates in with a CSS transition using the `animate-in` pattern.
 */
export function ProblemList({ problems, selectedId, onSelect }: ProblemListProps) {
  return (
    <div
      className="flex flex-col gap-2"
      style={{ animation: 'slideDown 0.25s ease-out' }}
    >
      {problems.map((problem) => {
        const isSelected = selectedId === problem.id;

        return (
          <button
            key={problem.id}
            type="button"
            onClick={() => onSelect(problem.id)}
            className={[
              'flex items-center justify-between w-full rounded-xl px-4 py-3.5',
              'border text-left transition-all duration-200 active:scale-[0.98]',
              isSelected
                ? 'bg-blue-500/10 border-blue-500/60 text-white shadow-sm shadow-blue-500/10'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/20 hover:text-white',
            ].join(' ')}
          >
            <span className="text-sm font-medium">{problem.label}</span>

            {problem.estimatedTime && (
              <span
                className={[
                  'flex items-center gap-1 shrink-0 ml-3 text-xs',
                  isSelected ? 'text-blue-500' : 'text-zinc-600',
                ].join(' ')}
              >
                <Clock size={11} />
                {problem.estimatedTime}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
