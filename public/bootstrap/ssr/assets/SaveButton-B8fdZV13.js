import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "SaveButton",
  __ssrInlineRender: true,
  setup(__props) {
    const isPressed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["flex items-center btn mb-3 px-2 py-0.5 bg-teal-500 shadow-md text-white text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-teal-600 focus:bg-teal-600 focus:outline-none", { "ring-2 ring-teal-500 ring-offset-2 ring-offset-white": isPressed.value }]
      }, _attrs))}><span>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
        _push(`<svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16"><path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path></svg>`);
      }, _push, _parent);
      _push(`</span><span class="hidden xs:block ml-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/SaveButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
