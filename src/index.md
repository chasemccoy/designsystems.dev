---
permalink: "index.html"
layout: "doc"
---

Hi

> Blockquote
  
{% for doc in collections.docs %}  
<h2><a href="{{ doc.url }}">{{ doc.data.title }}</a></h2>
<p>{{ doc.data.page.excerpt }}</p>
{% endfor %}
