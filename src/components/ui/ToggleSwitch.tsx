import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'purple';
  label?: string;
  description?: string;
  id?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  color = 'blue',
  label,
  description,
  id,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6', 
    lg: 'w-14 h-8',
  };

  const toggleClasses = {
    sm: 'after:h-3 after:w-3 after:top-[2px] after:left-[2px] peer-checked:after:translate-x-4',
    md: 'after:h-5 after:w-5 after:top-[2px] after:left-[2px] peer-checked:after:translate-x-full',
    lg: 'after:h-7 after:w-7 after:top-[2px] after:left-[2px] peer-checked:after:translate-x-6',
  };

  const colorClasses = {
    blue: 'peer-checked:bg-blue-600 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800',
    green: 'peer-checked:bg-green-600 peer-focus:ring-green-300 dark:peer-focus:ring-green-800',
    red: 'peer-checked:bg-red-600 peer-focus:ring-red-300 dark:peer-focus:ring-red-800',
    purple: 'peer-checked:bg-purple-600 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800',
  };

  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label 
              htmlFor={id}
              className="block text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`
          ${sizeClasses[size]} bg-gray-200 rounded-full peer 
          dark:bg-gray-700 peer-checked:after:border-white 
          after:content-[''] after:absolute after:bg-white 
          after:border-gray-300 after:border after:rounded-full 
          after:transition-all dark:border-gray-600 
          ${colorClasses[color]}
          ${toggleClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'peer-focus:outline-none peer-focus:ring-4'}
        `} />
      </label>
    </div>
  );
};
