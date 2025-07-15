import { mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "vue-toastification";
import "./ScrollButtons-DpnzINGM.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "vue-i18n";
import "axios";
import "vuedraggable";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main = {
  __name: "ComposerInfoPage",
  __ssrInlineRender: true,
  props: {
    composer: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({ title: "composer.json" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`composer.json`);
                } else {
                  return [
                    createTextVNode("composer.json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode("composer.json")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm"${_scopeId}><!--[-->`);
            ssrRenderList(__props.composer, (value, key) => {
              _push2(`<div class="mb-4"${_scopeId}><div class="font-semibold text-blue-700 dark:text-blue-300"${_scopeId}>${ssrInterpolate(key)}</div>`);
              if (typeof value === "object") {
                _push2(`<pre class="whitespace-pre-wrap text-slate-900 dark:text-slate-100"${_scopeId}>                            ${ssrInterpolate(JSON.stringify(value, null, 2))}
                        </pre>`);
              } else {
                _push2(`<div class="text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(value)}</div>`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.composer, (value, key) => {
                      return openBlock(), createBlock("div", {
                        key,
                        class: "mb-4"
                      }, [
                        createVNode("div", { class: "font-semibold text-blue-700 dark:text-blue-300" }, toDisplayString(key), 1),
                        typeof value === "object" ? (openBlock(), createBlock("pre", {
                          key: 0,
                          class: "whitespace-pre-wrap text-slate-900 dark:text-slate-100"
                        }, "                            " + toDisplayString(JSON.stringify(value, null, 2)) + "\n                        ", 1)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-slate-900 dark:text-slate-100"
                        }, toDisplayString(value), 1))
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Systems/ComposerInfoPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
