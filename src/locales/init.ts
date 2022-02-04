import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage } from './language-plugin';

export type LanguageCode = 'en' | 'ua';

type LanguageFiles = {
  common: number;
  navigation: number;
  settings: number;
  boxes: number;
  chat: number;
  gallery: number;
};

const fallbackLng = 'en';

const resources: Record<LanguageCode, LanguageFiles> = {
  en: {
    common: require('./en/common.json'),
    navigation: require('./en/navigation.json'),
    settings: require('./en/settings.json'),
    boxes: require('./en/boxes.json'),
    chat: require('./en/chat.json'),
    gallery: require('./en/gallery.json'),
  },
  ua: {
    common: require('./ua/common.json'),
    navigation: require('./ua/navigation.json'),
    settings: require('./ua/settings.json'),
    boxes: require('./ua/boxes.json'),
    chat: require('./ua/chat.json'),
    gallery: require('./ua/gallery.json'),
  },
};

i18next
  .use(initReactI18next)
  .use(detectLanguage(fallbackLng))
  .init({
    fallbackLng,
    debug: false,
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
    ns: ['common', 'navigation', 'boxes', 'chat', 'gallery'],
    resources: resources as unknown as Resource,
  });
