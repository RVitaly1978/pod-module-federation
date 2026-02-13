import { createRoot } from 'react-dom/client'
import { createMemoryRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { routesConfig } from './routes.config'

let router = null
let root = null

import 'virtual:uno.css'
import './style.css'

export const getRoutes = () => routesConfig.map(({ lazy, ...rest }) => rest)

export const mount = async ({ 
  domElement, 
  initialPath, 
  onNavigate,
  isStandalone = false,
}) => {
  const entryRoute = {
    path: '/',
    element: <App />,
    hydrateFallbackElement: <div />,
    children: routesConfig,
  }

  router = isStandalone
    ? createBrowserRouter([entryRoute])
    : createMemoryRouter([entryRoute], { initialEntries: [initialPath || '/'] })

  router.subscribe((state) => {
    if (onNavigate) {
      onNavigate({
        pathname: state.location.pathname,
        // search: state.location.search,
        // action: state.historyAction,
      })
    }
  })

  root = createRoot(domElement)
  root.render(
    <RouterProvider router={router} />
  )

  return {
    onHostNavigate: ({ pathname }) => {
      if (router && router.state.location.pathname !== pathname) {
        router.navigate(pathname)
      }
    }
  }
}

export const unmount = async () => {
  if (root) {
    root.unmount()
    root = null
  }
  if (router) {
    router = null
  }
}

export const bootstrap = async () => {
  console.log('[App-react] Initialized')
}
