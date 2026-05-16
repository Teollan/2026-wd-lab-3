import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue'),
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('@/views/FeedView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/my-posts',
      name: 'my-posts',
      component: () => import('@/views/MyPostsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: () => import('@/views/NewPostView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/edit-post',
      name: 'edit-post',
      component: () => import('@/views/EditPostView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()

    if (!auth.isAuthenticated) {
      return { name: 'sign-in' }
    }
  }
})

export default router
