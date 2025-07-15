import { mergeProps, withCtx, unref, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./DefaultLayout-CmMnb_pW.js";
import "vue-i18n";
import "./ResponsiveNavLink-DqF2K04_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vueuse/core";
import "./LogoutButton-D8LBhtXS.js";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    title: String,
    canLogin: Boolean,
    canRegister: Boolean
  },
  setup(__props) {
    const { locale } = usePage().props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: __props.title,
        "can-login": __props.canLogin,
        "can-register": __props.canRegister
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent2, _scopeId));
            _push2(`<div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-red-500 selection:text-white"${_scopeId}><div class="max-w-8xl mx-auto"${_scopeId}><div${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"${_scopeId}><a href="https://laravel.com/docs/10.x" class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"${_scopeId}><div${_scopeId}><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"${_scopeId}></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}>Документация Laravel</h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"${_scopeId}> В Laravel есть замечательная документация, охватывающая каждый аспект фреймворка. Независимо от того, являетесь ли вы новичком или имеете предыдущий опыт работы с Laravel, мы рекомендуем прочитать нашу документацию от начала до конца. </p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"${_scopeId}></path></svg></a><a href="https://laracasts.com" class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"${_scopeId}><div${_scopeId}><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"${_scopeId}><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"${_scopeId}></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}>Laracasts</h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"${_scopeId}> Laracasts предлагает тысячи видеоуроков по разработке на Laravel, PHP и JavaScript. Ознакомьтесь с ними, убедитесь сами и значительно повысьте свои навыки разработки в процессе. </p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"${_scopeId}></path></svg></a></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Welcome" }),
              createVNode("div", { class: "relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-red-500 selection:text-white" }, [
                createVNode("div", { class: "max-w-8xl mx-auto" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" }, [
                      createVNode("a", {
                        href: "https://laravel.com/docs/10.x",
                        class: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                      }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              class: "w-7 h-7 stroke-red-500"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                              })
                            ]))
                          ]),
                          createVNode("h2", { class: "mt-6 text-xl font-semibold text-gray-900 dark:text-white" }, "Документация Laravel"),
                          createVNode("p", { class: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed" }, " В Laravel есть замечательная документация, охватывающая каждый аспект фреймворка. Независимо от того, являетесь ли вы новичком или имеете предыдущий опыт работы с Laravel, мы рекомендуем прочитать нашу документацию от начала до конца. ")
                        ]),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          class: "self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          })
                        ]))
                      ]),
                      createVNode("a", {
                        href: "https://laracasts.com",
                        class: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                      }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              class: "w-7 h-7 stroke-red-500"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                              })
                            ]))
                          ]),
                          createVNode("h2", { class: "mt-6 text-xl font-semibold text-gray-900 dark:text-white" }, "Laracasts"),
                          createVNode("p", { class: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed" }, " Laracasts предлагает тысячи видеоуроков по разработке на Laravel, PHP и JavaScript. Ознакомьтесь с ними, убедитесь сами и значительно повысьте свои навыки разработки в процессе. ")
                        ]),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          class: "self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          })
                        ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Default/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
