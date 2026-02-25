import { importShared } from './__federation_fn_import-BzPrmh0e.js';

const _imports_0 = "/app-vue3/v1.0.0/assets/vue3-BC8UrAuS.png";

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

const {createElementVNode:_createElementVNode,createTextVNode:_createTextVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,unref:_unref,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { className: "absolute inset-0 flex flex-col items-center justify-center" };

const {useRouter} = await importShared('vue-router');

const _sfc_main = {
  __name: 'Home',
  setup(__props) {

const UiButton = remoteUi('UiButton');

const router = useRouter();

const onClick = (path) => {
  router.push(path);
};

return (_ctx, _cache) => {
  const _component_router_link = _resolveComponent("router-link");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _cache[3] || (_cache[3] = _createElementVNode("img", {
      width: "300",
      src: _imports_0,
      class: "rounded-xl border-error-500 border-5"
    }, null, -1)),
    _createVNode(_component_router_link, {
      to: "/app-vue3/page1",
      class: "mt-8 border-2 border-error-500 text-error-500 text-xl font-bold px-4 py-2 rounded-md"
    }, {
      default: _withCtx(() => [...(_cache[1] || (_cache[1] = [
        _createTextVNode(" Link to Page 1 ", -1)
      ]))]),
      _: 1
    }),
    _createVNode(_unref(UiButton), {
      class: "mt-10",
      onClick: _cache[0] || (_cache[0] = $event => (onClick('/')))
    }, {
      default: _withCtx(() => [...(_cache[2] || (_cache[2] = [
        _createTextVNode("Go to Home", -1)
      ]))]),
      _: 1
    })
  ]))
}
}

};

export { _sfc_main as default };
