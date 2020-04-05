const docs = require('./shortcodes/doc-grid');

exports.data = {
  permalink: "index.html"
}

exports.render = function(data) {    
  return `${docs(data.collections.docs)}`
}