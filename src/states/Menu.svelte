<script>
  import {blur, scale} from 'svelte/transition'
  import {showCategories, showMenu} from '../utils/store'

  const begin = () => {
    $showMenu = false
    $showCategories = true
  }


</script>

<style>
  section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 4rem;
  }

  p {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  button {
    width: 100%;
    height: 100%;
    font-family: monospace;
    font-size: 130%;
    color: white;
    border: 0.125rem solid white;
    background: rgba(0,0,0,0.69);
    padding: 1rem;
    margin-top: 1rem;
  }
</style>

<section in:blur={{duration: 1000}} out:scale={{duration:500}}>
  <h1>TriviArt</h1>
  <p>..do you dare play?</p>
  <button on:click={() => begin()}>Choose Category</button>
</section>