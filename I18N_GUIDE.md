# Internationalization (i18n) Implementation Guide

## Overview

This project now uses **i18next** and **react-i18next** for internationalization instead of hardcoded translations. This provides a scalable, industry-standard approach to managing multiple languages.

## Features

- ✅ Industry-standard i18next library
- ✅ 12 supported languages (English, Hindi, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, Russian)
- ✅ Automatic language detection from browser
- ✅ Persistent language selection
- ✅ Real-time language switching
- ✅ Fallback to English for missing translations
- ✅ Redux integration for state management
- ✅ Clean separation of translation keys and components

## Supported Languages

| Language | Code | Native Name | English Name |
|----------|------|-------------|--------------|
| English | `en` | English | English |
| Hindi | `hi` | हिन्दी | Hindi |
| Spanish | `es` | Español | Spanish |
| French | `fr` | Français | French |
| German | `de` | Deutsch | German |
| Italian | `it` | Italiano | Italian |
| Portuguese | `pt` | Português | Portuguese |
| Chinese | `zh` | 中文 | Chinese |
| Japanese | `ja` | 日本語 | Japanese |
| Korean | `ko` | 한국어 | Korean |
| Arabic | `ar` | العربية | Arabic |
| Russian | `ru` | Русский | Russian |

## File Structure

```
src/
├── i18n/
│   ├── index.ts              # i18n configuration
│   └── locales/
│       ├── en.json           # English translations
│       ├── hi.json           # Hindi translations
│       ├── es.json           # Spanish translations
│       ├── fr.json           # French translations
│       ├── de.json           # German translations
│       ├── it.json           # Italian translations
│       ├── pt.json           # Portuguese translations
│       ├── zh.json           # Chinese translations
│       ├── ja.json           # Japanese translations
│       ├── ko.json           # Korean translations
│       ├── ar.json           # Arabic translations
│       └── ru.json           # Russian translations
├── hooks/
│   └── useTranslation.ts     # Custom translation hook
├── components/
│   └── LanguageSync.tsx      # Redux-i18next synchronization
└── feature/
    └── language/
        └── languageSlice.ts  # Redux language state
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from '../hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('settings.title')}</h1>
      <p>{t('settings.subtitle')}</p>
    </div>
  );
}
```

### Changing Language

```tsx
import { useTranslation } from '../hooks/useTranslation';

function LanguageSwitcher() {
  const { changeLanguage, currentLanguage } = useTranslation();
  
  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
  };
  
  return (
    <select 
      value={currentLanguage.code}
      onChange={(e) => handleLanguageChange(e.target.value)}
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="es">Español</option>
      {/* ... other languages */}
    </select>
  );
}
```

## Translation Key Structure

The translations are organized into logical namespaces:

```json
{
  "settings": {
    "title": "Settings",
    "subtitle": "Manage your account preferences"
  },
  "navigation": {
    "dashboard": "Dashboard",
    "profile": "Profile"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "auth": {
    "login": "Login",
    "signup": "Sign Up"
  },
  "dashboard": {
    "welcome": "Welcome back",
    "totalBalance": "Total Balance"
  },
  "transactions": {
    "title": "Transactions",
    "addNew": "Add New Transaction"
  },
  "profile": {
    "title": "Profile",
    "personalInfo": "Personal Information"
  },
  "errors": {
    "required": "This field is required",
    "networkError": "Network error. Please try again."
  }
}
```

## Configuration

### i18next Configuration (`src/i18n/index.ts`)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });
```

### Custom Hook (`src/hooks/useTranslation.ts`)

The custom hook provides:
- Translation function (`t`)
- Current language state
- Language change function
- i18n instance access

## Language Detection & Persistence

1. **Priority Order:**
   - Stored language in localStorage (`i18nextLng`)
   - Browser language preference
   - Default fallback (English)

2. **Persistence:**
   - Language selection is automatically saved to localStorage
   - Survives browser sessions and page refreshes

## State Synchronization

The `LanguageSync` component ensures Redux state and i18next stay synchronized:

```tsx
// Automatically syncs language state between Redux and i18next
<LanguageSync />
```

## Adding New Languages

1. **Add language code to type definition:**
```typescript
// src/feature/language/languageSlice.ts
export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'ru' | 'newlang';
```

2. **Create translation file:**
```json
// src/i18n/locales/newlang.json
{
  "settings": {
    "title": "Translation in new language"
  }
  // ... other translations
}
```

3. **Import in i18n config:**
```typescript
// src/i18n/index.ts
import newlang from './locales/newlang.json';

const resources = {
  // ... existing languages
  newlang: { translation: newlang },
};
```

4. **Add to constants:**
```typescript
// src/constants/settings.ts or src/hooks/useTranslation.ts
export const LANGUAGE_NAMES = {
  // ... existing languages
  'newlang': { nativeName: 'Native Name', englishName: 'English Name' }
};
```

## Adding New Translation Keys

1. **Add to English file first:**
```json
// src/i18n/locales/en.json
{
  "newSection": {
    "newKey": "New translation text"
  }
}
```

2. **Add to all other language files:**
```json
// src/i18n/locales/hi.json, es.json, etc.
{
  "newSection": {
    "newKey": "Translated text in respective language"
  }
}
```

3. **Use in component:**
```tsx
const { t } = useTranslation();
return <p>{t('newSection.newKey')}</p>;
```

## Best Practices

1. **Nested Keys:** Use dot notation for hierarchical organization
   ```tsx
   t('settings.appearance.theme')
   ```

2. **Meaningful Names:** Use descriptive key names
   ```tsx
   t('dashboard.totalBalance') // Good
   t('db.tb') // Bad
   ```

3. **Fallback Handling:** Always provide English translations as fallback

4. **Context-Specific Keys:** Group related translations together
   ```json
   {
     "auth": { "login": "Login", "signup": "Sign Up" },
     "navigation": { "home": "Home", "profile": "Profile" }
   }
   ```

5. **Consistent Formatting:** Maintain consistent capitalization and punctuation

## Migration from Old System

The old hardcoded translation system has been completely replaced:

- ✅ Old `useTranslation` hook replaced with i18next-based version
- ✅ Translation objects (`t.settings.title`) replaced with function calls (`t('settings.title')`)
- ✅ Language switching now uses `changeLanguage()` method
- ✅ State management integrated with i18next

## Testing Language Changes

1. Go to Settings page
2. Navigate to Appearance section
3. Change language from dropdown
4. Verify all text updates immediately
5. Refresh page to verify persistence

## Dependencies

```json
{
  "i18next": "^23.x.x",
  "react-i18next": "^14.x.x",
  "i18next-browser-languagedetector": "^7.x.x"
}
```

## Performance Considerations

- Translation files are loaded synchronously for immediate availability
- Lightweight JSON files minimize bundle size impact
- Language detection is cached for optimal performance
- Only active language translations are loaded (lazy loading not implemented yet)

This implementation provides a robust, scalable internationalization solution that follows industry best practices and can easily accommodate future growth and additional languages.
