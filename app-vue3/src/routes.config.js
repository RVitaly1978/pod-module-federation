export const routesConfig = [
  {
    path: '/app-vue3',
    component: () => import('./pages/Home.vue'),
    meta: {
      title: 'Home',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page1',
    component: () => import('./pages/Page1.vue'),
    meta: {
      title: 'Page 1',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page2',
    component: () => import('./pages/Page2.vue'),
    meta: {
      title: 'Page 2',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page3',
    component: () => import('./pages/Page3.vue'),
    meta: {
      title: 'Page 3',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
]

export const externalRemoteRoute = {
  path: '/:pathMatch(.*)*',
  beforeEnter: (to, from, next) => {
    if (!to.path.startsWith('/app-vue3')) {
      next(false)
      return
    }
    next()
  },
  component: { render: () => null }
}
