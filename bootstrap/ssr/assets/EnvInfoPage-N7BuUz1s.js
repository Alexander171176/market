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
  __name: "EnvInfoPage",
  __ssrInlineRender: true,
  props: {
    env: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({ title: "Configuration .env" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Configuration .env`);
                } else {
                  return [
                    createTextVNode("Configuration .env")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode("Configuration .env")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300"${_scopeId}> Key </th><th class="pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300"${_scopeId}> Value </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.env, (entry, index) => {
              _push2(`<tr${_scopeId}><td class="py-0.5 pr-4 align-top font-mono text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(entry.key)}</td><td class="py-0.5 font-mono break-all text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(entry.value)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300" }, " Key "),
                          createVNode("th", { class: "pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300" }, " Value ")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.env, (entry, index) => {
                          return openBlock(), createBlock("tr", { key: index }, [
                            createVNode("td", { class: "py-0.5 pr-4 align-top font-mono text-slate-900 dark:text-slate-100" }, toDisplayString(entry.key), 1),
                            createVNode("td", { class: "py-0.5 font-mono break-all text-slate-900 dark:text-slate-100" }, toDisplayString(entry.value), 1)
                          ]);
                        }), 128))
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Systems/EnvInfoPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
