import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../feature/auth/authSlice';
import { type LanguageCode } from '../feature/language/languageSlice';
import { useTranslation } from '../hooks/useTranslation';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { FinancialSettings } from '../components/settings/FinancialSettings';
import { 
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_PRIVACY_SETTINGS,
  DEFAULT_FINANCIAL_SETTINGS,
  MESSAGE_DURATION,
  LANGUAGE_OPTIONS
} from '../constants/settings';
import type { RootState } from '../app/store';

interface NotificationSettings {
  emailNotifications: boolean;
  transactionAlerts: boolean;
  budgetNotifications: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

interface PrivacySettings {
  twoFactorAuth: boolean;
  dataSharing: boolean;
  analyticsTracking: boolean;
  marketingEmails: boolean;
}

interface FinancialSettings {
  defaultCurrency: string;
  dateFormat: string;
  autoCategorizationEnabled: boolean;
  budgetWarningThreshold: number;
}

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t, changeLanguage } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION_SETTINGS);
  const [privacy, setPrivacy] = useState(DEFAULT_PRIVACY_SETTINGS);
  const [financial, setFinancial] = useState(DEFAULT_FINANCIAL_SETTINGS);

  const [activeSection, setActiveSection] = useState<string>('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Handle language and theme changes
  const handleLanguageChange = async (languageCode: LanguageCode) => {
    // Show message with current language first
    const currentTranslation = t('settings.languageChanged');
    
    // Get the new language name from constants
    const selectedLanguage = LANGUAGE_OPTIONS.find(lang => lang.code === languageCode);
    const languageName = selectedLanguage?.nativeName || languageCode;
    
    setSaveMessage(`${currentTranslation} ${languageName}`);
    
    // Update the language using i18n
    await changeLanguage(languageCode);
    
    // Clear message after language change
    setTimeout(() => setSaveMessage(''), MESSAGE_DURATION);
  };

  // Handle notification changes
  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle privacy changes
  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle financial settings changes
  const handleFinancialChange = (key: keyof FinancialSettings, value: string | number | boolean) => {
    setFinancial(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('settings.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <SettingsSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h2>
                  </div>

                  {/* Profile Quick Access */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Profile Management</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Update your personal information and profile settings</p>
                      </div>
                      <button
                        onClick={() => navigate('/profile')}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Actions</h3>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Export Data</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Download your account data and transaction history</p>
                      </div>
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                        Export
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <div>
                        <h4 className="font-medium text-red-900 dark:text-red-400">Delete Account</h4>
                        <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
                      </div>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <AppearanceSettings 
                  saveMessage={saveMessage}
                  onLanguageChange={handleLanguageChange}
                />
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <NotificationSettings 
                  settings={notifications}
                  onSettingChange={handleNotificationChange}
                />
              )}

              {/* Privacy & Security Settings */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy & Security</h2>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {key === 'twoFactorAuth' && 'Add an extra layer of security to your account'}
                            {key === 'dataSharing' && 'Allow sharing anonymized data for service improvement'}
                            {key === 'analyticsTracking' && 'Help us improve by sharing usage analytics'}
                            {key === 'marketingEmails' && 'Receive promotional emails and product updates'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handlePrivacyChange(key as keyof PrivacySettings)}
                            className="sr-only peer"
                            title={`Toggle ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                            aria-label={`Toggle ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Session Management */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Management</h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Active Sessions</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active login sessions</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                        End All Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Settings */}
              {activeSection === 'financial' && (
                <FinancialSettings 
                  settings={financial}
                  onSettingChange={handleFinancialChange}
                />
              )}

              {/* Data Management */}
              {activeSection === 'data' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Management</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Import Data */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Import Data</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Import transactions from CSV or Excel files</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        Import
                      </button>
                    </div>

                    {/* Backup Settings */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Auto Backup</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup your data weekly</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Clear Cache */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Clear Cache</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Clear cached data to free up space</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{t('navigation.signOut')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Delete Account</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
