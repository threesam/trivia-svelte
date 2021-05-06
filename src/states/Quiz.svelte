<script>
  import { onMount } from 'svelte'
  import { blur } from 'svelte/transition'

  // components
  import Dashboard from '../components/Dashboard.svelte'
  import Question from '../components/Question.svelte'
  import Modal from '../components/Modal.svelte'
  import Loading from '../components/Loading.svelte'

  // store
  import { score, activeCategory, showQuiz, showCategories, showMenu, victory } from '../utils/store.js'

  let activeQuestion = 0
  let isModalOpen = false

  onMount(getQuiz)

  async function getQuiz() {
    const url = `https://opentdb.com/api.php?amount=20&category=${$activeCategory}&type=multiple`
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  function nextQuestion() {
    activeQuestion++
  }

  function resetQuiz() {
    isModalOpen = false
    score.set(0)
    activeQuestion = 0
    $showQuiz = false
    $showMenu = true
  }

  function getCategories() {
    score.set(0)
    $showQuiz = false
    $showCategories = true
  }

  // reactive statement
  $: if ($score > $victory) {
    isModalOpen = true
  }
</script>

<style>
  button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: monospace;
    font-size: 150%;
    color: silver;
    border-top: 0.125rem solid rgba(76, 174, 4, 0.3);
    border-left: 0.125rem solid rgba(76, 174, 4, 0.3);
    border-right: 0.125rem solid rgba(76, 174, 4, 0.3);
    background: rgba(0,0,0,0.69);
    padding: 2rem 2rem;
  }

  button:hover {
    border-top: 0.125rem solid rgba(76, 174, 4, 1);
    border-left: 0.125rem solid rgba(76, 174, 4, 1);
    border-right: 0.125rem solid rgba(76, 174, 4, 1);
    color:rgba(0, 200, 0, 1);
  }
</style>

<Dashboard />
<section>
  {#await getQuiz()}
    <Loading />
  {:then data}
    {#each data.results as question, index}
      {#if index === activeQuestion}
        <div
          in:blur={{ duration: 1000 }}
          class="fade-wrapper">
          <Question {nextQuestion} {question} {activeQuestion}/>
        </div>
      {/if}
    {/each}
  {/await}
</section>
<button on:click={getCategories}>Change Category</button>

<!-- MODAL -->
{#if isModalOpen}
  <Modal>
    <h2>You Won!</h2>
    <button on:click={resetQuiz}>Start Over</button>
  </Modal>
{/if}
