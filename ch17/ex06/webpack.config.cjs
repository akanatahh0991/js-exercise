const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
