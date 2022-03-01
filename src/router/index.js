import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Space Travel / Home',
    },
  },
  {
    path: '/destination',
    name: 'destination',
    component: () => import('@/views/Destination.vue'),
    meta: {
      title: 'Space Travel / Destination',
    },
  },
  {
    path: '/crew',
    name: 'crew',
    component: () => import('@/views/Crew.vue'),
    meta: {
      title: 'Space Travel / Crew',
    },
  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('@/views/Technology.vue'),
    meta: {
      title: 'Space Travel / Technology',
    },
  },
  {
    path: '/:pathMath(.*)*',
    name: 'error',
    component: () => import('@/views/Error.vue'),
    meta: {
      title: 'Space Travel / Error 404',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
