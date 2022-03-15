const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入插件
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

//路径处理方法
function resolve(dir) {
    return path.join(__dirname, dir)
}

const config = {
    entry: "./src/index.js", // 打包入口地址
    output: {
        filename: "bundle.js", // 输出文件名
        path: path.join(__dirname, 'dist') // 输出文件目录
    },
    //devtool: 'source-map',
    module: {
        noParse: /jquery|lodash/, //不需要解析依赖的第三方大型类库
        rules: [ //转换规则
            {
                test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
                use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', 'sass-loader'] //use: 对应的 loader 名称
            },
            {
                test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash:8].[ext]',
                            limit: 50 * 1024
                        }
                    } // 使用 file-loader
                ]
            },
            {
                test: /\.js$/i,
                include: resolve('src'),
                exclude: /node_modules/,
                use: [{
                        loader: 'thread-loader', // 开启多进程打包
                        options: {
                            worker: 3,
                        }
                    },{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // 启用缓存
                        }
                    },
                ]
            }
        ]
    },
    plugins: [ //配置插件
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(), //引入插件
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), //静态文件目录
        compress: true, //是否启动压缩gzip
        port: 8080, //端口号
        open: true //是否自动打开浏览器
    },
    resolve: {
        //解析模板扩展名
        extensions: ['.ts', '...'],
        //配置别名
        alias: {
            '~': resolve("src"),
            '@': resolve('src'),
            'components': resolve('src/components'),
        },
        modules: [resolve('src'), 'node_modules']
    }
}

module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
    // 这里可以通过不同的模式修改 config 配置
    return config
}