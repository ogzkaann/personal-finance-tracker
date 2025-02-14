<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Transaction, Category, RecurrenceType } from '../types';
import { useCurrencyStore } from '../stores/currency';

const { t } = useI18n();
const currencyStore = useCurrencyStore();
const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'submit', transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): void;
  (e: 'cancel'): void;
}>();

const type = ref<'income' | 'expense'>('income');
const amount = ref(0);
const category = ref('');
const description = ref('');
const date = ref(new Date().toISOString().split('T')[0]);
const isRecurring = ref(false);
const recurrenceType = ref<RecurrenceType>('none');
const recurrenceEndDate = ref<string>('');
const noEndDate = ref(false);

const filteredCategories = computed(() => 
  props.categories.filter(c => c.type === type.value)
);

const handleSubmit = () => {
  if (!category.value || amount.value <= 0 || !description.value || !date.value) {
    return;
  }

  const transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> = {
    type: type.value,
    amount: amount.value,
    category: category.value,
    description: description.value,
    date: date.value
  };

  if (isRecurring.value && recurrenceType.value !== 'none') {
    transaction.recurrence = {
      type: recurrenceType.value,
      startDate: date.value,
      endDate: recurrenceEndDate.value || undefined
    };
    transaction.isRecurring = true;
  }

  emit('submit', transaction);

  // Form alanlarını temizle
  type.value = 'income';
  amount.value = 0;
  category.value = '';
  description.value = '';
  date.value = new Date().toISOString().split('T')[0];
  isRecurring.value = false;
  recurrenceType.value = 'none';
  recurrenceEndDate.value = '';
  noEndDate.value = false;
};
</script>

<template>
  <div class="flex fixed inset-0 justify-center items-center p-4 bg-gray-500 bg-opacity-75">
    <div class="p-6 w-full max-w-md bg-white rounded-lg shadow-xl">
      <h2 class="mb-4 text-lg font-semibold text-gray-900">
        {{ type === 'income' ? t('transactions.addIncome') : t('transactions.addExpense') }}
      </h2>
      
      <div class="flex mb-6 space-x-4">
        <button type="button"
          class="flex relative flex-1 justify-center items-center px-4 py-2 text-sm font-medium rounded-lg shadow transition-transform duration-300 focus:outline-none active:scale-95"
          :class="type === 'income'
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-white text-green-500 border border-green-200 hover:bg-green-50'"
          @click="type = 'income'">
          <i class="mr-2 fas fa-plus-circle"></i>
          {{ t('transactions.type.income') }}
        </button>
        <button type="button"
          class="flex relative flex-1 justify-center items-center px-4 py-2 text-sm font-medium rounded-lg shadow transition-transform duration-300 focus:outline-none active:scale-95"
          :class="type === 'expense'
            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            : 'bg-white text-red-500 border border-red-200 hover:bg-red-50'"
          @click="type = 'expense'">
          <i class="mr-2 fas fa-minus-circle"></i>
          {{ t('transactions.type.expense') }}
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="amount" class="block mb-1 text-sm font-medium text-gray-700">{{ t('transactions.fields.amount') }}</label>
          <div class="relative">
            <input
              id="amount"
              v-model.number="amount"
              type="number"
              min="0"
              step="0.01"
              class="pr-8 transition-colors duration-200 input"
              :class="[
                type === 'income' ? 'focus:border-emerald-500 focus:ring-emerald-500' : 'focus:border-red-500 focus:ring-red-500',
                { 'border-emerald-300 bg-emerald-50': type === 'income' },
                { 'border-red-300 bg-red-50': type === 'expense' }
              ]"
              required
            />
            <span class="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2">{{ currencyStore.selectedCurrency.symbol }}</span>
          </div>
        </div>
        
        <div>
          <label for="category" class="block mb-1 text-sm font-medium text-gray-700">{{ t('transactions.fields.category') }}</label>
          <select
            id="category"
            v-model="category"
            class="transition-colors duration-200 input"
            :class="[
              type === 'income' ? 'focus:border-emerald-500 focus:ring-emerald-500' : 'focus:border-red-500 focus:ring-red-500',
              { 'border-emerald-300 bg-emerald-50': type === 'income' },
              { 'border-red-300 bg-red-50': type === 'expense' }
            ]"
            required
          >
            <option value="">{{ t('transactions.fields.selectCategory') }}</option>
            <option
              v-for="cat in filteredCategories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="description" class="block mb-1 text-sm font-medium text-gray-700">{{ t('transactions.fields.description') }}</label>
          <input
            id="description"
            v-model="description"
            type="text"
            class="transition-colors duration-200 input"
            :class="[
              type === 'income' ? 'focus:border-emerald-500 focus:ring-emerald-500' : 'focus:border-red-500 focus:ring-red-500',
              { 'border-emerald-300 bg-emerald-50': type === 'income' },
              { 'border-red-300 bg-red-50': type === 'expense' }
            ]"
            required
          />
        </div>
        
        <div>
          <label for="date" class="block mb-1 text-sm font-medium text-gray-700">{{ t('transactions.fields.date') }}</label>
          <input
            id="date"
            v-model="date"
            type="date"
            class="transition-colors duration-200 input"
            :class="[
              type === 'income' ? 'focus:border-emerald-500 focus:ring-emerald-500' : 'focus:border-red-500 focus:ring-red-500',
              { 'border-emerald-300 bg-emerald-50': type === 'income' },
              { 'border-red-300 bg-red-50': type === 'expense' }
            ]"
            required
          />
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              id="isRecurring"
              v-model="isRecurring"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="isRecurring" class="block ml-2 text-sm font-medium text-gray-700">
              {{ t('transactions.recurrence.options.enabled') }}
            </label>
          </div>

          <div v-if="isRecurring" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ t('transactions.recurrence.title') }}
              </label>
              <select
                v-model="recurrenceType"
                class="block mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option v-for="type in ['none', 'daily', 'weekly', 'monthly', 'yearly']" :key="type" :value="type">
                  {{ t(`transactions.recurrence.types.${type}`) }}
                </option>
              </select>
            </div>

            <div v-if="recurrenceType !== 'none'" class="space-y-4">
              <div class="flex items-center">
                <input
                  id="noEndDate"
                  v-model="noEndDate"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label for="noEndDate" class="block ml-2 text-sm font-medium text-gray-700">
                  {{ t('transactions.recurrence.noEndDate') }}
                </label>
              </div>

              <div v-if="!noEndDate">
                <label for="recurrenceEndDate" class="block text-sm font-medium text-gray-700">
                  {{ t('transactions.recurrence.endDate') }}
                </label>
                <input
                  id="recurrenceEndDate"
                  v-model="recurrenceEndDate"
                  type="date"
                  :min="date"
                  class="block mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :disabled="noEndDate"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="$emit('cancel')"
          >
            {{ t('common.actions.cancel') }}
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white rounded-lg border border-transparent bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ t('common.actions.save') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>