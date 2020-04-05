<svelte:options tag="ds-showcase" />

<script>
  import { onMount } from 'svelte';

  let container;
  let links = [];
  let images = [];
  let colors = ['#FCEEAC', '#8BE5BC', '#7FE2FC']
  let count;
  let interval = 4;
  let activeIndex = 0;

  const setClasses = () => {
    links[activeIndex].style.backgroundColor = colors[activeIndex]
    links.forEach((link, i) => {
      if (i !== activeIndex) { link.style.backgroundColor = 'transparent' }
    });
  }

  onMount(() => {
    links = Array.from(container.parentNode.host.querySelectorAll('a'))
    images = links.map(link => link.dataset.image)
    count = links.length

    links.forEach(link => link.addEventListener('mouseenter', e => {
      activeIndex = links.indexOf(e.target)
      setClasses()
    }))
  
    setClasses()

    setInterval(() => {
      activeIndex = (activeIndex + 1) % count;
      setClasses()
    }, interval * 1000);
  });
</script>

<style>
  :host {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }

  div.text {
    width: 50%;
    padding-right: 1.5em;
  }

  p {
    font-size: 1.5rem;
  }

  p ::slotted(a) {
    font-weight: bold;
    transition: all 200ms;
    text-decoration: none;
  }

  div.images {
    width: 50%;
    position: relative;
    min-height: 300px;
  }

  img {
    max-width: 100%;
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img.active {
    display: block;
  }
</style>

<div class='text' bind:this={container}>
  <p><slot /></p>
</div>

<div class='images'>
  {#each images as image, i}
    <a href="{links[activeIndex].href}">
      <img src="img/{image}.png" alt="image" class:active="{i === activeIndex}" />
    </a>
  {/each}
</div>
