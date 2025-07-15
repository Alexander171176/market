import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "StanceSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const options = [
      { value: "orthodox", labelKey: "stanceOrthodox" },
      { value: "southpaw", labelKey: "stanceSouthpaw" },
      { value: "switch", labelKey: "stanceSwitch" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row items-center gap-2" }, _attrs))}><label for="stance" class="mr-2 font-medium text-sm text-indigo-600 dark:text-sky-500">${ssrInterpolate(unref(t)("stanceLabel"))}</label><select id="stance"${ssrRenderAttr("value", __props.modelValue)} class="py-0.5 form-select w-auto rounded-sm shadow-sm border-slate-500 dark:bg-slate-800 dark:text-white"><option value="" disabled>${ssrInterpolate(unref(t)("stancePlaceholder"))}</option><!--[-->`);
      ssrRenderList(options, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(opt.value === __props.modelValue) ? " selected" : ""} class="${ssrRenderClass({
          "bg-blue-500 text-white": opt.value === __props.modelValue,
          "bg-white text-gray-800 dark:bg-slate-700 dark:text-gray-100": opt.value !== __props.modelValue
        })}">${ssrInterpolate(unref(t)(opt.labelKey))}</option>`);
      });
      _push(`<!--]--></select>`);
      if (__props.error) {
        _push(`<p class="mt-2 text-sm text-red-500">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Athlete/Select/StanceSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
