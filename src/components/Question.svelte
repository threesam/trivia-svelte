<script>
  import { score } from '../utils/store.js'

  export let question, nextQuestion, activeQuestion

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
    font-size: 1.7rem;
    line-height: 1.5;
    font-weight: 100;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .buttons:last-child {
    grid-row: 1/ span 2;
  }

  span {
    border-right: 0.125rem solid green;
    border-bottom: 0.125rem solid green;
    padding-right: 0.5rem;
    padding-bottom: 0.25rem;
    margin-right: 0.75rem;
    font-weight: 900;
  }
  @media(max-width: 767px) {
    .buttons {
      grid-template-columns: 1fr;
    }

    p {
    font-size: 1rem;
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



  .visible {
    visibility: visible;
    border: 0.125rem solid transparent;
  }

  .visible:hover {
    border: 0.125rem solid var(--color);
  }

  .hidden {
    visibility: hidden;
    border: 0.125rem solid transparent;
  }
</style>

<article>
  <p><span>{activeQuestion + 1}</span><em>{@html question.question}</em></p>
  <div class="buttons">
    {#each allAnswers as answer}
      <button
        disabled={isAnswered}
        style={isAnswered ? `background: ${answer.background}; border-color: transparent; color: ${answer.color}` : ''}
        on:click={() => checkAnswer(answer.correct)}>
        {@html answer.answer}
      </button>
    {/each}
  </div>
  <button class="{isAnswered ? 'visible' : 'hidden'}" on:click={nextQuestion}>
    Next Question
  </button>
</article>
