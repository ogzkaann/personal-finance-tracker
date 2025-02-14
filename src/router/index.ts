import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import TransactionsView from '@/views/TransactionsView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';
import { i18n } from '@/i18n'; // i18n instance'ınızın yolunu kontrol edin

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/',
      redirect: '/transactions'
    }
  ]
});

// Auth guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isGuestRoute = to.matched.some(record => record.meta.guest);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (isGuestRoute && authStore.isAuthenticated) {
    next({ name: 'transactions' });
  } else {
    next();
  }
});

// Sayfa başlığını güncelle
router.afterEach((to) => {
  document.title = `${to.name?.toString() || 'Home'} | Personal Finance Tracker`;
});

export default router; 