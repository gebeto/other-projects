const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const envConfig = (env, opts) => {
	return require(`./configs/webpack.${env}.js`)(env, {
		path: __dirname,
	});
}

const baseConfig = (env, opts, ...args) => {
	const projectPath = opts._.length ? path.resolve(__dirname, opts._[0]) : false;
	if (!projectPath) throw "Project is not exists!";
	const packagePath = path.resolve(projectPath, 'package.json');
	if (!fs.existsSync(packagePath)) throw "Package.json are not found in project folder!";

	return {
		entry: path.resolve(projectPath, 'src/index.tsx'),

		output: {
			path: path.resolve(projectPath, 'dist'),
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
					title: require(packagePath).name,
				}
			}),
		]
	};
};


module.exports = (env, opts) => webpackMerge(baseConfig(env, opts), envConfig(env, opts));

