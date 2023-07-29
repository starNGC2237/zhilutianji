// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'starlibrary.site',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'zhilutianji \'s amazing site.' }
      ],
    }
  },
  css: ['~/assets/css/main.scss'],
  modules: [
    '@nuxtjs/tailwindcss'
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
