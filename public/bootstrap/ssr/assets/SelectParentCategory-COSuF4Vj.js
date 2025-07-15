import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$2 } from "./InputError-DYghIIUw.js";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "SelectParentCategory",
  __ssrInlineRender: true,
  props: {
    modelValue: [Number, null],
    options: {
      type: Array,
      default: () => []
    },
    errorMessage: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: null
    },
    nullable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-start w-full mb-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "parent_id",
        value: __props.label || unref(t)("parentCategory")
      }, null, _parent));
      _push(`<select id="parent_id"${ssrRenderAttr("value", __props.modelValue)} class="block w-full py-0.5 border-slate-500 font-semibold text-md focus:border-indigo-500 focus:ring-indigo-300 rounded-sm shadow-sm dark:bg-cyan-800 dark:text-slate-100">`);
      if (__props.nullable) {
        _push(`<option${ssrRenderAttr("value", null)}>${ssrInterpolate(unref(t)("noParent"))}</option>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<option${ssrRenderAttr("value", option.id)} class="${ssrRenderClass({
          "bg-indigo-500 text-white": __props.modelValue === option.id,
          "bg-white text-black dark:bg-slate-700 dark:text-white": __props.modelValue !== option.id
        })}">${ssrInterpolate(option.title)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "mt-2",
        message: __props.errorMessage
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Category/Select/SelectParentCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
