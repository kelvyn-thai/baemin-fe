const path = require("path");
const glob = require("glob");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin").PurgeCSSPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
};

module.exports = function override(config, env) {
  // config.plugins.push(
  //   new PurgeCSSPlugin({
  //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  //   })
  // );
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    })
  );
  config.optimization.usedExports = true;
  return config;
};
