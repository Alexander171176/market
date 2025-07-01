import { computed, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { b as _sfc_main$3 } from "./DefaultLayout-CmMnb_pW.js";
const _sfc_main$2 = {
  __name: "MainSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { mainArticles } = usePage().props;
    const articles = computed(() => mainArticles || []);
    const currentSlide = ref(0);
    const currentArticle = computed(() => articles.value[currentSlide.value] || null);
    const next = () => {
      if (articles.value.length > 0) {
        currentSlide.value = (currentSlide.value + 1) % articles.value.length;
      }
    };
    let slideInterval = null;
    onMounted(() => {
      slideInterval = setInterval(next, 3e3);
    });
    onUnmounted(() => {
      clearInterval(slideInterval);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (currentArticle.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "slider p-1 flex justify-center w-full md:w-2/3 h-auto max-h-56 sm:max-h-96 lg:max-h-72 xl:max-h-96" }, _attrs))} data-v-12339a2f><div class="relative overflow-hidden w-full max-w-2xl" data-v-12339a2f>`);
        if (currentArticle.value) {
          _push(`<div class="slide absolute inset-0" data-v-12339a2f><div class="w-full absolute p-3 bg-slate-800 opacity-75" data-v-12339a2f><div class="text-xs font-semibold text-yellow-200 mb-1" data-v-12339a2f>${ssrInterpolate(currentArticle.value.created_at.substring(0, 10))}</div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/articles/${currentArticle.value.url}`,
            class: "font-semibold text-white hover:text-blue-700 dark:hover:text-blue-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(currentArticle.value.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(currentArticle.value.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="w-full aspect-[4/3] overflow-hidden" data-v-12339a2f>`);
          if (currentArticle.value.images && currentArticle.value.images.length > 0) {
            _push(`<img${ssrRenderAttr("src", currentArticle.value.images[0].webp_url || currentArticle.value.images[0].url)}${ssrRenderAttr("alt", currentArticle.value.images[0].alt)} class="w-full h-full object-cover" data-v-12339a2f>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-400" data-v-12339a2f><span class="text-gray-500 dark:text-gray-700" data-v-12339a2f>${ssrInterpolate(unref(t)("noCurrentImage"))}</span></div>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-sm focus:outline-none" title="Previous" data-v-12339a2f><svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" data-v-12339a2f><path fill-rule="evenodd" d="M7.707 3.707a1 1 0 010 1.414L4.414 8H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clip-rule="evenodd" data-v-12339a2f></path></svg></button><button class="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-sm focus:outline-none" title="Next" data-v-12339a2f><svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" data-v-12339a2f><path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 12H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-12339a2f></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Article/MainSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MainSlider = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-12339a2f"]]);
const _sfc_main$1 = {
  __name: "LeftColumn",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { mainArticles } = usePage().props;
    const articles = computed(() => mainArticles || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full hidden md:block lg:hidden xl:block md:w-1/3 h-auto max-h-96 md:max-h-full" }, _attrs))}><ul><!--[-->`);
      ssrRenderList(articles.value, (article) => {
        _push(`<li class="mt-2 pb-2 border-b border-dashed border-slate-500 dark:border-slate-300"><div class="font-semibold text-xs text-orange-500 dark:text-orange-400 ml-2">${ssrInterpolate(article.created_at)}</div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/articles/${article.url}`,
          class: "font-semibold text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(article.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(article.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Partials/LeftColumn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SectionArticlesPagination",
  __ssrInlineRender: true,
  props: {
    articles: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 2
      // Вы можете изменить стандартное значение, если горизонтальный вид требует меньше/больше
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const { siteSettings } = usePage().props;
    const props = __props;
    const currentPage = ref(1);
    const viewMode = ref(siteSettings.PublicViewArticle || "horizontal");
    const totalPages = computed(() => {
      return Math.ceil(props.articles.length / props.itemsPerPage);
    });
    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * props.itemsPerPage;
      return props.articles.slice(start, start + props.itemsPerPage);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b7589bcd><div class="flex justify-end items-center mb-4 mr-1 space-x-2" data-v-b7589bcd><button class="${ssrRenderClass([
        "p-1 border transition-colors duration-200",
        viewMode.value === "grid" ? "bg-blue-400 border-blue-700 text-white" : "bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500"
      ])}"${ssrRenderAttr("title", unref(t)("gridView"))} data-v-b7589bcd><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-b7589bcd><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-b7589bcd></path></svg></button><button class="${ssrRenderClass([
        "p-1 border transition-colors duration-200",
        viewMode.value === "horizontal" ? "bg-blue-400 border-blue-700 text-white" : "bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500"
      ])}"${ssrRenderAttr("title", unref(t)("horizontalView"))} data-v-b7589bcd><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-b7589bcd><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-b7589bcd></path></svg></button></div><div class="${ssrRenderClass([viewMode.value === "grid" ? "grid grid-cols-12 gap-3" : "space-y-3"])}" data-v-b7589bcd><!--[-->`);
      ssrRenderList(paginatedArticles.value, (article) => {
        _push(`<div class="${ssrRenderClass([
          "overflow-hidden transition-all duration-300 rounded-sm",
          "hover:bg-slate-50 hover:dark:bg-slate-800 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-700",
          // Общие стили hover
          viewMode.value === "grid" ? "px-1 py-1 col-span-full sm:col-span-6 md:col-span-4 lg:col-span-12 xl:col-span-6 2xl:col-span-4 hover:scale-101 shadow-none flex flex-col h-full" : "col-span-full flex flex-row items-start space-x-3 p-2 shadow-sm"
          // Стили ГОРИЗОНТАЛЬНЫЕ
        ])}" data-v-b7589bcd>`);
        if (viewMode.value === "horizontal") {
          _push(`<!--[--><div class="w-1/3 lg:w-1/4 xl:w-48 shrink-0 aspect-video md:aspect-square overflow-hidden" data-v-b7589bcd>`);
          if (article.images && article.images.length > 0) {
            _push(ssrRenderComponent(_sfc_main$3, {
              images: article.images,
              link: `/articles/${article.url}`,
              class: "w-full h-full object-cover"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "flex items-center justify-center w-full h-full p-2 border border-slate-400 bg-gray-200 dark:bg-gray-700"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-center text-gray-700 dark:text-gray-300 text-xs" data-v-b7589bcd${_scopeId}>${ssrInterpolate(unref(t)("noCurrentImage"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-center text-gray-700 dark:text-gray-300 text-xs" }, toDisplayString(unref(t)("noCurrentImage")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div><div class="flex flex-col flex-grow pl-3" data-v-b7589bcd><div class="my-1 text-left" data-v-b7589bcd><div class="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-1" data-v-b7589bcd>${ssrInterpolate(article.created_at.substring(0, 10))}</div><h3 class="text-md font-semibold text-blue-900 dark:text-white" data-v-b7589bcd>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/articles/${article.url}`,
            class: "hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(article.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(article.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3></div><div class="mb-2" data-v-b7589bcd><p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-3" data-v-b7589bcd>${ssrInterpolate(article.short)}</p></div><ul class="text-xs space-y-1 my-1 mt-auto" data-v-b7589bcd><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-teal-600 dark:text-teal-300 truncate pr-1" data-v-b7589bcd>${ssrInterpolate(article.author)}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z" data-v-b7589bcd></path></svg></li><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-gray-700 dark:text-gray-300" data-v-b7589bcd>Просмотры: ${ssrInterpolate(article.views || "0")}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" data-v-b7589bcd></path></svg></li><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-gray-700 dark:text-gray-300" data-v-b7589bcd>Лайки: ${ssrInterpolate(article.likes || "0")}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 512 512" data-v-b7589bcd><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" data-v-b7589bcd></path></svg></li><li class="h-fit flex items-center justify-between pt-1" data-v-b7589bcd><div class="font-semibold text-violet-600 dark:text-violet-300 truncate pr-1" data-v-b7589bcd><!--[-->`);
          ssrRenderList(article.tags, (tag, index) => {
            _push(`<span data-v-b7589bcd>`);
            _push(ssrRenderComponent(unref(Link), {
              href: `/tags/${tag.slug}`,
              class: "hover:text-rose-400 hover:dark:text-rose-300"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(tag.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(tag.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (index < article.tags.length - 1) {
              _push(`<span data-v-b7589bcd>, </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]-->`);
          if (!article.tags || article.tags.length === 0) {
            _push(`<span data-v-b7589bcd> </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" data-v-b7589bcd></path></svg></li></ul></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (viewMode.value === "grid") {
          _push(`<!--[--><div class="overflow-hidden h-auto" data-v-b7589bcd>`);
          if (article.images && article.images.length > 0) {
            _push(ssrRenderComponent(_sfc_main$3, {
              images: article.images,
              link: `/articles/${article.url}`,
              class: "w-full h-full object-cover"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "flex items-center justify-center h-48 p-4 bg-gray-200 dark:bg-gray-700"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-center text-gray-700 dark:text-gray-300 text-xs" data-v-b7589bcd${_scopeId}>${ssrInterpolate(unref(t)("noCurrentImage"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-center text-gray-700 dark:text-gray-300 text-xs" }, toDisplayString(unref(t)("noCurrentImage")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div><div class="flex flex-col flex-grow" data-v-b7589bcd><div class="px-3 my-1 text-center" data-v-b7589bcd><div class="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-1" data-v-b7589bcd>${ssrInterpolate(article.created_at.substring(0, 10))}</div><h3 class="text-md font-semibold text-blue-900 dark:text-white" data-v-b7589bcd>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/articles/${article.url}`,
            class: "hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(article.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(article.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3></div><div class="flex flex-wrap items-center p-2 border border-dashed border-slate-400 dark:border-slate-200" data-v-b7589bcd><p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200" data-v-b7589bcd>${ssrInterpolate(article.short)}</p></div><ul class="text-xs space-y-1 my-1 px-1 mt-auto" data-v-b7589bcd><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-teal-600 dark:text-teal-300 truncate pr-1" data-v-b7589bcd>${ssrInterpolate(article.author)}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z" data-v-b7589bcd></path></svg></li><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-gray-700 dark:text-gray-300" data-v-b7589bcd>Просмотры: ${ssrInterpolate(article.views || "0")}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" data-v-b7589bcd></path></svg></li><li class="h-4 flex items-center justify-between" data-v-b7589bcd><div class="font-semibold text-gray-700 dark:text-gray-300" data-v-b7589bcd>Лайки: ${ssrInterpolate(article.likes || "0")}</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 512 512" data-v-b7589bcd><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" data-v-b7589bcd></path></svg></li><li class="h-fit flex items-center justify-between pt-1" data-v-b7589bcd><div class="font-semibold text-violet-600 dark:text-violet-300 truncate pr-1" data-v-b7589bcd><!--[-->`);
          ssrRenderList(article.tags, (tag, index) => {
            _push(`<span data-v-b7589bcd>`);
            _push(ssrRenderComponent(unref(Link), {
              href: `/tags/${tag.slug}`,
              class: "hover:text-rose-400 hover:dark:text-rose-300"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(tag.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(tag.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (index < article.tags.length - 1) {
              _push(`<span data-v-b7589bcd>, </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]-->`);
          if (!article.tags || article.tags.length === 0) {
            _push(`<span data-v-b7589bcd> </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16" data-v-b7589bcd><path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" data-v-b7589bcd></path></svg></li></ul></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (totalPages.value > 1) {
        _push(`<div class="flex justify-center items-center mt-4" data-v-b7589bcd><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""}${ssrRenderAttr("title", unref(t)("previous"))} class="px-3 py-1 rounded-l disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-red-500 dark:text-red-300 hover:text-slate-700 dark:hover:text-slate-100 border-2 border-gray-400 dark:border-gray-200 hover:border-red-400 dark:hover:border-red-400" data-v-b7589bcd> « </button><div class="px-2 font-semibold text-slate-700 dark:text-slate-200" data-v-b7589bcd><span data-v-b7589bcd>${ssrInterpolate(unref(t)("page"))} <span class="px-1 text-red-500 dark:text-red-300 border border-red-500 dark:border-red-300" data-v-b7589bcd>${ssrInterpolate(currentPage.value)}</span> ${ssrInterpolate(unref(t)("of"))} ${ssrInterpolate(totalPages.value)}</span></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""}${ssrRenderAttr("title", unref(t)("next"))} class="px-3 py-1 rounded-r disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-900 text-red-500 dark:text-red-300 hover:text-slate-700 dark:hover:text-slate-100 border-2 border-gray-400 dark:border-gray-200 hover:border-red-400 dark:hover:border-red-400" data-v-b7589bcd> » </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Article/SectionArticlesPagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SectionArticlesPagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7589bcd"]]);
export {
  MainSlider as M,
  SectionArticlesPagination as S,
  _sfc_main$1 as _
};
