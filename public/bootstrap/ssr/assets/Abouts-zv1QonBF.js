import { ref, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as ApplicationMark, a as _sfc_main$2, _ as _sfc_main$3 } from "./ResponsiveNavLink-DqF2K04_.js";
import { _ as _sfc_main$1 } from "./LogoutButton-D8LBhtXS.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vueuse/core";
import "vue-i18n";
const _sfc_main = {
  __name: "Abouts",
  __ssrInlineRender: true,
  props: {
    title: String,
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent));
      _push(`<div class="min-h-screen w-full sm:fixed sm:top-0 sm:end-0 text-end z-10 shadow"><nav class="bg-white border-b border-gray-100 dark:bg-slate-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="w-full flex justify-between"><div class="shrink-0 flex items-center">`);
      _push(ssrRenderComponent(ApplicationMark, { class: "block h-9 w-auto" }, null, _parent));
      _push(`</div><div class="hidden md:flex w-full flex-row flex-wrap items-center justify-end">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/frontend",
        class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Фронтенд `);
          } else {
            return [
              createTextVNode(" Фронтенд ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.canLogin) {
        _push(`<div class="hidden md:flex w-full flex-row flex-wrap items-center justify-end">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Личный кабинет `);
              } else {
                return [
                  createTextVNode(" Личный кабинет ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("admin.index"),
            class: "font-semibold text-gray-600 text-lg mr-2 px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Панель администратора `);
              } else {
                return [
                  createTextVNode(" Панель администратора ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(`<form>`);
          _push(ssrRenderComponent(_sfc_main$1, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Выход `);
              } else {
                return [
                  createTextVNode(" Выход ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("login"),
            class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Вход `);
              } else {
                return [
                  createTextVNode(" Вход ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.canRegister) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Регистрация `);
                } else {
                  return [
                    createTextVNode(" Регистрация ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ml-2 flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div><div class="-me-2 flex items-center md:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "md:hidden"])}">`);
      if (__props.canLogin) {
        _push(`<div class="pt-2 pb-3 space-y-1">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_sfc_main$3, {
            href: _ctx.route("dashboard")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Панель управления `);
              } else {
                return [
                  createTextVNode(" Панель управления ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_sfc_main$3, {
            href: _ctx.route("admin.index")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Панель Администратора `);
              } else {
                return [
                  createTextVNode(" Панель Администратора ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(`<form class="w-fit ml-4">`);
          _push(ssrRenderComponent(_sfc_main$1, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Выход `);
              } else {
                return [
                  createTextVNode(" Выход ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_sfc_main$3, {
            href: _ctx.route("login"),
            class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Вход `);
              } else {
                return [
                  createTextVNode(" Вход ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.canRegister) {
            _push(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("register"),
              class: "font-semibold text-gray-600 text-lg px-3 py-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Регистрация `);
                } else {
                  return [
                    createTextVNode(" Регистрация ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav></div><div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-red-500 selection:text-white"><div class="max-w-7xl mt-16 mx-auto p-6 lg:p-8"><div class="mt-16"><div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"><a href="https://laravel.com/docs/10.x" class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"><div><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white"> Документация Laravel </h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"> В Laravel есть замечательная документация, охватывающая каждый аспект фреймворка. Независимо от того, являетесь ли вы новичком или имеете предыдущий опыт работы с Laravel, мы рекомендуем прочитать нашу документацию от начала до конца. </p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path></svg></a><a href="https://laracasts.com" class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"><div><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Laracasts</h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"> Laracasts предлагает тысячи видеоуроков по разработке на Laravel, PHP и JavaScript. Ознакомьтесь с ними, убедитесь сами и значительно повысьте свои навыки разработки в процессе. </p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path></svg></a><a href="https://laravel-news.com" class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"><div><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Laravel News</h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"> Laravel News - это управляемый сообществом портал и информационная рассылка, объединяющая все последние и наиболее важные новости в экосистеме Laravel, включая новые выпуски пакетов и учебные пособия. </p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path></svg></a><div class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"><div><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"></path></svg></div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white"> Vibrant Ecosystem </h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed"> Laravel&#39;s robust library of first-party tools and libraries, such as <a href="https://forge.laravel.com" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Forge</a>, <a href="https://vapor.laravel.com" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Vapor</a>, <a href="https://nova.laravel.com" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Nova</a>, and <a href="https://envoyer.io" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Envoyer</a> help you take your projects to the next level. Pair them with powerful open source libraries like <a href="https://laravel.com/docs/billing" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Cashier</a>, <a href="https://laravel.com/docs/dusk" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Dusk</a>, <a href="https://laravel.com/docs/broadcasting" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Echo</a>, <a href="https://laravel.com/docs/horizon" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Horizon</a>, <a href="https://laravel.com/docs/sanctum" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Sanctum</a>, <a href="https://laravel.com/docs/telescope" class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Telescope</a>, and more. </p></div></div></div></div><div class="flex justify-center mt-16 px-6 sm:items-center sm:justify-between"><div class="text-center text-sm sm:text-start"> </div><div class="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0"> Laravel v${ssrInterpolate(__props.laravelVersion)} (PHP v${ssrInterpolate(__props.phpVersion)}) </div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Abouts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
