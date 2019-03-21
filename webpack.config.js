const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map',
};
