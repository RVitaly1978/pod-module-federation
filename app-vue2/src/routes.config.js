export const routesConfig = [
  {
    path: '/app-vue2',
    component: () => import('./pages/Home.vue'),
    meta: {
      title: 'Home',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue2/page1',
    component: () => import('./pages/Page1.vue'),
    meta: {
      title: 'Page 1',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue2/page2',
    component: () => import('./pages/Page2.vue'),
    meta: {
      title: 'Page 2',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue2/page3',
    component: () => import('./pages/Page3.vue'),
    meta: {
      title: 'Page 3',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
]
