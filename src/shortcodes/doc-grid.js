module.exports = function(data, excerpt) {    
  return `<ul class='doc-grid flex'>
    ${data.map(function(doc) {
      return `<li>
        <img src="/img/${doc.fileSlug}.png" class='doc-image' />
        <h2><a href="/${doc.fileSlug}">${doc.data.title}</a></h2>
        <p>${excerpt(doc)}</p>
      </li>`
    }).join('\n')}
  </ul>`
}