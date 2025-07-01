import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "InputNumber",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [Number, String],
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        class: "w-20 rounded-md shadow-sm border-slate-500 font-semibold text-sm focus:border-indigo-500 focus:ring-indigo-300 dark:bg-cyan-800 dark:text-slate-100",
        value: __props.modelValue.toString(),
        ref_key: "input",
        ref: input,
        type: "number",
        min: "0"
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/InputNumber.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
