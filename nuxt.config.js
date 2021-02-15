const { TMDB_API_KEY, API_URL,FIREBASE_API_KEY,FIREBASE_PROJECT_ID,FIREBASE_AUTH_DOMAIN,STORAGE_BUCKET,MESSAGING_SENDER_ID,FIREBASE_APP_ID } = process.env
require("dotenv").config();

import colors from 'vuetify/es5/util/colors'
// const webpack = require('webpack')

export default {
  env: {
    TMDB_API_KEY,
    API_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate(title) {
      return (title ? `${title} | ` : '') + 'Nuxt_TMDB'
    },
    // titleTemplate: '%s - Nuxt_TMDB',
    // title: 'Nuxt_TMDB',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['@nuxtjs/pwa', { icon: false }],
    'nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: ['Roboto:400']
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: false,
      font: false
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     '_': 'lodash'
    //   })
    // ],
    vendor: ['lodash'],
  },
  publicRuntimeConfig: {
    apiUrl: API_URL,
    tmdbApiKey: process.env.NODE_ENV !== 'development' ? TMDB_API_KEY : undefined,
  },
  privateRuntimeConfig: {
    tmdbApiKey: TMDB_API_KEY
  },
}
