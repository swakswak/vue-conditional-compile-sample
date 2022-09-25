const {defineConfig} = require('@vue/cli-service')
const path = require("path");

console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

// const conditionalCompiler = {
//     loader: 'js-conditional-compile-loader',
//     options: {
//         isDebug: process.env.NODE_ENV === 'development',
//         private: process.env.IS_PRIVATE === 'true'
//     }
// };

// const m = [
//     {
//         test: /\.vue$/,
//         use: ['vue-loader', conditionalCompiler],
//     },
//     {
//         test: /\.js$/,
//         include: [resolve('src'), resolve('test')],
//         use: [
//             //step-2
//             'babel-loader?cacheDirectory',
//             //step-1
//             conditionalCompiler,
//         ],
//     }
// ];

/*let defConfig = defineConfig({
  transpileDependencies: true,
});
defConfig.module = m;*/

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {},
    chainWebpack: config => {
        config.module.rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
                .end()
            .use('conditional-compiler')
            .loader('js-conditional-compile-loader')
            .options({
                isDebug: process.env.NODE_ENV === 'development',
                private: process.env.IS_PRIVATE === 'true'
            })
            .end();

        config.module.rule('js')
            .test(/\.js$/)
            .include
                .add(resolve('src'))
                .add(resolve('test'))
                .end()
            .use('babel-loader?cacheDirectory')
                .end()
            .use('conditional-compiler')
                .loader('js-conditional-compile-loader')
                .options({
                    isDebug: process.env.NODE_ENV === 'development',
                    private: process.env.VUE_APP_IS_PRIVATE === 'true'
                })
                .end();

    }
});
