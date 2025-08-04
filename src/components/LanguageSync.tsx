import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { type RootState } from '../app/store';
import { setLanguage } from '../feature/language/languageSlice';

/**
 * Component to sync i18next language with Redux state
 * This ensures both systems stay in sync
 */
export const LanguageSync: React.FC = () => {
  const { i18n } = useTranslation();
  const language = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync Redux with i18next on mount if they differ
    if (i18n.language !== language.code) {
      if (i18n.language && i18n.language !== 'dev') {
        dispatch(setLanguage(i18n.language as any));
      } else {
        i18n.changeLanguage(language.code);
      }
    }
  }, [i18n, language.code, dispatch]);

  useEffect(() => {
    // Listen to i18next language changes and sync Redux
    const handleLanguageChange = (lng: string) => {
      if (lng !== language.code && lng !== 'dev') {
        dispatch(setLanguage(lng as any));
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, language.code, dispatch]);

  return null; // This component doesn't render anything
};

export default LanguageSync;
