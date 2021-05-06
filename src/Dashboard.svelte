<script>
  import { score } from './store'
  export let activeQuestion
</script>

<style>
  h1 {
    position: absolute;
    font-size: 2.5rem;
    top: 1rem;
    width: 100vw;
    text-align: center;
  }
</style>

<h1>{$score} / {activeQuestion}</h1>