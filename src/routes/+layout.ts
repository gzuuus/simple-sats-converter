import { getBitcoinPrice } from '../api';

export const load = async ({ fetch }: { fetch: any }) => {
  console.log('loading...');

  try {
    let bitcoinPrice = await getBitcoinPrice(fetch);
    console.log(bitcoinPrice);
    return {
      bitcoinPrice
    };
  } catch (error) {
    console.error('Error in load function:', error);
    return {
      error: true,
    };
  }
};
