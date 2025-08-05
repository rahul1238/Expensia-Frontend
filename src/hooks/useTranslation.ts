import { useTranslation as useI18NextTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { setLanguage, type LanguageCode } from '../feature/language/languageSlice';

export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useI18NextTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language);

  const changeLanguage = async (languageCode: LanguageCode) => {
    try {
      await i18nInstance.changeLanguage(languageCode);
      dispatch(setLanguage(languageCode));
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    i18n: i18nInstance,
  };
};

// Export supported languages for consistency
export const SUPPORTED_LANGUAGES: LanguageCode[] = ['en', 'hi', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'ru'];

// Language name mappings
export const LANGUAGE_NAMES: Record<LanguageCode, { nativeName: string; englishName: string }> = {
  'en': { nativeName: 'English', englishName: 'English' },
  'hi': { nativeName: 'हिन्दी', englishName: 'Hindi' },
  'es': { nativeName: 'Español', englishName: 'Spanish' },
  'fr': { nativeName: 'Français', englishName: 'French' },
  'de': { nativeName: 'Deutsch', englishName: 'German' },
  'it': { nativeName: 'Italiano', englishName: 'Italian' },
  'pt': { nativeName: 'Português', englishName: 'Portuguese' },
  'zh': { nativeName: '中文', englishName: 'Chinese' },
  'ja': { nativeName: '日本語', englishName: 'Japanese' },
  'ko': { nativeName: '한국어', englishName: 'Korean' },
  'ar': { nativeName: 'العربية', englishName: 'Arabic' },
  'ru': { nativeName: 'Русский', englishName: 'Russian' }
};

export default useTranslation;
