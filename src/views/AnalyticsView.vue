<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransactionStore } from '../stores/transaction';
import { useCategoryStore } from '../stores/category';
import DateRangePicker from '../components/DateRangePicker.vue';
import AnalyticsChart from '../components/AnalyticsChart.vue';
import CategoryDistributionChart from '../components/CategoryDistributionChart.vue';
import MonthlyTrendChart from '../components/MonthlyTrendChart.vue';
import type { DateRange } from '../types';

const { t, locale } = useI18n();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const dateRange = ref<DateRange>({
  startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
});

const filteredTransactions = computed(() => 
  transactionStore.transactions.filter(t => 
    t.date >= dateRange.value.startDate && 
    t.date <= dateRange.value.endDate
  )
);

const totalIncome = computed(() => 
  transactionStore.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
);

const totalExpense = computed(() => 
  transactionStore.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
);

const netBalance = computed(() => totalIncome.value - totalExpense.value);

const savingsRate = computed(() => {
  if (totalIncome.value === 0) return 0;
  return (netBalance.value / totalIncome.value) * 100;
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{{ t('analytics.title') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-gray-500 text-sm font-medium mb-2">{{ t('transactions.summary.totalIncome') }}</h3>
        <p class="text-2xl font-bold text-emerald-500">
          {{ totalIncome.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-gray-500 text-sm font-medium mb-2">{{ t('transactions.summary.totalExpense') }}</h3>
        <p class="text-2xl font-bold text-red-500">
          {{ totalExpense.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-gray-500 text-sm font-medium mb-2">{{ t('analytics.metrics.netBalance') }}</h3>
        <p class="text-2xl font-bold" :class="netBalance >= 0 ? 'text-emerald-500' : 'text-red-500'">
          {{ netBalance.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-gray-500 text-sm font-medium mb-2">{{ t('analytics.metrics.savingsRate') }}</h3>
        <p class="text-2xl font-bold text-indigo-500">
          {{ savingsRate.toFixed(1) }}%
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('analytics.charts.monthlyTrend') }}</h2>
        <MonthlyTrendChart :transactions="filteredTransactions" />
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('analytics.charts.categoryDistribution') }}</h2>
        <CategoryDistributionChart 
          :transactions="filteredTransactions"
          :categories="categoryStore.categories"
        />
      </div>
      
      <div class="card p-6 lg:col-span-2">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('analytics.charts.incomeExpense') }}</h2>
        <AnalyticsChart :transactions="filteredTransactions" />
      </div>
    </div>
  </div>
</template> 