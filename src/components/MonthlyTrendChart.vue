<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VueApexCharts from 'vue3-apexcharts';
import type { Transaction } from '../types';

const props = defineProps<{
  transactions: Transaction[];
}>();

const { t, locale } = useI18n();

const monthlyData = computed(() => {
  const months = new Map<string, { income: number; expense: number; balance: number }>();
  
  props.transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months.has(monthKey)) {
      months.set(monthKey, { income: 0, expense: 0, balance: 0 });
    }
    
    const monthData = months.get(monthKey)!;
    if (transaction.type === 'income') {
      monthData.income += transaction.amount;
      monthData.balance += transaction.amount;
    } else {
      monthData.expense += transaction.amount;
      monthData.balance -= transaction.amount;
    }
  });
  
  const sortedMonths = Array.from(months.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  return {
    categories: sortedMonths.map(([month]) => {
      const [year, monthNum] = month.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString(locale.value, { 
        month: 'short',
        year: 'numeric'
      });
    }),
    series: [
      {
        name: t('analytics.metrics.netBalance'),
        data: sortedMonths.map(([, data]) => data.balance)
      }
    ]
  };
});

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: {
      show: true
    },
    animations: {
      enabled: true,
      speed: 300
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  colors: ['#6366F1'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  markers: {
    size: 6,
    colors: ['#6366F1'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 8
    }
  },
  grid: {
    borderColor: '#f1f1f1',
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
  xaxis: {
    categories: monthlyData.value.categories,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        return value.toLocaleString(locale.value, {
          style: 'currency',
          currency: 'TRY',
          maximumFractionDigits: 0
        });
      }
    }
  },
  tooltip: {
    y: {
      formatter: (value: number) => {
        const color = value >= 0 ? 'text-emerald-600' : 'text-red-600';
        const sign = value >= 0 ? '+' : '';
        return `<span class="${color}">${sign}${value.toLocaleString(locale.value, {
          style: 'currency',
          currency: 'TRY'
        })}</span>`;
      }
    }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    offsetY: 8,
    fontSize: '14px',
    fontFamily: "'Inter var', sans-serif",
    markers: {
      width: 12,
      height: 12,
      radius: 12
    }
  }
}));
</script>

<template>
  <div class="h-64">
    <VueApexCharts
      :options="chartOptions"
      :series="monthlyData.series"
      height="100%"
    />
  </div>
</template> 