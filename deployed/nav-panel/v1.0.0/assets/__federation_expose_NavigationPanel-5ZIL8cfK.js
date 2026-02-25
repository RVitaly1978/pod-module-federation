import { importShared } from './__federation_fn_import-BzPrmh0e.js';

const remotesMap = {
'ui-lib':{url:'/ui-lib/v1.0.0/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'vue':{'undefined':{get:()=>get(new URL('__federation_shared_vue-B0VebYHs.js', import.meta.url).href), loaded:1}},'vue-router':{'undefined':{get:()=>get(new URL('__federation_shared_vue-router-Bd6lE4QY.js', import.meta.url).href), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {defineAsyncComponent,h} = await importShared('vue');


function remoteUi(componentName) {
  return defineAsyncComponent({
    loader: () => __federation_method_getRemote("ui-lib" , "./components").then(module=>__federation_method_wrapDefault(module, true)).then(m => {
      const component = m[componentName] || m.default?.[componentName];
      if (!component) {
        throw new Error(`Component ${componentName} not found in remote "ui-lib/components"`)
      }
      return component
    }),

    loadingComponent: {
      render: () => h('div', 'Loading...')
    },

    errorComponent: {
      render: () => h('div', { style: 'color: red' }, `Error loading ${componentName}`)
    },

    delay: 200,
    timeout: 5000,
  })
}

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const {createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,renderList:_renderList,Fragment:_Fragment,openBlock:_openBlock,createElementBlock:_createElementBlock,toDisplayString:_toDisplayString,normalizeClass:_normalizeClass,createElementVNode:_createElementVNode,unref:_unref} = await importShared('vue');

const _hoisted_1 = { class: "w-full bg-warning-100 rounded-md border-5 border-warning-500 px-4 py-2 flex items-center justify-between" };
const _hoisted_2 = { class: "flex gap-4" };
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = { class: "font-bold text-base-black" };
const {computed} = await importShared('vue');

const {useRouter,useRoute} = await importShared('vue-router');
const BASE = "/";
const _sfc_main = {
  __name: "NavigationPanel",
  setup(__props) {
    const UiButton = remoteUi("UiButton");
    const isDev = false;
    const VERSION = "v1.0.0";
    const router = useRouter();
    const route = useRoute();
    const links = [
      { text: "App-vue3", to: "/app-vue3" },
      { text: "App-vue2", to: "/app-vue2" },
      { text: "App-react", to: "/app-react" }
    ];
    const isDisabled = computed(() => {
      return route.fullPath === BASE;
    });
    const onClick = () => {
      router.push(BASE);
    };
    return (_ctx, _cache) => {
      const _component_router_link = _resolveComponent("router-link");
      return _openBlock(), _createElementBlock("nav", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createVNode(_component_router_link, {
            to: BASE,
            class: "nav-link"
          }, {
            default: _withCtx(() => [..._cache[0] || (_cache[0] = [
              _createTextVNode("Home", -1)
            ])]),
            _: 1
          }),
          (_openBlock(), _createElementBlock(_Fragment, null, _renderList(links, (link) => {
            return _createVNode(_component_router_link, {
              key: link.to,
              to: link.to,
              custom: ""
            }, {
              default: _withCtx(({ href, navigate, isActive, isExactActive }) => [
                _createElementVNode("a", {
                  href,
                  onClick: navigate,
                  class: _normalizeClass([
                    "nav-link",
                    isActive || _ctx.$route.path.startsWith(link.to) ? "router-link-active" : "",
                    isExactActive || _ctx.$route.path === link.to ? "router-link-exact-active" : ""
                  ])
                }, _toDisplayString(link.text), 11, _hoisted_3)
              ]),
              _: 2
            }, 1032, ["to"]);
          }), 64))
        ]),
        _createElementVNode("div", _hoisted_4, _toDisplayString(_unref(isDev) ? "local" : _unref(VERSION)), 1),
        _createElementVNode("div", null, [
          _createVNode(_unref(UiButton), {
            disabled: isDisabled.value,
            onClick
          }, {
            default: _withCtx(() => [..._cache[1] || (_cache[1] = [
              _createTextVNode("Go to Home", -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]);
    };
  }
};
const NavigationPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0fb0d38"]]);

export { NavigationPanel as default };
