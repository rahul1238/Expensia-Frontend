import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  description?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  disabled?: boolean;
  id?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  description,
  showValue = true,
  valueFormatter = (val) => val.toString(),
  disabled = false,
  id,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {label && (
          <label 
            htmlFor={id}
            className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className={`
            w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
            dark:bg-gray-700 slider-thumb
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        {showValue && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-fit">
            {valueFormatter(value)}
          </span>
        )}
      </div>
    </div>
  );
};
