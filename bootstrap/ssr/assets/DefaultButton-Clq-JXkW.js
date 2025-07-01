import { ref, unref, mergeProps, withCtx, createVNode, renderSlot, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "DefaultButton",
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
        class: ["flex items-center btn px-2 py-0.5 bg-sky-600 text-white text-sm font-semibold rounded-sm shadow-md transition-colors duration-300 ease-in-out hover:bg-sky-700 focus:bg-sky-700 focus:outline-none", { "ring-2 ring-sky-600 ring-offset-2 ring-offset-white": isPressed.value }],
        onMousedown: ($event) => isPressed.value = true,
        onMouseup: ($event) => isPressed.value = false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
              _push2(`<svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"${_scopeId}><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"${_scopeId}></path></svg>`);
            }, _push2, _parent2, _scopeId);
            _push2(`</span><span class="ml-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", null, [
                renderSlot(_ctx.$slots, "icon", {}, () => [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 fill-current opacity-50 shrink-0",
                    viewBox: "0 0 16 16"
                  }, [
                    createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/DefaultButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
