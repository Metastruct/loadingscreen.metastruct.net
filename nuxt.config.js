const pkg = require("./package")

module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
    bodyAttrs: {}
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  loadingIndicator: {
    name: "fading-circle",
    color: "#00FFD8",
  },

  /*
  ** Global CSS
  */
  css: [
    "@/assets/style.scss",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vue-clipboard2",
    "~/plugins/vue-observe-visibility"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // "@nuxtjs/bulma"
    "nuxt-material-design-icons"
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
