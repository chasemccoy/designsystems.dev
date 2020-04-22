module.exports = function(data) {    
  return `<ul class='doc-grid'>
    ${data.map(doc => `
      <li>
        <!-- <img src="/img/${doc.fileSlug}.png" class='doc-image' /> -->
        <h2><a href="/${doc.fileSlug}">${doc.data.title}</a></h2>
        <p>${this.excerpt(doc)}</p>
      </li>
    `, this).join('')}
  </ul>`
}