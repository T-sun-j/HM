const path = require('path')
module.exports = {
    transpileDependencies: ['vue-router'],
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        proxy: {
            '/harman': {
                target: 'https://p.yxdevelop.com',
                changeOrigin: true,
                secure: false,
                
            }
        }
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.jsx', '.scss', '.less'],
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        },
        externals: {
            $: 'window.$'
        }
    },
    chainWebpack(config) {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                options.compilerOptions = {
                    ...options.compilerOptions,
                    isCustomElement: (tag) => tag.startsWith('wx-open')
                }
                return options
            })
    }
}
