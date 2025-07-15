import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$2 } from "./InputError-DYghIIUw.js";
const _sfc_main$1 = {
  __name: "TypeSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const typeOptions = [
      { value: "string", label: "string" },
      { value: "text", label: "text" },
      { value: "number", label: "number" },
      { value: "integer", label: "integer" },
      { value: "float", label: "float" },
      { value: "boolean", label: "boolean" },
      { value: "checkbox", label: "checkbox" },
      { value: "json", label: "json" },
      { value: "array", label: "array" },
      { value: "select", label: "select" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><select id="type" class="form-select dark:bg-slate-800 dark:text-slate-100 py-0.5"${ssrRenderAttr("value", __props.modelValue)}><option disabled value="">${ssrInterpolate(unref(t)("selectType"))}</option><!--[-->`);
      ssrRenderList(typeOptions, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}${ssrRenderAttr("title", unref(t)(opt.label))}>${ssrInterpolate(opt.label)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "mt-2",
        message: __props.error
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Parameters/Select/TypeSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "CategorySelect",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const categoryOptions = [
      { value: "system", label: "system" },
      { value: "display", label: "display" },
      { value: "admin", label: "admin" },
      { value: "public", label: "public" },
      { value: "integration", label: "integration" },
      { value: "seo", label: "seo" },
      { value: "contacts", label: "contacts" },
      { value: "general", label: "general" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full lg:w-64" }, _attrs))}><select id="category" class="form-select dark:bg-slate-800 dark:text-slate-100 py-0.5"${ssrRenderAttr("value", __props.modelValue)}><option disabled value="">${ssrInterpolate(unref(t)("selectCategoryParameter"))}</option><!--[-->`);
      ssrRenderList(categoryOptions, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}>${ssrInterpolate(opt.label)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "mt-2",
        message: __props.error
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Parameters/Select/CategorySelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
