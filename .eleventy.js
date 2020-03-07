module.exports = config => {
  config.addPassthroughCopy({
    'src/_includes/css/*': 'css',
  });

  config.addPassthroughCopy({
    'src/_includes/js/*': 'js',
  });

  config.addPassthroughCopy({
    'node_modules/resetti/*.min.css': 'css/',
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
