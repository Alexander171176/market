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
        _push(`<svg class="w-6 h-6 fill-current text-yellow-300" viewBox="0 0 352 512"><path d="M96.1 454.4c0 6.3 1.9 12.5 5.4 17.7l17.1 25.7a32 32 0 0 0 26.6 14.3h61.7a32 32 0 0 0 26.6-14.3l17.1-25.7a32 32 0 0 0 5.4-17.7l0-38.4H96l.1 38.4zM0 176c0 44.4 16.5 84.9 43.6 115.8 16.5 18.9 42.4 58.2 52.2 91.5 0 .3 .1 .5 .1 .8h160.2c0-.3 .1-.5 .1-.8 9.9-33.2 35.7-72.6 52.2-91.5C335.6 260.9 352 220.4 352 176 352 78.6 272.9-.3 175.5 0 73.4 .3 0 83 0 176zm176-80c-44.1 0-80 35.9-80 80 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.8 50.2-112 112-112 8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6 fill-current text-gray-300" viewBox="0 0 352 512"><path d="M96.1 454.4c0 6.3 1.9 12.5 5.4 17.7l17.1 25.7a32 32 0 0 0 26.6 14.3h61.7a32 32 0 0 0 26.6-14.3l17.1-25.7a32 32 0 0 0 5.4-17.7l0-38.4H96l.1 38.4zM0 176c0 44.4 16.5 84.9 43.6 115.8 16.5 18.9 42.4 58.2 52.2 91.5 0 .3 .1 .5 .1 .8h160.2c0-.3 .1-.5 .1-.8 9.9-33.2 35.7-72.6 52.2-91.5C335.6 260.9 352 220.4 352 176 352 78.6 272.9-.3 175.5 0 73.4 .3 0 83 0 176zm176-80c-44.1 0-80 35.9-80 80 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.8 50.2-112 112-112 8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/ActivityToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
