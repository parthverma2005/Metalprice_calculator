// Function to fetch real-time metal prices from CoinGecko API in INR
async function fetchMetalPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=gold,silver&vs_currencies=inr');
        const data = await response.json();

        // Convert per ounce to per gram
        return {
            gold: data.gold.inr / 31.1035,
            silver: data.silver.inr / 31.1035
        };
    } catch (error) {
        console.error("Error fetching metal prices:", error);
        return { gold: 5000.00, silver: 70.00 }; // Fallback prices in INR
    }
}

// Function to update the displayed prices on the page
async function displayMetalPrices() {
    const prices = await fetchMetalPrices();

    document.getElementById("goldPrice").innerText = `Gold: ₹${prices.gold.toFixed(2)} per gram`;
    document.getElementById("silverPrice").innerText = `Silver: ₹${prices.silver.toFixed(2)} per gram`;
}

// Calculate Metal Cost
async function calculateCost() {
    const weight = parseFloat(document.getElementById("metalWeight").value);
    const purity = parseFloat(document.getElementById("metalPurity").value);
    let pricePerGram = parseFloat(document.getElementById("metalPrice").value);

    if (isNaN(pricePerGram)) {
        const prices = await fetchMetalPrices();
        const metalType = document.getElementById("metalType").value;
        pricePerGram = prices[metalType]; // Fetch real-time price if input is empty
    }

    if (isNaN(weight) || isNaN(purity) || isNaN(pricePerGram)) {
        document.getElementById("costResult").innerText = "Please enter valid inputs.";
        return;
    }

    const pureMetalWeight = (purity / 100) * weight;
    const totalCost = pureMetalWeight * pricePerGram;

    document.getElementById("costResult").innerText = 
        `The total cost of ${document.getElementById("metalType").value} is: ₹${totalCost.toFixed(2)} INR`;
}

// Calculate Metal Purity
function calculatePurity() {
    const totalWeight = parseFloat(document.getElementById("totalWeight").value);
    const metalContentWeight = parseFloat(document.getElementById("metalContentWeight").value);

    if (isNaN(totalWeight) || isNaN(metalContentWeight) || totalWeight === 0) {
        document.getElementById("purityResult").innerText = "Please enter valid inputs.";
        return;
    }

    const purityPercentage = (metalContentWeight / totalWeight) * 100;

    document.getElementById("purityResult").innerText = 
        `The ${document.getElementById("metalType").value} purity is: ${purityPercentage.toFixed(2)}%`;
}

// Load the prices when the page loads
window.onload = displayMetalPrices;
