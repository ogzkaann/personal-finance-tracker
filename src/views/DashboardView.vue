<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '../stores/transaction';
import { useCategoryStore } from '../stores/category';
import TransactionList from '../components/TransactionList.vue';
import DashboardSummary from '../components/DashboardSummary.vue';
import DashboardChart from '../components/DashboardChart.vue';

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const isLoading = ref(true);

onMounted(() => {
  // Simüle edilmiş yükleme gecikmesi
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
    
    <div v-if="isLoading" class="space-y-4">
      <div class="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
      <div class="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      <div class="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
    </div>
    
    <div v-else class="space-y-6">
      <DashboardSummary />
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Gelir/Gider Dağılımı</h2>
          <DashboardChart />
        </div>
        
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Son İşlemler</h2>
          <TransactionList 
            :transactions="transactionStore.transactions.slice(0, 5)"
            :categories="categoryStore.categories"
          />
        </div>
      </div>
    </div>
  </div>
</template> 