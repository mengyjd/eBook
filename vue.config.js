let isDev = process.env.NODE_ENV === 'production' ? false : true

module.exports = {
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 8091
  },
  productionSourceMap: isDev ? true : false,
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 524288 * 10,
      maxEntrypointSize: 524288 * 10
    }
  }
}
