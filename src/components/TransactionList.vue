<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Transaction, Category } from '../types';
import { useCurrencyStore } from '../stores/currency';

const { locale, t } = useI18n();
const currencyStore = useCurrencyStore();
console.log(locale.value);

const props = defineProps<{
  transactions: Transaction[];
  categories: Category[];
}>();

const sortedTransactions = computed(() => 
  [...props.transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const getCategoryName = (categoryId: string) => {
  const category = props.categories.find(c => c.id === categoryId);
  return category ? category.name : 'Bilinmeyen Kategori';
};

const getCategoryColor = (categoryId: string) => {
  const category = props.categories.find(c => c.id === categoryId);
  return category ? category.color : '#94A3B8';
};

const formatAmount = (amount: number) => {
  return currencyStore.formatAmount(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const emit = defineEmits<{
  (e: 'delete', id: string): void;
}>();

const handleDelete = (id: string) => {
  if (confirm('Bu işlemi silmek istediğinizden emin misiniz?')) {
    emit('delete', id);
  }
};
</script>

<template>
  <div class="space-y-4">
    <div v-if="transactions.length === 0" class="text-center py-8">
      <p class="text-gray-500">Henüz hiç işlem bulunmuyor.</p>
    </div>
    
    <div v-else class="overflow-hidden">
      <TransitionGroup
        name="list"
        tag="div"
        class="space-y-2"
      >
        <div v-for="transaction in sortedTransactions" 
             :key="transaction.id"
             class="flex items-center p-4 bg-white hover:bg-gray-50 transition-all duration-200 rounded-lg border border-gray-200 group"
        >
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <div 
                class="w-3 h-3 rounded-full" 
                :style="{ backgroundColor: getCategoryColor(transaction.category) }"
              ></div>
              <span class="font-medium text-gray-900">{{ getCategoryName(transaction.category) }}</span>
              <span v-if="transaction.isRecurring" 
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                <i class="fas fa-sync-alt mr-1"></i>
                {{ t(`transactions.recurrence.types.${transaction.recurrence?.type}`) }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ transaction.description }}</p>
            <p v-if="transaction.isRecurring" class="text-xs text-gray-500 mt-1">
              <i class="far fa-calendar-alt mr-1"></i>
              {{ t('transactions.recurrence.startDate') }}: {{ formatDate(transaction.recurrence?.startDate || '') }}
              <template v-if="transaction.recurrence?.endDate">
                <span class="mx-1">•</span>
                {{ t('transactions.recurrence.endDate') }}: {{ formatDate(transaction.recurrence.endDate) }}
              </template>
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <span :class="[
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600',
                'text-sm font-medium'
              ]">
                {{ transaction.type === 'income' ? '+' : '-' }}
                {{ formatAmount(transaction.amount) }}
              </span>
              <p class="text-sm text-gray-500 mt-1">{{ formatDate(transaction.date) }}</p>
            </div>
            
            <button 
              @click="handleDelete(transaction.id)"
              class="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Sil"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style> 