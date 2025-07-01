import { ref, mergeProps, unref, useSSRContext, computed, withCtx, createVNode, Transition, createBlock, openBlock, onMounted, onUnmounted, toDisplayString, createTextVNode, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./DefaultLayout-CmMnb_pW.js";
import { useI18n } from "vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "./LogoutButton-D8LBhtXS.js";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
const _sfc_main$2 = {
  __name: "LikeButton",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { article } = usePage().props;
    ref(article.likes);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        itemprop: "interactionStatistic",
        itemscope: "",
        itemtype: "http://schema.org/InteractionCounter"
      }, _attrs))}><meta itemprop="interactionType" content="http://schema.org/LikeAction"><meta itemprop="userInteractionCount"${ssrRenderAttr("content", unref(article).likes)}><div${ssrRenderAttr("title", unref(t)("like"))} class="w-12 px-1 py-0.5 flex flex-row items-center cursor-pointer rounded bg-slate-200 dark:bg-slate-700 hover:bg-opacity-75 active:bg-opacity-75 border-2 border-slate-400 transition-all duration-200 transform hover:scale-105 active:scale-95"><svg class="w-4 h-4 fill-current text-rose-400 hover:text-yellow-500 active:text-fuchsia-500 transition-all duration-200 transform" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg><span class="ml-1 font-semibold text-sm dark:text-slate-100">${ssrInterpolate(unref(article).likes)}</span></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Article/LikeButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ArticleImageMain",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      required: true
    },
    // Если нужно оборачивать изображение в ссылку
    link: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const currentIndex = ref(0);
    const totalImages = computed(() => props.images.length);
    const currentImage = computed(() => props.images[currentIndex.value]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full" }, _attrs))} data-v-5ba32efe>`);
      if (__props.link) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.link,
          class: "block w-full h-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", currentImage.value.webp_url || currentImage.value.url)}${ssrRenderAttr("alt", currentImage.value.alt)} class="w-full h-full object-cover" data-v-5ba32efe${_scopeId}>`);
            } else {
              return [
                createVNode(Transition, {
                  name: "fade",
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("img", {
                      key: currentImage.value.id,
                      src: currentImage.value.webp_url || currentImage.value.url,
                      alt: currentImage.value.alt,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"]))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<img${ssrRenderAttr("src", currentImage.value.webp_url || currentImage.value.url)}${ssrRenderAttr("alt", currentImage.value.alt)} class="w-full h-full object-cover" data-v-5ba32efe>`);
      }
      _push(`<button class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white px-2 py-1 rounded-r focus:outline-none" aria-label="Previous" data-v-5ba32efe> ❮ </button><button class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white px-2 py-1 rounded-l focus:outline-none" aria-label="Next" data-v-5ba32efe> ❯ </button><div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2" data-v-5ba32efe><!--[-->`);
      ssrRenderList(totalImages.value, (dot, index) => {
        _push(`<span class="${ssrRenderClass([currentIndex.value === index ? "bg-red-500" : "bg-slate-100", "cursor-pointer w-3 h-3 rounded-full border border-gray-500"])}" data-v-5ba32efe></span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Article/ArticleImageMain.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ArticleImageMain = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5ba32efe"]]);
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { article, recommendedArticles, siteSettings } = usePage().props;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({
        title: unref(article).title,
        "can-login": _ctx.$page.props.canLogin,
        "can-register": _ctx.$page.props.canRegister
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(unref(article).title)}</title><meta name="title"${ssrRenderAttr("content", unref(article).title || "")}${_scopeId2}><meta name="description"${ssrRenderAttr("content", unref(article).meta_desc || "")}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", unref(article).meta_keywords || "")}${_scopeId2}><meta name="author"${ssrRenderAttr("content", unref(article).author || "")}${_scopeId2}><meta name="viewport" content="width=device-width, initial-scale=1"${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", unref(article).title || "")}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", unref(article).meta_desc || "")}${_scopeId2}><meta property="og:type" content="article"${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", `/articles/${unref(article).url}`)}${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : "")}${_scopeId2}><meta property="og:locale"${ssrRenderAttr("content", unref(article).locale || "ru_RU")}${_scopeId2}><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", unref(article).title || "")}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", unref(article).meta_desc || "")}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : "")}${_scopeId2}><meta itemprop="name"${ssrRenderAttr("content", unref(article).title || "")}${_scopeId2}><meta itemprop="description"${ssrRenderAttr("content", unref(article).meta_desc || "")}${_scopeId2}><meta itemprop="image"${ssrRenderAttr("content", unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : "")}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("title", null, toDisplayString(unref(article).title), 1),
                    createVNode("meta", {
                      name: "title",
                      content: unref(article).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "description",
                      content: unref(article).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: unref(article).meta_keywords || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "author",
                      content: unref(article).author || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "viewport",
                      content: "width=device-width, initial-scale=1"
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: unref(article).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: unref(article).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: "article"
                    }),
                    createVNode("meta", {
                      property: "og:url",
                      content: `/articles/${unref(article).url}`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image",
                      content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:locale",
                      content: unref(article).locale || "ru_RU"
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: unref(article).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: unref(article).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      itemprop: "name",
                      content: unref(article).title || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      itemprop: "description",
                      content: unref(article).meta_desc || ""
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      itemprop: "image",
                      content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                    }, null, 8, ["content"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<article itemscope itemtype="https://schema.org/BlogPosting" class="${ssrRenderClass(["flex-1 p-4 selection:bg-red-400 selection:text-white", bgColorClass.value])}"${_scopeId}><header${_scopeId}><div class="flex items-center justify-center my-1"${_scopeId}><h1 itemprop="headline" class="text-center font-bolder text-3xl text-gray-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(unref(article).title)}</h1><div itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter"${_scopeId}><meta itemprop="interactionType" content="http://schema.org/ViewAction"${_scopeId}><meta itemprop="userInteractionCount"${ssrRenderAttr("content", unref(article).views)}${_scopeId}><span${ssrRenderAttr("title", unref(t)("views"))} class="ml-2 px-1 py-0.5 text-xs font-semibold text-white bg-emerald-500 rounded-full"${_scopeId}>${ssrInterpolate(unref(article).views)}</span></div></div><time itemprop="datePublished" datetime="{{ article.created_at.substring(0, 10) }}" class="flex items-center justify-center font-semibold text-sm text-orange-500 dark:text-orange-400"${_scopeId}>${ssrInterpolate(unref(article).created_at.substring(0, 10))}</time></header>`);
            if (unref(article).short) {
              _push2(`<div class="flex items-center justify-center my-3"${_scopeId}><p itemprop="description" class="text-center text-xl text-teal-700 dark:text-teal-200 mr-2"${_scopeId}>${ssrInterpolate(unref(article).short)}</p>`);
              _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(article).images && unref(article).images.length > 0) {
              _push2(`<div class="flex flex-col justify-center items-center" itemprop="image" itemscope itemtype="https://schema.org/ImageObject"${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleImageMain, {
                images: unref(article).images,
                link: `/articles/${unref(article).url}`,
                class: "max-w-4xl"
              }, null, _parent2, _scopeId));
              _push2(`<meta itemprop="width" content="800"${_scopeId}><meta itemprop="height" content="600"${_scopeId}>`);
              if (unref(article).images[0].caption) {
                _push2(`<div class="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 italic underline decoration-double" itemprop="caption"${_scopeId}>${ssrInterpolate(unref(article).images[0].caption)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(article).description) {
              _push2(`<div class="w-full max-w-4xl mx-auto my-4 p-2 text-center text-xl text-gray-700 dark:text-gray-200 border border-dashed border-slate-400 dark:border-slate-200" itemprop="articleBody"${_scopeId}>${unref(article).description ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(article).tags) {
              _push2(`<div class="flex justify-center items-center mb-3 font-semibold text-violet-600 dark:text-violet-300"${_scopeId}><!--[-->`);
              ssrRenderList(unref(article).tags, (tag, index) => {
                _push2(`<span${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/tags/${tag.slug}`,
                  itemprop: "keywords",
                  class: "hover:text-rose-400 hover:dark:text-rose-300"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(tag.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (index < unref(article).tags.length - 1) {
                  _push2(`<span${_scopeId}>, </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-center items-center"${_scopeId}>`);
            if (unref(article).author) {
              _push2(`<div class="font-semibold text-sky-600 dark:text-sky-300" itemprop="author"${_scopeId}><span class="mr-2"${_scopeId}>${ssrInterpolate(unref(article).author)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(recommendedArticles) && unref(recommendedArticles).length > 0) {
              _push2(`<div class="mt-4"${_scopeId}><h2 class="mb-4 tracking-wide text-center font-semibold text-xl text-orange-400 dark:text-orange-300"${_scopeId}>${ssrInterpolate(unref(t)("relatedArticles"))}: </h2><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(recommendedArticles), (rec) => {
                _push2(`<div class="p-4 border border-gray-300 rounded shadow"${_scopeId}><div class="relative w-full"${_scopeId}><div class="w-full aspect-[4/3] overflow-hidden"${_scopeId}>`);
                if (rec.images && rec.images.length > 0) {
                  _push2(`<img${ssrRenderAttr("src", rec.images[0].webp_url || rec.images[0].url)}${ssrRenderAttr("alt", rec.images[0].alt)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-400"${_scopeId}><span class="text-gray-500 dark:text-gray-700"${_scopeId}>${ssrInterpolate(unref(t)("noCurrentImage"))}</span></div>`);
                }
                _push2(`</div><div class="absolute bottom-0 left-0 w-full p-2 bg-slate-800 bg-opacity-75"${_scopeId}><div class="text-xs font-semibold text-yellow-200"${_scopeId}>${ssrInterpolate(rec.created_at.substring(0, 10))}</div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/articles/${rec.url}`,
                  class: "text-sm font-semibold text-white hover:text-amber-400"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(rec.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(rec.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode("title", null, toDisplayString(unref(article).title), 1),
                  createVNode("meta", {
                    name: "title",
                    content: unref(article).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "description",
                    content: unref(article).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: unref(article).meta_keywords || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "author",
                    content: unref(article).author || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: unref(article).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: unref(article).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: "article"
                  }),
                  createVNode("meta", {
                    property: "og:url",
                    content: `/articles/${unref(article).url}`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image",
                    content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:locale",
                    content: unref(article).locale || "ru_RU"
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: unref(article).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: unref(article).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    itemprop: "name",
                    content: unref(article).title || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    itemprop: "description",
                    content: unref(article).meta_desc || ""
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    itemprop: "image",
                    content: unref(article).images && unref(article).images.length > 0 ? unref(article).images[0].url : ""
                  }, null, 8, ["content"])
                ]),
                _: 1
              }),
              createVNode("article", {
                itemscope: "",
                itemtype: "https://schema.org/BlogPosting",
                class: ["flex-1 p-4 selection:bg-red-400 selection:text-white", bgColorClass.value]
              }, [
                createVNode("header", null, [
                  createVNode("div", { class: "flex items-center justify-center my-1" }, [
                    createVNode("h1", {
                      itemprop: "headline",
                      class: "text-center font-bolder text-3xl text-gray-900 dark:text-slate-100"
                    }, toDisplayString(unref(article).title), 1),
                    createVNode("div", {
                      itemprop: "interactionStatistic",
                      itemscope: "",
                      itemtype: "http://schema.org/InteractionCounter"
                    }, [
                      createVNode("meta", {
                        itemprop: "interactionType",
                        content: "http://schema.org/ViewAction"
                      }),
                      createVNode("meta", {
                        itemprop: "userInteractionCount",
                        content: unref(article).views
                      }, null, 8, ["content"]),
                      createVNode("span", {
                        title: unref(t)("views"),
                        class: "ml-2 px-1 py-0.5 text-xs font-semibold text-white bg-emerald-500 rounded-full"
                      }, toDisplayString(unref(article).views), 9, ["title"])
                    ])
                  ]),
                  createVNode("time", {
                    itemprop: "datePublished",
                    datetime: "{{ article.created_at.substring(0, 10) }}",
                    class: "flex items-center justify-center font-semibold text-sm text-orange-500 dark:text-orange-400"
                  }, toDisplayString(unref(article).created_at.substring(0, 10)), 1)
                ]),
                unref(article).short ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-center my-3"
                }, [
                  createVNode("p", {
                    itemprop: "description",
                    class: "text-center text-xl text-teal-700 dark:text-teal-200 mr-2"
                  }, toDisplayString(unref(article).short), 1),
                  createVNode(_sfc_main$2)
                ])) : createCommentVNode("", true),
                unref(article).images && unref(article).images.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex flex-col justify-center items-center",
                  itemprop: "image",
                  itemscope: "",
                  itemtype: "https://schema.org/ImageObject"
                }, [
                  createVNode(ArticleImageMain, {
                    images: unref(article).images,
                    link: `/articles/${unref(article).url}`,
                    class: "max-w-4xl"
                  }, null, 8, ["images", "link"]),
                  createVNode("meta", {
                    itemprop: "width",
                    content: "800"
                  }),
                  createVNode("meta", {
                    itemprop: "height",
                    content: "600"
                  }),
                  unref(article).images[0].caption ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-2 text-center text-sm text-gray-600 dark:text-gray-300 italic underline decoration-double",
                    itemprop: "caption"
                  }, toDisplayString(unref(article).images[0].caption), 1)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                unref(article).description ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "w-full max-w-4xl mx-auto my-4 p-2 text-center text-xl text-gray-700 dark:text-gray-200 border border-dashed border-slate-400 dark:border-slate-200",
                  innerHTML: unref(article).description,
                  itemprop: "articleBody"
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                unref(article).tags ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "flex justify-center items-center mb-3 font-semibold text-violet-600 dark:text-violet-300"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(article).tags, (tag, index) => {
                    return openBlock(), createBlock("span", {
                      key: tag.id
                    }, [
                      createVNode(unref(Link), {
                        href: `/tags/${tag.slug}`,
                        itemprop: "keywords",
                        class: "hover:text-rose-400 hover:dark:text-rose-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tag.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]),
                      index < unref(article).tags.length - 1 ? (openBlock(), createBlock("span", { key: 0 }, ", ")) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex justify-center items-center" }, [
                  unref(article).author ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "font-semibold text-sky-600 dark:text-sky-300",
                    itemprop: "author"
                  }, [
                    createVNode("span", { class: "mr-2" }, toDisplayString(unref(article).author), 1)
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$2)
                ]),
                unref(recommendedArticles) && unref(recommendedArticles).length > 0 ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "mt-4"
                }, [
                  createVNode("h2", { class: "mb-4 tracking-wide text-center font-semibold text-xl text-orange-400 dark:text-orange-300" }, toDisplayString(unref(t)("relatedArticles")) + ": ", 1),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(recommendedArticles), (rec) => {
                      return openBlock(), createBlock("div", {
                        key: rec.id,
                        class: "p-4 border border-gray-300 rounded shadow"
                      }, [
                        createVNode("div", { class: "relative w-full" }, [
                          createVNode("div", { class: "w-full aspect-[4/3] overflow-hidden" }, [
                            rec.images && rec.images.length > 0 ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: rec.images[0].webp_url || rec.images[0].url,
                              alt: rec.images[0].alt,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-400"
                            }, [
                              createVNode("span", { class: "text-gray-500 dark:text-gray-700" }, toDisplayString(unref(t)("noCurrentImage")), 1)
                            ]))
                          ]),
                          createVNode("div", { class: "absolute bottom-0 left-0 w-full p-2 bg-slate-800 bg-opacity-75" }, [
                            createVNode("div", { class: "text-xs font-semibold text-yellow-200" }, toDisplayString(rec.created_at.substring(0, 10)), 1),
                            createVNode(unref(Link), {
                              href: `/articles/${rec.url}`,
                              class: "text-sm font-semibold text-white hover:text-amber-400"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(rec.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Default/Articles/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
