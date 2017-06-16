# Webpug
Pure Webpack front-end static environment using pug.

This environment is an experiment i made to learn Webpack, i took my previous Gulp front-end environment for static sites and decided to refactor it with Webpack. I ended up with this, and i think it is a good alternative: i can now install dependencies with NPM including them directly into my js files instead of using Bower, use webpack dev server with Browsersync (which is pretty fast) and i hope to implement versioning with chunkhash pretty soon.

## Features
- Scss
- Pug templating language
- Autoprefixer
- Imagemin
- BrowserSync

## Get started
Clone this repo on your machine and run inside of it:

	npm install

or if you prefer Yarn

	yarn install

Once you have installed the dependencies you can run

	webpack -w

to instantly open up a dev server with BrowserSync and start coding.

## Multipage support
Webpack is a little bit tricky when it comes to setup a multipage project.
If you want to have more pages in your site you need to open up the webpack.config.js and search the section with HtmlWebpackPlugin, there you can find instructions on how to add support for more pages in Webpug.

## Installing a package
Webpug has already the latest Bootstrap 3 stable release (currently 3.3.7) and jQuery included in dependencies.

To install a dependency just run

	npm install <package-name> --save

or

	yarn add <package-name>

then you can require it in the vendor.js and, if the package needs css, you can import css in vendor.scss.

## Build for production
When done with coding you can run

	webpack -p

to minimize and optimize all assets and images.

## To do
- [ ] Versioning
- [ ] Dynamic multipage support

