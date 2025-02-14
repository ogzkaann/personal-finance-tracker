<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, BarController, LineController } from 'chart.js';
import type { Transaction } from '../types';

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  transactions: Transaction[];
}>();

const { t, locale } = useI18n();
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
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString(locale, { 
        month: 'long',
        year: 'numeric'
      });
    }),
    income: sortedMonths.map(([, data]) => data.income),
    expense: sortedMonths.map(([, data]) => data.expense),
    balance: sortedMonths.map(([, data]) => data.income - data.expense)
  };
});

const createChart = () => {
  if (!chartContainer.value) return;
  
  if (chart.value) {
    chart.value.destroy();
  }

  const ctx = chartContainer.value.getContext('2d');
  if (!ctx) return;
  
  const { labels, income, expense, balance } = monthlyData.value;
  
  chart.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: t('transactions.type.income'),
          data: income,
          backgroundColor: '#10B981',
          borderRadius: 4
        },
        {
          label: t('transactions.type.expense'),
          data: expense,
          backgroundColor: '#EF4444',
          borderRadius: 4
        },
        {
          label: t('analytics.metrics.netBalance'),
          data: balance,
          type: 'line',
          borderColor: '#6366F1',
          backgroundColor: '#6366F120',
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
              return `${context.dataset.label}: ${value.toLocaleString(locale, { 
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
              return (value as number).toLocaleString(locale, { 
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

// Chart'ı güncelle
watch(() => [props.transactions, locale], () => {
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
  <div class="h-96">
    <canvas ref="chartContainer"></canvas>
  </div>
</template> 