import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-300 pl-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={[
              'w-full appearance-none rounded-2xl px-4 py-3.5 pr-10',
              'bg-white/5 backdrop-blur-sm border text-white text-base',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400',
              error
                ? 'border-red-400/60'
                : 'border-white/10 hover:border-white/20',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option
                key={o.value}
                value={o.value}
                className="bg-gray-900 text-white"
              >
                {o.label}
              </option>
            ))}
          </select>

          {/* Custom chevron icon */}
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 pl-1">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
