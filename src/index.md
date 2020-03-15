---
permalink: "index.html"
layout: "doc"
---

Hi

> Blockquote
  
{% set joiner = joiner('---') %}
{% for doc in collections.docs %}  
{{ joiner() }}
<h2><a href="{{ doc.url }}">{{ doc.data.title }}</a></h2>
<p>{% excerpt doc %}</p>
{% endfor %}
