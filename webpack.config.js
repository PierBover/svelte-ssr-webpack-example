const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const NodeExternals = require('webpack-node-externals');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = !PRODUCTION;

const webpackConfigs = [];

// Clean folders
rimraf.sync(path.join(__dirname, 'dist'));
rimraf.sync(path.join(__dirname, 'client-entry-scripts'));

// SERVER + SCSS

webpackConfigs.push({
	target: 'node',
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		}
	},
	node: {
		__dirname: false
	},
	// don't bundle node_modules
	externals: [NodeExternals()],
	entry: './server/index.js',
	mode: PRODUCTION ? 'production' : 'development',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: PRODUCTION ? 'static/styles-[hash].css' : 'static/styles.css'
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						dev: false,
						immutable: true,
						generate: 'ssr',
						emitCss: false
					}
				}
			}
		]
	},
	// plugins: [
	// 	new NodemonPlugin()
	// ]
});

// CLIENT JS

webpackConfigs.push({
	entry: WebpackWatchedGlobEntries.getEntries(
		[path.resolve(__dirname, './client-entry-scripts/*.js')]
	),
	mode: PRODUCTION ? 'production' : 'development',
	output: {
		path: path.join(__dirname, 'dist/static'),
		filename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true
					}
				}
			}
		]
	},
	plugins: [
		new WebpackWatchedGlobEntries()
	]
});


module.exports = webpackConfigs;