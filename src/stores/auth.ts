import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, AuthState, LoginCredentials, RegisterData } from '../types';

// Demo kullanıcı tipi
interface DemoUser extends User {
  password: string;
}

// Demo kullanıcılar için localStorage key
const DEMO_USERS_KEY = 'demo_users';

// Demo kullanıcıları localStorage'dan yükle veya varsayılan kullanıcıyı kullan
const loadDemoUsers = (): DemoUser[] => {
  const stored = localStorage.getItem(DEMO_USERS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultUser: DemoUser = {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo Kullanıcı',
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify([defaultUser]));
  return [defaultUser];
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const token = ref<string | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const demoUsers = ref<DemoUser[]>(loadDemoUsers());

  // Getters
  const currentUser = computed(() => user.value);
  const authError = computed(() => error.value);
  const isLoading = computed(() => loading.value);

  // Actions
  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;

    try {
      const demoUser = demoUsers.value.find(u => u.email === credentials.email);

      if (!demoUser || demoUser.password !== credentials.password) {
        throw new Error('Geçersiz e-posta veya şifre');
      }

      const { password, ...userData } = demoUser;
      user.value = userData;
      isAuthenticated.value = true;
      token.value = 'demo-token-' + Math.random().toString(36).substr(2);

      saveAuthState();
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Giriş yapılırken bir hata oluştu';
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function register(data: RegisterData) {
    loading.value = true;
    error.value = null;

    try {
      if (demoUsers.value.some(u => u.email === data.email)) {
        throw new Error('Bu e-posta adresi zaten kullanılıyor');
      }

      const newUser: DemoUser = {
        id: crypto.randomUUID(),
        email: data.email,
        password: data.password,
        name: data.name,
        createdAt: new Date().toISOString()
      };

      demoUsers.value.push(newUser);
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(demoUsers.value));

      const { password, ...userData } = newUser;
      user.value = userData;
      isAuthenticated.value = true;
      token.value = 'demo-token-' + Math.random().toString(36).substr(2);

      saveAuthState();
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Kayıt olurken bir hata oluştu';
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
    token.value = null;
    error.value = null;
    localStorage.removeItem('auth');
  }

  function saveAuthState() {
    const authState: AuthState = {
      user: user.value,
      isAuthenticated: isAuthenticated.value,
      token: token.value
    };
    localStorage.setItem('auth', JSON.stringify(authState));
  }

  function loadAuthState() {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const authState: AuthState = JSON.parse(stored);
      user.value = authState.user;
      isAuthenticated.value = authState.isAuthenticated;
      token.value = authState.token;
    }
  }

  // Başlangıçta localStorage'dan yükle
  loadAuthState();

  return {
    user: currentUser,
    isAuthenticated,
    token,
    error: authError,
    loading: isLoading,
    login,
    register,
    logout
  };
}); 