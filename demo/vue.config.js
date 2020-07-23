const baseUrl = 'http://localhost:2500';
let cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js'
  ]
}
module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? './' : '',// 因为页面静态文件是通过相对路径访问 为了项目可以部署在任意路径 publicPath需要配置
  lintOnSave: true,
  chainWebpack: config => {
    if (process.env.NODE_ENV == 'production') {
      // 生产环境下配置
      // 生产环境注入cdn
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
      // 压缩代码
      config.optimization.minimize(true)
    } else {

    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV == 'production') {
      // 生产环境下配置
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios'
      }
    }
  },
  devServer: {
    port: '8000',
    // 配置代理服务器 解决跨域
    proxy: {
      // 此项配置是否只在开发环境下起作用
      '/test': {
        target: `${baseUrl}/test`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/test': '/'
        }
      },
      '/music': {
        target: `${baseUrl}/music`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/music': '/'
        }
      },
      '/test1': {
        target: `${baseUrl}/test1`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/test1': '/'
        }
      }
    }
  }
}