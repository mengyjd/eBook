function mock (app, url, data) {
  app.get(url, (req, res) => {
    res.json(data)
  })
}

const bookHomeData = require('./src/mock/bookHome')
const bookFlatList = require('./src/mock/bookFlatList')
const bookShelf = require('./src/mock/bookShelf')
const bookCategoryList = require('./src/mock/bookCategoryList')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 8091,
    before (app) {
      mock(app, '/book/home', bookHomeData)
      mock(app, '/book/shelf', bookShelf)
      mock(app, '/book/flat-list', bookFlatList)
      mock(app, '/book/list', bookCategoryList)
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 524288 * 10,
      maxEntrypointSize: 524288 * 10
    }
  }
}
