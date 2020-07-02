module.exports = function (doc, count = undefined) {
  if (doc.data && doc.data.excerpt && count === undefined)
    return `<p>${doc.data.excerpt}</p>`;

  if (!doc.hasOwnProperty('templateContent')) {
    console.warn(
      '❌ Failed to extract excerpt: Document has no property `templateContent`.'
    );
    return;
  }

  const pCloseTag = '</p>';
  const content = doc.templateContent;

  const numberOfParagraphs = count || 1;
  let index = 0;
  let cursor = 0;
  let excerpt = '';

  while (index < numberOfParagraphs && content.includes(pCloseTag, cursor)) {
    const endPosition = content.indexOf(pCloseTag, cursor) + pCloseTag.length;
    const paragraph = content.substring(cursor, endPosition);

    excerpt += paragraph;
    cursor = endPosition;
    index++
  }

  return excerpt;
};
