const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function override(config, env) {
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    })
  );
  config.optimization.usedExports = true;
  return config;
};
