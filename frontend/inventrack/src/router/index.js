import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {UserAuthStore} from "@/stores/userAuthStore.js";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
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
    path: '/dashboard/',
    name: 'SuperUser',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/Dashboard.vue'),
      },
      {
        path: 'products',
        component: () => import('../components/AllProducts.vue'),

      },
      // {
      //   path: 'products/add-product',
      //   component: () => import('../components/addProduct.vue'),
      // }
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

export default router