import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "ActivityToggle",
  __ssrInlineRender: true,
  props: {
    isActive: Boolean,
    title: String
  },
  setup(__props) {
    const buttonClass = computed(() => [
      "flex items-center py-1 px-1 rounded",
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
        _push(`<svg class="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 2L3 14h7v8l10-12h-7z"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 2L3 14h7v8l10-12h-7z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/ActivityToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
