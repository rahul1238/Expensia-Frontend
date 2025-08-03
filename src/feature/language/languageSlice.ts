import { createSlice } from "@reduxjs/toolkit";

export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'ru';

interface LanguageState {
  code: LanguageCode;
  name: string;
}

// Get initial language from localStorage or default to English
const getInitialLanguage = (): LanguageState => {
  if (typeof window === "undefined") {
    return { code: 'en', name: 'English' };
  }
  
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    try {
      const parsed = JSON.parse(savedLanguage);
      return parsed;
    } catch {
      // fallback to default if parsing fails
    }
  }

  // Detect browser language if available
  const browserLang = navigator.language.split('-')[0] as LanguageCode;
  const supportedLanguages: LanguageCode[] = ['en', 'hi', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'ru'];
  
  if (supportedLanguages.includes(browserLang)) {
    const languageNames: Record<LanguageCode, string> = {
      'en': 'English',
      'hi': 'हिन्दी',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'zh': '中文',
      'ja': '日本語',
      'ko': '한국어',
      'ar': 'العربية',
      'ru': 'Русский'
    };
    
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
      const languageNames: Record<LanguageCode, string> = {
        'en': 'English',
        'hi': 'हिन्दी',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'it': 'Italiano',
        'pt': 'Português',
        'zh': '中文',
        'ja': '日本語',
        'ko': '한국어',
        'ar': 'العربية',
        'ru': 'Русский'
      };
      
      state.code = action.payload;
      state.name = languageNames[action.payload];
      
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("language", JSON.stringify(state));
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
