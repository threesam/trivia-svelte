<script>
  import Category from './Category.svelte'

  import { onMount } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import { activeCategory } from './store.js'

  let categories = []

  onMount(() => getCategories())

  async function getCategories() {
    const res = await fetch('https://opentdb.com/api_category.php')
    const data = await res.json()
    const uniqueCategories = [...new Set(data.trivia_categories)]
    uniqueCategories.forEach((category) => {
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
    width: 100%;
    max-width: 40rem;
    padding: 5rem 2rem;
  }
  h1 {
    position: absolute;
    font-size: 2.5rem;
    top: 1rem;
    width: 100vw;
    text-align: center;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    grid-gap: 1rem;
  }
</style>

<h1 in:fade={{delay: 500}}>Categories</h1>
<section in:fade={{delay: 1000}}>
  {#await getCategories()}
    loading...
  {:then categories}
    <ul in:slide out:fade>
      {#each categories as {id, name}, i}
        <Category {id} {i}>{name}</Category>
      {/each}
    </ul>
  {/await}
</section>
