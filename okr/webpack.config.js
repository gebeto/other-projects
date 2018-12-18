const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prompts = require('prompts');


const envConfig = (env, opts) => require(`./configs/webpack.${env}.js`)(env, opts);

const baseConfig = (env, opts) => ({
	entry: path.resolve(opts.path, 'src/index.tsx'),

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},

	output: {
		path: path.resolve(opts.path, 'dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.s?css?/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{ test: /\.tsx?/, loader: 'awesome-typescript-loader', },
			{ test: /\.pug$/, loader: 'pug-loader', },
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
		]
	},

	plugins: [	
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'templates/index.hbs'),
			inject: false,
			templateParameters: {
				title: require(path.resolve(opts.path, "package.json")).name,
			}
		}),
	]
});



module.exports = (env, opts) => {
	const optss = {
		path: path.resolve(__dirname, '.'),
	};
	return webpackMerge(baseConfig(env, optss), envConfig(env, optss));
};

