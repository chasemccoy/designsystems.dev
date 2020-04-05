module.exports = function(doc) {
  if (doc.data && doc.data.excerpt) return doc.data.excerpt;

  if (!doc.hasOwnProperty('templateContent')) {
    console.warn(
      '❌ Failed to extract excerpt: Document has no property `templateContent`.'
    );
    return;
  }

  const pCloseTag = '</p>';
  const content = doc.templateContent;
  if (content.includes(pCloseTag)) {
    const firstParagraph = content.substring(
      0,
      content.indexOf(pCloseTag) + pCloseTag.length
    );
    const withoutHTMLTags = firstParagraph.replace(/<[^>]+>/g, '');
    return withoutHTMLTags;
  }

  return '';
}