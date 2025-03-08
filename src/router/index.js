import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/client/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/users-management',
      name: 'users',
      component: () => import('../views/Users/Table.vue'),
    },
    {
      path: '/songs-management',
      name: 'songs-management',
      children: [
        {
          path: '/songs-management/list',
          component: () => import('../views/Songs/Table.vue'),
        },
        {
          path: '/songs-management/form/:id?',
          component: () => import('../views/Songs/Form.vue'),
        },
      ],
    },
    {
      path: '/genres-management',
      name: 'genres-management',
      children: [
        {
          path: '/genres-management/list',
          component: () => import('../views/Genres/Table.vue'),
        },
        {
          path: '/genres-management/form/:id?',
          component: () => import('../views/Genres/Form.vue'),
        },
      ]
    },
    {
      path: '/artists-management',
      name: 'artists-management',
      children: [
        {
          path: '/artists-management/list',
          component: () => import('../views/Artists/Table.vue'),
        },
        {
          path: '/artists-management/form/:id?',
          component: () => import('../views/Artists/Form.vue'),
        },
      ]
    },
    {
      path: '/admin-management',
      name: 'admin-management',
      children: [
        {
          path: '/admin-management/list',
          component: () => import('../views/Admin/Table.vue'),
        },
        {
          path: '/admin-management/form/:id?',
          component: () => import('../views/Admin/Form.vue'),
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      children: [
        {
          path: '/dashboard/plays',
          name: 'dashboard-plays',
          component: () => import('../views/DashBoard/Plays.vue'),
        },
        {
          path: '/dashboard/liked',
          name: 'dashboard-liked',
          component: () => import('../views/DashBoard/LikedCount.vue'),
        },
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Client/LoginAndRegister.vue'),
    },
  ],
})

export default router
