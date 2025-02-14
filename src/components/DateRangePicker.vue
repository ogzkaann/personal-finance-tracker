<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { DateRange } from '@/types';

const { t } = useI18n();

const props = defineProps<{
  modelValue: DateRange;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateRange): void;
}>();

const localRange = ref({ ...props.modelValue });

const updateDates = () => {
  emit('update:modelValue', localRange.value);
};

watch(() => props.modelValue, (newValue) => {
  localRange.value = { ...newValue };
}, { deep: true });
</script>

<template>
  <div class="flex gap-4 items-center">
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 mb-1">{{ t('dateRangePicker.start') }}</label>
      <input
        type="date"
        v-model="localRange.startDate"
        class="border rounded-lg px-3 py-2"
        @change="updateDates"
      >
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 mb-1">{{ t('dateRangePicker.end') }}</label>
      <input
        type="date"
        v-model="localRange.endDate"
        class="border rounded-lg px-3 py-2"
        @change="updateDates"
      >
    </div>
  </div>
</template> 