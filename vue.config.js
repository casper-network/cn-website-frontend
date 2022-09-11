const path = require('path');

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false,
    },
  },
  chainWebpack: (config) => {
    config.resolve.extensions.add('.scss');
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
      .set('scss', path.join(__dirname, './src/assets/scss/'));
    let combinedOptions = null;
    const svgRule = config.module.rule('svg');
    svgRule.use('file-loader').tap((options) => {
      combinedOptions = {
        ...options,
        svgo: {
          plugins: [
            { prefixIds: true },
          ],
        },
      };
    });
    svgRule.uses.clear();

    svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options(combinedOptions)
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options(combinedOptions);
  },
};
