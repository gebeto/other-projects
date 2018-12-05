const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const envConfig = (env, opts) => require(`./configs/webpack.${env}.js`)(env, opts);

const baseConfig = (env, opts) => ({
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
				title: require(path.resolve(opts.path, "package.json")).name,
			}
		}),
	]
});


module.exports = (env, opts) => {
	console.log(opts._);

	return opts._.map((projectName, index) => {
		const projectPath = path.resolve(__dirname, projectName);
		// if (!projectPath) throw `Project is not exists!`;
		const packagePath = path.resolve(projectPath, 'package.json');
		if (!fs.existsSync(packagePath)) throw `Package.json are not found in project '${projectName}'!`;
		
		const opts = {
			path: projectPath,
			serveIndex: index,
		};
		return webpackMerge(baseConfig(env, opts), envConfig(env, opts));
	});
};

