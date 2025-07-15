import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "CountTable",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-5 py-1 text-right" }, _attrs))}><h2 class="text-sm font-semibold text-slate-800 dark:text-slate-100">${ssrInterpolate(unref(t)("total"))} <span class="text-blue-500 dark:text-blue-200 font-medium">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></h2></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/CountTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
