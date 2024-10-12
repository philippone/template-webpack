const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { default: test } = require("node:test");
const path = require("path");
const sveltePreprocess = require("svelte-preprocess");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    "build/bundle": ["./src/main.ts"],
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditionNames: ["svelte", "browser"],
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      // This is only needed if you use Svelte 5+ with TypeScript
      {
        test: /\.svelte\.ts$/,
        use: ["svelte-loader", "ts-loader"],
      },
      {
        test: /(?<!\.svelte)\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // Svelte 5+:
        test: /\.(svelte|svelte\.js)$/,
        loader: "svelte-loader",
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
};
