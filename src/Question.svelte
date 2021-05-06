<script>
  import { score } from './store.js'
  import {slide} from 'svelte/transition'

  export let question
  export let nextQuestion

  let isCorrect
  let isAnswered = false
  let answers = question.incorrect_answers.map((answer) => {
    return {
      answer,
      correct: false,
      background: 'transparent',
      color: 'transparent'
    }
  })
  let allAnswers = [
    ...answers,
    {
      answer: question.correct_answer,
      correct: true,
      background: 'var(--green)',
      color: 'white'
    },
  ]
  shuffle(allAnswers)

  function shuffle(array) {
    // make array between -0.5 and 0.5, randomizing hack for sort
    array.sort(() => Math.random() - 0.5)
  }

  function checkAnswer(correct) {
    isCorrect = correct
    isAnswered = true
    if (correct) {
      score.update((val) => val + 1)
    }
  }
</script>

<style>
  article {
    max-width: 40rem;
    padding: 2rem;
  }
  p {
    padding-bottom: 2rem;
    font-size: 1rem;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    gap: 1rem;
  }
  @media(max-width: 767px) {
    .buttons {
      grid-template-columns: 1fr;
    }
  }
  button {
    --background: rgba(0,0,0,0.69);
    --color: white;
    width: 100%;
    height: 100%;
    font-family: monospace;
    font-size: 130%;
    border: 0.125rem solid var(--color);
    background: var(--background);
    color: var(--color);
    padding: 1rem;
    transition: all 0.5s ease-in-out;
  }

  button:nth-child(5) {
    border: none;
  }

  .visible {
    visibility: visible;
  }

  .hidden {
    visibility: hidden;
  }
</style>

<article>
  <p>{@html question.question}</p>
  <div class="buttons">
    {#each allAnswers as answer}
      <button
        disabled={isAnswered}
        style={isAnswered ? `background: ${answer.background}; border-color: transparent; color: ${answer.color}` : ''}
        on:click={() => checkAnswer(answer.correct)}>
        {@html answer.answer}
      </button>
    {/each}
    <button class={isAnswered ? 'visible' : 'hidden'} on:click={nextQuestion}>
      Next Question
    </button>
  </div>
</article>
