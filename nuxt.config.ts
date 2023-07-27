// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['normalize.css/normalize.css'],
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
