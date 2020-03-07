<svelte:options tag="my-app" />

<script>
  let count = 1;

  // the `$:` means 're-run whenever these values change'
  $: doubled = count * 2;
  $: quadrupled = doubled * 2;

  const handleClick =() => {
    count += 1;
  }
</script>

<main>
  <button on:click="{handleClick}">Count: {count}</button>

  <hr />

  <p>{count} * 2 = {doubled}</p>
  <p>{doubled} * 2 = {quadrupled}</p>
</main>
