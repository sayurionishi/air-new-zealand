export function currencyToNumber(currency: string): number {
    if (!currency) {
        throw new Error('Invalid input: currency string is required');
    }

    // Remove currency symbols and commas
    const cleanedCurrency = currency.replace(/[^0-9.-]+/g, '');

    // Convert to number
    const number = parseFloat(cleanedCurrency);

    if (isNaN(number)) {
        throw new Error('Invalid input: unable to convert currency to number');
    }

    return number;
}

export function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}