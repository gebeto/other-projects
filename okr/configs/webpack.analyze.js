const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, opts) => ({
	mode: 'production',
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
		}),
	]
});