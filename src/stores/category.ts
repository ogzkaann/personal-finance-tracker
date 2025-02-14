import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useAuthStore } from './auth';
import type { Category, TransactionType } from '../types';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const authStore = useAuthStore();

  // Default kategorileri tanımla
  const defaultCategories: Category[] = [
    {
      id: 'salary',
      name: 'Maaş',
      icon: 'wallet',
      type: 'income',
      color: '#10B981'
    },
    {
      id: 'investment',
      name: 'Yatırım',
      icon: 'chart-bar',
      type: 'income',
      color: '#6366F1'
    },
    {
      id: 'food',
      name: 'Yiyecek',
      icon: 'utensils',
      type: 'expense',
      color: '#F59E0B'
    },
    {
      id: 'transport',
      name: 'Ulaşım',
      icon: 'car',
      type: 'expense',
      color: '#EF4444'
    },
    {
      id: 'entertainment',
      name: 'Eğlence',
      icon: 'film',
      type: 'expense',
      color: '#8B5CF6'
    },
    {
      id: 'bills',
      name: 'Faturalar',
      icon: 'home',
      type: 'expense',
      color: '#EC4899'
    }
  ];

  // Getters
  const getCategoriesByType = (type: TransactionType) =>
    computed(() => categories.value.filter(c => c.type === type));

  const getCategoryById = (id: string) =>
    computed(() => categories.value.find(c => c.id === id));

  // Actions
  function addCategory(category: Omit<Category, 'id'>) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      ...category
    };
    
    categories.value.push(newCategory);
    saveToLocalStorage();
  }

  function updateCategory(id: string, updates: Partial<Category>) {
    const index = categories.value.findIndex(c => c.id === id);
    if (index !== -1) {
      categories.value[index] = {
        ...categories.value[index],
        ...updates
      };
      saveToLocalStorage();
    }
  }

  function deleteCategory(id: string) {
    categories.value = categories.value.filter(c => c.id !== id);
    saveToLocalStorage();
  }

  // LocalStorage
  function saveToLocalStorage() {
    if (!authStore.user?.id) return;
    const key = `categories_${authStore.user.id}`;
    localStorage.setItem(key, JSON.stringify(categories.value));
  }

  function loadFromLocalStorage() {
    if (!authStore.user?.id) return;
    const key = `categories_${authStore.user.id}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      categories.value = JSON.parse(stored);
    } else {
      // İlk kez çalıştırılıyorsa varsayılan kategorileri yükle
      categories.value = defaultCategories;
      saveToLocalStorage();
    }
  }

  // Kullanıcı değişikliğini izle
  watch(() => authStore.user?.id, (newUserId) => {
    if (newUserId) {
      loadFromLocalStorage();
    } else {
      categories.value = [];
    }
  });

  // Initialize
  if (authStore.user?.id) {
    loadFromLocalStorage();
  }

  return {
    categories,
    getCategoriesByType,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
  };
}); 