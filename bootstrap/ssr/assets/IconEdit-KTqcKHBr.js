import { computed, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "IconEdit",
  __ssrInlineRender: true,
  props: {
    href: {
      required: true
    },
    title: String
  },
  setup(__props) {
    const { t } = useI18n();
    const buttonClass = computed(() => [
      "flex items-center py-1 px-2 rounded",
      "border border-slate-300",
      "hover:border-sky-500",
      "dark:border-sky-300 dark:hover:border-sky-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center mr-1" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.href,
        class: buttonClass.value,
        title: unref(t)("edit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-6 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0" viewBox="0 0 16 16"${_scopeId}><path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-6 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0",
                viewBox: "0 0 16 16"
              }, [
                createVNode("path", { d: "M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/IconEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
