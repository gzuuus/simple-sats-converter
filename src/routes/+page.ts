// export const load =async (loadEvent) => {
//     console.log('Loading...');
//     const {fetch} = loadEvent;
//     const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd,gbp')
//     let bitcoinPrice = await response.json();
//     bitcoinPrice = bitcoinPrice.bitcoin
//     console.log(bitcoinPrice);
//     return {
//         bitcoinPrice
//     }
// }