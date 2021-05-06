<script>
  import { score, victory } from '../utils/store'
</script>

<style>
  h1 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: monospace;
    font-size: 150%;
    color: silver;
    border-bottom: 0.125rem solid rgba(200, 200, 200, 0.3);
    border-left: 0.125rem solid rgba(200, 200, 200, 0.3);
    border-right: 0.125rem solid rgba(200, 200, 200, 0.3);
    background: rgba(0,0,0,0.69);
    padding: 2rem 2rem;
  }
</style>

<h1>{$victory - $score + 1} to win</h1>