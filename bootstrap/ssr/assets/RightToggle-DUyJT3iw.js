import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "LeftToggle",
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
        _push(`<svg class="w-6 h-6 fill-current text-amber-500" stroke="currentColor" viewBox="0 0 24 24"><path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6 fill-current text-gray-500" stroke="currentColor" viewBox="0 0 24 24"><path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/LeftToggle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "RightToggle",
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
        _push(`<svg class="w-6 h-6 fill-current text-amber-500" stroke="currentColor" viewBox="0 0 24 24"><path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6 fill-current text-gray-500" stroke="currentColor" viewBox="0 0 24 24"><path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/RightToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
