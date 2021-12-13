module.exports = {

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
  // devServer: {
  //   host: "127.0.0.1",
  //   port: 8081
  //   // proxy: 'http://172.16.142.225:4000'
  // }
}
