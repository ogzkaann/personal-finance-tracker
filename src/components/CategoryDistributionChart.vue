<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Transaction, Category } from '../types';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

const props = defineProps<{
  transactions: Transaction[];
  categories: Category[];
}>();

const chartContainer = ref<HTMLCanvasElement | null>(null);
const chart = ref<Chart | null>(null);

const categoryTotals = computed(() => {
  const totals = new Map<string, number>();
  
  props.transactions.forEach(transaction => {
    const currentTotal = totals.get(transaction.category) || 0;
    totals.set(transaction.category, currentTotal + transaction.amount);
  });
  
  return totals;
});

const chartData = computed(() => {
  const data: number[] = [];
  const labels: string[] = [];
  const colors: string[] = [];
  
  props.categories.forEach(category => {
    const total = categoryTotals.value.get(category.id) || 0;
    if (total > 0) {
      data.push(total);
      labels.push(category.name);
      colors.push(category.color);
    }
  });
  
  return { data, labels, colors };
});

const createChart = () => {
  if (!chartContainer.value) return;
  
  if (chart.value) {
    chart.value.destroy();
  }

  const ctx = chartContainer.value.getContext('2d');
  if (!ctx) return;
  
  const { data, labels, colors } = chartData.value;
  
  chart.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
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

// Props değiştiğinde grafiği güncelle
watch(() => [props.transactions, props.categories], () => {
  if (chartContainer.value) {
    createChart();
  }
}, { deep: true });

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
  <div class="h-64">
    <canvas ref="chartContainer"></canvas>
  </div>
</template> 