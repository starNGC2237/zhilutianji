// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    { src: "~/plugins/vercel.ts", mode: "client" },
    { src: "~/plugins/router.ts", mode: "client" },
  ],
  image: {
    format: ["webp"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "zhilutianji 's site",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "zhilutianji 's amazing site." },
        { name: "author", content: "zhilutianji" },
        {
          name: "keywords",
          content:
            "zhilutianji, zhilutianji's site, zhilutianji's about, zhilutianji's homepage,zhilutianji's github ",
        },
        { name: "google", content: "notranslate" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@starMars_all" },
        { name: "twitter:creator", content: "@starMars_all" },
        { name: "twitter:title", content: "zhilutianji 's site" },
        {
          name: "twitter:description",
          content: "zhilutianji 's amazing site.",
        },
        {
          name: "twitter:image",
          content: "https://zhilutianji.vercel.app/head.jpg",
        },
        { property: "og:title", content: "zhilutianji 's site" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://zhilutianji.vercel.app" },
        {
          property: "og:image",
          content: "https://zhilutianji.vercel.app/head.jpg",
        },
        {
          property: "og:description",
          content: "zhilutianji 's amazing site.",
        },
        { property: "og:site_name", content: "zhilutianji 's site" },
      ],
    },
  },
  css: ["~/assets/css/main.scss", "~/assets/css/scrollbar.scss"],
  modules: [
    "@nuxt/image",
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxtjs/eslint-module",
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./i18n.config.ts", // if you are using custom path, default
        locales: ["en", "zh"], // used in URL path prefix
        defaultLocale: "en",
        detectBrowserLanguage: false,
      },
    ],
  ],
  content: {
    highlight: {
      preload: ["js", "ts", "vue", "bash"],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/_sizes.scss" as *;',
        },
      },
    },
  },
  tailwindcss: {
    config: {
      plugins: [require("@tailwindcss/typography")],
    },
  },
  devtools: { enabled: true },
});
