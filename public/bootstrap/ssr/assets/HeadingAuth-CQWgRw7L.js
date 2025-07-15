import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { a as authImage } from "./auth-image-CfsIGyOn.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  name: "Authentication"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2",
    "aria-hidden": "true"
  }, _attrs))}><img class="object-cover object-center w-full h-full"${ssrRenderAttr("src", authImage)} width="760" height="760" alt="Authentication"></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Image/ImageAuthentication.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ImageAuthentication = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "HeadingAuth"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${ssrRenderAttrs(mergeProps({ class: "text-center text-3xl text-teal-600 font-semibold mb-6" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", { type: "text" }, null, _push, _parent);
  _push(` ✨ </h1>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Heading/HeadingAuth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeadingAuth = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  HeadingAuth as H,
  ImageAuthentication as I
};
