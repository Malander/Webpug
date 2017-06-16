/*
|--------------------------------------------------------------------------
| Webpack Base Imports
|--------------------------------------------------------------------------
|
| Importing "path" and "webpack" variables so we can use both later
| for configuration settingss
|
*/

var webpack = require('webpack');
var path = require('path');

/*
|--------------------------------------------------------------------------
| Imagemin 
|--------------------------------------------------------------------------
| 
*/

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['build/images/*.{jpg,png}'], 'build/images', {
	plugins: [
		imageminJpegtran(),
		imageminPngquant({quality: '65-80'})
	]
})

/*
|--------------------------------------------------------------------------
| Plugins Imports
|--------------------------------------------------------------------------
|
| Here we declare variables for plugins we've installed via npm and later
| we will init them in the "plugins" section
| 
*/

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
|--------------------------------------------------------------------------
| Webpack Configuration
|--------------------------------------------------------------------------
|
| Here we define the "config" variable where we put all of the
| settings for our modules and plugins
| 
*/

const config = {

	context: path.resolve(__dirname, 'app'),

	entry: {
		main: './js/main.js',
		vendor: './js/vendor.js'
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].js',
		publicPath: '/'
	},

	module: {
		rules: [

			// Scss rule: search for any file in entry with scss extension and autoprefix it.
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
				},

			// Fonts rule: search for any file in entry with woff|ttf|eot|svg|otf extensions and push it into build/fonts/.
				{
	        test: /\.(woff2?|ttf|eot|svg|otf)$/,
	        loader: 'file-loader',
	        options: {
	            name: 'fonts/[name].[ext]?[hash]'
	        }
	      },

      // Pug rule:  any file in entry with pug extension.
	      {
		      test: /\.pug$/,
					loader: 'pug-loader'
				}
		]
	},

	// Jquery resolve: fix "jquery is not defined" when requiring it from node_modules.
	resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    }
  },

	plugins: [

		// Pick css files detected by Scss rule and push them into build/css.
			new ExtractTextPlugin(
				'css/[name].css'
			),

		// Pick index.pug file, push it into build/ and inject dependencies.
	    new HtmlWebpackPlugin({
	    	filename: 'index.html',
	      template: 'pug/views/index.pug',
	    }),

	  // Copy humans, robots and htaccess to build directory
	    new CopyWebpackPlugin([
        {
        	from: 'humans.txt'
        },
        {
        	from: 'robots.txt'
        },
        {
          from: {
              glob:'.*',
              dot: true
          }
        },
      ]),

	    // Here you need to add any of the additional page u're creating in your project.
	    // For example:

			// new HtmlWebpackPlugin({
	  	//   filename: 'about.html',
	  	//   template: 'pug/views/about.pug',
	  	// }),

	   // Launch a dev-server with BrowserSync.
	    new BrowserSyncPlugin({
	      host: 'localhost',
	      port: 3000,
	      server: { baseDir: ['build'] }
	    })

   ]
};

module.exports = config;