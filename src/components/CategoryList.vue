<script setup lang="ts">
import type { Category } from '../types';

const { categories } = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'edit', category: Category): void;
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div v-if="categories.length === 0" class="py-8 text-center">
      <p class="text-gray-500">Henüz hiç kategori bulunmuyor.</p>
    </div>
    
    <div v-else class="space-y-2">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="flex justify-between items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50"
      >
        <div class="flex items-center space-x-3">
          <div 
            class="flex justify-center items-center w-8 h-8 text-white rounded-full"
            :style="{ backgroundColor: category.color }"
          >
            <span class="text-lg">{{ category.icon }}</span>
          </div>
          <span class="font-medium text-gray-900">{{ category.name }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button
            class="p-2 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100"
            @click="emit('edit', category)"
          >
            Düzenle
          </button>
          <button
            class="p-2 text-gray-400 rounded-full hover:text-red-500 hover:bg-red-50"
            @click="emit('delete', category.id)"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 