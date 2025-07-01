import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "CancelButton",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "flex items-center btn mb-3 px-3 py-0.5 bg-violet-500 rounded-sm shadow-md text-white text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-violet-600 focus:bg-violet-600 focus:outline-none"
      }, _attrs))}><svg class="w-6 h-6 fill-current text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg><span class="hidden xs:block ml-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(unref(t)("cancel"))}`);
      }, _push, _parent);
      _push(`</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/CancelButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
