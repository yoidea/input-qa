module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets"
            }
          }
        ]
      }
    ]
  }
};
