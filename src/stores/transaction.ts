import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useAuthStore } from './auth';
import type { Transaction, TransactionType } from '../types';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([]);
  const authStore = useAuthStore();
  
  // Getters
  const totalIncome = computed(() => 
    transactions.value
      .filter((t: Transaction) => t.type === 'income')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
  );
  
  const totalExpense = computed(() => 
    transactions.value
      .filter((t: Transaction) => t.type === 'expense')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
  );
  
  const balance = computed(() => totalIncome.value - totalExpense.value);
  
  const getTransactionsByType = (type: TransactionType) =>
    computed(() => transactions.value.filter((t: Transaction) => t.type === type));
  
  const getTransactionsByCategory = (category: string) =>
    computed(() => transactions.value.filter((t: Transaction) => t.category === category));
  
  const getTransactionsByDateRange = (startDate: string, endDate: string) =>
    computed(() => 
      transactions.value.filter((t: Transaction) => 
        t.date >= startDate && t.date <= endDate
      )
    );
  
  // Actions
  function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!authStore.user?.id) return; // Kullanıcı yoksa işlem ekleme
    
    const now = new Date().toISOString();
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...transaction
    };
    
    transactions.value.push(newTransaction);
    saveToLocalStorage();
  }
  
  function updateTransaction(id: string, updates: Partial<Transaction>) {
    if (!authStore.user?.id) return; // Kullanıcı yoksa işlem güncelleme
    
    const index = transactions.value.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions.value[index] = {
        ...transactions.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveToLocalStorage();
    }
  }
  
  function deleteTransaction(id: string) {
    if (!authStore.user?.id) return; // Kullanıcı yoksa işlem silme
    
    transactions.value = transactions.value.filter(t => t.id !== id);
    saveToLocalStorage();
  }
  
  // LocalStorage
  function saveToLocalStorage() {
    if (!authStore.user?.id) {
      transactions.value = [];
      return;
    }
    const key = `transactions_${authStore.user.id}`;
    localStorage.setItem(key, JSON.stringify(transactions.value));
  }
  
  function loadFromLocalStorage() {
    transactions.value = []; // Her zaman önce temizle
    
    if (!authStore.user?.id) return;
    
    const key = `transactions_${authStore.user.id}`;
    const storedTransactions = localStorage.getItem(key);
    
    if (storedTransactions) {
      transactions.value = JSON.parse(storedTransactions);
    }
  }
  
  // Kullanıcı değişikliğini izle
  watch(() => authStore.user?.id, () => {
    loadFromLocalStorage();
  }, { immediate: true });
  
  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    getTransactionsByType,
    getTransactionsByCategory,
    getTransactionsByDateRange,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
});