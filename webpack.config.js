const path = require('path')

// const PATHS = {
//     src: path.join(__dirname, 'src'),
//     img: path.join(__dirname, '/src/assets/images'),
//     styles: path.join(__dirname, 'src/styles'),
//     //build: path.join(__dirname, 'build')
// }

module.exports = {
    mode: "development",
    watch: true,
    entry: '/src/index.tsx',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, '/dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.png']
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.tsx?$/, loader: "babel-loader",
                // use:
                //     {
                //         loader: 'babel-loader',
                //         options:
                //             {
                //                 presets: [
                //                     ['@babel/preset-env', {loose: true, modules: false}],
                //                     '@babel/react'
                //                 ],
                //                 sourceType: 'unambiguous'
                //             }
                //     },
                options: {
                    cacheDirectory: true,
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.png/, type: "asset/resource" /*use: 'file-loader'*//*, options: { name: '[path][name].[ext]'}*/
            },
            // {
            //     test: /\.js$/,
            //      enforce: "pre",
            //      use: ["source-map-loader"]
            //
            // },
            {
                test: /\.js$/, use:
                    {
                        loader: 'babel-loader',
                        options:
                            {
                                presets: [
                                    ['@babel/preset-env', {loose: true, modules: false}],
                                    '@babel/react'
                                ],
                                sourceType: 'unambiguous'
                            }
                    }
            },
            {test: /\.tsx?$/i, loader: "ts-loader"},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    ignoreWarnings: [/Failed to parse source map/],
}