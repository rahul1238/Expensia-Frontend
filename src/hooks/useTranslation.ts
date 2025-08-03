import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { type LanguageCode } from '../feature/language/languageSlice';

export interface Translations {
  settings: {
    title: string;
    subtitle: string;
    account: string;
    appearance: string;
    notifications: string;
    privacy: string;
    financial: string;
    dataManagement: string;
    theme: string;
    themeSubtitle: string;
    language: string;
    languageSubtitle: string;
    switchTo: string;
    dark: string;
    light: string;
    languageChanged: string;
  };
  navigation: {
    dashboard: string;
    profile: string;
    settings: string;
    signOut: string;
  };
}

const translations: Record<LanguageCode, Translations> = {
  en: {
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account preferences and application settings',
      account: 'Account',
      appearance: 'Appearance',
      notifications: 'Notifications',
      privacy: 'Privacy & Security',
      financial: 'Financial',
      dataManagement: 'Data Management',
      theme: 'Theme',
      themeSubtitle: 'Choose your preferred theme',
      language: 'Language',
      languageSubtitle: 'Select your preferred language',
      switchTo: 'Switch to',
      dark: 'Dark',
      light: 'Light',
      languageChanged: 'Language changed to'
    },
    navigation: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      signOut: 'Sign Out'
    }
  },
  hi: {
    settings: {
      title: 'सेटिंग्स',
      subtitle: 'अपने खाता वरीयताओं और एप्लिकेशन सेटिंग्स का प्रबंधन करें',
      account: 'खाता',
      appearance: 'दिखावट',
      notifications: 'सूचनाएं',
      privacy: 'गोपनीयता और सुरक्षा',
      financial: 'वित्तीय',
      dataManagement: 'डेटा प्रबंधन',
      theme: 'थीम',
      themeSubtitle: 'अपनी पसंदीदा थीम चुनें',
      language: 'भाषा',
      languageSubtitle: 'अपनी पसंदीदा भाषा चुनें',
      switchTo: 'स्विच करें',
      dark: 'डार्क',
      light: 'लाइट',
      languageChanged: 'भाषा बदली गई'
    },
    navigation: {
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      signOut: 'साइन आउट'
    }
  },
  es: {
    settings: {
      title: 'Configuración',
      subtitle: 'Gestiona tus preferencias de cuenta y configuración de la aplicación',
      account: 'Cuenta',
      appearance: 'Apariencia',
      notifications: 'Notificaciones',
      privacy: 'Privacidad y Seguridad',
      financial: 'Financiero',
      dataManagement: 'Gestión de Datos',
      theme: 'Tema',
      themeSubtitle: 'Elige tu tema preferido',
      language: 'Idioma',
      languageSubtitle: 'Selecciona tu idioma preferido',
      switchTo: 'Cambiar a',
      dark: 'Oscuro',
      light: 'Claro',
      languageChanged: 'Idioma cambiado a'
    },
    navigation: {
      dashboard: 'Panel',
      profile: 'Perfil',
      settings: 'Configuración',
      signOut: 'Cerrar Sesión'
    }
  },
  fr: {
    settings: {
      title: 'Paramètres',
      subtitle: 'Gérez vos préférences de compte et les paramètres de l\'application',
      account: 'Compte',
      appearance: 'Apparence',
      notifications: 'Notifications',
      privacy: 'Confidentialité et Sécurité',
      financial: 'Financier',
      dataManagement: 'Gestion des Données',
      theme: 'Thème',
      themeSubtitle: 'Choisissez votre thème préféré',
      language: 'Langue',
      languageSubtitle: 'Sélectionnez votre langue préférée',
      switchTo: 'Passer à',
      dark: 'Sombre',
      light: 'Clair',
      languageChanged: 'Langue changée vers'
    },
    navigation: {
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      settings: 'Paramètres',
      signOut: 'Se déconnecter'
    }
  },
  // Add other languages with minimal translations for demo
  de: {
    settings: {
      title: 'Einstellungen',
      subtitle: 'Verwalten Sie Ihre Kontoeinstellungen und Anwendungseinstellungen',
      account: 'Konto',
      appearance: 'Erscheinungsbild',
      notifications: 'Benachrichtigungen',
      privacy: 'Datenschutz & Sicherheit',
      financial: 'Finanziell',
      dataManagement: 'Datenverwaltung',
      theme: 'Theme',
      themeSubtitle: 'Wählen Sie Ihr bevorzugtes Theme',
      language: 'Sprache',
      languageSubtitle: 'Wählen Sie Ihre bevorzugte Sprache',
      switchTo: 'Wechseln zu',
      dark: 'Dunkel',
      light: 'Hell',
      languageChanged: 'Sprache geändert zu'
    },
    navigation: {
      dashboard: 'Dashboard',
      profile: 'Profil',
      settings: 'Einstellungen',
      signOut: 'Abmelden'
    }
  },
  // Using English as fallback for other languages for now
  it: {
    settings: {
      title: 'Impostazioni',
      subtitle: 'Gestisci le tue preferenze dell\'account e le impostazioni dell\'applicazione',
      account: 'Account',
      appearance: 'Aspetto',
      notifications: 'Notifiche',
      privacy: 'Privacy e Sicurezza',
      financial: 'Finanziario',
      dataManagement: 'Gestione Dati',
      theme: 'Tema',
      themeSubtitle: 'Scegli il tuo tema preferito',
      language: 'Lingua',
      languageSubtitle: 'Seleziona la tua lingua preferita',
      switchTo: 'Passa a',
      dark: 'Scuro',
      light: 'Chiaro',
      languageChanged: 'Lingua cambiata in'
    },
    navigation: {
      dashboard: 'Dashboard',
      profile: 'Profilo',
      settings: 'Impostazioni',
      signOut: 'Disconnetti'
    }
  },
  pt: {
    settings: {
      title: 'Configurações',
      subtitle: 'Gerencie suas preferências de conta e configurações do aplicativo',
      account: 'Conta',
      appearance: 'Aparência',
      notifications: 'Notificações',
      privacy: 'Privacidade e Segurança',
      financial: 'Financeiro',
      dataManagement: 'Gerenciamento de Dados',
      theme: 'Tema',
      themeSubtitle: 'Escolha seu tema preferido',
      language: 'Idioma',
      languageSubtitle: 'Selecione seu idioma preferido',
      switchTo: 'Mudar para',
      dark: 'Escuro',
      light: 'Claro',
      languageChanged: 'Idioma alterado para'
    },
    navigation: {
      dashboard: 'Painel',
      profile: 'Perfil',
      settings: 'Configurações',
      signOut: 'Sair'
    }
  },
  zh: {
    settings: {
      title: '设置',
      subtitle: '管理您的账户偏好和应用程序设置',
      account: '账户',
      appearance: '外观',
      notifications: '通知',
      privacy: '隐私与安全',
      financial: '财务',
      dataManagement: '数据管理',
      theme: '主题',
      themeSubtitle: '选择您喜欢的主题',
      language: '语言',
      languageSubtitle: '选择您的首选语言',
      switchTo: '切换到',
      dark: '深色',
      light: '浅色',
      languageChanged: '语言已更改为'
    },
    navigation: {
      dashboard: '仪表板',
      profile: '个人资料',
      settings: '设置',
      signOut: '退出登录'
    }
  },
  ja: {
    settings: {
      title: '設定',
      subtitle: 'アカウントの設定とアプリケーション設定を管理',
      account: 'アカウント',
      appearance: '外観',
      notifications: '通知',
      privacy: 'プライバシーとセキュリティ',
      financial: '財務',
      dataManagement: 'データ管理',
      theme: 'テーマ',
      themeSubtitle: 'お好みのテーマを選択',
      language: '言語',
      languageSubtitle: 'お好みの言語を選択',
      switchTo: '切り替え',
      dark: 'ダーク',
      light: 'ライト',
      languageChanged: '言語が変更されました'
    },
    navigation: {
      dashboard: 'ダッシュボード',
      profile: 'プロファイル',
      settings: '設定',
      signOut: 'サインアウト'
    }
  },
  ko: {
    settings: {
      title: '설정',
      subtitle: '계정 환경설정 및 애플리케이션 설정 관리',
      account: '계정',
      appearance: '모양',
      notifications: '알림',
      privacy: '개인정보 보호 및 보안',
      financial: '금융',
      dataManagement: '데이터 관리',
      theme: '테마',
      themeSubtitle: '선호하는 테마 선택',
      language: '언어',
      languageSubtitle: '선호하는 언어 선택',
      switchTo: '전환',
      dark: '다크',
      light: '라이트',
      languageChanged: '언어가 변경되었습니다'
    },
    navigation: {
      dashboard: '대시보드',
      profile: '프로필',
      settings: '설정',
      signOut: '로그아웃'
    }
  },
  ar: {
    settings: {
      title: 'الإعدادات',
      subtitle: 'إدارة تفضيلات حسابك وإعدادات التطبيق',
      account: 'الحساب',
      appearance: 'المظهر',
      notifications: 'الإشعارات',
      privacy: 'الخصوصية والأمان',
      financial: 'المالية',
      dataManagement: 'إدارة البيانات',
      theme: 'السمة',
      themeSubtitle: 'اختر السمة المفضلة لديك',
      language: 'اللغة',
      languageSubtitle: 'اختر لغتك المفضلة',
      switchTo: 'التبديل إلى',
      dark: 'داكن',
      light: 'فاتح',
      languageChanged: 'تم تغيير اللغة إلى'
    },
    navigation: {
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      signOut: 'تسجيل الخروج'
    }
  },
  ru: {
    settings: {
      title: 'Настройки',
      subtitle: 'Управление настройками учетной записи и приложения',
      account: 'Аккаунт',
      appearance: 'Внешний вид',
      notifications: 'Уведомления',
      privacy: 'Конфиденциальность и безопасность',
      financial: 'Финансы',
      dataManagement: 'Управление данными',
      theme: 'Тема',
      themeSubtitle: 'Выберите предпочитаемую тему',
      language: 'Язык',
      languageSubtitle: 'Выберите предпочитаемый язык',
      switchTo: 'Переключить на',
      dark: 'Темная',
      light: 'Светлая',
      languageChanged: 'Язык изменен на'
    },
    navigation: {
      dashboard: 'Панель управления',
      profile: 'Профиль',
      settings: 'Настройки',
      signOut: 'Выйти'
    }
  }
};

export const useTranslation = () => {
  const language = useSelector((state: RootState) => state.language);
  
  return {
    t: translations[language.code],
    currentLanguage: language
  };
};

export default translations;
