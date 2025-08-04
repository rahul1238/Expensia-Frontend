import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type LanguageCode } from '../../feature/language/languageSlice';
import { setTheme as setAppTheme } from '../../feature/theme/themeSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { Select } from '../ui/Select';
import Button from '../ui/Button';
import { SettingsCard } from '../ui/SettingsCard';
import { Alert } from '../ui/Alert';
import { LANGUAGE_OPTIONS } from '../../constants/settings';
import type { RootState } from '../../app/store';

interface AppearanceSettingsProps {
  saveMessage?: string;
  onLanguageChange: (languageCode: LanguageCode) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  saveMessage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mode: themeMode } = useSelector((state: RootState) => state.theme);
  const language = useSelector((state: RootState) => state.language);

  const handleThemeToggle = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setAppTheme(newTheme));
  };

  const languageOptions = LANGUAGE_OPTIONS.map(lang => ({
    value: lang.code,
    label: `${lang.nativeName} (${lang.englishName})`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('settings.appearance')}
        </h2>
        {saveMessage && (
          <Alert 
            variant="success" 
            message={saveMessage}
            className="mb-4"
          />
        )}
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <SettingsCard
          title={t('settings.theme')}
          description={t('settings.themeSubtitle')}
        >
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
              {themeMode === 'light' ? t('settings.light') : t('settings.dark')}
            </span>
            <Button
              onClick={handleThemeToggle}
              variant="primary"
              size="sm"
            >
              {t('settings.switchTo')} {themeMode === 'light' ? t('settings.dark') : t('settings.light')}
            </Button>
          </div>
        </SettingsCard>

        {/* Language Selection */}
        <SettingsCard
          title={t('settings.language')}
          description={t('settings.languageSubtitle')}
        >
          <Select
            value={language.code}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            options={languageOptions}
            aria-label="Language selection"
          />
        </SettingsCard>
      </div>
    </div>
  );
};
