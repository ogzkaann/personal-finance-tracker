import { defineStore } from 'pinia';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

interface CurrencyState {
  selectedCurrency: Currency;
}

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    selectedCurrency: {
      code: 'TRY',
      symbol: '₺',
      name: 'Türk Lirası',
      flag: '🇹🇷'
    }
  }),

  actions: {
    setCurrency(currency: Currency) {
      this.selectedCurrency = currency;
      localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    },

    initializeCurrency() {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        this.selectedCurrency = JSON.parse(savedCurrency);
      }
    }
  },

  getters: {
    formatAmount: (state) => {
      return (amount: number) => {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: state.selectedCurrency.code
        }).format(amount);
      };
    }
  }
}); 