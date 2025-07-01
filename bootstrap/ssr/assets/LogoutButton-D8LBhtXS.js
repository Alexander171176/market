import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import "@inertiajs/vue3";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "LogoutButton",
  __ssrInlineRender: true,
  props: {
    href: String,
    as: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button type="submit" class="btn px-3 pb-0.5 text-sm font-semibold text-slate-900 hover:text-orange-500 dark:text-slate-100 dark:hover:text-yellow-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-orange-500 dark:focus:outline-yellow-200">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Button/LogoutButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
