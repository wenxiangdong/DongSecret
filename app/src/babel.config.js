// babel.config.js
module.exports = {
    plugins: ['loop-optimizer'],
    presets: [
      [
        'remax',
        {
          // 例子：下面的 `decorators` 和 `classProperties` 可以使Mobx的装饰器能正常工作
          // @babel/plugin-proposal-decorators 的选项，详见 https://babeljs.io/docs/en/babel-plugin-proposal-decorators
          decorators: {
            legacy: true,
          },
          // @babel/plugin-proposal-class-properties 的选项，详见 https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
          classProperties: {
            loose: true,
          },
        },
      ],
    ],
  };