import React from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  onClose,
  closable = false,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300',
    error: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300',
    info: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300',
  };

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`
      p-3 border rounded-lg flex items-start space-x-3
      ${variantClasses[variant]}
      ${className}
    `}>
      <span className="text-lg flex-shrink-0 mt-0.5">
        {iconMap[variant]}
      </span>
      
      <div className="flex-1">
        {title && (
          <h4 className="font-medium mb-1">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      
      {closable && onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
