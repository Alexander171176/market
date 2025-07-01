import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "ActivityCheckbox",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      default: "activity"
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        id: __props.id,
        type: "checkbox",
        class: "h-5 w-5 text-cyan-600 border-gray-500 rounded focus:ring-cyan-500 dark:bg-teal-500 dark:border-slate-300 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800",
        checked: __props.modelValue
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/ActivityCheckbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
