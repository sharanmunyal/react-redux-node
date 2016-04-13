module.exports = {
    entry: [
        './client/javascripts/script.js'
    ],
    output: {
        path: __dirname + '/public/',
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};