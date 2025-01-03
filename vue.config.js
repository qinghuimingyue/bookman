// vue.config.js

const path = require('path');

// 引入 Mock.js 以确保在开发服务器启动时 Mock 数据被加载
// import('./src/mock/index.js'); // 确保 Mock.js 已经被加载

module.exports = {
  devServer: {
    // 不配置代理 /login, /userInfo 等 API 请求路径
    // 如果有其他需要代理的路径，可以在这里添加
    // 例如，代理 /other 请求到后端服务器
    allowedHosts: [
      'host.com', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.host.com'   // .是二级域名的通配符   
    ],
    allowedHosts: "all",
    proxy: {
      // 示例：代理 /other 请求到 http://localhost:8081
       '/': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true, // 允许跨域
        // pathRewrite 不需要，因为没有前缀需要重写
       },
    },
    historyApiFallback: true, // 确保路由正常工作
  },

  // 配置 Webpack 以使用路径别名（如有需要）
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
