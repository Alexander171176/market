import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "ActionButton",
  __ssrInlineRender: true,
  props: {
    action: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const buttonClass = computed(() => [
      "flex items-center py-2 px-2 rounded",
      "border border-slate-300",
      "hover:border-sky-500",
      "dark:border-sky-300 dark:hover:border-sky-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: buttonClass.value,
        title: __props.title
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/ActionButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
