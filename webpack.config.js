var path    = require('path')
var webpack = require('webpack')

module.exports={
  entry: {
    uimanage:'./src/uimanage.js',
    admin:'./src/admin.js',
    index:'./src/index.js',
    home:'./src/home.js',
    debug:'./src/debug.js'
  },
  output: {
    path:'./static',
    filename: "[name].App.js"
  },
  watch : true,
	plugins : [
    new webpack.ProvidePlugin({
      Promise : 'es6-promise'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src'        : path.resolve(__dirname, './src'),
      'api'        : path.resolve(__dirname, './src/api'),
      'route'      : path.resolve(__dirname, './src/route'),
      'filters'    : path.resolve(__dirname, './src/filters'),
      'directive'  : path.resolve(__dirname, './src/directive'),
      'views'      : path.resolve(__dirname, './src/views'),
      'components' : path.resolve(__dirname, './src/components'),
      'style'      : path.resolve(__dirname, './src/style'),
      'static'     : path.resolve(__dirname, './static')
    }
  },
	module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel?presets[]=es2015'
      },
      {
        test:/\.vue$/,
        loader:'vue'
      },{
        test:/\.scss$/,
        loader:'style!css!sass'
      },
      {
        test:/\.css$/,
        loader:'style!css'
      },
      {
        test   : /\.(png|jpg|gif)$/,
        loader : 'url-loader?limit=8192'
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader?name=/[name]_[hash:6].[ext]'
      }
    ],
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
      }
  },
  vue: {
        autoprefixer: {
          browsers: ['> 1%']
        },
        loaders: {
          scss: 'style!css!sass'
        }
    }
}