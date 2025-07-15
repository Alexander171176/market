import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "MainToggle",
  __ssrInlineRender: true,
  props: {
    isActive: Boolean,
    title: String
  },
  setup(__props) {
    const buttonClass = computed(() => [
      "flex items-center py-1 px-2 rounded",
      "border border-slate-300",
      "hover:border-yellow-500",
      "dark:border-yellow-300 dark:hover:border-yellow-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: buttonClass.value,
        title: __props.title
      }, _attrs))}>`);
      if (__props.isActive) {
        _push(`<svg class="w-4 h-4 fill-current text-rose-500" viewBox="0 0 12 12"><path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4 fill-current text-gray-500" viewBox="0 0 12 12"><path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/MainToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
