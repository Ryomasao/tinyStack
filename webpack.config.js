// basic
// https://itnext.io/vuejs-and-webpack-4-from-scratch-part-1-94c9c28a534a

// dev-server
// hot reloadするためにhtmlにdistのパスをinjectするようにしなきゃいけない記載がある
// 特段対応してないけど、リロードされる
// https://itnext.io/vue-js-and-webpack-4-from-scratch-part-2-5038cc9deffb

// lint,jest
// https://itnext.io/vue-js-and-webpack-4-from-scratch-part-3-3f68d2a3c127

var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // vue-loaderは.vueを読み込んで.lessを作ってるようなイメージなのかしら
      // 作成された.lessに対してのloaderをもっかい指定する
      // https://vue-loader.vuejs.org/guide/pre-processors.html#sharing-global-variables
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // さらにvue-loaderによってvueから.jsにseparateされたファイルにbabelをあてる
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}