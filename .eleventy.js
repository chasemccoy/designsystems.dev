const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const ErrorOverlay = require("eleventy-plugin-error-overlay")
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const docGridShortcode = require('./src/shortcodes/doc-grid');
const excerpt = require('./src/shortcodes/excerpt');

const markdownOptions = {
  html: true,
  typographer: true,
  // Autoconvert URL-like text to links
  linkify: true,
};

module.exports = function(config) {
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC);
  // config.addPlugin(ErrorOverlay)

  config.addShortcode('excerpt', excerpt);
  config.addShortcode('docs', docGridShortcode);
  config.addFilter('log', thing => console.log(thing));

  config.addPassthroughCopy({
    'src/_includes/css/*': 'css',
  });

  config.addPassthroughCopy({
    'src/_includes/js/*': 'js',
  });

  config.addPassthroughCopy({
    'src/img/*': 'img/',
  });

  config.addCollection('docs', collection => {
    return [...collection.getFilteredByGlob('./docs/*.md')];
  });

  const markdownLib = markdownIt(markdownOptions).use(markdownItAnchor);
  config.setLibrary('md', markdownLib);

  return {
    dir: {
      output: 'dist',
      includes: 'src/_includes',
      data: 'src/_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
