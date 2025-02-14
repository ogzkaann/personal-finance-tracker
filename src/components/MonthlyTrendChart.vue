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
  
  // Son 12 ayı oluştur
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.set(monthKey, { income: 0, expense: 0, balance: 0 });
  }
  
  // İşlemleri ekle
  props.transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (months.has(monthKey)) {
      const monthData = months.get(monthKey)!;
      if (transaction.type === 'income') {
        monthData.income += transaction.amount;
        monthData.balance += transaction.amount;
      } else {
        monthData.expense += transaction.amount;
        monthData.balance -= transaction.amount;
      }
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
    enabled: true,
    custom: function({ series, dataPointIndex, w }: any) {
      const value = series[0][dataPointIndex];
      const date = w.globals.categoryLabels[dataPointIndex];
      const color = value >= 0 ? '#10B981' : '#EF4444';
      const sign = value >= 0 ? '+' : '';
      const amount = value.toLocaleString(locale.value, {
        style: 'currency',
        currency: 'TRY'
      });

      return `
        <div class="px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-lg">
          <div class="mb-2 text-sm font-medium text-gray-600">${date}</div>
          <div class="flex gap-2 items-center">
            <div class="w-2 h-2 rounded-full" style="background-color: ${color}"></div>
            <div class="text-base font-semibold text-gray-900">${t('analytics.metrics.netBalance')}</div>
          </div>
          <div class="mt-1 text-lg font-bold" style="color: ${color}">${sign}${amount}</div>
        </div>
      `;
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
      radius: 12,
      offsetX: -4
    },
    itemMargin: {
      horizontal: 16
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