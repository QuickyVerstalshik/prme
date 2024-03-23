/** @type {import('next-i18next').UserConfig} */
const I18NextHttpBackend = require('i18next-http-backend/cjs');
module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ru', 'ua'],
        backend: {
            loadPath: 'https://api.pay2pitch.app/locales/{{lng}}/translation.json',
        },
    },
    debug: false,
    use: [I18NextHttpBackend],
};
