<template>
  <div class="flex justify-center items-center px-4 py-12 min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 sm:px-6 lg:px-8">
    <!-- Dil Değiştirici -->
    <div class="absolute top-4 right-4">
      <LanguageSwitcher />
    </div>

    <div class="w-full max-w-md">
      <!-- Logo ve Başlık -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="flex justify-center items-center w-20 h-20 rounded-full bg-primary-600">
            <i class="text-3xl text-white fas fa-wallet"></i>
          </div>
        </div>
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">
          {{ t('auth.login.title') }}
        </h2>
        <p class="mt-3 text-gray-500">
          {{ t('auth.login.subtitle') }}
        </p>
      </div>

      <!-- Giriş Formu -->
      <div class="mt-8">
        <div class="px-4 py-8 bg-white rounded-xl shadow-xl sm:px-10">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- E-posta Alanı -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                {{ t('auth.fields.email') }}
              </label>
              <div class="relative mt-1">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <i class="text-gray-400 fas fa-envelope"></i>
                </div>
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  required
                  :placeholder="t('auth.placeholders.email')"
                  class="block px-3 py-2 pl-10 w-full placeholder-gray-400 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- Şifre Alanı -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                {{ t('auth.fields.password') }}
              </label>
              <div class="relative mt-1">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <i class="text-gray-400 fas fa-lock"></i>
                </div>
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  required
                  :placeholder="t('auth.placeholders.password')"
                  class="block px-3 py-2 pl-10 w-full placeholder-gray-400 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- Hata Mesajı -->
            <div v-if="authStore.error" 
                 class="p-4 bg-red-50 rounded-md border-l-4 border-red-400">
              <div class="flex">
                <div class="flex-shrink-0">
                  <i class="text-red-400 fas fa-exclamation-circle"></i>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-700">
                    {{ authStore.error }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Giriş Butonu -->
            <div>
              <button
                type="submit"
                :disabled="authStore.loading"
                class="flex justify-center px-4 py-2.5 w-full text-sm font-medium text-white rounded-lg border border-transparent shadow-sm transition-all duration-200 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="authStore.loading" class="flex items-center">
                  <svg class="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ t('auth.login.loading') }}
                </span>
                <span v-else>{{ t('auth.login.submit') }}</span>
              </button>
            </div>
          </form>

          <!-- Kayıt Ol Linki -->
          <div class="mt-6">
            <div class="relative">
              <div class="flex absolute inset-0 items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="flex relative justify-center text-sm">
                <span class="px-2 text-gray-500 bg-white">
                  {{ t('auth.login.noAccount') }}
                </span>
              </div>
            </div>
            <div class="mt-6 text-center">
              <router-link 
                to="/register" 
                class="font-medium transition-colors duration-200 text-primary-600 hover:text-primary-500"
              >
                {{ t('auth.login.register') }} <i class="ml-2 fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../stores/auth';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const email = ref('');
const password = ref('');

async function handleLogin() {
  const success = await authStore.login({
    email: email.value,
    password: password.value
  });

  if (success) {
    router.push('/');
  }
}
</script>

<style scoped>
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 