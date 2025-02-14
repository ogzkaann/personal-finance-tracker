<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransactionStore } from '../stores/transaction';
import { useCategoryStore } from '../stores/category';
import { useCurrencyStore } from '../stores/currency';
import TransactionList from '../components/TransactionList.vue';
import TransactionForm from '../components/TransactionForm.vue';
import DateRangePicker from '../components/DateRangePicker.vue';
import CategoryModal from '../components/CategoryModal.vue';
import type { Transaction, TransactionType, DateRange } from '../types';

const { t } = useI18n();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
const currencyStore = useCurrencyStore();

const showCategoryModal = ref(false);
const showTransactionForm = ref(false);
const selectedType = ref<TransactionType | 'all'>('all');
const selectedCategory = ref<string | 'all'>('all');
const dateRange = ref<DateRange>({
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
});

const totalIncome = computed(() => transactionStore.totalIncome);
const totalExpense = computed(() => transactionStore.totalExpense);
const balance = computed(() => totalIncome.value - totalExpense.value);

const formatCurrency = (amount: number) => {
  return currencyStore.formatAmount(amount);
};

const filteredTransactions = computed(() => {
  let filtered = transactionStore.transactions;
  
  // Tarih filtresi
  filtered = filtered.filter(t => 
    t.date >= dateRange.value.startDate && 
    t.date <= dateRange.value.endDate
  );
  
  // Tip filtresi
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(t => t.type === selectedType.value);
  }
  
  // Kategori filtresi
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(t => t.category === selectedCategory.value);
  }
  
  return filtered;
});

const openCategoryModal = () => {
  showCategoryModal.value = true;
};

const closeCategoryModal = () => {
  showCategoryModal.value = false;
};

const openTransactionForm = () => {
  showTransactionForm.value = true;
};

const closeTransactionForm = () => {
  showTransactionForm.value = false;
};

const handleTransactionSubmit = (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
  transactionStore.addTransaction(transaction);
  showTransactionForm.value = false;
};

const handleDeleteTransaction = (id: string) => {
  transactionStore.deleteTransaction(id);
};
</script>

<template>
  <div class="space-y-6">
    <div class="p-6 bg-white rounded-lg shadow">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="p-4 bg-green-50 rounded-lg">
          <h3 class="text-sm font-medium text-green-800">{{ t('transactions.summary.totalIncome') }}</h3>
          <p class="mt-2 text-2xl font-semibold text-green-600">{{ formatCurrency(totalIncome) }}</p>
        </div>
        
        <div class="p-4 bg-red-50 rounded-lg">
          <h3 class="text-sm font-medium text-red-800">{{ t('transactions.summary.totalExpense') }}</h3>
          <p class="mt-2 text-2xl font-semibold text-red-600">{{ formatCurrency(totalExpense) }}</p>
        </div>
        
        <div class="p-4 bg-blue-50 rounded-lg">
          <h3 class="text-sm font-medium text-blue-800">{{ t('transactions.summary.balance') }}</h3>
          <p class="mt-2 text-2xl font-semibold" :class="{ 'text-green-600': balance >= 0, 'text-red-600': balance < 0 }">
            {{ formatCurrency(balance) }}
          </p>
        </div>
      </div>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-medium text-gray-900">{{ t('transactions.title') }}</h2>
        <div class="space-x-4">
          <button
            @click="openCategoryModal"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <i class="mr-2 fas fa-tags"></i>
            {{ t('categories.manage') }}
          </button>
          <button
            @click="openTransactionForm"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <i class="mr-2 fas fa-plus"></i>
            {{ t('transactions.new') }}
          </button>
        </div>
      </div>

      <div class="p-6 mb-6 bg-gray-50 rounded-xl">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{ t('transactions.fields.type') }}</label>
            <div class="flex rounded-lg shadow-sm">
              <button
                @click="selectedType = 'all'"
                class="flex-1 px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200"
                :class="selectedType === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'"
              >
                {{ t('transactions.filters.all') }}
              </button>
              <button
                @click="selectedType = 'income'"
                class="flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200"
                :class="selectedType === 'income' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'"
              >
                {{ t('transactions.type.income') }}
              </button>
              <button
                @click="selectedType = 'expense'"
                class="flex-1 px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200"
                :class="selectedType === 'expense' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'"
              >
                {{ t('transactions.type.expense') }}
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{ t('transactions.fields.category') }}</label>
            <div class="relative">
              <select 
                v-model="selectedCategory"
                class="block py-2 pr-10 pl-3 w-full text-base rounded-lg border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">{{ t('transactions.filters.all') }}</option>
                <option 
                  v-for="category in categoryStore.categories" 
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{ t('transactions.filters.dateRange') }}</label>
            <DateRangePicker 
              v-model="dateRange"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <TransactionList 
        :transactions="filteredTransactions"
        :categories="categoryStore.categories"
        @delete="handleDeleteTransaction"
      />
    </div>

    <TransactionForm
      v-if="showTransactionForm"
      :categories="categoryStore.categories"
      @submit="handleTransactionSubmit"
      @cancel="closeTransactionForm"
    />

    <CategoryModal
      v-if="showCategoryModal"
      @close="closeCategoryModal"
    />
  </div>
</template> 