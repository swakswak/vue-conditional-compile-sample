const {defineConfig} = require('@vue/cli-service')
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const options = {
    isDebug: process.env.NODE_ENV === 'development',
    isPrivate: process.env.npm_config_private,
};

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
            .options(options)
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
                .options(options)
                .end();
    }
});
