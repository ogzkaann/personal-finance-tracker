<script setup lang="ts">
import { ref } from 'vue';
import type { Category } from '../types';

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits(['update', 'delete']);

const isEditing = ref(false);
const editedCategory = ref<Category>({...props.category});

const handleUpdate = () => {
  emit('update', editedCategory.value);
  isEditing.value = false;
};

const handleDelete = () => {
  emit('delete', props.category.id);
};
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm transition-shadow hover:shadow-md">
    <div v-if="isEditing">
      <input
        v-model="editedCategory.name"
        type="text"
        class="input"
        @keyup.enter="handleUpdate"
      />
      <button @click="handleUpdate" class="ml-2 btn btn-primary">Kaydet</button>
    </div>
    <div v-else>
      <span>{{ category.name }}</span>
      <div class="flex space-x-2">
        <button @click="isEditing = true" class="btn btn-secondary">Düzenle</button>
        <button @click="handleDelete" class="btn btn-danger">Sil</button>
      </div>
    </div>
  </div>
</template> 