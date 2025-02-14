<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransactionStore } from '../stores/transaction';
import { useCategoryStore } from '../stores/category';
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
  <div class="container px-4 py-8 mx-auto">
    <h1 class="mb-8 text-3xl font-bold">{{ t('analytics.title') }}</h1>

    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-2 text-sm font-medium text-gray-500">{{ t('transactions.summary.totalIncome') }}</h3>
        <p class="text-2xl font-bold text-emerald-500">
          {{ totalIncome.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-2 text-sm font-medium text-gray-500">{{ t('transactions.summary.totalExpense') }}</h3>
        <p class="text-2xl font-bold text-red-500">
          {{ totalExpense.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-2 text-sm font-medium text-gray-500">{{ t('analytics.metrics.netBalance') }}</h3>
        <p class="text-2xl font-bold" :class="netBalance >= 0 ? 'text-emerald-500' : 'text-red-500'">
          {{ netBalance.toLocaleString(locale, { style: 'currency', currency: 'TRY' }) }}
        </p>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-2 text-sm font-medium text-gray-500">{{ t('analytics.metrics.savingsRate') }}</h3>
        <p class="text-2xl font-bold text-indigo-500">
          {{ savingsRate.toFixed(1) }}%
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="p-6 card">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ t('analytics.charts.monthlyTrend') }}</h2>
        <MonthlyTrendChart :transactions="filteredTransactions" />
      </div>
      
      <div class="p-6 card">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ t('analytics.charts.categoryDistribution') }}</h2>
        <CategoryDistributionChart 
          :transactions="filteredTransactions"
          :categories="categoryStore.categories"
        />
      </div>
      
      <div class="p-6 card lg:col-span-2">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ t('analytics.charts.incomeExpense') }}</h2>
        <AnalyticsChart :transactions="filteredTransactions" />
      </div>
    </div>
  </div>
</template> 