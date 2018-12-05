const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const envConfig = (env, opts) => {
	return require(`./configs/webpack.${env}.js`)(env, {
		path: opts.path,
	});
}

const baseConfig = (env, opts) => {
	return {
		entry: path.resolve(opts.path, 'src/index.tsx'),

		output: {
			path: path.resolve(opts.path, 'dist'),
			filename: 'bundle.js',
		},

		module: {
			rules: [
				{
					test: /\.scss?/,
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
					title: opts.package.name,
				}
			}),
		]
	};
};


module.exports = (env, opts) => webpackMerge(baseConfig(env, opts), envConfig(env, opts));

