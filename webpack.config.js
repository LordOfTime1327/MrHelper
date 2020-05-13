const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ConcatPlugin = require("webpack-concat-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const jsArr = [
  "./src/js/easings.min.js",
  "./src/js/scrolloverflow.min.js",
  "./src/js/fullpage.min.js",
  "./src/js/script.js",
];

module.exports = (env = { mode: "development" }) => {
  const isProduction = env.mode === "production";

  const plugins = [
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new ConcatPlugin({
      uglify: isProduction,
      sourceMap: !isProduction,
      name: "combinejs",
      outputPath: "js/",
      fileName: "script.js",
      filesToConcat: jsArr,
      attributes: {
        async: true,
      },
    }),
  ];
  if (!isProduction) {
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
      }),
      new webpack.HotModuleReplacementPlugin()
    );
  }
  if (isProduction) {
    plugins.push(
      new OptimizeCssAssetsPlugin({}),
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([{ from: "**/*", ignore: ["*js", "*scss"] }], {
        context: "src",
      })
    );
  }

  return {
    mode: env.mode,
    entry: {
      app: ["./src/js/app.js", "./src/scss/style.scss"],
    },
    output: {
      path: __dirname + "/dist",
      filename: "js/[name].js",
    },
    devtool: isProduction ? "" : "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: !isProduction,
                url: false,
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: !isProduction },
            },
          ],
        },
      ],
    },

    plugins,

    devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      port: 9000,
    },
  };
};
