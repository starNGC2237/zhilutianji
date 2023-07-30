// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
      { src: '~/plugins/vercel.ts', mode: 'client' },
  ],
  image: {
    format: ['webp'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs:{ lang: 'en'},
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'zhilutianji \'s site',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'zhilutianji \'s amazing site.' },
        { name: 'author', content: 'zhilutianji' },
        { name: 'keywords', content: 'zhilutianji, zhilutianji\'s site, zhilutianji\'s about, zhilutianji\'s homepage,zhilutianji\'s github ' },
        { name: 'google', content: 'notranslate' },
      ],
    }
  },
  css: ['~/assets/css/main.scss','~/assets/css/scrollbar.scss'],
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/image'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/_sizes.scss" as *;'
        }
      }
    }
  },
  devtools: { enabled: true }
})
