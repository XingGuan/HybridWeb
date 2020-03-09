module.exports = {
  configureWebpack: {
    // other webpack options to merge in ...
  },

  // devServer Options don't belong into `configureWebpack`

  devServer: {
    public: "10.0.108.61:8080",

    hot: true,

    disableHostCheck: true
  }
};
