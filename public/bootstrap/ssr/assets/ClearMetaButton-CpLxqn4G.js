import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "ClearMetaButton",
  __ssrInlineRender: true,
  emits: ["clear"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const isPressed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["flex items-center btn px-2 py-0.5 bg-yellow-200 rounded-sm shadow-md text-slate-600 text-sm font-semibold transition-colors duration-300 ease-in-out hover:text-slate-700 focus:text-slate-700 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none", { "ring-2 ring-yellow-300 ring-offset-2 ring-offset-white": isPressed.value }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z"></path></svg> ${ssrInterpolate(unref(t)("clearMetaFields"))}`);
      }, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/ClearMetaButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
