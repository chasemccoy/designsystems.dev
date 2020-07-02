module.exports = {
  map: true,
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-nested'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
