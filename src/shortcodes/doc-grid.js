// export default function() {

//   return `<ul class='doc-grid flex'>
//   {%- for doc in collections.docs %}
//     <li {% if doc.url == page.url -%} class="doc-list-active" {%- endif -%}>
//       <img src="/img/{{ doc.data.title | slug }}.png" class='doc-image pixel' />
//       <h2><a href="{{ doc.url }}">{{ doc.data.title }}</a></h2>
//       <p>{% excerpt doc %}</p>
//     </li>
//   {% endfor -%}
//   </ul>`
// }

const excerpt = require('./excerpt');

module.exports = function(data) {    
  return `<ul class='doc-grid flex'>
    ${data.map(function(doc) {
      return `<li>
        <img src="/img/${doc.fileSlug}.png" class='doc-image' />
        <h2><a href="">${doc.data.title}</a></h2>
        <p>${excerpt(doc)}</p>
      </li>`
    }).join('\n')}
  </ul>`
}