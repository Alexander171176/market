import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "CloneIconButton",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const { t } = useI18n();
    const buttonClass = computed(() => [
      "flex items-center p-1 rounded",
      "border border-slate-300",
      "hover:border-green-500",
      "dark:border-green-300 dark:hover:border-green-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: buttonClass.value,
        title: __props.title || unref(t)("clone")
      }, _attrs))}><svg class="w-6 h-6 fill-current text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-100 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M15 3H4c-1.1 0-2 .9-2 2v14h2V5h11V3zm4 4H8c-1.1 0-2 .9-2 2v14h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 14H8V9h11v12z"></path></svg></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/CloneIconButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
