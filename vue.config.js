module.exports = {
  devServer: {
    host: '0.0.0.0'
  },
  pluginOptions: {
    mock: { entry: './mock/index.js', debug: true },
  },
}
