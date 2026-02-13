export const routesConfig = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Host Home',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
]
