
<script lang="ts">
  export let data;

import { onMount, onDestroy } from 'svelte';
import { invalidateAll } from '$app/navigation';

import InputBox from '$lib/components/InputBox.svelte';

let seconds = 0;
let timerId: NodeJS.Timeout | null = null;
let bitcoinAmount = 1;
let isSatoshis = false;
let convertOperation: number;


const SATOSHIS_MULTIPLIER = 0.00000001;


function calculateResult(amount: number, unit: boolean): number {
  return unit ? amount * data.bitcoin?.usd * SATOSHIS_MULTIPLIER : amount * data.bitcoin?.usd;
}

function toggleUnit(): void {
  isSatoshis = !isSatoshis;
  convertOperation = calculateResult(bitcoinAmount, isSatoshis);
}

function resetTimer(): void {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    seconds++;
  }, 1000);
}

function refresh(): void {
  invalidateAll();
  resetTimer();
  convertOperation = calculateResult(bitcoinAmount, isSatoshis);


  seconds = 0;
}


onMount(() => {
  resetTimer();
});


onDestroy(() => {
  if (timerId) clearInterval(timerId);
});


$: {
  convertOperation = calculateResult(bitcoinAmount, isSatoshis);
}
</script>

<main>
  <h1>Btc/sats to USD</h1>
  <h4>1 {isSatoshis ? 'Bitcoin' : 'Satoshi'} = 1 {isSatoshis ? 'Bitcoin' : 'Satoshi'}</h4>
  <h6>1 btc = {isSatoshis ? data.bitcoin?.usd * SATOSHIS_MULTIPLIER : data.bitcoin?.usd} $</h6>

  <InputBox label={isSatoshis ? 'Satoshis' : 'Bitcoin'} bind:value={bitcoinAmount} />
  <button on:click={toggleUnit}>
    Convert to {isSatoshis ? 'Bitcoin' : 'Satoshis'}
  </button>

  {#key bitcoinAmount}
    <h3>{convertOperation}$</h3>
  {/key}

  <button on:click={refresh}>🔄</button>
  <h6>{seconds}' since last refresh</h6>
</main>

<style>
  :global(body) {
    background-color: #111;
    color: white;
  }
  main {
    border: 1px solid white;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 15px;
    border-radius: 15px;
  }
</style>
