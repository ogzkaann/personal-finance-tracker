<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Transaction, Category } from '../types';

const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'submit', transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): void;
  (e: 'cancel'): void;
}>();

const type = ref<'income' | 'expense'>('expense');
const amount = ref(0);
const category = ref('');
const description = ref('');
const date = ref(new Date().toISOString().split('T')[0]);

const filteredCategories = computed(() => 
  props.categories.filter(c => c.type === type.value)
);

const handleSubmit = () => {
  if (!category.value || amount.value <= 0 || !description.value || !date.value) {
    return;
  }

  emit('submit', {
    type: type.value,
    amount: amount.value,
    category: category.value,
    description: description.value,
    date: date.value
  });

  // Form alanlarını temizle
  type.value = 'expense';
  amount.value = 0;
  category.value = '';
  description.value = '';
  date.value = new Date().toISOString().split('T')[0];
};
</script>

<template>
  <div class="flex fixed inset-0 justify-center items-center p-4 bg-gray-500 bg-opacity-75">
    <div class="p-6 w-full max-w-md bg-white rounded-lg shadow-xl">
      <h2 class="mb-4 text-lg font-semibold text-gray-900">
        {{ type === 'income' ? 'Yeni Gelir Ekle' : 'Yeni Gider Ekle' }}
      </h2>
      
      <div class="flex mb-6 space-x-4">
        <button type="button"
          class="flex relative flex-1 justify-center items-center px-4 py-2 text-sm font-medium rounded-lg shadow transition-transform duration-300 focus:outline-none active:scale-95"
          :class="type === 'income'
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-white text-green-500 border border-green-200 hover:bg-green-50'"
          @click="type = 'income'">
          <i class="mr-2 fas fa-plus-circle"></i>
          Gelir
        </button>
        <button type="button"
          class="flex relative flex-1 justify-center items-center px-4 py-2 text-sm font-medium rounded-lg shadow transition-transform duration-300 focus:outline-none active:scale-95"
          :class="type === 'expense'
            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            : 'bg-white text-red-500 border border-red-200 hover:bg-red-50'"
          @click="type = 'expense'">
          <i class="mr-2 fas fa-minus-circle"></i>
          Gider
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="amount" class="block mb-1 text-sm font-medium text-gray-700">Miktar</label>
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
            >
            <span class="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2">₺</span>
          </div>
        </div>
        
        <div>
          <label for="category" class="block mb-1 text-sm font-medium text-gray-700">Kategori</label>
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
            <option value="">Kategori Seçin</option>
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
          <label for="description" class="block mb-1 text-sm font-medium text-gray-700">Açıklama</label>
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
          >
        </div>
        
        <div>
          <label for="date" class="block mb-1 text-sm font-medium text-gray-700">Tarih</label>
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
          >
        </div>
        
        <div class="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('cancel')"
          >
            İptal
          </button>
          <button
            type="submit"
            class="btn"
            :class="[
              type === 'income' 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            ]"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}
</style> 