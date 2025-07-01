import { computed, ref, mergeProps, unref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main$2 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    }
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
    const pageInput = ref(props.currentPage);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full sm:w-fit flex justify-center items-center" }, _attrs))}><div class="flex flex-col sm:flex-row justify-center items-center px-2 py-1 bg-white dark:bg-slate-700"><button${ssrIncludeBooleanAttr(props.currentPage === 1) ? " disabled" : ""} class="btn font-semibold text-sm bg-slate-50 dark:bg-slate-300 border border-green-500 text-teal-700 px-2 py-1 rounded hover:text-rose-500 disabled:opacity-50 disabled:text-slate-400">${ssrInterpolate(unref(t)("previous"))}</button><span class="flex flex-row items-center font-semibold text-sm ml-2 mr-2 text-slate-700 dark:text-slate-100"><span class="hidden lg:block">${ssrInterpolate(unref(t)("page"))}</span><input type="number"${ssrRenderAttr("value", pageInput.value)}${ssrIncludeBooleanAttr(totalPages.value === 1) ? " disabled" : ""} min="1"${ssrRenderAttr("max", totalPages.value)} class="w-16 mx-2 py-1 text-center border border-slate-400 rounded dark:bg-slate-300 dark:text-slate-700"><span class="text-blue-500 dark:text-rose-300">${ssrInterpolate(unref(t)("of"))} ${ssrInterpolate(totalPages.value)}</span></span><button${ssrIncludeBooleanAttr(props.currentPage === totalPages.value) ? " disabled" : ""} class="btn font-semibold text-sm bg-white dark:bg-slate-100 border border-green-500 text-teal-700 px-2 py-1 rounded hover:text-rose-500 disabled:opacity-50 disabled:text-slate-400">${ssrInterpolate(unref(t)("next"))}</button></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Pagination/Pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ItemsPerPageSelect",
  __ssrInlineRender: true,
  props: {
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  emits: ["update:itemsPerPage"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        title: unref(t)("titleItemsPerPage"),
        value: props.itemsPerPage,
        class: "w-20 sm:ml-4 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"
      }, _attrs))}><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Select/ItemsPerPageSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Search/SearchInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a,
  _sfc_main$2 as b
};
