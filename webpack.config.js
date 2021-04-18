const path = require('path');

module.exports= {
    entry: "./src/index.js",
    output : {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devServer: {
        port:3010,
        watchContentBase: true
    },
    module: {
        rules : [
            {
                test: /\.(js|jsx)$/,
                excludes: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            }
        ]
    }
}