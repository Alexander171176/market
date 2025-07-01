import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "MetaDescTextarea",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: "meta_desc"
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
        id: __props.id,
        class: "block w-full h-24 p-3 py-0.5 font-semibold text-sm dark:text-slate-100 bg-white dark:bg-cyan-800 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none",
        value: __props.modelValue,
        maxlength: "255",
        autocomplete: "meta_desc"
      }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Textarea/MetaDescTextarea.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
