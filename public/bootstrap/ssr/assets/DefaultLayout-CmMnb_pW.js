import { ref, computed, onMounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, onUnmounted, createBlock, createTextVNode, openBlock, nextTick, onBeforeUnmount, watch } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link, Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { A as ApplicationMark, a as _sfc_main$9, _ as _sfc_main$a } from "./ResponsiveNavLink-DqF2K04_.js";
import { _ as _sfc_main$8 } from "./LogoutButton-D8LBhtXS.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$b } from "./LocaleSelectOption-D2q2yRl9.js";
const _sfc_main$7 = {
  __name: "TopMenuRubrics",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const rubrics = ref([]);
    const currentRoute = computed(() => usePage().url);
    const fetchRubrics = async () => {
      try {
        const response = await fetch("/api/menu-rubrics");
        if (!response.ok) {
          console.error(`Ошибка при загрузке рубрик: ${response.status}`);
          return;
        }
        const data = await response.json();
        if (data.rubrics && Array.isArray(data.rubrics)) {
          rubrics.value = data.rubrics;
        } else {
          console.error("Ожидался массив rubrics, но получено:", data);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    };
    onMounted(() => {
      fetchRubrics();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap justify-center p-1" }, _attrs))}>`);
      if (rubrics.value.length) {
        _push(`<ul class="flex flex-wrap"><!--[-->`);
        ssrRenderList(rubrics.value, (rubric) => {
          _push(`<li>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/rubrics/${rubric.url}`,
            class: ["flex items-center", [
              "mx-2 pb-0.5 text-xs lg:text-sm xl:text-lg font-medium transition duration-300",
              currentRoute.value.includes(`/rubrics/${rubric.url}`) ? "border-b-2 border-red-400 dark:border-yellow-200 text-red-400 dark:text-yellow-200" : "text-slate-700 hover:text-red-400 dark:text-white dark:hover:text-yellow-200"
            ]]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="w-6 h-6 flex justify-center text-red-500"${_scopeId}>${rubric.icon ?? ""}</span><span${_scopeId}>${ssrInterpolate(rubric.title)}</span>`);
              } else {
                return [
                  createVNode("span", {
                    class: "w-6 h-6 flex justify-center text-red-500",
                    innerHTML: rubric.icon
                  }, null, 8, ["innerHTML"]),
                  createVNode("span", null, toDisplayString(rubric.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p class="text-slate-100">${ssrInterpolate(unref(t)("dataUploaded"))}</p>`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Rubric/TopMenuRubrics.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean
  },
  emits: ["toggleNavigationDropdown"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const { siteSettings } = usePage().props;
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
        attributeFilter: ["class"]
      });
    });
    onUnmounted(() => {
      if (observer)
        observer.disconnect();
    });
    const bgColorClass = computed(() => {
      return isDarkMode.value ? siteSettings.PublicDarkBackgroundColor : siteSettings.PublicLightBackgroundColor;
    });
    const topBarRef = ref(null);
    const mainNavRef = ref(null);
    const navPlaceholderRef = ref(null);
    const isNavFixed = ref(false);
    const topBarHeight = ref(0);
    const navHeight = ref(0);
    const showingNavigationDropdown = ref(false);
    const { auth } = usePage().props;
    const recalcLayout = () => {
      nextTick(() => {
        if (topBarRef.value) {
          topBarHeight.value = topBarRef.value.offsetHeight;
        }
        if (mainNavRef.value) {
          navHeight.value = mainNavRef.value.offsetHeight;
        }
        const scrollY = window.scrollY;
        if (scrollY >= topBarHeight.value) {
          if (!isNavFixed.value) {
            isNavFixed.value = true;
          }
        } else {
          if (isNavFixed.value) {
            isNavFixed.value = false;
          }
        }
        if (navPlaceholderRef.value) {
          navPlaceholderRef.value.style.height = isNavFixed.value ? `${navHeight.value}px` : "0px";
        }
      });
    };
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isNavFixed.value && navPlaceholderRef.value) {
          isNavFixed.value = false;
          navPlaceholderRef.value.style.height = "0px";
        }
        recalcLayout();
      }, 150);
    };
    onMounted(() => {
      recalcLayout();
      window.addEventListener("scroll", recalcLayout, { passive: true });
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", recalcLayout);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    });
    const headerBgColorClass = computed(() => {
      return isDarkMode.value ? siteSettings.PublicHeaderDarkBackgroundColor : siteSettings.PublicHeaderLightBackgroundColor;
    });
    const navClasses = computed(() => {
      return {
        "nav-fixed": isNavFixed.value,
        "shadow-md": isNavFixed.value
      };
    });
    const placeholderClasses = computed(() => {
      return {
        "header-placeholder": true,
        "active": isNavFixed.value
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="${ssrRenderClass([bgColorClass.value])}" data-v-3e7ba8cf><div class="max-w-12xl mx-auto px-4 sm:px-3 md:px-2 xl:px-6 py-2" data-v-3e7ba8cf><div class="flex items-center justify-between h-10" data-v-3e7ba8cf><div data-v-3e7ba8cf></div><div class="ml-2 flex items-center" data-v-3e7ba8cf>`);
      if (__props.canLogin) {
        _push(`<div class="flex items-center space-x-2 mr-8" data-v-3e7ba8cf>`);
        if (unref(auth).user) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            title: unref(t)("profile"),
            class: "flex items-center px-3 pb-0.5 text-sm font-semibold text-slate-900 hover:text-orange-500 dark:text-slate-100 dark:hover:text-yellow-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-orange-500 dark:focus:outline-yellow-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="shrink-0 h-5 w-5 mr-2" viewBox="0 0 24 24" data-v-3e7ba8cf${_scopeId}><path class="fill-current text-slate-400 dark:text-slate-400" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" data-v-3e7ba8cf${_scopeId}></path><path class="fill-current text-blue-500 dark:text-slate-200" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" data-v-3e7ba8cf${_scopeId}></path></svg> ${ssrInterpolate(unref(t)("profile"))}`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "shrink-0 h-5 w-5 mr-2",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      class: "fill-current text-slate-400 dark:text-slate-400",
                      d: "M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                    }),
                    createVNode("path", {
                      class: "fill-current text-blue-500 dark:text-slate-200",
                      d: "M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                    })
                  ])),
                  createTextVNode(" " + toDisplayString(unref(t)("profile")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(auth).user) {
          _push(`<form data-v-3e7ba8cf>`);
          _push(ssrRenderComponent(_sfc_main$8, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("logout"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("logout")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!--[-->`);
          if (__props.canRegister) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "px-3 pb-0.5 text-sm font-semibold text-slate-900 hover:text-orange-500 dark:text-slate-100 dark:hover:text-yellow-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-orange-500 dark:focus:outline-yellow-200"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(t)("register"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("register")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("login"),
            class: "px-3 pb-0.5 text-sm font-semibold text-slate-900 hover:text-orange-500 dark:text-slate-100 dark:hover:text-yellow-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-orange-500 dark:focus:outline-yellow-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("login"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("login")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="${ssrRenderClass(placeholderClasses.value)}" data-v-3e7ba8cf></div><nav class="${ssrRenderClass([[navClasses.value, headerBgColorClass.value], "py-1 border-t border-b border-dashed border-slate-400 dark:border-slate-100 relative z-10 transition-all duration-300 ease-in-out"])}" data-v-3e7ba8cf><div class="max-w-12xl mx-auto px-4 sm:px-3 md:px-2 xl:px-6" data-v-3e7ba8cf><div class="flex items-center justify-between h-10" data-v-3e7ba8cf><div class="flex items-center" data-v-3e7ba8cf>`);
      _push(ssrRenderComponent(ApplicationMark, { class: "block h-6 w-auto" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        isOpen: showingNavigationDropdown.value,
        class: "hidden md:flex flex-grow justify-center space-x-2 px-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, null, _parent));
      _push(`<div class="-me-2 flex items-center md:hidden" data-v-3e7ba8cf><button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out" data-v-3e7ba8cf><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" data-v-3e7ba8cf><path class="${ssrRenderClass({ hidden: showingNavigationDropdown.value, "inline-flex": !showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3e7ba8cf></path><path class="${ssrRenderClass({ hidden: !showingNavigationDropdown.value, "inline-flex": showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3e7ba8cf></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "md:hidden"])}" data-v-3e7ba8cf>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        isOpen: showingNavigationDropdown.value,
        class: "px-4 py-2 border-t dark:border-gray-700"
      }, null, _parent));
      if (__props.canLogin) {
        _push(`<div class="pt-2 pb-3 space-y-1" data-v-3e7ba8cf>`);
        if (unref(auth).user) {
          _push(ssrRenderComponent(_sfc_main$a, {
            href: _ctx.route("dashboard")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("profile"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("profile")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(auth).user) {
          _push(`<form class="w-fit ml-4" data-v-3e7ba8cf>`);
          _push(ssrRenderComponent(_sfc_main$8, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("logout"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("logout")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_sfc_main$a, {
            href: _ctx.route("login")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("login"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("login")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.canRegister) {
            _push(ssrRenderComponent(_sfc_main$a, {
              href: _ctx.route("register")
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(t)("register"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("register")), 1)
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
      _push(`</div></nav><!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Default/Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3e7ba8cf"]]);
const _sfc_main$5 = {
  __name: "ArticleImageSlider",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      required: true
    },
    // URL ссылки на статью, если нужно оборачивать изображение в ссылку
    link: {
      type: String,
      default: ""
    },
    // Альтернативный текст и заголовок (приоритет – данные из объекта изображения)
    alt: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const currentIndex = ref(0);
    let intervalId = null;
    onMounted(() => {
      if (props.images.length > 1) {
        intervalId = setInterval(() => {
          currentIndex.value = (currentIndex.value + 1) % props.images.length;
        }, 3e3);
      }
    });
    onBeforeUnmount(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });
    const currentImage = computed(() => {
      return props.images[currentIndex.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full" }, _attrs))}>`);
      if (__props.link) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.link,
          class: "block h-full p-4 border border-slate-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", currentImage.value.webp_url || currentImage.value.url)}${ssrRenderAttr("alt", __props.alt || currentImage.value.alt)}${ssrRenderAttr("title", __props.title || currentImage.value.caption)} class="w-full h-full object-cover shadow-md shadow-gray-600 transition-transform duration-300 hover:scale-105"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: currentImage.value.webp_url || currentImage.value.url,
                  alt: __props.alt || currentImage.value.alt,
                  title: __props.title || currentImage.value.caption,
                  class: "w-full h-full object-cover shadow-md shadow-gray-600 transition-transform duration-300 hover:scale-105"
                }, null, 8, ["src", "alt", "title"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<img${ssrRenderAttr("src", currentImage.value.webp_url || currentImage.value.url)}${ssrRenderAttr("alt", __props.alt || currentImage.value.alt)}${ssrRenderAttr("title", __props.title || currentImage.value.caption)} class="w-full h-full object-cover">`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Article/ArticleImageSlider.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "BannerImageSlider",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      required: true
    },
    // Альтернативный текст и заголовок (приоритет – данные из объекта изображения)
    alt: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const currentIndex = ref(0);
    let intervalId = null;
    onMounted(() => {
      if (props.images.length > 1) {
        intervalId = setInterval(() => {
          currentIndex.value = (currentIndex.value + 1) % props.images.length;
        }, 3e3);
      }
    });
    onBeforeUnmount(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });
    const currentImage = computed(() => {
      return props.images[currentIndex.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full p-4 border border-slate-400" }, _attrs))}><img${ssrRenderAttr("src", currentImage.value.webp_url || currentImage.value.url)}${ssrRenderAttr("alt", __props.alt || currentImage.value.alt)}${ssrRenderAttr("title", __props.title || currentImage.value.caption)} class="w-full h-full object-cover shadow-md shadow-gray-600 transition-transform duration-300 hover:scale-105"></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Banner/BannerImageSlider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "LeftSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { leftArticles, leftBanners, siteSettings } = usePage().props;
    const articles = computed(() => leftArticles || []);
    const banners = computed(() => leftBanners || []);
    const isCollapsed = ref(false);
    const sidebarClasses = computed(() => {
      return [
        "transition-all",
        "duration-300",
        "p-2",
        "w-full",
        // на маленьких экранах всегда full width
        isCollapsed.value ? "lg:w-8" : "lg:w-80"
      ].join(" ");
    });
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
      if (articles.value.length > 0) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: [sidebarClasses.value, bgColorClass.value]
        }, _attrs))} data-v-f8ae951a><div class="flex items-center justify-start" data-v-f8ae951a><button class="focus:outline-none"${ssrRenderAttr("title", unref(t)("toggleSidebar"))} data-v-f8ae951a>`);
        if (isCollapsed.value) {
          _push(`<svg class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor" data-v-f8ae951a><path d="M8 5v14l11-7z" data-v-f8ae951a></path></svg>`);
        } else {
          _push(`<svg class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor" data-v-f8ae951a><path d="M16 5v14l-11-7z" data-v-f8ae951a></path></svg>`);
        }
        _push(`</button>`);
        if (!isCollapsed.value) {
          _push(`<h2 class="w-full text-center text-xl font-semibold text-gray-900 dark:text-slate-100" data-v-f8ae951a>${ssrInterpolate(unref(t)("latestNews"))}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div style="${ssrRenderStyle(!isCollapsed.value ? null : { display: "none" })}" class="mt-4" data-v-f8ae951a><div class="flex flex-col items-center justify-center" data-v-f8ae951a><ul class="max-w-3xl" data-v-f8ae951a><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          _push(`<li class="mb-2 pb-2" data-v-f8ae951a>`);
          if (article.images && article.images.length > 0) {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "h-auto overflow-hidden"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    images: article.images,
                    link: `/articles/${article.url}`
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_sfc_main$5, {
                      images: article.images,
                      link: `/articles/${article.url}`
                    }, null, 8, ["images", "link"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "h-auto flex items-center justify-center bg-gray-200 dark:bg-gray-400"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-gray-500 dark:text-gray-700" data-v-f8ae951a${_scopeId}>${ssrInterpolate(unref(t)("noCurrentImage"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500 dark:text-gray-700" }, toDisplayString(unref(t)("noCurrentImage")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<div class="px-3 my-1" data-v-f8ae951a><div class="text-center text-xs font-semibold text-orange-500 dark:text-orange-400" data-v-f8ae951a>${ssrInterpolate(article.created_at.substring(0, 10))}</div><h3 class="text-md font-semibold text-blue-900 dark:text-white" data-v-f8ae951a>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/articles/${article.url}`,
            class: "hover:text-blue-600 dark:hover:text-blue-400"
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
          _push(`</h3></div><div class="flex flex-wrap items-center p-2 border border-dashed border-slate-400 dark:border-slate-200" data-v-f8ae951a><p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200" data-v-f8ae951a>${ssrInterpolate(article.short)}</p></div></li>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(banners.value, (banner) => {
          _push(`<li class="mb-2 pb-2" data-v-f8ae951a>`);
          if (banner.link) {
            _push(ssrRenderComponent(unref(Link), {
              href: banner.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="px-3 my-1" data-v-f8ae951a${_scopeId}><h3 class="text-center text-lg font-semibold text-teal-600 dark:text-yellow-200" data-v-f8ae951a${_scopeId}>${ssrInterpolate(banner.title)}</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-3 my-1" }, [
                      createVNode("h3", { class: "text-center text-lg font-semibold text-teal-600 dark:text-yellow-200" }, toDisplayString(banner.title), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<div class="px-3 my-1" data-v-f8ae951a><h3 class="text-center text-lg font-semibold text-teal-600 dark:text-yellow-200" data-v-f8ae951a>${ssrInterpolate(banner.title)}</h3></div>`);
          }
          if (banner.images && banner.images.length > 0) {
            _push(`<div data-v-f8ae951a>`);
            if (banner.link) {
              _push(ssrRenderComponent(unref(Link), {
                href: banner.link
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_sfc_main$4, {
                      images: banner.images
                    }, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        images: banner.images
                      }, null, 8, ["images"])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(ssrRenderComponent(_sfc_main$4, {
                images: banner.images
              }, null, _parent));
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div></div></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Partials/LeftSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LeftSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f8ae951a"]]);
const _sfc_main$2 = {
  __name: "RightSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { rightArticles, rightBanners, siteSettings } = usePage().props;
    const articles = computed(() => rightArticles || []);
    const banners = computed(() => rightBanners || []);
    const isCollapsed = ref(false);
    const sidebarClasses = computed(() => {
      return [
        "transition-all",
        "duration-300",
        "p-2",
        "w-full",
        // на маленьких экранах всегда full width
        isCollapsed.value ? "lg:w-8" : "lg:w-80"
      ].join(" ");
    });
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
      if (articles.value.length > 0) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: [sidebarClasses.value, bgColorClass.value]
        }, _attrs))} data-v-08fd10c2><div class="flex items-center justify-center" data-v-08fd10c2>`);
        if (!isCollapsed.value) {
          _push(`<h2 class="w-full text-center text-xl font-semibold text-gray-900 dark:text-slate-100" data-v-08fd10c2>${ssrInterpolate(unref(t)("latestNews"))}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="focus:outline-none"${ssrRenderAttr("title", unref(t)("toggleSidebar"))} data-v-08fd10c2>`);
        if (isCollapsed.value) {
          _push(`<svg class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor" data-v-08fd10c2><path d="M16 5v14l-11-7z" data-v-08fd10c2></path></svg>`);
        } else {
          _push(`<svg class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor" data-v-08fd10c2><path d="M8 5v14l11-7z" data-v-08fd10c2></path></svg>`);
        }
        _push(`</button></div><div style="${ssrRenderStyle(!isCollapsed.value ? null : { display: "none" })}" class="mt-4" data-v-08fd10c2><div class="flex flex-col items-center justify-center" data-v-08fd10c2><ul class="max-w-xl" data-v-08fd10c2><!--[-->`);
        ssrRenderList(banners.value, (banner) => {
          _push(`<li class="mb-2 pb-2" data-v-08fd10c2>`);
          if (banner.images && banner.images.length > 0) {
            _push(`<div data-v-08fd10c2>`);
            if (banner.link) {
              _push(ssrRenderComponent(unref(Link), {
                href: banner.link
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_sfc_main$4, {
                      images: banner.images
                    }, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        images: banner.images
                      }, null, 8, ["images"])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(ssrRenderComponent(_sfc_main$4, {
                images: banner.images
              }, null, _parent));
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="mt-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-300" data-v-08fd10c2>${ssrInterpolate(banner.short)}</p></li>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          _push(`<li class="mb-2 pb-2" data-v-08fd10c2>`);
          if (article.images && article.images.length > 0) {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "h-auto overflow-hidden"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    images: article.images,
                    link: `/articles/${article.url}`
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_sfc_main$5, {
                      images: article.images,
                      link: `/articles/${article.url}`
                    }, null, 8, ["images", "link"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: `/articles/${article.url}`,
              class: "h-auto flex items-center justify-center bg-gray-200 dark:bg-gray-400"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-gray-500 dark:text-gray-700" data-v-08fd10c2${_scopeId}>${ssrInterpolate(unref(t)("noCurrentImage"))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500 dark:text-gray-700" }, toDisplayString(unref(t)("noCurrentImage")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<div class="px-3 my-1" data-v-08fd10c2><div class="text-center text-xs font-semibold text-orange-500 dark:text-orange-400" data-v-08fd10c2>${ssrInterpolate(article.created_at.substring(0, 10))}</div><h3 class="text-md font-semibold text-blue-900 dark:text-white" data-v-08fd10c2>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/articles/${article.url}`,
            class: "hover:text-blue-600 dark:hover:text-blue-400"
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
          _push(`</h3></div><div class="flex flex-wrap items-center p-2 border border-dashed border-slate-400 dark:border-slate-200" data-v-08fd10c2><p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200" data-v-08fd10c2>${ssrInterpolate(article.short)}</p></div></li>`);
        });
        _push(`<!--]--></ul></div></div></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Default/Partials/RightSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const RightSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-08fd10c2"]]);
const _sfc_main$1 = {
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean
  },
  setup(__props) {
    const { t, locale } = useI18n();
    const { auth } = usePage().props;
    const selectedLocale = ref(locale.value);
    watch(selectedLocale, (newLocale) => {
      if (newLocale !== locale.value) {
        locale.value = newLocale;
        const segments = window.location.pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/") + window.location.search;
        Inertia.visit(newPath, { preserveState: false, preserveScroll: true });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "sticky px-4 py-0.5 bottom-0 bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 z-20" }, _attrs))}><div class="flex items-center justify-center sm:justify-between flex-wrap"><div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <a href="/" target="_blank" class="font-semibold text-red-400 hover:text-rose-300">Pulsar CMS</a> ${ssrInterpolate(unref(t)("allRightsReserved"))}</div>`);
      if (unref(auth).user) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.index"),
          title: unref(t)("administer"),
          class: "flex items-center px-3 py-1 text-md font-semibold text-orange-400 hover:text-rose-300 dark:text-violet-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="shrink-0 h-5 w-5 mr-2" viewBox="0 0 24 24"${_scopeId}><path class="fill-current text-slate-600" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"${_scopeId}></path><path class="fill-current text-slate-400" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"${_scopeId}></path><path class="fill-current text-slate-600" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"${_scopeId}></path><path class="fill-current text-slate-400" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"${_scopeId}></path></svg> ${ssrInterpolate(unref(t)("administer"))}`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "shrink-0 h-5 w-5 mr-2",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    class: "fill-current text-slate-600",
                    d: "M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                  }),
                  createVNode("path", {
                    class: "fill-current text-slate-400",
                    d: "M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                  }),
                  createVNode("path", {
                    class: "fill-current text-slate-600",
                    d: "M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                  }),
                  createVNode("path", {
                    class: "fill-current text-slate-400",
                    d: "M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                  })
                ])),
                createTextVNode(" " + toDisplayString(unref(t)("administer")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="flex items-center btn px-3 text-slate-900 dark:text-slate-100 rounded-sm border-2 border-slate-400 my-2 mx-1 sm:my-0 sm:mx-0"><svg class="w-4 h-4 fill-current text-red-400 shrink-0 mr-2" viewBox="0 0 16 16"><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path></svg> ${ssrInterpolate(unref(t)("clearCache"))}</button><div class="flex items-center space-x-2"><a href="https://t.me/k_a_v_www" target="_blank" class="flex items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.175 8.89l-1.4 6.63c-.105.467-.405.578-.82.36l-2.27-1.67-1.093 1.054c-.12.12-.222.222-.45.222l.168-2.39 4.35-3.923c.19-.168-.04-.263-.29-.095L8.78 11.167l-2.42-.76c-.464-.14-.474-.464.096-.684l9.452-3.65c.44-.16.82.108.66.717z"></path></svg><span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(t)("supportService"))}</span></a>`);
      _push(ssrRenderComponent(_sfc_main$b, {
        modelValue: selectedLocale.value,
        "onUpdate:modelValue": ($event) => selectedLocale.value = $event
      }, null, _parent));
      _push(`</div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Default/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  props: {
    title: String,
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    const { siteSettings } = usePage().props;
    const { props: pageProps } = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, null, _parent));
      _push(ssrRenderComponent(Header, {
        "can-login": __props.canLogin,
        "can-register": __props.canRegister
      }, null, _parent));
      _push(`<main class="min-h-screen flex justify-center flex-col lg:flex-row tracking-wider">`);
      if (!unref(siteSettings).ViewLeftColumn || unref(siteSettings).ViewLeftColumn === "true") {
        _push(ssrRenderComponent(LeftSidebar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (!unref(siteSettings).ViewRightColumn || unref(siteSettings).ViewRightColumn === "true") {
        _push(ssrRenderComponent(RightSidebar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "can-login": __props.canLogin,
        "can-register": __props.canRegister
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/DefaultLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$4 as a,
  _sfc_main$5 as b
};
