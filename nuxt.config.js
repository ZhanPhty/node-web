import path from 'path'
const resolve = dir => path.join(__dirname, dir)

export default {
  mode: 'spa',
  router: {
    middleware: 'auth'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '小辉哥-不唯美毋宁死',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'renderer', content: 'webkit' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '詹小辉博客,uizph,前端技术,zph,designer,web,前端开发,原创作品,经验分享'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '詹小辉官方网站,原创教程、Vue开发、前端技术、行业经验、软件分享、生活摄影,这是一个分享技术的个人平台！'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#007bff' },
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
