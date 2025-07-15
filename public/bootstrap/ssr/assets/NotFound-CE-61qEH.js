import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { a as authImage } from "./auth-image-CfsIGyOn.js";
const _sfc_main = {
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex flex-col items-center justify-center px-4 bg-contain bg-center bg-no-repeat",
        style: { backgroundImage: `url(${unref(authImage)})` }
      }, _attrs))}><div class="bg-white bg-opacity-85 p-8 rounded-lg shadow-md max-w-md text-center"><h1 class="text-9xl font-extrabold text-slate-600">404</h1><p class="mt-4 text-2xl font-semibold text-red-400">${ssrInterpolate(unref(t)("pageNotFound"))}</p><p class="mt-2 text-lg font-semibold text-slate-500">${ssrInterpolate(unref(t)("pageNotFoundText"))}</p><div class="mt-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "px-3 py-1.5 bg-blue-700 text-white rounded-md hover:bg-blue-500 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/NotFound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
