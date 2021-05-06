<script>
  import {fade} from 'svelte/transition'
</script>

<style>
    p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<p in:fade>Loading...</p>