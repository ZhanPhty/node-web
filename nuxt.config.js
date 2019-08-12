import path from 'path'
const resolve = dir => path.join(__dirname, dir)

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '@/plugins/antd-ui', ssr: true }, { src: '@/plugins/filters.js' }],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/dotenv',
      { filename: process.env.NODE_ENV === 'development' ? '.env' : `.env.${process.env.NODE_ENV}` }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3200',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  server: {
    port: 9200
  },

  /*
   ** Build configuration
   */
  build: {
    styleResources: {
      less: [
        './assets/style/variables/breakpoints.less',
        './assets/style/variables/colors.less',
        './assets/style/variables/layout.less',
        './assets/style/variables/fonts.less'
      ]
    },

    loaders: {
      less: {
        javascriptEnabled: true
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config) {
      // 别名
      config.resolve.alias.components = resolve('components')
      config.resolve.alias.assets = resolve('assets')
      config.resolve.alias.pages = resolve('pages')
      config.resolve.alias.api = resolve('axios/api')
    }
  }
}
