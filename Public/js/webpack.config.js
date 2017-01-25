const path = require('path');

module.exports = {
  entry: ["./src/index.js"],

  output: {
    path: __dirname,
    filename: "public/bundle.js",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src")]
  }
};
