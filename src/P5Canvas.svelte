<script>
  export let id
  import p5 from './p5.min'
  export let sketch

  import { onMount } from 'svelte'

  onMount(() => {
    let myp5 = new p5(sketch, id)
  })
</script>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<div {id} />
