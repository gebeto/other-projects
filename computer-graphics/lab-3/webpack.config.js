const path = require('path');
const config = require('../webpack.config');

module.exports = (env) => config(env, {
    path: __dirname,
    package: require('./package.json'),
});

