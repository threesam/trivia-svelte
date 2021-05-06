<script>
  export let id, i = 0
  import { activeCategory, showCategories, showQuiz } from '../utils/store'

  import {fly} from 'svelte/transition'

  function updateActive() {
    activeCategory.set(id)
    $showCategories = false
    $showQuiz = true
  }
</script>

<style>
  button {
    width: 100%;
    height: 100%;
    font-family: monospace;
    padding: 1rem;
    font-size: 1rem;
    color: white;
    border: 0.125rem solid white;
    background: rgba(0,0,0,0.69);
  }
</style>

<li in:fly={{delay: i * 50 +500, y: 25}}>
  <button {id} on:click={updateActive}>
    <slot />
  </button>
</li>
