import React from 'react';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`
      flex items-center justify-between p-4 
      border border-gray-200 dark:border-gray-700 
      rounded-lg transition-colors
      ${className}
    `}>
      <div className="flex-1 mr-4">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};
