const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-nesting-toc');

const extractExcerpt = doc => {
  if (!doc.hasOwnProperty('templateContent')) {
    console.warn(
      '❌ Failed to extract excerpt: Document has no property `templateContent`.'
    );
    return;
  }

  if (doc.data && doc.data.excerpt) return doc.data.excerpt;

  const pCloseTag = '</p>';
  const content = doc.templateContent
  if (content.includes(pCloseTag)) {
    const firstParagraph = content.substring(
      0,
      content.indexOf(pCloseTag) + pCloseTag.length
    );
    const withoutHTMLTags = firstParagraph.replace(/<[^>]+>/g, '')
    return withoutHTMLTags
  }

  return null;
};

const markdownOptions = {
  html: true,
  typographer: true,
  // Autoconvert URL-like text to links
  linkify: true,
};

module.exports = config => {
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC);

  config.addShortcode('excerpt', post => extractExcerpt(post));

  config.addPassthroughCopy({
    'src/_includes/css/*': 'css',
  });

  config.addPassthroughCopy({
    'src/_includes/js/*': 'js',
  });

  config.addPassthroughCopy({
    'node_modules/resetti/*.min.css': 'css/',
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
