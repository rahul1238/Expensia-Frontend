import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Select } from '../ui/Select';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { RangeSlider } from '../ui/RangeSlider';
import { SettingsCard } from '../ui/SettingsCard';
import { 
  CURRENCY_OPTIONS, 
  DATE_FORMAT_OPTIONS, 
  BUDGET_WARNING_THRESHOLD 
} from '../../constants/settings';

interface FinancialSettings {
  defaultCurrency: string;
  dateFormat: string;
  autoCategorizationEnabled: boolean;
  budgetWarningThreshold: number;
}

interface FinancialSettingsProps {
  settings: FinancialSettings;
  onSettingChange: (key: keyof FinancialSettings, value: string | number | boolean) => void;
}

export const FinancialSettings: React.FC<FinancialSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  const { t } = useTranslation();

  const currencyOptions = CURRENCY_OPTIONS.map(currency => ({
    value: currency.value,
    label: currency.label,
  }));

  const dateFormatOptions = DATE_FORMAT_OPTIONS.map(format => ({
    value: format.value,
    label: `${format.label} (${format.example})`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('settings.financial')}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Currency Selection */}
        <SettingsCard
          title="Default Currency"
          description="Primary currency for transactions"
        >
          <Select
            value={settings.defaultCurrency}
            onChange={(e) => onSettingChange('defaultCurrency', e.target.value)}
            options={currencyOptions}
            aria-label="Default currency selection"
          />
        </SettingsCard>

        {/* Date Format */}
        <SettingsCard
          title="Date Format"
          description="How dates are displayed"
        >
          <Select
            value={settings.dateFormat}
            onChange={(e) => onSettingChange('dateFormat', e.target.value)}
            options={dateFormatOptions}
            aria-label="Date format selection"
          />
        </SettingsCard>

        {/* Auto Categorization */}
        <SettingsCard
          title="Auto Categorization"
          description="Automatically categorize transactions"
        >
          <ToggleSwitch
            checked={settings.autoCategorizationEnabled}
            onChange={(checked) => onSettingChange('autoCategorizationEnabled', checked)}
            id="auto-categorization"
          />
        </SettingsCard>

        {/* Budget Warning Threshold */}
        <SettingsCard
          title="Budget Warning Threshold"
          description="Alert when budget usage reaches this percentage"
        >
          <RangeSlider
            min={BUDGET_WARNING_THRESHOLD.min}
            max={BUDGET_WARNING_THRESHOLD.max}
            step={BUDGET_WARNING_THRESHOLD.step}
            value={settings.budgetWarningThreshold}
            onChange={(value) => onSettingChange('budgetWarningThreshold', value)}
            valueFormatter={(value) => `${value}%`}
            id="budget-threshold"
          />
        </SettingsCard>
      </div>
    </div>
  );
};
