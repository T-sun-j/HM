const { rules } = require('eslint-plugin-prettier')
const path = require('path')
module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        }
    },
    devServer: {
        // host: 'merchant-admin.jd.com'
    // port: 80,
    //     proxy: {
    //         // '^/mock': {
    //         //     target: targetDomain,
    //         //     changeOrigin: true,
    //         //     pathRewrite: {
    //         //         '.*/': ''
    //         //     }
    //         // },
    //         // '/api': {
    //         //     target: targetDomain,
    //         //     changeOrigin: true,
    //         //     pathRewrite: {
    //         //         '^/api': ''
    //         //     }
    //         // }
    //     }
    },

    configureWebpack: {
        module: {
            rules:[
                {
                    test: /\.mjs$/,
                    include:/node_modules/,
                    type: "javascript/auto"
                }
            ]
        },
    // 开发生产共同配置
        resolve: {
            extensions: ['.js', '.vue', '.jsx', '.scss', '.less'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                // 'jquery': 'jquery' 
            }
        },
        externals: {
            $: 'window.$'
        },
        optimization:process.env.NODE_ENV === 'production'?{
            minimizer: [
                // new TerserPlugin({
                //     sourceMap:false,
                //     terserOptions:{
                //         compress:{
                //             drop_console : true,
                //             drop_debugger: true
                //         }
                //     }
                // }),
            ],
            concatenateModules:true
        }:{}
    },
    chainWebpack(config){
      config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          // 忽略wx-开头的组件，这些是微信的默认组件
          isCustomElement: (tag) => tag.startsWith('wx-open')
        }
        return options
      })
    }
}