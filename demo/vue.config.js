const baseUrl = 'http://localhost:2500';
module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? './' : '',// 因为页面静态文件是通过相对路径访问 为了项目可以部署在任意路径 publicPath需要配置
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