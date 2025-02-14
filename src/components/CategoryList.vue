<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '../types';

const { t } = useI18n();
const { categories } = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', category: Category): void;
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">{{ t('categories.title') }}</h2>
      <button
        @click="emit('add')"
        class="btn btn-primary"
      >
        {{ t('categories.addNew') }}
      </button>
    </div>

    <div v-if="categories.length === 0" class="p-4 text-center text-gray-500">
      {{ t('categories.messages.noCategories') }}
    </div>

    <div v-else class="space-y-2">
      <div v-for="category in categories" :key="category.id" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center space-x-3">
          <i :class="category.icon" class="text-lg" :style="{ color: category.color }"></i>
          <span class="font-medium">{{ category.name }}</span>
        </div>
        <div class="flex space-x-2">
          <button
            @click="emit('edit', category)"
            class="btn btn-secondary btn-sm"
          >
            {{ t('common.actions.edit') }}
          </button>
          <button
            @click="emit('delete', category.id)"
            class="btn btn-danger btn-sm"
          >
            {{ t('common.actions.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 