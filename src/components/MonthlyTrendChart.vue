<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import type { Transaction } from '../types';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

const props = defineProps<{
  transactions: Transaction[];
}>();

const chartContainer = ref<HTMLCanvasElement | null>(null);
const chart = ref<Chart | null>(null);

const monthlyData = computed(() => {
  const months = new Map<string, { income: number; expense: number }>();
  
  props.transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months.has(monthKey)) {
      months.set(monthKey, { income: 0, expense: 0 });
    }
    
    const monthData = months.get(monthKey)!;
    if (transaction.type === 'income') {
      monthData.income += transaction.amount;
    } else {
      monthData.expense += transaction.amount;
    }
  });
  
  // Ayları sırala
  const sortedMonths = Array.from(months.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  return {
    labels: sortedMonths.map(([month]) => {
      const [year, monthNum] = month.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('tr-TR', { 
        month: 'short',
        year: 'numeric'
      });
    }),
    income: sortedMonths.map(([, data]) => data.income),
    expense: sortedMonths.map(([, data]) => data.expense)
  };
});

const createChart = () => {
  if (!chartContainer.value) return;
  
  if (chart.value) {
    chart.value.destroy();
  }

  const ctx = chartContainer.value.getContext('2d');
  if (!ctx) return;
  
  const { labels, income, expense } = monthlyData.value;
  
  chart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Gelir',
          data: income,
          borderColor: '#10B981',
          backgroundColor: '#10B98120',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Gider',
          data: expense,
          borderColor: '#EF4444',
          backgroundColor: '#EF444420',
          fill: true,
          tension: 0.4
        }
      ]
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
              return `${context.dataset.label}: ${value.toLocaleString('tr-TR', { 
                style: 'currency', 
                currency: 'TRY' 
              })}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return (value as number).toLocaleString('tr-TR', { 
                style: 'currency', 
                currency: 'TRY',
                maximumFractionDigits: 0
              });
            }
          }
        }
      }
    }
  });
};

// Props değiştiğinde grafiği güncelle
watch(() => props.transactions, () => {
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