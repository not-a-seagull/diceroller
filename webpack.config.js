module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/dice_roller.tsx",
  
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
    ]
  },

  externals: {
    "preact": "preact"
  },

  output: {
    library: "dice_roller",
    libraryTarget: "assign",
    filename: "dice_roller.js"
  }
}
