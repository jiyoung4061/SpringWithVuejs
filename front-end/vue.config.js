module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api/*': {
        target: 'http://192.168.1.23:8080'
      }
    }
  }
}
