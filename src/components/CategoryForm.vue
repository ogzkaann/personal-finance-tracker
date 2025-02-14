<script setup lang="ts">
import { ref } from 'vue';
import type { Category } from '../types';

const props = defineProps<{
  editingCategory: Category | null;
}>();

const emit = defineEmits<{
  (e: 'submit', category: Omit<Category, 'id'>): void;
  (e: 'cancel'): void;
}>();

const type = ref<'income' | 'expense'>(props.editingCategory?.type || 'expense');
const name = ref(props.editingCategory?.name || '');
const icon = ref(props.editingCategory?.icon || '');
const color = ref(props.editingCategory?.color || '#94A3B8');

const icons = [
  'currency-dollar',
  'chart-bar',
  'shopping-cart',
  'truck',
  'film',
  'lightning-bolt',
  'home',
  'academic-cap',
  'gift',
  'heart',
  'office-building',
  'shopping-bag'
];

const colors = [
  '#10B981', // yeşil
  '#6366F1', // indigo
  '#F59E0B', // turuncu
  '#EF4444', // kırmızı
  '#8B5CF6', // mor
  '#EC4899', // pembe
  '#3B82F6', // mavi
  '#14B8A6', // turkuaz
  '#F97316', // turuncu
  '#A855F7', // mor
  '#06B6D4', // camgöbeği
  '#84CC16'  // lime
];

const handleSubmit = () => {
  if (!name.value || !icon.value || !color.value) {
    return;
  }

  emit('submit', {
    type: type.value,
    name: name.value,
    icon: icon.value,
    color: color.value
  });

  // Form alanlarını temizle
  type.value = 'expense';
  name.value = '';
  icon.value = '';
  color.value = '#94A3B8';
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Tipi</label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="btn"
              :class="type === 'income' ? 'btn-primary' : 'btn-secondary'"
              @click="type = 'income'"
            >
              Gelir
            </button>
            <button
              type="button"
              class="btn"
              :class="type === 'expense' ? 'btn-primary' : 'btn-secondary'"
              @click="type = 'expense'"
            >
              Gider
            </button>
          </div>
        </div>
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Kategori Adı</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="input"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">İkon</label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="iconName in icons"
              :key="iconName"
              type="button"
              class="p-2 rounded-lg border-2 flex items-center justify-center hover:bg-gray-50"
              :class="icon === iconName ? 'border-primary-500' : 'border-transparent'"
              @click="icon = iconName"
            >
              <span class="text-lg">{{ iconName }}</span>
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Renk</label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="colorHex in colors"
              :key="colorHex"
              type="button"
              class="w-8 h-8 rounded-full border-2"
              :class="color === colorHex ? 'border-gray-900' : 'border-transparent'"
              :style="{ backgroundColor: colorHex }"
              @click="color = colorHex"
            ></button>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('cancel')"
          >
            İptal
          </button>
          <button
            type="submit"
            class="btn btn-primary"
          >
            {{ editingCategory ? 'Güncelle' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

 