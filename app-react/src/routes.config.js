export const routesConfig = [
  {
    path: '/app-react',
    lazy: () => import('./pages/Home.jsx'),
    meta: {
      title: 'Home',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-react/page1',
    lazy: () => import('./pages/Page1.jsx'),
    meta: {
      title: 'Page 1',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-react/page2',
    lazy: () => import('./pages/Page2.jsx'),
    meta: {
      title: 'Page 2',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-react/page3',
    lazy: () => import('./pages/Page3.jsx'),
    meta: {
      title: 'Page 3',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
]
