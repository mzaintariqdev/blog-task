export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/globals.css', 
    '~/assets/css/globals.css' 
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'de', iso: 'de-DE', file: 'de.json' }
    ],
    vueI18n: "./i18n.config.ts",
  },
});