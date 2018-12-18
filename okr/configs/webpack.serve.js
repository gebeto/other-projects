const webpackMerge = require('webpack-merge');
const development = require('./webpack.development');

module.exports = (env, opts) => webpackMerge(
	development(env, opts),
	{
		devServer: {
			port: 5001,
			host: '0.0.0.0'
		},
	}
);