<script setup lang="ts">
import { ref } from 'vue';
import { useCategoryStore } from '../stores/category';
import CategoryForm from '../components/CategoryForm.vue';
import CategoryList from '../components/CategoryList.vue';
import type { Category } from '../types';
import { useI18n } from 'vue-i18n';

const categoryStore = useCategoryStore();
const showCategoryForm = ref(false);
const editingCategory = ref<Category | null>(null);
const { t } = useI18n();

const handleAddCategory = () => {
  editingCategory.value = null;
  showCategoryForm.value = true;
};

const handleEditCategory = (category: Category) => {
  editingCategory.value = category;
  showCategoryForm.value = true;
};

const handleCategorySubmit = (category: Omit<Category, 'id'>) => {
  if (editingCategory.value) {
    categoryStore.updateCategory(editingCategory.value.id, category);
  } else {
    categoryStore.addCategory(category);
  }
  showCategoryForm.value = false;
  editingCategory.value = null;
};

const handleDeleteCategory = (id: string) => {
  if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
    categoryStore.deleteCategory(id);
  }
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ t('categories.title') }}</h1>
      <button 
        class="btn btn-primary"
        @click="handleAddCategory"
      >
        {{ t('categories.new') }}
      </button>
    </div>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="p-6 card">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ t('categories.incomeCategories') }}</h2>
        <CategoryList
          :categories="categoryStore.getCategoriesByType('income').value"
          @edit="handleEditCategory"
          @delete="handleDeleteCategory"
        />
      </div>
      
      <div class="p-6 card">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ t('categories.expenseCategories') }}</h2>
        <CategoryList
          :categories="categoryStore.getCategoriesByType('expense').value"
          @edit="handleEditCategory"
          @delete="handleDeleteCategory"
        />
      </div>
    </div>
    
    <CategoryForm
      v-if="showCategoryForm"
      :editing-category="editingCategory"
      @submit="handleCategorySubmit"
      @cancel="showCategoryForm = false"
    />
  </div>
</template> 