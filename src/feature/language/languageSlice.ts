import { createSlice } from "@reduxjs/toolkit";

export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'ru';

interface LanguageState {
  code: LanguageCode;
  name: string;
}

// Language name mappings
const languageNames: Record<LanguageCode, string> = {
  'en': 'English',
  'hi': 'हिन्दी',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'it': 'Italiano',
  'pt': 'Português',
  'zh': '中文',
  'ja': '日本语',
  'ko': '한국어',
  'ar': 'العربية',
  'ru': 'Русский'
};

// Get initial language from i18next stored value or default to English
const getInitialLanguage = (): LanguageState => {
  if (typeof window === "undefined") {
    return { code: 'en', name: 'English' };
  }
  
  // Try to get from i18next localStorage first
  const i18nextLang = localStorage.getItem("i18nextLng");
  if (i18nextLang && languageNames[i18nextLang as LanguageCode]) {
    const code = i18nextLang as LanguageCode;
    return { code, name: languageNames[code] };
  }

  // Fallback to old localStorage key
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    try {
      const parsed = JSON.parse(savedLanguage);
      if (languageNames[parsed.code as LanguageCode]) {
        return parsed;
      }
    } catch {
      // fallback to default if parsing fails
    }
  }

  // Detect browser language if available
  const browserLang = navigator.language.split('-')[0] as LanguageCode;
  const supportedLanguages: LanguageCode[] = ['en', 'hi', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'ru'];
  
  if (supportedLanguages.includes(browserLang)) {
    return { code: browserLang, name: languageNames[browserLang] };
  }
  
  return { code: 'en', name: 'English' };
};

const initialState: LanguageState = getInitialLanguage();

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: LanguageCode }) => {
      state.code = action.payload;
      state.name = languageNames[action.payload];
      
      // Update i18next language (this will sync localStorage automatically)
      // Note: The actual i18n change should be handled in the hook
      if (typeof window !== "undefined") {
        // Keep backward compatibility by storing in old format too
        localStorage.setItem("language", JSON.stringify(state));
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
