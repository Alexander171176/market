import { computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
