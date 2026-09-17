import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-300 pl-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-4 text-gray-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={[
              'w-full rounded-2xl px-4 py-3.5 text-base text-white placeholder-gray-500',
              'bg-white/5 backdrop-blur-sm border',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400',
              error
                ? 'border-red-400/60'
                : 'border-white/10 hover:border-white/20',
              icon ? 'pl-11' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />
        </div>

        {hint && !error && (
          <p className="text-xs text-gray-500 pl-1">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-400 pl-1">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
