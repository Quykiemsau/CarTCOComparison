import { exchangeRates } from '../context/AppContext';

// Currency formatting based on locale and currency
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  // Handle Vietnamese currency specially
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  const localeMap = {
    'en': 'en-US',
    'vi': 'vi-VN'
  };

  const currencyLocale = localeMap[locale] || locale;

  try {
    return new Intl.NumberFormat(currencyLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2
    }).format(amount);
  } catch (error) {
    // Fallback formatting
    const currencySymbols = {
      'USD': '$',
      'VND': '₫',
      'CAD': 'C$',
      'AUD': 'A$',
      'GBP': '£',
      'EUR': '€',
      'JPY': '¥'
    };

    const symbol = currencySymbols[currency] || '$';
    const formattedAmount = Math.round(amount).toLocaleString();
    
    return currency === 'VND' ? `${formattedAmount}${symbol}` : `${symbol}${formattedAmount}`;
  }
};

// Number formatting
export const formatNumber = (number, locale = 'en-US', decimals = 0) => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

// Percentage formatting
export const formatPercentage = (value, locale = 'en-US', decimals = 1) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

// Get currency symbol
export const getCurrencySymbol = (currency) => {
  const symbols = {
    'USD': '$',
    'VND': '₫',
    'CAD': 'C$',
    'AUD': 'A$',
    'GBP': '£',
    'EUR': '€',
    'JPY': '¥'
  };
  return symbols[currency] || '$';
};

// Convert currency (for display purposes)
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

export default {
  formatCurrency,
  formatNumber,
  formatPercentage,
  getCurrencySymbol,
  convertCurrency
};