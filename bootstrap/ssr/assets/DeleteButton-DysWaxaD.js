import { ref, unref, mergeProps, withCtx, createVNode, renderSlot, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "DeleteButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isPressed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        method: "DELETE",
        as: "button",
        class: ["btn flex items-center py-2 px-0.5 rounded-sm border border-solid border-slate-300 hover:border-rose-500 dark:border-yellow-200 dark:hover:border-white", { "ring-1 ring-orange-500 ring-offset-1 ring-offset-white dark:ring-orange-300": isPressed.value }],
        onMousedown: ($event) => isPressed.value = true,
        onMouseup: ($event) => isPressed.value = false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ml-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
              _push2(`<svg class="w-4 h-4 fill-current text-orange-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-500 shrink-0" viewBox="0 0 16 16"${_scopeId}><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"${_scopeId}></path></svg>`);
            }, _push2, _parent2, _scopeId);
            _push2(`</span><span class="ml-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "ml-2" }, [
                renderSlot(_ctx.$slots, "icon", {}, () => [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 fill-current text-orange-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-500 shrink-0",
                    viewBox: "0 0 16 16"
                  }, [
                    createVNode("path", { d: "M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" })
                  ]))
                ])
              ]),
              createVNode("span", { class: "ml-2" }, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/DeleteButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
