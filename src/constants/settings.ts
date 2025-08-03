import { type LanguageCode } from '../feature/language/languageSlice';

// Settings Section Configuration
export const SETTINGS_SECTIONS = [
  { id: 'account', icon: '👤', translationKey: 'account' },
  { id: 'appearance', icon: '🎨', translationKey: 'appearance' },
  { id: 'notifications', icon: '🔔', translationKey: 'notifications' },
  { id: 'privacy', icon: '🔒', translationKey: 'privacy' },
  { id: 'financial', icon: '💰', translationKey: 'financial' },
  { id: 'data', icon: '📊', translationKey: 'dataManagement' },
] as const;

// Language Options
export const LANGUAGE_OPTIONS: Array<{
  code: LanguageCode;
  nativeName: string;
  englishName: string;
}> = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'fr', nativeName: 'Français', englishName: 'French' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian' },
];

// Currency Options
export const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'INR (₹)', symbol: '₹' },
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
  { value: 'CAD', label: 'CAD (C$)', symbol: 'C$' },
  { value: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
] as const;

// Date Format Options
export const DATE_FORMAT_OPTIONS = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '31/12/2024' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/31/2024' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2024-12-31' },
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY', example: '31-12-2024' },
] as const;

// Notification Settings Configuration
export const NOTIFICATION_SETTINGS_CONFIG = [
  {
    key: 'emailNotifications',
    translationKey: 'emailNotifications',
    descriptionKey: 'emailNotificationsDesc',
  },
  {
    key: 'transactionAlerts',
    translationKey: 'transactionAlerts', 
    descriptionKey: 'transactionAlertsDesc',
  },
  {
    key: 'budgetNotifications',
    translationKey: 'budgetNotifications',
    descriptionKey: 'budgetNotificationsDesc',
  },
  {
    key: 'weeklyReports',
    translationKey: 'weeklyReports',
    descriptionKey: 'weeklyReportsDesc',
  },
  {
    key: 'monthlyReports',
    translationKey: 'monthlyReports',
    descriptionKey: 'monthlyReportsDesc',
  },
] as const;

// Privacy Settings Configuration
export const PRIVACY_SETTINGS_CONFIG = [
  {
    key: 'twoFactorAuth',
    translationKey: 'twoFactorAuth',
    descriptionKey: 'twoFactorAuthDesc',
  },
  {
    key: 'dataSharing',
    translationKey: 'dataSharing',
    descriptionKey: 'dataSharingDesc',
  },
  {
    key: 'analyticsTracking',
    translationKey: 'analyticsTracking',
    descriptionKey: 'analyticsTrackingDesc',
  },
  {
    key: 'marketingEmails',
    translationKey: 'marketingEmails',
    descriptionKey: 'marketingEmailsDesc',
  },
] as const;

// Budget Warning Threshold Range
export const BUDGET_WARNING_THRESHOLD = {
  min: 50,
  max: 100,
  step: 5,
  default: 80,
} as const;

// Toast/Message Duration
export const MESSAGE_DURATION = 3000;

// Default Settings Values
export const DEFAULT_NOTIFICATION_SETTINGS = {
  emailNotifications: true,
  transactionAlerts: true,
  budgetNotifications: true,
  weeklyReports: false,
  monthlyReports: true,
} as const;

export const DEFAULT_PRIVACY_SETTINGS = {
  twoFactorAuth: false,
  dataSharing: false,
  analyticsTracking: true,
  marketingEmails: false,
} as const;

export const DEFAULT_FINANCIAL_SETTINGS = {
  defaultCurrency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  autoCategorizationEnabled: true,
  budgetWarningThreshold: 80,
} as const;
