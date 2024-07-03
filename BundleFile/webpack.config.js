const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

// Lấy tất cả các file .js trong thư mục file
const entry = fs.readdirSync('./file').reduce((entries, file) => {
  if (path.extname(file) === '.js') {
    const name = path.basename(file, '.js');
    entries[name] = `./file/${file}`;
  }
  return entries;
}, {});

module.exports = {
  entry: entry,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

