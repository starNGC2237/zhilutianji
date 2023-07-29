// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
