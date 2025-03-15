import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {UserAuthStore} from "@/stores/userAuthStore.js";


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'products',
        component: () => import('../components/AllProducts.vue'),
        meta: { requiresAuth: true }

      },
      {
        path: 'add-product',
        component: () => import('../components/AddProducts.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'update-product/:id',
        component: () => import('../components/AddProducts.vue'),
        meta: { requiresAuth: true }
      }
    ],

  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import('../views/PageNotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = UserAuthStore();
  const isAuthenticated = !!store.currentUser;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router