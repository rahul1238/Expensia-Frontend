import React from 'react';
import { SETTINGS_SECTIONS } from '../../constants/settings';
import { useTranslation } from '../../hooks/useTranslation';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="lg:w-1/4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <nav className="space-y-2">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg transition-colors 
                flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  activeSection === section.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="text-lg" role="img" aria-hidden="true">
                {section.icon}
              </span>
              <span className="font-medium">
                {t.settings[section.translationKey as keyof typeof t.settings]}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
