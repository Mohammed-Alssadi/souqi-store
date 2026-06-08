import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

// الموارد (Resources) - اللغات المتاحة
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  // ربط i18next مع react-i18next
  .use(initReactI18next)
  // اكتشاف لغة المتصفح أو القراءة من الـ localStorage
  .use(LanguageDetector)
  // تهيئة i18next
  .init({
    resources,
    fallbackLng: 'en', // اللغة الافتراضية إذا لم يتم التعرف على لغة المتصفح
    
    // إعدادات الـ Language Detector لحفظ اللغة في التخزين المحلي
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React يقوم بحماية النصوص تلقائياً من ثغرات XSS
    }
  });

export default i18n;
