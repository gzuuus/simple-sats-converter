<script lang="ts">
  export let data;
  import { invalidateAll } from '$app/navigation';
  import { unixTimeNow } from '$lib/utils/helpers';
  import InputBox from '$lib/components/InputBox.svelte';
  import Btc from '$lib/icons/btc.svelte';
  import Sat from '$lib/icons/sat.svelte';
  import Info from '$lib/icons/info.svelte';
	import Gh from '$lib/icons/gh.svelte';
  import Lightning from '$lib/icons/lightning.svelte';

  let bitcoinAmount = 1;
  let isSatoshis = true;
  let pickedCurrency = data.bitcoinPrice.eur;
   let currSymbol = '€';
  //  let result = bitcoinAmount * pickedCurrency
  $: timeNow= unixTimeNow();
  const SATOSHIS_MULTIPLIER = 0.00000001;

  function toggleUnit(): void {
    isSatoshis = !isSatoshis;
  }
    // function pickCurr(curr:string) {
    //   if (curr == 'eur') {  
    //     pickedCurrency = data.bitcoinPrice.eur;
    //     currSymbol = '€';
    //   } else if (curr == 'usd') {
    //     pickedCurrency = data.bitcoinPrice.usd;
    //     currSymbol = '$';
    //   } else if (curr == 'gbp') {
    //     pickedCurrency = data.bitcoinPrice.gbp;
    //     currSymbol = '£';
    //   }
    //   result = bitcoinAmount * pickedCurrency
    //   console.log(pickedCurrency);
    //   return pickedCurrency
    // }

  function refresh(): void {
    invalidateAll();
    timeNow= unixTimeNow();
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat().format(amount);
  }
</script>

<main>
  <!-- <div class="headerSection">
  <h1>{!isSatoshis ? 'Bitcoin' : 'Satoshis'} to 
  <select on:change={event => pickCurr(event.currentTarget.value)}>
    <option value="eur">EUR</option>
    <option value="usd">USD</option>
    <option value="gbp">GBP</option>
  </select></h1>
  </div>
<div class="borderedSection">
    <InputBox bind:value={bitcoinAmount} />
    {#key bitcoinAmount}
      {#if !isSatoshis}
      <h2>{formatCurrency(result)}{currSymbol}</h2>
        {:else}
        <h2>{(result * SATOSHIS_MULTIPLIER).toFixed(6)}€</h2>
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
</div> -->
  <div class="infoBox">
    <h4>1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'} = 1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'}</h4>
    <!-- <div class="actualPrice">
      <h6>1 {!isSatoshis ? 'Bitcoin' : 'Satoshi'} = {isSatoshis ? (pickedCurrency*SATOSHIS_MULTIPLIER).toFixed(6)  : formatCurrency(pickedCurrency)}{currSymbol}</h6>
      <button on:click={refresh}>🔄</button>
    </div>
    <div class="detailsBox"> 
      <details>
        <summary><Info size={20}/></summary>
        <h6>last price updated: {timeNow} (UTC)</h6>
        <div class="borderedSection">
          <h6>Made by <a href="https://github.com/gzuuus" target="_blank" rel="noopener noreferrer">gzuuus</a> under MIT license</h6>
          <a href="https://github.com/gzuuus/simple-sats-converter" target="_blank" rel="noopener noreferrer"><Gh size={20}/></a>
          <a href="lightning:gzuuus@getalby.com" target="_blank" rel="noopener noreferrer"><Lightning size={20}/></a>
        </div>
      </details>
    </div> -->
  </div>

</main>

<style>
main {
  border: 1px solid white;
  text-align: center;
  margin: 0 auto;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 8px solid white;
}
.borderedSection {
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
details > summary {
  list-style: none; 
  cursor: pointer;
}
select {
  background: transparent;
  color: white;
  border: none;
  font-size: 32px;
  border-bottom: 1px solid;
}
</style>
