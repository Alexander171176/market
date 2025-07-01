import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "DescriptionTextarea",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: "description"
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
        id: __props.id,
        class: "block w-full h-32 p-3 py-0.5 text-sm bg-white dark:bg-cyan-800 dark:text-slate-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border border-gray-400",
        value: __props.modelValue,
        autocomplete: "description"
      }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Textarea/DescriptionTextarea.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
