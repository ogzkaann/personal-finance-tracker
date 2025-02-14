import { createI18n } from 'vue-i18n';
import tr from '@/locales/tr';
import en from '@/locales/en';

// Tarayıcı dilini al
const browserLang = navigator.language.split('-')[0];

// Desteklenen diller
const supportedLocales = ['tr', 'en'];

// Varsayılan dili belirle
const defaultLocale = supportedLocales.includes(browserLang) ? browserLang : 'tr';

export const i18n = createI18n({
  legacy: false, // Composition API desteği için
  locale: defaultLocale,
  fallbackLocale: 'tr',
  messages: {
    tr,
    en
  },
  numberFormats: {
    tr: {
      currency: {
        style: 'currency',
        currency: 'TRY',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'TRY',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }
    }
  },
  datetimeFormats: {
    tr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    }
  }
}); 