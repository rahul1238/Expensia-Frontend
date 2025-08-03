import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { SettingsCard } from '../ui/SettingsCard';
import { NOTIFICATION_SETTINGS_CONFIG } from '../../constants/settings';

interface NotificationSettings {
  emailNotifications: boolean;
  transactionAlerts: boolean;
  budgetNotifications: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onSettingChange: (key: keyof NotificationSettings) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  const { t } = useTranslation();

  // Extended translations for notifications
  const notificationTranslations = {
    emailNotifications: 'Email Notifications',
    transactionAlerts: 'Transaction Alerts',
    budgetNotifications: 'Budget Notifications',
    weeklyReports: 'Weekly Reports',
    monthlyReports: 'Monthly Reports',
    emailNotificationsDesc: 'Receive notifications via email',
    transactionAlertsDesc: 'Get alerts for new transactions',
    budgetNotificationsDesc: 'Budget limit and goal notifications',
    weeklyReportsDesc: 'Weekly spending summary reports',
    monthlyReportsDesc: 'Monthly financial reports',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t.settings.notifications}
        </h2>
      </div>

      <div className="space-y-4">
        {NOTIFICATION_SETTINGS_CONFIG.map(({ key }) => (
          <SettingsCard
            key={key}
            title={notificationTranslations[key as keyof typeof notificationTranslations]}
            description={notificationTranslations[`${key}Desc` as keyof typeof notificationTranslations]}
          >
            <ToggleSwitch
              checked={settings[key as keyof NotificationSettings]}
              onChange={() => onSettingChange(key as keyof NotificationSettings)}
              id={`notification-${key}`}
            />
          </SettingsCard>
        ))}
      </div>
    </div>
  );
};
