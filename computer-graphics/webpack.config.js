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

function validProject(projectName) {
	const projectPath = path.resolve(__dirname, projectName);
	const packagePath = path.resolve(projectPath, 'package.json');
	if (!fs.existsSync(packagePath)) {
		return false;
	}
	return true;
}


module.exports = async (env, opts) => {
	let projects = null;
	if (!opts._.length) {
		const response = await prompts({
			type: 'multiselect',
			name: 'value',
			choices: fs.readdirSync('./').filter(validProject),
			message: `Please enter projects to ${process.env.npm_lifecycle_event}`,
			validate: value => !validProject(value) ? `Project are not exists` : true
		});
		if (response.value instanceof Array) {
			projects = response.value;
		} else if (typeof response.value === 'string') {
			projects = [response.value];
		}
	} else {
		projects = opts._;
	}

	if (!projects.length) {
		throw "No projects selected";
	}
	return projects.map((projectName, index) => {
		const projectPath = path.resolve(__dirname, projectName);
		const packagePath = path.resolve(projectPath, 'package.json');
		if (!fs.existsSync(packagePath)) throw `Package.json are not found in project '${projectName}'!`;
		
		const opts = {
			path: projectPath,
			serveIndex: index,
		};
		return webpackMerge(baseConfig(env, opts), envConfig(env, opts));
	});
};

