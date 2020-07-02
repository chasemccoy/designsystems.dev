const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const excerpt = require('./src/shortcodes/excerpt');

const markdownOptions = {
  html: true,
  typographer: true,
  // Autoconvert URL-like text to links
  linkify: true,
};

module.exports = function (config) {
  config.setUseGitIgnore(false);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC);
  config.addPlugin(ErrorOverlay);

  config.addShortcode('excerpt', excerpt);
  config.addFilter('log', (thing) => console.log(thing));

  config.addPassthroughCopy({
    'src/assets/css/*': 'css',
  });

  config.addPassthroughCopy({
    'src/assets/fonts/*': 'fonts',
  });

  config.addCollection('docs', (collection) => {
    return [...collection.getFilteredByGlob('./docs/*.md')];
  });

  const markdownLib = markdownIt(markdownOptions).use(markdownItAnchor);
  config.setLibrary('md', markdownLib);

  return {
    dir: {
      output: 'dist',
      includes: 'src/includes',
      layouts: 'src/layouts',
      data: 'src/data',
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
