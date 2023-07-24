import { writable } from 'svelte/store';

export const currentBitcoinPrice = writable<number>(0);
export const errorMessage = writable<string>('');

async function fetchBitcoinPrice() {
  try {
    console.log('Obteniendo el precio de Bitcoin');
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');

    if (!response.ok) {
      throw new Error('No se pudo obtener el precio de Bitcoin');
    }

    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el precio de Bitcoin');
  }
}

export async function getPrice() {
  try {
    const price = await fetchBitcoinPrice();
    currentBitcoinPrice.set(price);
    errorMessage.set('');
    return price;
  } catch (error) {
    errorMessage.set('Error al obtener el precio de Bitcoin');
    setTimeout(getPrice, 30000);
    return null;
  }
}
