import { importShared } from './__federation_fn_import-BzPrmh0e.js';

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/app-vue3/v1.0.0/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (true               && deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};

const {unref:_unref,toDisplayString:_toDisplayString,createElementVNode:_createElementVNode,resolveDynamicComponent:_resolveDynamicComponent,openBlock:_openBlock,createBlock:_createBlock,Transition:_Transition,withCtx:_withCtx,createVNode:_createVNode,resolveComponent:_resolveComponent,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = { class: "relative bg-error-100 text-base-white rounded-md border-5 border-error-500 flex-grow-1 p-2" };
const _hoisted_2 = { class: "flex justify-end" };
const _hoisted_3 = { class: "bg-error-500 text-base-white px-2 rounded-md" };
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const isDev = false;
    const VERSION = "v1.0.0";
    return (_ctx, _cache) => {
      const _component_router_view = _resolveComponent("router-view");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("header", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _createElementVNode("p", null, _toDisplayString(_unref(isDev) ? "Dev mode" : "App-vue3"), 1),
            _createElementVNode("p", null, _toDisplayString(_unref(isDev) || !_unref(VERSION) ? "local" : _unref(VERSION)), 1)
          ])
        ]),
        _createVNode(_component_router_view, null, {
          default: _withCtx(({ Component }) => [
            _createVNode(_Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: _withCtx(() => [
                (_openBlock(), _createBlock(_resolveDynamicComponent(Component)))
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        })
      ]);
    };
  }
};

const routesConfig = [
  {
    path: '/app-vue3',
    component: () => __vitePreload(() => import('./Home-xKAzTOAI.js'),true              ?[]:void 0),
    meta: {
      title: 'Home',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page1',
    component: () => __vitePreload(() => import('./Page1-9aOldYWD.js'),true              ?[]:void 0),
    meta: {
      title: 'Page 1',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page2',
    component: () => __vitePreload(() => import('./Page2-CzDmEzRP.js'),true              ?[]:void 0),
    meta: {
      title: 'Page 2',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
  {
    path: '/app-vue3/page3',
    component: () => __vitePreload(() => import('./Page3-c90cRSKh.js'),true              ?[]:void 0),
    meta: {
      title: 'Page 3',
      icon: '',
      showInSidebar: true,
      order: 1,
    },
  },
];

const externalRemoteRoute = {
  path: '/:pathMatch(.*)*',
  beforeEnter: (to, from, next) => {
    if (!to.path.startsWith('/app-vue3')) {
      next(false);
      return
    }
    next();
  },
  component: { render: () => null }
};

const {createApp} = await importShared('vue');

const {createRouter,createWebHistory,createMemoryHistory} = await importShared('vue-router');

let app = null;
let router = null;

const getRoutes = () => routesConfig.map(({ component, ...rest }) => rest);

const mount = async ({
  domElement,
  initialPath,
  onNavigate,
  isStandalone = false,
}) => {
  router = createRouter({
    history: isStandalone ? createWebHistory() : createMemoryHistory(),
    routes: [...routesConfig, externalRemoteRoute],
  });

  if (initialPath) {
    await router.push(initialPath);
  }

  router.afterEach((to) => {
    if (onNavigate) {
      onNavigate({ pathname: to.fullPath });
    }
  });

  app = createApp(_sfc_main);
  app.use(router);
  app.mount(domElement);

  return {
    onHostNavigate: ({ pathname }) => {
      if (router && router.currentRoute.value.fullPath !== pathname) {
        router.push(pathname);
      }
    }
  }
};

const unmount = async () => {
  if (app) {
    app.unmount();
    app = null;
  }
  if (router) {
    router = null;
  }
};

const bootstrap = async () => {
  console.log('[App-vue3] Initialized');
};

export { bootstrap, getRoutes, mount, unmount };
