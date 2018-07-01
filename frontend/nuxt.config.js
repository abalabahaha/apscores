module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { hid: "description", name: "description", content: "Providing resources and utilities for over 300,000 AP students" }
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/2.4.85/css/materialdesignicons.min.css"}
    ],
    title: "AP Students"
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    "~/assets/style.css"
  ],
  modules: [
    ["nuxt-buefy", {
      defaultIconPack: "mdi",
      materialDesignIcons: false
    }],
    ["@nuxtjs/axios", {
      host: "127.0.0.1",
      https: false,
      port: 3001,
      prefix: "/api/v1",
      proxy: !process.env.npm_config_argv.includes("dev"),
      retry: {
        retries: 50,
        retryDelay: (count) => {
          let base = Math.min(count * 1000, 5000);
          return base + ~~(Math.random() * 5000);
        }
      }
    }]
  ]
}
