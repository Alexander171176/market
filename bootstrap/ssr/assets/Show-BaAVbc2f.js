import { ref, onMounted, onUnmounted, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, createTextVNode, openBlock, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./DefaultLayout-CmMnb_pW.js";
import { M as MainSlider, _ as _sfc_main$2, S as SectionArticlesPagination } from "./SectionArticlesPagination-DIdDh2uO.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vueuse/core";
import "./LogoutButton-D8LBhtXS.js";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { tag, articles, articlesCount, siteSettings } = usePage().props;
    const isDarkMode = ref(false);
    let observer;
    const checkDarkMode = () => {
      isDarkMode.value = document.documentElement.classList.contains("dark");
    };
    onMounted(() => {
      checkDarkMode();
      observer = new MutationObserver(checkDarkMode);
      observer.observe(document.documentElement, {
        attributes: true,
        // Следим за изменениями атрибутов
        attributeFilter: ["class"]
        // Фильтруем только по изменению класса
      });
    });
    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });
    const bgColorClass = computed(() => {
      return isDarkMode.value ? siteSettings.PublicDarkBackgroundColor : siteSettings.PublicLightBackgroundColor;
    });
    const searchQuery = ref("");
    const filteredArticles = computed(() => {
      if (!searchQuery.value.trim()) {
        return articles;
      }
      const query = searchQuery.value.toLowerCase();
      return articles.filter(
        (article) => article.title.toLowerCase().includes(query)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: unref(tag).name,
        "can-login": _ctx.$page.props.canLogin,
        "can-register": _ctx.$page.props.canRegister
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(unref(tag).name)}</title><meta name="title"${ssrRenderAttr("content", unref(tag).name || "")}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", unref(tag).meta_keywords || "")}${_scopeId2}><meta name="description"${ssrRenderAttr("content", unref(tag).meta_desc || "")}${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", unref(tag).name || "")}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", unref(tag).meta_desc || "")}${_scopeId2}><meta property="og:type" content="website"${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", `/tags/${unref(tag).url}`)}${_scopeId2}><meta property="og:locale"${ssrRenderAttr("content", unref(tag).locale || "ru_RU")}${_scopeId2}><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", unref(tag).name || "")}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", unref(tag).meta_desc || "")}${_scopeId2}><meta name="DC.title"${ssrRenderAttr("content", unref(tag).name || "")}${_scopeId2}><meta name="DC.description"${ssrRenderAttr("content", unref(tag).meta_desc || "")}${_scopeId2}><meta name="DC.identifier"${ssrRenderAttr("content", `/tags/${unref(tag).url}`)}${_scopeId2}><meta name="DC.language"${ssrRenderAttr("content", unref(tag).locale || "ru")}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("title", null, toDisplayString(unref(tag).name), 1),
                    createVNode("meta", {
                      name: "title",
                      content: unref(tag).name || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: unref(tag).meta_keywords || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "description",
                      content: unref(tag).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:title",
                      content: unref(tag).name || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: unref(tag).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: "website"
                    }),
                    createVNode("meta", {
                      property: "og:url",
                      content: `/tags/${unref(tag).url}`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:locale",
                      content: unref(tag).locale || "ru_RU"
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: unref(tag).name || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: unref(tag).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.title",
                      content: unref(tag).name || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.description",
                      content: unref(tag).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.identifier",
                      content: `/tags/${unref(tag).url}`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.language",
                      content: unref(tag).locale || "ru"
                    }, null, 8, ["content"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass([[bgColorClass.value], "flex-1 p-4 selection:bg-red-400 selection:text-white"])}"${_scopeId}><div class="flex justify-center flex-col md:flex-row md:space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(MainSlider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div><h1 class="flex items-center justify-center my-4 text-center font-bolder text-3xl text-gray-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(unref(tag).name)} <span class="ml-2 px-1 py-0 text-xs font-semibold text-white bg-emerald-500 rounded-sm"${_scopeId}>${ssrInterpolate(unref(articlesCount))}</span></h1>`);
            if (unref(tag).short) {
              _push2(`<p class="flex items-center justify-center mb-4 tracking-wide text-center text-xl text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(unref(tag).short)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-2 max-w-3xl mx-auto"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("searchByName"))} class="w-full px-3 py-1.5 bg-white dark:bg-gray-700 font-semibold text-md text-slate-600 dark:text-slate-100 border border-slate-500 dark:border-slate-400 rounded-sm focus:outline-none focus:ring focus:border-blue-300"${_scopeId}></div>`);
            if (filteredArticles.value.length) {
              _push2(`<div class="space-y-8"${_scopeId}><div class="overflow-hidden"${_scopeId}><div class="p-6"${_scopeId}>`);
              _push2(ssrRenderComponent(SectionArticlesPagination, {
                articles: filteredArticles.value,
                "items-per-page": unref(siteSettings).PublicCountArticle ? parseInt(unref(siteSettings).PublicCountArticle) : 2
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div class="text-gray-500 text-lg text-center"${_scopeId}>${ssrInterpolate(unref(t)("noData"))}</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode("title", null, toDisplayString(unref(tag).name), 1),
                  createVNode("meta", {
                    name: "title",
                    content: unref(tag).name || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: unref(tag).meta_keywords || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "description",
                    content: unref(tag).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:title",
                    content: unref(tag).name || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: unref(tag).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: "website"
                  }),
                  createVNode("meta", {
                    property: "og:url",
                    content: `/tags/${unref(tag).url}`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:locale",
                    content: unref(tag).locale || "ru_RU"
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: unref(tag).name || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: unref(tag).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.title",
                    content: unref(tag).name || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.description",
                    content: unref(tag).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.identifier",
                    content: `/tags/${unref(tag).url}`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.language",
                    content: unref(tag).locale || "ru"
                  }, null, 8, ["content"])
                ]),
                _: 1
              }),
              createVNode("div", {
                class: [[bgColorClass.value], "flex-1 p-4 selection:bg-red-400 selection:text-white"]
              }, [
                createVNode("div", { class: "flex justify-center flex-col md:flex-row md:space-x-4" }, [
                  createVNode(MainSlider),
                  createVNode(_sfc_main$2)
                ]),
                createVNode("h1", { class: "flex items-center justify-center my-4 text-center font-bolder text-3xl text-gray-900 dark:text-slate-100" }, [
                  createTextVNode(toDisplayString(unref(tag).name) + " ", 1),
                  createVNode("span", { class: "ml-2 px-1 py-0 text-xs font-semibold text-white bg-emerald-500 rounded-sm" }, toDisplayString(unref(articlesCount)), 1)
                ]),
                unref(tag).short ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "flex items-center justify-center mb-4 tracking-wide text-center text-xl text-gray-700 dark:text-gray-300"
                }, toDisplayString(unref(tag).short), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "mb-2 max-w-3xl mx-auto" }, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    type: "text",
                    placeholder: unref(t)("searchByName"),
                    class: "w-full px-3 py-1.5 bg-white dark:bg-gray-700 font-semibold text-md text-slate-600 dark:text-slate-100 border border-slate-500 dark:border-slate-400 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
                  }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, searchQuery.value]
                  ])
                ]),
                filteredArticles.value.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-8"
                }, [
                  createVNode("div", { class: "overflow-hidden" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode(SectionArticlesPagination, {
                        articles: filteredArticles.value,
                        "items-per-page": unref(siteSettings).PublicCountArticle ? parseInt(unref(siteSettings).PublicCountArticle) : 2
                      }, null, 8, ["articles", "items-per-page"])
                    ])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-gray-500 text-lg text-center"
                }, toDisplayString(unref(t)("noData")), 1))
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Default/Tags/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
