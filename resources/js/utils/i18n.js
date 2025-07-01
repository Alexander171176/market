import { createI18n } from 'vue-i18n';
import en from '../locales/en.js';
import ru from '../locales/ru.js';
import kk from '../locales/kk.js';

const messages = { en, ru, kk };
const defaultLocale = 'ru';

// Инициализируем временно с default (будет обновлено позже в app.js)
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages,
});

export default i18n;
