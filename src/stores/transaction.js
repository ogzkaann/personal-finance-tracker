import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const deletedTransactions = ref([]);
  const showDeleted = ref(false);

  const visibleTransactions = computed(() => {
    return showDeleted.value ? [...transactions.value, ...deletedTransactions.value] : transactions.value;
  });

  const totalIncome = computed(() => {
    return visibleTransactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const totalExpense = computed(() => {
    return visibleTransactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const balance = computed(() => {
    return totalIncome.value - totalExpense.value;
  });

  const addTransaction = (transaction) => {
    transactions.value.push(transaction);
    saveToLocalStorage();
  };

  const deleteTransaction = (id) => {
    const index = transactions.value.findIndex(t => t.id === id);
    if (index !== -1) {
      const deletedTransaction = transactions.value.splice(index, 1)[0];
      deletedTransaction.deleted = true;
      deletedTransactions.value.push(deletedTransaction);
      saveToLocalStorage();
    }
  };

  const restoreTransaction = (id) => {
    const index = deletedTransactions.value.findIndex(t => t.id === id);
    if (index !== -1) {
      const restoredTransaction = deletedTransactions.value.splice(index, 1)[0];
      delete restoredTransaction.deleted;
      transactions.value.push(restoredTransaction);
      saveToLocalStorage();
    }
  };

  const toggleShowDeleted = () => {
    showDeleted.value = !showDeleted.value;
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('deletedTransactions', JSON.stringify(deletedTransactions.value));
  };

  const loadFromLocalStorage = () => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedDeletedTransactions = localStorage.getItem('deletedTransactions');
    
    if (savedTransactions) {
      transactions.value = JSON.parse(savedTransactions);
    }
    
    if (savedDeletedTransactions) {
      deletedTransactions.value = JSON.parse(savedDeletedTransactions);
    }
  };

  // İlk yüklemede localStorage'dan verileri al
  loadFromLocalStorage();

  return {
    transactions,
    deletedTransactions,
    showDeleted,
    visibleTransactions,
    totalIncome,
    totalExpense,
    balance,
    addTransaction,
    deleteTransaction,
    restoreTransaction,
    toggleShowDeleted,
    saveToLocalStorage,
    loadFromLocalStorage
  };
}); 