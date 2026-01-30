import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  hint?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  minLabel?: string;
  maxLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      error,
      hint,
      min,
      max,
      step = 1,
      value,
      onChange,
      formatValue,
      minLabel,
      maxLabel,
      id,
      ...props
    },
    ref
  ) => {
    const sliderId = id || React.useId();
    const percentage = ((value - min) / (max - min)) * 100;

    const displayValue = formatValue ? formatValue(value) : value.toString();

    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={sliderId}
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              {label}
              {props.required && <span className="text-[var(--error)] ml-1">*</span>}
            </label>
            <span className="text-sm font-semibold text-[var(--primary)]">{displayValue}</span>
          </div>
        )}
        <div className="relative">
          <input
            type="range"
            id={sliderId}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={cn(
              'w-full h-2 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-5',
              '[&::-webkit-slider-thumb]:h-5',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-[var(--primary)]',
              '[&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-webkit-slider-thumb]:shadow-md',
              '[&::-webkit-slider-thumb]:transition-transform',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-moz-range-thumb]:w-5',
              '[&::-moz-range-thumb]:h-5',
              '[&::-moz-range-thumb]:rounded-full',
              '[&::-moz-range-thumb]:bg-[var(--primary)]',
              '[&::-moz-range-thumb]:border-0',
              '[&::-moz-range-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:shadow-md',
              error && 'focus:ring-[var(--error)]',
              className
            )}
            style={{
              background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--secondary) ${percentage}%, var(--secondary) 100%)`,
            }}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${sliderId}-error` : hint ? `${sliderId}-hint` : undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={displayValue}
            {...props}
          />
        </div>
        {(minLabel || maxLabel) && (
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[var(--muted-foreground)]">{minLabel || min}</span>
            <span className="text-xs text-[var(--muted-foreground)]">{maxLabel || max}</span>
          </div>
        )}
        {hint && !error && (
          <p id={`${sliderId}-hint`} className="mt-2 text-sm text-[var(--muted-foreground)]">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${sliderId}-error`} className="mt-2 text-sm text-[var(--error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
