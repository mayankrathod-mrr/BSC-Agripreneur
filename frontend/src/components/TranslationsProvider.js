// frontend/src/components/TranslationsProvider.js
"use client";

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n-client'; // <-- Import our new client-side config

const TranslationsProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default TranslationsProvider;