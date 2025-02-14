<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTransactionStore } from '@/stores/transaction';
import { useCategoryStore } from '@/stores/category';

Chart.register(ArcElement, Tooltip, Legend);

const chartContainer = ref<HTMLCanvasElement | null>(null);
const chart = ref<Chart | null>(null);

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const createChart = () => {
  if (!chartContainer.value) return;

  // Eğer önceki bir chart varsa temizle
  if (chart.value) {
    chart.value.destroy();
  }

  const ctx = chartContainer.value.getContext('2d');
  if (!ctx) return;

  const incomeTotal = transactionStore.totalIncome;
  const expenseTotal = transactionStore.totalExpense;

  chart.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Gelir', 'Gider'],
      datasets: [{
        data: [incomeTotal, expenseTotal],
        backgroundColor: [
          '#10B981', // yeşil (gelir)
          '#EF4444'  // kırmızı (gider)
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: "'Inter var', sans-serif",
              size: 14
            },
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw as number;
              return `${context.label}: ${value.toLocaleString('tr-TR', { 
                style: 'currency', 
                currency: 'TRY' 
              })}`;
            }
          }
        }
      },
      cutout: '70%'
    }
  });
};

// İşlemler değiştiğinde grafiği güncelle
watch(
  () => [transactionStore.totalIncome, transactionStore.totalExpense],
  () => {
    if (chartContainer.value) {
      createChart();
    }
  }
);

onMounted(() => {
  if (chartContainer.value) {
    createChart();
  }
});

onUnmounted(() => {
  if (chart.value) {
    chart.value.destroy();
    chart.value = null;
  }
});
</script>

<template>
  <div class="relative h-64">
    <canvas ref="chartContainer"></canvas>
  </div>
</template> 