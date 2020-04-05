module.exports = function(data) {    
  return `<ul class='doc-grid flex'>
    ${data.map(function(doc) {
      return `<li>
        <img src="/img/${doc.fileSlug}.png" class='doc-image' />
        <h2><a href="">${doc.data.title}</a></h2>
        <p>${this.excerpt(doc)}</p>
      </li>`
    }).join('\n')}
  </ul>`
}