<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { onClickOutside } from '@vueuse/core';
import { useCurrencyStore } from '../stores/currency';

const { locale } = useI18n();
const currencyStore = useCurrencyStore();
const isOpen = ref(false);
const dropdownRef = ref(null);

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

const currencies = [
  { code: 'TRY', symbol: '₺', name: 'Türk Lirası', flag: '🇹🇷' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' }
];

const switchLanguage = (lang: string) => {
  locale.value = lang;
  document.documentElement.lang = lang;
  isOpen.value = false;
};

const switchCurrency = (currency: typeof currencies[0]) => {
  currencyStore.setCurrency(currency);
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      @click="toggleDropdown"
    >
      <span class="text-lg">{{ languages.find(l => l.code === locale)?.flag }}</span>
      <span>{{ languages.find(l => l.code === locale)?.name }}</span>
      <span class="text-gray-400">|</span>
      <span class="text-lg">{{ currencyStore.selectedCurrency.flag }}</span>
      <span>{{ currencyStore.selectedCurrency.symbol }}</span>
      <svg 
        class="h-5 w-5 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
      
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="p-4">
          <h3 class="text-sm font-medium text-gray-900 mb-3">Dil Seçimi</h3>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button
              v-for="lang in languages"
              :key="lang.code"
              type="button"
              class="flex items-center gap-x-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
              :class="{ 'bg-primary-50 text-primary-600': locale === lang.code }"
              @click="switchLanguage(lang.code)"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span>{{ lang.name }}</span>
            </button>
          </div>
          
          <div class="border-t border-gray-200 my-3"></div>
          
          <h3 class="text-sm font-medium text-gray-900 mb-3">Para Birimi</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="currency in currencies"
              :key="currency.code"
              type="button"
              class="flex items-center gap-x-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
              :class="{ 'bg-primary-50 text-primary-600': currencyStore.selectedCurrency.code === currency.code }"
              @click="switchCurrency(currency)"
            >
              <span class="text-lg">{{ currency.flag }}</span>
              <div class="flex flex-col items-start">
                <span class="font-medium">{{ currency.symbol }} {{ currency.code }}</span>
                <span class="text-xs text-gray-500">{{ currency.name }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template> 