const getConfig = require('hjs-webpack');

const config = getConfig({
    in: 'src/index.js',
    out: 'build',
    clearBeforeBuild: true,
});

module.exports = config;
