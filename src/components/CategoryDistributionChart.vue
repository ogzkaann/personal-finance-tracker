<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VueApexCharts from 'vue3-apexcharts';
import type { Transaction, Category } from '../types';

const props = defineProps<{
  transactions: Transaction[];
  categories: Category[];
}>();

const { t, locale } = useI18n();

const chartData = computed(() => {
  const totals = new Map<string, number>();
  
  props.transactions.forEach(transaction => {
    const currentTotal = totals.get(transaction.category) || 0;
    totals.set(transaction.category, currentTotal + transaction.amount);
  });
  
  const data: number[] = [];
  const labels: string[] = [];
  const colors: string[] = [];
  
  props.categories.forEach(category => {
    const total = totals.get(category.id) || 0;
    if (total > 0) {
      data.push(total);
      labels.push(category.name);
      colors.push(category.color);
    }
  });
  
  return {
    series: data,
    labels,
    colors
  };
});

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350,
    animations: {
      enabled: true,
      speed: 300,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  colors: chartData.value.colors,
  labels: chartData.value.labels,
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontFamily: "'Inter var', sans-serif",
            color: '#64748b',
            offsetY: 0
          },
          value: {
            show: true,
            fontSize: '16px',
            fontFamily: "'Inter var', sans-serif",
            color: '#1e293b',
            offsetY: 8,
            formatter: (val: number) => {
              return val.toLocaleString(locale.value, {
                style: 'currency',
                currency: 'TRY'
              });
            }
          },
          total: {
            show: true,
            showAlways: true,
            label: t('analytics.metrics.total'),
            fontSize: '14px',
            fontFamily: "'Inter var', sans-serif",
            color: '#64748b',
            formatter: (w: any) => {
              const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
              return total.toLocaleString(locale.value, {
                style: 'currency',
                currency: 'TRY'
              });
            }
          }
        }
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
    },
    formatter: (seriesName: string, opts: any) => {
      const total = opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
      const value = opts.w.globals.series[opts.seriesIndex];
      const percent = ((value / total) * 100).toFixed(1);
      const amount = value.toLocaleString(locale.value, {
        style: 'currency',
        currency: 'TRY'
      });
      return `${seriesName} - ${amount} (${percent}%)`;
    }
  },
  tooltip: {
    enabled: true,
    custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
      const total = series.reduce((a: number, b: number) => a + b, 0);
      const value = series[seriesIndex];
      const percent = ((value / total) * 100).toFixed(1);
      const amount = value.toLocaleString(locale.value, {
        style: 'currency',
        currency: 'TRY'
      });
      const category = w.config.labels[seriesIndex];
      
      return `
        <div class="custom-tooltip">
          <div class="font-medium">${category}</div>
          <div class="text-sm text-gray-600">${amount}</div>
          <div class="text-sm font-medium text-primary-600">${percent}%</div>
        </div>
      `;
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        height: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}));
</script>

<template>
  <div class="h-64">
    <VueApexCharts
      :options="chartOptions"
      :series="chartData.series"
      type="donut"
      height="100%"
    />
  </div>
</template> 