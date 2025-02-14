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
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <!-- Kategori içeriği -->
  </div>
</template> 