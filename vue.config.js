module.exports = {
  publicPath: '',
  // publicPath: process.env.NODE_ENV === 'production' ? '/space-tourism-multipage/' : '',
  // publicPath:
  // process.env.NODE_ENV === 'production' ? '/space-tourism-multipage/' : '',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/index.scss";
        `,
      },
    },
  },
};
