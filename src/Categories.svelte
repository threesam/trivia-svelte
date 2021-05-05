<script>
  import Category from './Category.svelte'

  import { onMount } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import { activeCategory, more } from './store.js'

  let categories = []

  onMount(() => getCategories())

  async function getCategories() {
    const res = await fetch('https://opentdb.com/api_category.php')
    const data = await res.json()
    data.trivia_categories.forEach((category) => {
      if (category.name.includes(':')) {
        category.name = category.name.split(': ')[1]
      }
      categories.push(category)
    })
    categories.sort((a, b) => a - b)
    return categories
  }
</script>

<style>
  section {
    position: relative;
    padding: 1.5rem;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    grid-gap: 1rem;
    max-width: 40rem;
    margin: 0 auto;
  }
  @media (min-width: 800px) {
    ul {
      padding: 0 1rem;
    }
    h3 {
      font-size: 2rem;
      height: 4rem;
    }
  }
</style>

<section>
  <h3>Choose Category</h3>
  {#await getCategories()}
    loading...
  {:then categories}
    <ul in:slide out:fade>
      {#each categories.slice(0, $more) as {id, name}, i}
        <Category {id} {i}>{name}</Category>
      {/each}
      <button class="more" on:click={() => $more += 4}>More</button>
    </ul>
  {/await}
</section>
