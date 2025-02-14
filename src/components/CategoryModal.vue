<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useI18n } from 'vue-i18n'
import type { Category, TransactionType } from '@/types'

const emit = defineEmits(['close'])
const categoryStore = useCategoryStore()
const { t } = useI18n()

const newCategory = ref<Partial<Category>>({
  name: '',
  color: '#94A3B8',
  type: 'expense',
  icon: 'shopping-cart'
})

const editingCategory = ref<Category | null>(null)
const error = ref('')
const selectedType = ref<TransactionType>('expense')
const showNewCategoryForm = ref(false)

// Kategorileri türüne göre filtrele
const incomeCategories = computed(() => 
  categoryStore.getCategoriesByType('income').value
)

const expenseCategories = computed(() => 
  categoryStore.getCategoriesByType('expense').value
)

const icons = [
  { name: 'wallet', label: 'Cüzdan' },
  { name: 'money-bill', label: 'Para' },
  { name: 'shopping-cart', label: 'Alışveriş' },
  { name: 'home', label: 'Ev' },
  { name: 'car', label: 'Araba' },
  { name: 'utensils', label: 'Yemek' },
  { name: 'plane', label: 'Seyahat' },
  { name: 'gift', label: 'Hediye' },
  { name: 'heart', label: 'Sağlık' },
  { name: 'graduation-cap', label: 'Eğitim' },
  { name: 'briefcase', label: 'İş' },
  { name: 'piggy-bank', label: 'Tasarruf' }
]

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
  '#A855F7'  // mor
]

const addCategory = () => {
  if (!newCategory.value.name?.trim()) {
    error.value = t('categoryModal.errorEmptyName')
    return
  }

  if (categoryStore.categories.some(c => c.name.toLowerCase() === newCategory.value.name?.trim().toLowerCase())) {
    error.value = t('categoryModal.errorDuplicate')
    return
  }

  const category: Category = {
    id: crypto.randomUUID(),
    name: newCategory.value.name.trim(),
    color: newCategory.value.color || colors[0],
    icon: newCategory.value.icon || 'shopping-cart',
    type: selectedType.value
  }

  categoryStore.addCategory(category)
  resetNewCategory()
  error.value = ''
  showNewCategoryForm.value = false
}

const resetNewCategory = () => {
  newCategory.value = {
    name: '',
    color: colors[0],
    type: selectedType.value,
    icon: 'shopping-cart'
  }
}

const deleteCategory = (id: string) => {
  if (confirm(t('categoryModal.confirmDelete'))) {
    categoryStore.deleteCategory(id)
  }
}

const startEditing = (category: Category) => {
  editingCategory.value = { ...category }
}

const saveEdit = () => {
  if (!editingCategory.value) return
  
  if (!editingCategory.value.name.trim()) {
    error.value = t('categoryModal.errorEmptyName')
    return
  }

  if (categoryStore.categories.some(c => 
    c.id !== editingCategory.value?.id && 
    c.name.toLowerCase() === editingCategory.value?.name.trim().toLowerCase()
  )) {
    error.value = t('categoryModal.errorDuplicate')
    return
  }

  categoryStore.updateCategory(editingCategory.value.id, editingCategory.value)
  editingCategory.value = null
  error.value = ''
}

const cancelEdit = () => {
  editingCategory.value = null
  error.value = ''
}

const openNewCategoryForm = (type: TransactionType) => {
  selectedType.value = type
  showNewCategoryForm.value = true
  resetNewCategory()
}
</script>

<template>
  <div class="overflow-y-auto fixed inset-0 z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex justify-center items-center p-4 min-h-screen text-center sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>

      <div class="overflow-hidden relative text-left bg-white rounded-xl shadow-2xl transition-all transform sm:my-8 sm:w-full sm:max-w-4xl">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-white border-b">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('categoryModal.title') }}</h2>
            <button 
              @click="$emit('close')" 
              class="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            >
              <i class="text-xl fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-5">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <!-- Gelir Kategorileri -->
            <div class="space-y-4">
              <div class="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="flex justify-center items-center w-10 h-10 bg-emerald-100 rounded-full">
                    <i class="text-emerald-600 fas fa-arrow-up"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-emerald-700">
                    {{ t('categories.incomeCategories') }}
                  </h3>
                </div>
                <button 
                  @click="openNewCategoryForm('income')" 
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <i class="mr-2 fas fa-plus"></i>
                  {{ t('categories.addNew') }}
                </button>
              </div>
              
              <div class="space-y-3">
                <div 
                  v-for="category in incomeCategories" 
                  :key="category.id"
                  class="flex relative justify-between items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all group hover:border-emerald-200 hover:shadow-md"
                >
                  <div class="flex items-center space-x-4">
                    <div 
                      class="flex justify-center items-center w-12 h-12 text-lg text-white rounded-full"
                      :style="{ backgroundColor: category.color }"
                    >
                      <i :class="'fas fa-' + category.icon"></i>
                    </div>
                    <div>
                      <h4 class="text-base font-medium text-gray-900">{{ category.name }}</h4>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button 
                      @click="startEditing(category)"
                      class="p-2 text-gray-400 rounded-lg hover:bg-blue-50 hover:text-blue-500"
                      title="Düzenle"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      @click="deleteCategory(category.id)"
                      class="p-2 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500"
                      title="Sil"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div 
                  v-if="incomeCategories.length === 0" 
                  class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 rounded-xl border-2 border-gray-200 border-dashed"
                >
                  <div class="flex justify-center items-center mb-3 w-12 h-12 bg-gray-100 rounded-full">
                    <i class="text-xl text-gray-400 fas fa-folder-open"></i>
                  </div>
                  <p class="text-sm text-gray-500">Henüz gelir kategorisi eklenmemiş</p>
                  <button 
                    @click="openNewCategoryForm('income')"
                    class="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    İlk kategoriyi ekle
                  </button>
                </div>
              </div>
            </div>

            <!-- Gider Kategorileri -->
            <div class="space-y-4">
              <div class="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="flex justify-center items-center w-10 h-10 bg-red-100 rounded-full">
                    <i class="text-red-600 fas fa-arrow-down"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-red-700">
                    {{ t('categories.expenseCategories') }}
                  </h3>
                </div>
                <button 
                  @click="openNewCategoryForm('expense')" 
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <i class="mr-2 fas fa-plus"></i>
                  {{ t('categories.addNew') }}
                </button>
              </div>
              
              <div class="space-y-3">
                <div 
                  v-for="category in expenseCategories" 
                  :key="category.id"
                  class="flex relative justify-between items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all group hover:border-red-200 hover:shadow-md"
                >
                  <div class="flex items-center space-x-4">
                    <div 
                      class="flex justify-center items-center w-12 h-12 text-lg text-white rounded-full"
                      :style="{ backgroundColor: category.color }"
                    >
                      <i :class="'fas fa-' + category.icon"></i>
                    </div>
                    <div>
                      <h4 class="text-base font-medium text-gray-900">{{ category.name }}</h4>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button 
                      @click="startEditing(category)"
                      class="p-2 text-gray-400 rounded-lg hover:bg-blue-50 hover:text-blue-500"
                      title="Düzenle"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      @click="deleteCategory(category.id)"
                      class="p-2 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500"
                      title="Sil"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div 
                  v-if="expenseCategories.length === 0" 
                  class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 rounded-xl border-2 border-gray-200 border-dashed"
                >
                  <div class="flex justify-center items-center mb-3 w-12 h-12 bg-gray-100 rounded-full">
                    <i class="text-xl text-gray-400 fas fa-folder-open"></i>
                  </div>
                  <p class="text-sm text-gray-500">Henüz gider kategorisi eklenmemiş</p>
                  <button 
                    @click="openNewCategoryForm('expense')"
                    class="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    İlk kategoriyi ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Yeni Kategori Formu -->
  <div 
    v-if="showNewCategoryForm" 
    class="fixed inset-0 z-[60] overflow-y-auto"
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true"
  >
    <div class="flex justify-center items-center p-4 min-h-screen text-center sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showNewCategoryForm = false"></div>

      <div class="overflow-hidden relative text-left bg-white rounded-xl shadow-2xl transition-all transform sm:my-8 sm:w-full sm:max-w-lg">
        <div class="px-6 py-4 bg-white border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ selectedType === 'income' 
                ? t('categoryModal.newIncomeCategory') 
                : t('categoryModal.newExpenseCategory') 
              }}
            </h3>
            <button
              @click="showNewCategoryForm = false"
              class="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div class="px-6 py-5 bg-white">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ t('categoryModal.fields.name') }}</label>
              <input
                v-model="newCategory.name"
                type="text"
                class="block mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                :placeholder="t('categoryModal.placeholders.name')"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">{{ t('categoryModal.fields.icon') }}</label>
              <div class="grid grid-cols-6 gap-3">
                <button
                  v-for="icon in icons"
                  :key="icon.name"
                  type="button"
                  class="flex justify-center items-center rounded-xl border-2 transition-all aspect-square hover:bg-gray-50"
                  :class="[
                    newCategory.icon === icon.name 
                      ? 'border-primary-500 bg-primary-50 text-primary-600' 
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  ]"
                  @click="newCategory.icon = icon.name"
                >
                  <i :class="['fas', 'fa-' + icon.name, 'text-xl']"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">{{ t('categoryModal.fields.color') }}</label>
              <div class="grid grid-cols-10 gap-3">
                <button
                  v-for="color in colors"
                  :key="color"
                  type="button"
                  class="rounded-full border-2 transition-all aspect-square hover:opacity-90"
                  :class="newCategory.color === color ? 'border-gray-900 scale-110' : 'border-transparent'"
                  :style="{ backgroundColor: color }"
                  @click="newCategory.color = color"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end px-6 py-4 space-x-3 bg-gray-50">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="showNewCategoryForm = false"
          >
          {{ t('categoryModal.buttons.cancel') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="addCategory"
          >
            {{ t('categoryModal.addCategory') }}
          </button>
        </div>

        <div v-if="error" class="px-6 py-3 bg-red-50 border-t border-red-100">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Kategori Düzenleme Formu -->
  <div 
    v-if="editingCategory" 
    class="fixed inset-0 z-[60] overflow-y-auto"
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true"
  >
    <div class="flex justify-center items-center p-4 min-h-screen text-center sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="cancelEdit"></div>

      <div class="overflow-hidden relative text-left bg-white rounded-xl shadow-2xl transition-all transform sm:my-8 sm:w-full sm:max-w-lg">
        <div class="px-6 py-4 bg-white border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">{{ t('categoryModal.editCategory') }}</h3>
            <button
              @click="cancelEdit"
              class="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div class="px-6 py-5 bg-white">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ t('categoryModal.fields.name') }}</label>
              <input
                v-model="editingCategory.name"
                type="text"
                class="block mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                :placeholder="t('categoryModal.placeholders.name')"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">{{ t('categoryModal.fields.icon') }}</label>
              <div class="grid grid-cols-6 gap-3">
                <button
                  v-for="icon in icons"
                  :key="icon.name"
                  type="button"
                  class="flex justify-center items-center rounded-xl border-2 transition-all aspect-square hover:bg-gray-50"
                  :class="[
                    editingCategory.icon === icon.name 
                      ? 'border-primary-500 bg-primary-50 text-primary-600' 
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  ]"
                  @click="editingCategory.icon = icon.name"
                >
                  <i :class="['fas', 'fa-' + icon.name, 'text-xl']"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">{{ t('categoryModal.fields.color') }}</label>
              <div class="grid grid-cols-10 gap-3">
                <button
                  v-for="color in colors"
                  :key="color"
                  type="button"
                  class="rounded-full border-2 transition-all aspect-square hover:opacity-90"
                  :class="editingCategory.color === color ? 'border-gray-900 scale-110' : 'border-transparent'"
                  :style="{ backgroundColor: color }"
                  @click="editingCategory.color = color"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end px-6 py-4 space-x-3 bg-gray-50">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="cancelEdit"
          >
          {{ t('categoryModal.buttons.cancel') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="saveEdit"
          >
          {{ t('categoryModal.buttons.save') }}
          </button>
        </div>

        <div v-if="error" class="px-6 py-3 bg-red-50 border-t border-red-100">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.btn-success {
  display: inline-flex;
  align-items: center;
  border-radius: 0.5rem;
  background-color: rgb(16 185 129);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.btn-success:hover {
  background-color: rgb(5 150 105);
}

.btn-success:focus {
  outline: none;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) rgb(16 185 129);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-offset-width: 2px;
}
</style> 