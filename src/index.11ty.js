exports.data = {
  permalink: 'index.html',
};

exports.render = function(data) {
  // return `<div class='home-layout' />`

  const featuredDoc = data.collections.docs.filter(doc => doc.data.featured === true)[0]

  const restOfEm = data.collections.docs.map(doc => `
    <article>
      <h2><a href="/${doc.fileSlug}">${doc.data.title}</a></h2>
      <div class='post-body flow'>
        ${this.excerpt(doc, 2)}
      </div>
    </article>
  `, this).join('')

  
  return `
    <div class='home-layout'>
      <article class='featured'>
        <h1><a href="/${featuredDoc.fileSlug}">${featuredDoc.data.title}</a></h1>
        <div class='post-body flow'>
          ${this.excerpt(featuredDoc, 2)}
          <a href="/${featuredDoc.fileSlug}" class='read-more pointer'>Continue reading</a>

          <a href="/${featuredDoc.fileSlug}" class='read-more pointer' style="--bg: var(--yellow-2); --accent: var(--yellow-4); --color: var(--yellow-9);">Continue reading</a>

          <a href="/${featuredDoc.fileSlug}" class='read-more pointer' style="--bg: var(--violet-1); --accent: var(--violet-3); --color: var(--violet-9);">Continue reading</a>
        </div>
      </article>
      
      <hr />

      ${restOfEm}
    </div>
  `
};
