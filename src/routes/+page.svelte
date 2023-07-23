<script lang="ts">
  export let data;
  import { onMount, onDestroy } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  import InputBox from '$lib/components/InputBox.svelte';
  import Btc from '$lib/icons/btc.svelte';
  import Sat from '$lib/icons/sat.svelte';
  console.log(data.bitcoinPrice);
  let seconds = 0;
  let timerId: NodeJS.Timeout | null = null;
  let bitcoinAmount = 1;
  let isSatoshis = true;
  let convertOperation: number;

  const SATOSHIS_MULTIPLIER = 0.00000001;

  function toggleUnit(): void {
    isSatoshis = !isSatoshis;
  }

  function resetTimer(): void {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      seconds++;
    }, 1000);
  }

  function refresh(): void {
    invalidateAll();
    seconds = 0;
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat().format(amount);
  }

  onMount(() => {
    resetTimer();
  });

  onDestroy(() => {
    if (timerId) clearInterval(timerId);
  });

</script>

<main>
  <h1>{!isSatoshis ? 'Bitcoin' : 'Satoshis'} to EUR</h1>
<div class="conversionSection">
    <InputBox bind:value={bitcoinAmount} />
    {#key bitcoinAmount}
      {#if !isSatoshis}
      <h2>{formatCurrency(bitcoinAmount * data.bitcoinPrice)}€</h2>
        {:else}
        <h2>{(bitcoinAmount * data.bitcoinPrice * SATOSHIS_MULTIPLIER).toFixed(6)}€</h2>
      {/if}
    {/key}
  <div class="toggleSection">
    <h6>Change to</h6>
    <button on:click={toggleUnit}>
      {#if !isSatoshis}
      <Sat size={20}/>
      {:else}
      <Btc size={22}/>
      {/if}
    </button>
  </div>
</div>
  <div class="infoBox">
    <h4>1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'} = 1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'}</h4>
    <div class="actualPrice">
      <h6>1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'} = {isSatoshis ? (data.bitcoinPrice*SATOSHIS_MULTIPLIER).toFixed(6)  : formatCurrency(data.bitcoinPrice)}€</h6>
      <button on:click={refresh}>🔄</button>
    </div>
    <h6>{seconds}' since last refresh</h6>
  </div>
</main>

<style>
  main {
	border: 1px solid white;
	text-align: center;
	max-width: 400px;
	margin: 0 auto;
	padding: 15px;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
  min-width: 322px;
}
  .conversionSection {
    border: 1px solid white;
    border-radius: 15px;
    padding: 1em;
  }
  .actualPrice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  }
  .actualPrice button {
    padding: 0px;
    border: none;
    background: transparent;
  }
  .infoBox {
    padding-bottom: 0;
  }
  .toggleSection {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5em;
  }
</style>
