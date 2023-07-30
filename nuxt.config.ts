// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
      { src: '~/plugins/vercel.ts', mode: 'client' },
  ],
  image: {
    format: ['webp'],
  },
  app: {
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
  css: ['~/assets/css/main.scss'],
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
