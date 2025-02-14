<script setup lang="ts">
import { computed } from 'vue';
import { useTransactionStore } from '../stores/transaction';

const transactionStore = useTransactionStore();

const totalIncome = computed(() => transactionStore.totalIncome);
const totalExpense = computed(() => transactionStore.totalExpense);
const balance = computed(() => transactionStore.balance);
const savingsRate = computed(() => {
  if (totalIncome.value === 0) return 0;
  return ((totalIncome.value - totalExpense.value) / totalIncome.value) * 100;
});

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('tr-TR', { 
    style: 'currency', 
    currency: 'TRY' 
  });
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="card p-6">
      <h3 class="text-sm font-medium text-gray-500">Toplam Gelir</h3>
      <p class="text-2xl font-semibold text-green-600">{{ formatCurrency(totalIncome) }}</p>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span>Bu ayki gelirleriniz</span>
      </div>
    </div>
    
    <div class="card p-6">
      <h3 class="text-sm font-medium text-gray-500">Toplam Gider</h3>
      <p class="text-2xl font-semibold text-red-600">{{ formatCurrency(totalExpense) }}</p>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span>Bu ayki giderleriniz</span>
      </div>
    </div>
    
    <div class="card p-6">
      <h3 class="text-sm font-medium text-gray-500">Net Bakiye</h3>
      <p 
        class="text-2xl font-semibold" 
        :class="{ 'text-green-600': balance >= 0, 'text-red-600': balance < 0 }"
      >
        {{ formatCurrency(balance) }}
      </p>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span>Mevcut bakiyeniz</span>
      </div>
    </div>
    
    <div class="card p-6">
      <h3 class="text-sm font-medium text-gray-500">Tasarruf Oranı</h3>
      <p class="text-2xl font-semibold text-blue-600">{{ savingsRate.toFixed(1) }}%</p>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span>Gelir/gider oranınız</span>
      </div>
    </div>
  </div>
</template> 