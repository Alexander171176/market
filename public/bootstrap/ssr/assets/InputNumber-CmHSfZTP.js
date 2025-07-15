import { mergeProps, useSSRContext, ref, onMounted } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main$2 = {
  __name: "LabelCheckbox",
  __ssrInlineRender: true,
  props: {
    customClass: {
      type: String,
      required: false,
      default: ""
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "ml-2 font-medium text-sm text-indigo-600 dark:text-sky-500" }, _attrs))}>${ssrInterpolate(__props.text)}</label>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Checkbox/LabelCheckbox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Checkbox/ActivityCheckbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
        class: "w-20 py-0.5 border-slate-500 font-semibold text-sm focus:border-indigo-500 focus:ring-indigo-300 rounded-sm shadow-sm dark:bg-cyan-800 dark:text-slate-100",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Input/InputNumber.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main$2 as a,
  _sfc_main as b
};
