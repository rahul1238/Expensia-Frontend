import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    value: string;
    label: string;
  }>;
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  className = '',
  error,
  helperText,
  ...props
}) => {
  return (
    <div className="w-full">
      <select
        className={`
          px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error 
            ? 'border-red-300 dark:border-red-600' 
            : 'border-gray-300 dark:border-gray-600'
          }
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${
          error 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
