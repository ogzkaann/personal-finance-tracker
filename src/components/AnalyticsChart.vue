<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import VueApexCharts from 'vue3-apexcharts';
import type { Transaction } from '../types';

const props = defineProps<{
  transactions: Transaction[];
}>();

const { t, locale } = useI18n();

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
  
  const sortedMonths = Array.from(months.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  return {
    categories: sortedMonths.map(([month]) => {
      const [year, monthNum] = month.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString(locale.value, { 
        month: 'long',
        year: 'numeric'
      });
    }),
    series: [
      {
        name: t('transactions.type.income'),
        type: 'column',
        data: sortedMonths.map(([, data]) => data.income)
      },
      {
        name: t('transactions.type.expense'),
        type: 'column',
        data: sortedMonths.map(([, data]) => data.expense)
      },
      {
        name: t('analytics.metrics.netBalance'),
        type: 'line',
        data: sortedMonths.map(([, data]) => data.income - data.expense)
      }
    ]
  };
});

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    stacked: false,
    toolbar: {
      show: true
    },
    animations: {
      enabled: true,
      speed: 300
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '50%'
    }
  },
  stroke: {
    width: [0, 0, 3]
  },
  colors: ['#10B981', '#EF4444', '#6366F1'],
  dataLabels: {
    enabled: false
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  markers: {
    size: 4,
    strokeWidth: 2,
    hover: {
      size: 6
    }
  },
  xaxis: {
    categories: monthlyData.value.categories
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
        return value.toLocaleString(locale.value, {
          style: 'currency',
          currency: 'TRY'
        });
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
  <div class="h-96">
    <VueApexCharts
      :options="chartOptions"
      :series="monthlyData.series"
      height="100%"
    />
  </div>
</template> 