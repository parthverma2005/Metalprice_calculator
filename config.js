const apiConfig = {
    apiUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=gold,silver&vs_currencies=inr',
    keys: {
        goldKey: 'gold.inr',
        silverKey: 'silver.inr'
    },
    fallbackPrices: {
        gold: 5000.00,
        silver: 70.00
    }
};

export default apiConfig;
