const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
module.exports = {
  filenameHashing: false,
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config.output.library.type = "system";
    config.module
      .rule("eslint")
      .exclude.add(/\**\/*.stories.js/)
      .end();
  },
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
    resolve: {
      //Resolving symlinks causes problems when starting dev server after
      //linking modules with npm link
      //see https://cli.vuejs.org/guide/troubleshooting.html#symbolic-links-in-node-modules
      symlinks: false,
    },
    plugins: [
      new HtmlWebpackPlugin(),

      new StandaloneSingleSpaPlugin({
        appOrParcelName: "single-spa-bug-demo",

        activeWhen: ["/demo/"],

        HtmlWebpackPlugin,
      }),
    ],
  },
};
