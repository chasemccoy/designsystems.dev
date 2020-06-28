exports.data = {
  permalink: 'index.html',
};

exports.render = function(data) {
  return data.collections.docs.map(doc => `
    <article>
      <h2><a href="/${doc.fileSlug}">${doc.data.title}</a></h2>
      ${doc.templateContent}
    </article>
  `, this).join('')
};
