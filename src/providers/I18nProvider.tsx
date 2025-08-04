import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

/**
 * I18n Provider component that wraps the entire application
 * to provide i18next context throughout the component tree
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
