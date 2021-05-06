<script>
  import { onMount } from 'svelte';
  
  import Quiz from './states/Quiz.svelte'
  import Categories from './states/Categories.svelte'
  import Menu from './states/Menu.svelte'
  import P5Canvas from './components/P5Canvas.svelte'
  import sketch from './sketches/sketch-bg'

  import { showQuiz, showCategories, showMenu } from './utils/store.js'

  onMount(() => {
    $showMenu = true
  })
</script>

<style>
  :global(:root) {
    --green-rgb: 51, 85, 37;
    --white-rgb: 230, 233, 227;
    --light-grey-rgb: 182, 207, 174;
    --dark-grey-rgb: 140, 172, 137;
    --black-rgb: 10, 16, 8;

    --green: #4cae04;
    --white: rgb(var(--white-rgb));
    --light-grey: rgb(var(--light-grey-rgb));
    --dark-grey: rgb(var(--dark-grey-rgb));
    --black: rgb(var(--black-rgb));
  }
  main {
    display: grid;
    place-items: center;
    min-height: 100vh;
  }
</style>

<P5Canvas id="bg" {sketch} />
<main>
  {#if $showMenu}
    <Menu />
  {/if}
  
  {#if $showCategories}
    <Categories />
  {/if}

  {#if $showQuiz}
    <Quiz />
  {/if}

</main>
