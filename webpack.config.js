const webpack = require("webpack");
const path = require("path");

// variables
const isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
const sourcePath = path.join(__dirname, "./src");
const outPath = path.join(__dirname, "./public");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");

module.exports = {
  context: sourcePath,
  entry: {
    app: ["./index.tsx", "./public/index.scss"]
  },
  output: {
    path: outPath,
    filename: "js/bundle-[hash].js",
    chunkFilename: "js/[chunkhash].js",
    publicPath: "/"
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ["module", "browser", "main"],
    alias: {
      app: path.resolve(__dirname, "src/")
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: "babel-loader",
            options: { plugins: ["react-hot-loader/babel"] }
          },
          "ts-loader"
        ].filter(Boolean)
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      // static assets
      { test: /\.html$/, use: "html-loader" },
      { test: /\.(a?png|svg)$/, use: "url-loader?limit=10000" },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: "file-loader"
      }
    ]
  },

  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/style-[contenthash].css",
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: "minimal",
    clientLogLevel: "warning"
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? "" : "eval-source-map",
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: "empty",
    net: "empty"
  }
};
