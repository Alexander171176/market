import { ref, onMounted, onUnmounted, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, createTextVNode, openBlock, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./DefaultLayout-CmMnb_pW.js";
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
    const { rubric, sections, activeArticlesCount, siteSettings } = usePage().props;
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
    const filteredSections = computed(() => {
      if (!searchQuery.value.trim()) {
        return sections;
      }
      const query = searchQuery.value.toLowerCase();
      return sections.map((section) => {
        return {
          ...section,
          articles: section.articles.filter(
            (article) => article.title.toLowerCase().includes(query)
          )
        };
      }).filter((section) => section.articles.length > 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: unref(rubric).title,
        "can-login": _ctx.$page.props.canLogin,
        "can-register": _ctx.$page.props.canRegister
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(unref(rubric).title)}</title><meta name="title"${ssrRenderAttr("content", unref(rubric).title || "")}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", unref(rubric).meta_keywords || "")}${_scopeId2}><meta name="description"${ssrRenderAttr("content", unref(rubric).meta_desc || "")}${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", unref(rubric).title || "")}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", unref(rubric).meta_desc || "")}${_scopeId2}><meta property="og:type" content="website"${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", `/rubrics/${unref(rubric).url}`)}${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", unref(rubric).icon || "")}${_scopeId2}><meta property="og:locale"${ssrRenderAttr("content", unref(rubric).locale || "ru_RU")}${_scopeId2}><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", unref(rubric).title || "")}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", unref(rubric).meta_desc || "")}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", unref(rubric).icon || "")}${_scopeId2}><meta name="DC.title"${ssrRenderAttr("content", unref(rubric).title || "")}${_scopeId2}><meta name="DC.description"${ssrRenderAttr("content", unref(rubric).meta_desc || "")}${_scopeId2}><meta name="DC.identifier"${ssrRenderAttr("content", `/rubrics/${unref(rubric).url}`)}${_scopeId2}><meta name="DC.language"${ssrRenderAttr("content", unref(rubric).locale || "ru")}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("title", null, toDisplayString(unref(rubric).title), 1),
                    createVNode("meta", {
                      name: "title",
                      content: unref(rubric).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: unref(rubric).meta_keywords || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "description",
                      content: unref(rubric).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:title",
                      content: unref(rubric).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: unref(rubric).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: "website"
                    }),
                    createVNode("meta", {
                      property: "og:url",
                      content: `/rubrics/${unref(rubric).url}`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image",
                      content: unref(rubric).icon || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:locale",
                      content: unref(rubric).locale || "ru_RU"
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: unref(rubric).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: unref(rubric).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: unref(rubric).icon || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.title",
                      content: unref(rubric).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.description",
                      content: unref(rubric).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.identifier",
                      content: `/rubrics/${unref(rubric).url}`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "DC.language",
                      content: unref(rubric).locale || "ru"
                    }, null, 8, ["content"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass([[bgColorClass.value], "flex-1 p-4 selection:bg-red-400 selection:text-white"])}"${_scopeId}><div class="flex justify-center flex-col md:flex-row md:space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(MainSlider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div><h1 class="flex items-center justify-center my-4 text-center font-bolder text-3xl text-gray-900 dark:text-slate-100"${_scopeId}>`);
            if (unref(rubric).icon) {
              _push2(`<span class="flex justify-center"${_scopeId}>${unref(rubric).icon ?? ""}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(rubric).title)} <span class="ml-2 px-1 py-0 text-xs font-semibold text-white bg-emerald-500 rounded-sm"${_scopeId}>${ssrInterpolate(unref(activeArticlesCount))}</span></h1>`);
            if (unref(rubric).short) {
              _push2(`<p class="flex items-center justify-center mb-4 tracking-wide text-center text-xl text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(unref(rubric).short)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-2 max-w-3xl mx-auto"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("searchByName"))} class="w-full px-3 py-1.5 bg-white dark:bg-gray-700 font-semibold text-md text-slate-600 dark:text-slate-100 border border-slate-500 dark:border-slate-400 rounded-sm focus:outline-none focus:ring focus:border-blue-300"${_scopeId}></div>`);
            if (filteredSections.value.length) {
              _push2(`<div class="space-y-8"${_scopeId}><!--[-->`);
              ssrRenderList(filteredSections.value, (section) => {
                _push2(`<div class="overflow-hidden"${_scopeId}><div class="p-6"${_scopeId}><h2 class="mb-2 text-2xl font-semibold text-amber-500 dark:text-red-200"${ssrRenderAttr("title", section.short)}${_scopeId}>${ssrInterpolate(section.title)}</h2>`);
                _push2(ssrRenderComponent(SectionArticlesPagination, {
                  articles: section.articles,
                  "items-per-page": unref(siteSettings).PublicCountArticle ? parseInt(unref(siteSettings).PublicCountArticle) : 2
                }, null, _parent2, _scopeId));
                if (section.banners && section.banners.length) {
                  _push2(`<div class="mt-4"${_scopeId}><div class="flex justify-center items-center flex-wrap"${_scopeId}><!--[-->`);
                  ssrRenderList(section.banners, (banner) => {
                    _push2(`<div class="w-full flex flex-col justify-center items-center"${_scopeId}>`);
                    if (banner.link) {
                      _push2(ssrRenderComponent(unref(Link), {
                        href: banner.link
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`<h3 class="mb-3 tracking-wide text-2xl font-semibold text-slate-500 dark:text-slate-200"${_scopeId2}>${ssrInterpolate(banner.title)}</h3>`);
                          } else {
                            return [
                              createVNode("h3", { class: "mb-3 tracking-wide text-2xl font-semibold text-slate-500 dark:text-slate-200" }, toDisplayString(banner.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                    } else {
                      _push2(`<h3 class="mb-3 tracking-wide text-xl font-semibold text-slate-500 dark:text-slate-200"${_scopeId}>${ssrInterpolate(banner.title)}</h3>`);
                    }
                    if (banner.images && banner.images.length > 0) {
                      _push2(`<div${_scopeId}>`);
                      if (banner.link) {
                        _push2(ssrRenderComponent(unref(Link), {
                          href: banner.link
                        }, {
                          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                            if (_push3) {
                              _push3(ssrRenderComponent(_sfc_main$3, {
                                images: banner.images
                              }, null, _parent3, _scopeId2));
                            } else {
                              return [
                                createVNode(_sfc_main$3, {
                                  images: banner.images
                                }, null, 8, ["images"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent2, _scopeId));
                      } else {
                        _push2(ssrRenderComponent(_sfc_main$3, {
                          images: banner.images
                        }, null, _parent2, _scopeId));
                      }
                      _push2(`</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (banner.short) {
                      _push2(`<p class="max-w-xl w-full mt-3 text-center p-1 tracking-wider text-lg font-semibold text-slate-600 dark:text-slate-300"${_scopeId}>${ssrInterpolate(banner.short)}</p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-gray-500 text-lg text-center"${_scopeId}>${ssrInterpolate(unref(t)("noData"))}</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode("title", null, toDisplayString(unref(rubric).title), 1),
                  createVNode("meta", {
                    name: "title",
                    content: unref(rubric).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: unref(rubric).meta_keywords || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "description",
                    content: unref(rubric).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:title",
                    content: unref(rubric).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: unref(rubric).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: "website"
                  }),
                  createVNode("meta", {
                    property: "og:url",
                    content: `/rubrics/${unref(rubric).url}`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image",
                    content: unref(rubric).icon || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:locale",
                    content: unref(rubric).locale || "ru_RU"
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: unref(rubric).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: unref(rubric).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: unref(rubric).icon || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.title",
                    content: unref(rubric).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.description",
                    content: unref(rubric).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.identifier",
                    content: `/rubrics/${unref(rubric).url}`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "DC.language",
                    content: unref(rubric).locale || "ru"
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
                  unref(rubric).icon ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "flex justify-center",
                    innerHTML: unref(rubric).icon
                  }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(unref(rubric).title) + " ", 1),
                  createVNode("span", { class: "ml-2 px-1 py-0 text-xs font-semibold text-white bg-emerald-500 rounded-sm" }, toDisplayString(unref(activeArticlesCount)), 1)
                ]),
                unref(rubric).short ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "flex items-center justify-center mb-4 tracking-wide text-center text-xl text-gray-700 dark:text-gray-300"
                }, toDisplayString(unref(rubric).short), 1)) : createCommentVNode("", true),
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
                filteredSections.value.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-8"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredSections.value, (section) => {
                    return openBlock(), createBlock("div", {
                      key: section.id,
                      class: "overflow-hidden"
                    }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h2", {
                          class: "mb-2 text-2xl font-semibold text-amber-500 dark:text-red-200",
                          title: section.short
                        }, toDisplayString(section.title), 9, ["title"]),
                        createVNode(SectionArticlesPagination, {
                          articles: section.articles,
                          "items-per-page": unref(siteSettings).PublicCountArticle ? parseInt(unref(siteSettings).PublicCountArticle) : 2
                        }, null, 8, ["articles", "items-per-page"]),
                        section.banners && section.banners.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4"
                        }, [
                          createVNode("div", { class: "flex justify-center items-center flex-wrap" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(section.banners, (banner) => {
                              return openBlock(), createBlock("div", {
                                key: banner.id,
                                class: "w-full flex flex-col justify-center items-center"
                              }, [
                                banner.link ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: banner.link
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h3", { class: "mb-3 tracking-wide text-2xl font-semibold text-slate-500 dark:text-slate-200" }, toDisplayString(banner.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("h3", {
                                  key: 1,
                                  class: "mb-3 tracking-wide text-xl font-semibold text-slate-500 dark:text-slate-200"
                                }, toDisplayString(banner.title), 1)),
                                banner.images && banner.images.length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                                  banner.link ? (openBlock(), createBlock(unref(Link), {
                                    key: 0,
                                    href: banner.link
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$3, {
                                        images: banner.images
                                      }, null, 8, ["images"])
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])) : (openBlock(), createBlock(_sfc_main$3, {
                                    key: 1,
                                    images: banner.images
                                  }, null, 8, ["images"]))
                                ])) : createCommentVNode("", true),
                                banner.short ? (openBlock(), createBlock("p", {
                                  key: 3,
                                  class: "max-w-xl w-full mt-3 text-center p-1 tracking-wider text-lg font-semibold text-slate-600 dark:text-slate-300"
                                }, toDisplayString(banner.short), 1)) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Default/Rubrics/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
