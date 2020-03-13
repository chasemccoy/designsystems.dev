const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
let markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-nesting-toc');

module.exports = config => {
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC);

  config.addPassthroughCopy({
    'src/_includes/css/*': 'css',
  });

  config.addPassthroughCopy({
    'src/_includes/js/*': 'js',
  });

  config.addPassthroughCopy({
    'node_modules/resetti/*.min.css': 'css/',
  });

  config.addCollection('docs', collection => {
    return [...collection.getFilteredByGlob('./docs/*.md')];
  });

  const options = {
    html: true,
    // Autoconvert URL-like text to links
    linkify: true,
    typographer: true,
  };
  const markdownLib = markdownIt(options).use(markdownItAnchor);
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
