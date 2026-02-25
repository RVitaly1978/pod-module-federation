import { importShared } from './__federation_fn_import-5yvPVxJ5.js';

const {defineComponent:_defineComponent} = await importShared('vue');

const {renderSlot:_renderSlot,createElementVNode:_createElementVNode,normalizeClass:_normalizeClass,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');

const _hoisted_1 = ["disabled"];
const _hoisted_2 = { class: "flex items-center gap" };
const {computed} = await importShared('vue');

const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "Button",
  props: {
    hierarchy: { default: "primary" },
    actionType: { default: "productive" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    block: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => {
      const classes = [
        "relative inline-flex items-center justify-center text-center no-underline rounded cursor-pointer transition-all duration-200 whitespace-nowrap select-none font-[inherit] outline-none",
        "h-[48px] min-w-[48px] min-h-[48px] max-h-[48px] px-4 py-[14px] gap-2",
        "text-base font-bold leading-normal text-base-white",
        "border-2",
        "bg-brand-500 border-transparent",
        "hover:enabled:bg-brand-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "active:enabled:bg-brand-700",
        "disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent"
      ];
      if (props.disabled) classes.push("!cursor-not-allowed");
      if (props.loading) classes.push("!cursor-wait");
      if (props.block) classes.push("!flex !w-full");
      return classes;
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("button", {
        class: _normalizeClass(computedClass.value),
        disabled: __props.disabled || __props.loading,
        type: "button"
      }, [
        _createElementVNode("span", _hoisted_2, [
          _renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ], 10, _hoisted_1);
    };
  }
});

export { _sfc_main as _ };
