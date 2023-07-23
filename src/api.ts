export const getBitcoinPrice = async (fetch: any) => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp');
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData.bitcoin;
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      throw new Error('Error fetching Bitcoin price');
    }
  };
  