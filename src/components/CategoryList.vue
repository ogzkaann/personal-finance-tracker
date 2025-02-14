<script setup lang="ts">
import type { Category } from '../types';

const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'edit', category: Category): void;
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div v-if="categories.length === 0" class="text-center py-8">
      <p class="text-gray-500">Henüz hiç kategori bulunmuyor.</p>
    </div>
    
    <div v-else class="space-y-2">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <div class="flex items-center space-x-3">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-white"
            :style="{ backgroundColor: category.color }"
          >
            <span class="text-lg">{{ category.icon }}</span>
          </div>
          <span class="font-medium text-gray-900">{{ category.name }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button
            class="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            @click="emit('edit', category)"
          >
            Düzenle
          </button>
          <button
            class="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
            @click="emit('delete', category.id)"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 