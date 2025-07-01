import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "SearchInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: "Поиск..."
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const searchQuery = ref(props.modelValue);
    watch(searchQuery, (newValue) => {
      emits("update:modelValue", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-3 py-3 mb-2 border border-gray-300 dark:border-gray-700" }, _attrs))}><div class="relative w-full"><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)} class="w-full px-2 py-1 border border-slate-300 rounded-xs bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300"><svg class="absolute right-2 top-2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 111.42-1.42l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58zm-4.9 0a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd"></path></svg></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/SearchInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
