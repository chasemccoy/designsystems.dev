exports.data = {
  permalink: "index.html"
}

exports.render = function(data) {    
  return `${this.docs(data.collections.docs, this.excerpt)}`
}