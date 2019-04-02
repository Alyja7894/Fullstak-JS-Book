const path = require( 'path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

//vamos a especificar donde esta mi proyecto de desarrollo
module.exports ={
    //en  entry indicamos la dirección del archivo front end app
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename:'js/bundle.js'
    },

    mode: 'production' , 

    module:{
        rules: [  {
                test: /\.css/,
                use: [
                    // si estoy en modo desarrollo, acepta el style  loader en Javascript
                    // y si estoy en production, carga los estilos en su propio archivo css
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',

                ]
            }
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            // Para minificar código HTMl index
            minify:{
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        })

    ],
    //para ver los errores
    devtool: 'source-map'
}