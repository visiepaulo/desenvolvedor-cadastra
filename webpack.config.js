const path = require('path')

const webpackConfig = paths => ({
    entry: {
        main: path.resolve(__dirname, paths.scripts.src),
    },
    output: {
        path: path.resolve(__dirname, paths.dest),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [],
})

module.exports = webpackConfig
