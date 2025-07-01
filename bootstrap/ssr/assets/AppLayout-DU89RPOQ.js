import { mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext, ref, watch, onMounted, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, Fragment, renderList, computed, renderSlot, onUnmounted } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Link, router, usePage, Head } from "@inertiajs/vue3";
import { D as DigitalClock, _ as _sfc_main$a, a as _sfc_main$b, S as ScrollButtons } from "./ScrollButtons-DpnzINGM.js";
import { _ as _sfc_main$9, A as ApplicationMark, a as _sfc_main$c } from "./ResponsiveNavLink-DqF2K04_.js";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$d } from "./LocaleSelectOption-D2q2yRl9.js";
import { a as authImage } from "./auth-image-CfsIGyOn.js";
const _sfc_main$8 = {
  __name: "ResponsiveNavLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pt-2 pb-3 space-y-1" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$9, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("dashboard"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        href: _ctx.route("rubrics.index"),
        active: _ctx.route().current("rubrics.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("rubrics"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("rubrics")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        href: _ctx.route("articles.index"),
        active: _ctx.route().current("articles.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("posts"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("posts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Links/ResponsiveNavLinks.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "TopPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const isPanelOpen = ref(false);
    const hexInput = ref("");
    const rgbInput = ref("");
    const rangeInput = ref(99);
    const hexToRgb = (hex) => {
      if (hex.length !== 6)
        return "";
      const bigint = parseInt(hex, 16);
      const r = bigint >> 16 & 255;
      const g = bigint >> 8 & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };
    const rgbToHex = (rgb) => {
      const rgbArray = rgb.split(",").map(Number);
      if (rgbArray.length !== 3 || rgbArray.some(isNaN))
        return "";
      return rgbArray.map((num) => num.toString(16).padStart(2, "0")).join("");
    };
    const updateWidgetPanelColor = () => {
      const opacity = rangeInput.value / 100;
      let color;
      if (hexInput.value) {
        color = `#${hexInput.value}`;
      } else if (rgbInput.value) {
        color = `rgb(${rgbInput.value})`;
      } else {
        color = "rgba(21,94,117,1)";
      }
      const widgetPanel = document.getElementById("widgetPanel");
      if (widgetPanel) {
        widgetPanel.style.backgroundColor = color;
        widgetPanel.style.opacity = opacity;
      }
    };
    const loadWidgetPanelValues = async () => {
      try {
        const response = await axios.get("/api/settings/widget-panel");
        const { color, opacity } = response.data;
        if (color && opacity !== void 0) {
          hexInput.value = color.startsWith("#") ? color.substring(1) : rgbToHex(color);
          rgbInput.value = hexToRgb(hexInput.value);
          rangeInput.value = opacity * 100;
        }
      } catch (error) {
        console.error("Error loading widget panel values:", error);
      }
    };
    watch(hexInput, (newHex) => {
      rgbInput.value = hexToRgb(newHex);
      updateWidgetPanelColor();
    });
    watch(rgbInput, (newRgb) => {
      hexInput.value = rgbToHex(newRgb);
      updateWidgetPanelColor();
    });
    watch(rangeInput, () => {
      updateWidgetPanelColor();
    });
    onMounted(() => {
      loadWidgetPanelValues();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ba75cc86><button class="fixed top-0 right-4 z-50 hidden md:inline-block px-3 py-3 cursor-pointer" data-v-ba75cc86><svg class="w-8 h-8" viewBox="0 0 20 20" data-v-ba75cc86><circle fill="none" class="stroke-red-300 dark:stroke-violet-500" cx="9.997" cy="10" r="3.31" data-v-ba75cc86></circle><path fill="none" class="stroke-red-300 dark:stroke-violet-500" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z" data-v-ba75cc86></path></svg></button>`);
      if (isPanelOpen.value) {
        _push(`<div class="fixed top-0 left-0 right-0 bg-slate-700 dark:bg-slate-100 bg-opacity-90 dark:bg-opacity-90 shadow-md font-semibold text-center text-lg z-40 h-16 py-4 overflow-y-auto flex items-center justify-center space-x-4" data-v-ba75cc86><form class="flex items-center space-x-2" data-v-ba75cc86><span class="text-teal-200 dark:text-teal-600" data-v-ba75cc86>HEX:#</span><input maxlength="6" size="6" id="out" name="out"${ssrRenderAttr("value", hexInput.value)} class="border rounded px-2 py-1 w-20 text-lg" data-v-ba75cc86><span class="text-red-200 dark:text-red-400" data-v-ba75cc86>RGB:</span><input maxlength="12" size="12" name="out2"${ssrRenderAttr("value", rgbInput.value)} class="border rounded px-2 py-1 w-32 text-lg" data-v-ba75cc86><input type="range" class="input-range ml-2" id="inputr" name="inputr" min="0" max="99"${ssrRenderAttr("value", rangeInput.value)} data-v-ba75cc86></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/User/TopPanel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const TopPanel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-ba75cc86"]]);
const _sfc_main$6 = {
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    title: String,
    currentTime: String,
    showingNavigationDropdown: Boolean
  },
  emits: ["toggleNavigationDropdown"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const switchToTeam = (team) => {
      router.put(
        route("current-team.update"),
        {
          team_id: team.id
        },
        {
          preserveState: false
        }
      );
    };
    const logout = () => {
      router.post(route("logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="sticky top-0 bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 z-20">`);
      _push(ssrRenderComponent(TopPanel, null, null, _parent));
      _push(`<nav class="border-b border-gray-100"><div class="max-w-full mx-auto px-4 sm:px-0"><div class="flex items-center justify-between h-16"><div class="flex items-center justify-center"><div class="shrink-0 flex items-center md:hidden">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationMark, { class: "block h-9 w-auto" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationMark, { class: "block h-9 w-auto" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DigitalClock, { class: "relative z-10" }, null, _parent));
      _push(`</div><div class="hidden sm:flex sm:items-center sm:ms-6"><div class="ms-3 relative">`);
      _push(ssrRenderComponent(_sfc_main$a, {
        align: "right",
        width: "60",
        class: "relative z-10"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$page.props.jetstream.managesProfilePhotos) {
              _push2(`<button class="flex items-center px-2 py-1 font-semibold text-lg text-sky-600 dark:text-slate-100 border-2 border-transparent rounded-full focus:outline-none focus:border-gray-400 transition"${_scopeId}><img class="h-8 w-8 mr-2 rounded-full object-cover"${ssrRenderAttr("src", _ctx.$page.props.auth.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.auth.user.name)}${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</span></button>`);
            } else {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center bg-white active:bg-gray-50 px-3 py-2 border border-transparent rounded-md text-md leading-4 font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"${_scopeId}></path></svg></button></span>`);
            }
          } else {
            return [
              _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock("button", {
                key: 0,
                class: "flex items-center px-2 py-1 font-semibold text-lg text-sky-600 dark:text-slate-100 border-2 border-transparent rounded-full focus:outline-none focus:border-gray-400 transition"
              }, [
                createVNode("img", {
                  class: "h-8 w-8 mr-2 rounded-full object-cover",
                  src: _ctx.$page.props.auth.user.profile_photo_url,
                  alt: _ctx.$page.props.auth.user.name
                }, null, 8, ["src", "alt"]),
                createVNode("span", null, toDisplayString(_ctx.$page.props.auth.user.email), 1)
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "inline-flex rounded-md"
              }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center bg-white active:bg-gray-50 px-3 py-2 border border-transparent rounded-md text-md leading-4 font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                    })
                  ]))
                ])
              ]))
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block px-4 py-2 text-md text-slate-400"${_scopeId}>${ssrInterpolate(unref(t)("accountManagement"))}</div>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              href: _ctx.route("profile.show")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("profile"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("profile")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.$page.props.jetstream.hasApiFeatures) {
              _push2(ssrRenderComponent(_sfc_main$b, {
                href: _ctx.route("api-tokens.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("apiTokens"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("apiTokens")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t border-gray-200"${_scopeId}></div><form${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$b, { as: "button" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("logout"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("logout")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("div", { class: "block px-4 py-2 text-md text-slate-400" }, toDisplayString(unref(t)("accountManagement")), 1),
              createVNode(_sfc_main$b, {
                href: _ctx.route("profile.show")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("profile")), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(_sfc_main$b, {
                key: 0,
                href: _ctx.route("api-tokens.index")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("apiTokens")), 1)
                ]),
                _: 1
              }, 8, ["href"])) : createCommentVNode("", true),
              createVNode("div", { class: "border-t border-gray-200" }),
              createVNode("form", {
                onSubmit: withModifiers(logout, ["prevent"])
              }, [
                createVNode(_sfc_main$b, { as: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("logout")), 1)
                  ]),
                  _: 1
                })
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="ms-3 relative">`);
      if (_ctx.$page.props.jetstream.hasTeamFeatures) {
        _push(ssrRenderComponent(_sfc_main$a, {
          align: "right",
          width: "60",
          class: "relative z-10"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center bg-white dark:bg-slate-500 active:bg-gray-50 px-3 py-2 border border-transparent rounded-md text-md leading-4 font-medium text-slate-500 dark:text-slate-100 hover:text-slate-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.current_team.name)} <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"${_scopeId}></path></svg></button></span>`);
            } else {
              return [
                createVNode("span", { class: "inline-flex rounded-md" }, [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex items-center bg-white dark:bg-slate-500 active:bg-gray-50 px-3 py-2 border border-transparent rounded-md text-md leading-4 font-medium text-slate-500 dark:text-slate-100 hover:text-slate-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                  }, [
                    createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "ms-2 -me-0.5 h-4 w-4",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      })
                    ]))
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-60"${_scopeId}><div class="block px-4 py-2 text-md text-slate-400"${_scopeId}>${ssrInterpolate(unref(t)("teamManagement"))}</div>`);
              _push2(ssrRenderComponent(_sfc_main$b, {
                href: _ctx.route("teams.show", _ctx.$page.props.auth.user.current_team)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("teamSettings"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("teamSettings")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (_ctx.$page.props.jetstream.canCreateTeams) {
                _push2(ssrRenderComponent(_sfc_main$b, {
                  href: _ctx.route("teams.create")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t)("createNewTeam"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t)("createNewTeam")), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.$page.props.auth.user.all_teams.length > 1) {
                _push2(`<!--[--><div class="w-60 border-t border-gray-200"${_scopeId}></div><div class="block px-4 py-2 text-md text-slate-400"${_scopeId}>${ssrInterpolate(unref(t)("switchTeams"))}</div><!--[-->`);
                ssrRenderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                  _push2(`<form${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$b, { as: "button" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center"${_scopeId2}>`);
                        if (team.id == _ctx.$page.props.auth.user.current_team_id) {
                          _push3(`<svg class="me-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div${_scopeId2}>${ssrInterpolate(team.name)}</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center" }, [
                            team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "me-2 h-5 w-5 text-green-400",
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, toDisplayString(team.name), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</form>`);
                });
                _push2(`<!--]--><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "w-60" }, [
                  createVNode("div", { class: "block px-4 py-2 text-md text-slate-400" }, toDisplayString(unref(t)("teamManagement")), 1),
                  createVNode(_sfc_main$b, {
                    href: _ctx.route("teams.show", _ctx.$page.props.auth.user.current_team)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("teamSettings")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  _ctx.$page.props.jetstream.canCreateTeams ? (openBlock(), createBlock(_sfc_main$b, {
                    key: 0,
                    href: _ctx.route("teams.create")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("createNewTeam")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  _ctx.$page.props.auth.user.all_teams.length > 1 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("div", { class: "w-60 border-t border-gray-200" }),
                    createVNode("div", { class: "block px-4 py-2 text-md text-slate-400" }, toDisplayString(unref(t)("switchTeams")), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                      return openBlock(), createBlock("form", {
                        key: team.id,
                        onSubmit: withModifiers(($event) => switchToTeam(team), ["prevent"])
                      }, [
                        createVNode(_sfc_main$b, { as: "button" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "me-2 h-5 w-5 text-green-400",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                              ])) : createCommentVNode("", true),
                              createVNode("div", null, toDisplayString(team.name), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ], 40, ["onSubmit"]);
                    }), 128))
                  ], 64)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mx-2 flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$c, { class: "relative z-10" }, null, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-slate-500 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({ hidden: __props.showingNavigationDropdown, "inline-flex": !__props.showingNavigationDropdown })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({ hidden: !__props.showingNavigationDropdown, "inline-flex": __props.showingNavigationDropdown })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: __props.showingNavigationDropdown, hidden: !__props.showingNavigationDropdown }, "sm:hidden"])}">`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(`</div></nav></div>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-slate-100 dark:bg-sky-900 shadow"><div class="max-w-7xl mx-auto py-4 px-4 sm:px-4 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/User/Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SidebarLink",
  __ssrInlineRender: true,
  props: {
    href: String,
    active: Boolean,
    expanded: Boolean
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return props.active ? "flex items-center px-1 pt-1 text-md font-medium leading-5 text-yellow-100 focus:outline-none transition duration-150 ease-in-out" : "flex items-center px-1 pt-1 text-md font-medium leading-5 text-slate-300 hover:text-yellow-100 focus:outline-none focus:text-yellow-100 transition duration-150 ease-in-out";
    });
    const containerClasses = computed(() => {
      return props.expanded ? "mb-2" : "mb-4";
    });
    const textClasses = computed(() => {
      return props.expanded ? "ml-3 opacity-100" : "ml-3 opacity-0 whitespace-nowrap overflow-hidden";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClasses.value }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.href,
        class: classes.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<span class="${ssrRenderClass([textClasses.value, "text-lg font-medium transition-opacity duration-200 max-w-full"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "text", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode("span", {
                class: ["text-lg font-medium transition-opacity duration-200 max-w-full", textClasses.value]
              }, [
                renderSlot(_ctx.$slots, "text")
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Links/SidebarLink.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "SidebarGroupLink",
  __ssrInlineRender: true,
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard"),
        expanded: props.expanded
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"${_scopeId}><path class="fill-current text-blue-500" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"${_scopeId}></path><path class="fill-current text-blue-600" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"${_scopeId}></path><path class="fill-current text-blue-200" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "shrink-0 h-6 w-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  class: "fill-current text-blue-500",
                  d: "M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                }),
                createVNode("path", {
                  class: "fill-current text-blue-600",
                  d: "M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                }),
                createVNode("path", {
                  class: "fill-current text-blue-200",
                  d: "M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                })
              ]))
            ];
          }
        }),
        text: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("dashboard"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("rubrics.index"),
        active: _ctx.route().current("rubrics.index"),
        expanded: props.expanded
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"${_scopeId}><circle class="fill-current text-blue-600" cx="16" cy="8" r="8"${_scopeId}></circle><circle class="fill-current text-blue-400" cx="8" cy="16" r="8"${_scopeId}></circle></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "shrink-0 h-6 w-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("circle", {
                  class: "fill-current text-blue-600",
                  cx: "16",
                  cy: "8",
                  r: "8"
                }),
                createVNode("circle", {
                  class: "fill-current text-blue-400",
                  cx: "8",
                  cy: "16",
                  r: "8"
                })
              ]))
            ];
          }
        }),
        text: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("rubrics"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("rubrics")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("articles.index"),
        active: _ctx.route().current("articles.index"),
        expanded: props.expanded
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"${_scopeId}><path class="fill-current text-blue-600" d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"${_scopeId}></path><path class="fill-current text-blue-600" d="M1 1h22v23H1z"${_scopeId}></path><path class="fill-current text-blue-400" d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "shrink-0 h-6 w-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  class: "fill-current text-blue-600",
                  d: "M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                }),
                createVNode("path", {
                  class: "fill-current text-blue-600",
                  d: "M1 1h22v23H1z"
                }),
                createVNode("path", {
                  class: "fill-current text-blue-400",
                  d: "M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                })
              ]))
            ];
          }
        }),
        text: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("posts"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("posts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/User/Links/SidebarGroupLink.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: ["sidebarOpen", "sidebarTitle"],
  emits: ["close-sidebar"],
  setup(__props, { emit: __emit }) {
    library.add(fas);
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const trigger = ref(null);
    const sidebar = ref(null);
    const sidebarExpanded = ref(localStorage.getItem("sidebar-expanded") === "true");
    const sidebarHexColor = ref("155e75");
    const sidebarOpacity = ref(0.99);
    ref("");
    const sidebarStyle = computed(() => {
      const hexColor = `#${sidebarHexColor.value}`;
      const opacity = sidebarOpacity.value;
      return {
        backgroundColor: hexColor,
        opacity
      };
    });
    const rgbToHex = (rgb) => {
      const rgbArray = rgb.split(",").map(Number);
      if (rgbArray.length !== 3 || rgbArray.some(isNaN))
        return "";
      return rgbArray.map((num) => num.toString(16).padStart(2, "0")).join("");
    };
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value)
        return;
      if (!props.sidebarOpen || sidebar.value.contains(target) || trigger.value.contains(target))
        return;
      emit("close-sidebar");
    };
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27)
        return;
      emit("close-sidebar");
    };
    const loadWidgetPanelSettings = async () => {
      try {
        const response = await axios.get("/api/settings/widget-panel");
        const { color, opacity } = response.data;
        if (color && opacity !== void 0) {
          sidebarHexColor.value = color.startsWith("#") ? color.substring(1) : rgbToHex(color);
          sidebarOpacity.value = parseFloat(opacity);
        }
      } catch (error) {
        console.error("Ошибка при загрузке настроек сайдбара:", error);
      }
    };
    onMounted(async () => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
      await loadWidgetPanelSettings();
    });
    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });
    watch(sidebarExpanded, (newVal) => {
      localStorage.setItem("sidebar-expanded", newVal.toString());
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([__props.sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none", "fixed inset-0 z-20 bg-cyan-800 dark:bg-gray-700 dark:border-r dark:border-gray-600 bg-opacity-30 md:hidden md:z-auto transition-opacity duration-200"])}" aria-hidden="true"></div><div id="sidebar" style="${ssrRenderStyle(sidebarStyle.value)}" class="${ssrRenderClass([{ "translate-x-0": __props.sidebarOpen, "-translate-x-64": !__props.sidebarOpen, "hidden md:flex": true, "md:w-20": !sidebarExpanded.value, "md:!w-80 2xl:!w-80": sidebarExpanded.value }, "h-screen absolute z-40 w-80 left-0 top-0 pb-16 p-4 flex flex-col bg-cyan-800 dark:bg-gray-700 dark:border-r dark:border-gray-600 md:static md:left-auto md:top-auto md:translate-x-0 md:overflow-y-auto overflow-y-scroll no-scrollbar transition-all duration-200 ease-in-out"])}"><div class="flex justify-around items-center mb-10 pr-3 md:px-0"><button title="t(&#39;toggleSidebar&#39;)"><svg class="${ssrRenderClass([{ "rotate-180": sidebarExpanded.value }, "mr-2 w-8 h-8 py-1 fill-current transition-transform duration-200 border border-gray-400 hover:border-red-400"])}" viewBox="0 0 24 24"><path class="text-slate-400 hover:text-red-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"></path><path class="text-slate-600" d="M3 23H1V1h2z"></path></svg></button>`);
      if (sidebarExpanded.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ApplicationMark, { class: "h-9 w-auto 2xl:block" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(ApplicationMark, { class: "h-9 w-auto 2xl:block" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (sidebarExpanded.value) {
        _push(`<span class="text-indigo-300 font-semibold text-lg hidden 2xl:block">Pulsar CRM ${ssrInterpolate(__props.sidebarTitle)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (sidebarExpanded.value) {
        _push(ssrRenderComponent(unref(FontAwesomeIcon), {
          icon: ["fas", "sliders"],
          class: "text-white"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2">`);
      if (sidebarExpanded.value) {
        _push(`<span class="flex justify-center text-md uppercase text-white font-semibold pl-3">${ssrInterpolate(unref(t)("pages"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, { expanded: sidebarExpanded.value }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/User/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
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
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "sticky px-4 py-2 bottom-0 bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 z-20" }, _attrs))}><div class="flex items-center justify-between flex-wrap"><div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <a href="/" target="_blank" class="font-semibold text-red-400 hover:text-rose-300">DigitalPro.</a> ${ssrInterpolate(unref(t)("allRightsReserved"))}</div><div class="flex items-center space-x-2"><a href="https://t.me/k_a_v_www" target="_blank" class="flex items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.175 8.89l-1.4 6.63c-.105.467-.405.578-.82.36l-2.27-1.67-1.093 1.054c-.12.12-.222.222-.45.222l.168-2.39 4.35-3.923c.19-.168-.04-.263-.29-.095L8.78 11.167l-2.42-.76c-.464-.14-.474-.464.096-.684l9.452-3.65c.44-.16.82.108.66.717z"></path></svg><span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(t)("supportService"))}</span></a>`);
      _push(ssrRenderComponent(_sfc_main$d, {
        modelValue: selectedLocale.value,
        "onUpdate:modelValue": ($event) => selectedLocale.value = $event
      }, null, _parent));
      _push(`</div></div></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/User/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "WidgetPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const widgetHexColor = ref("155e75");
    const widgetOpacity = ref(0.99);
    const widgetRgbColor = ref("");
    const fetchWidgetPanelValues = async () => {
      try {
        const response = await axios.get("/api/settings/widget-panel");
        widgetHexColor.value = response.data.color;
        widgetOpacity.value = response.data.opacity;
        widgetRgbColor.value = hexToRgb(response.data.color);
      } catch (error) {
        console.error("Error fetching widget panel settings:", error);
      }
    };
    const widgetPanelStyle = computed(() => {
      const hexColor = `#${widgetHexColor.value}`;
      const opacity = widgetOpacity.value;
      return {
        backgroundColor: hexColor,
        opacity
      };
    });
    const hexToRgb = (hex) => {
      if (hex.length !== 6)
        return "";
      const bigint = parseInt(hex, 16);
      const r = bigint >> 16 & 255;
      const g = bigint >> 8 & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };
    onMounted(() => {
      fetchWidgetPanelValues();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row-span-full" }, _attrs))} data-v-c0fce48a><div id="widgetPanel" style="${ssrRenderStyle(widgetPanelStyle.value)}" class="flex-col items-center h-full w-4 z-20 bg-cyan-800 dark:bg-gray-700 dark:border-l dark:border-gray-600 overflow-y-scroll hidden md:flex md:z-auto no-scrollbar transition-all duration-200 ease-in-out" data-v-c0fce48a></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/User/WidgetPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WidgetPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c0fce48a"]]);
const _sfc_main = {
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const sidebarOpen = ref(false);
    const showingNavigationDropdown = ref(false);
    const { props: pageProps } = usePage();
    const sidebarTitle = computed(() => {
      const setting = pageProps.settings.find((setting2) => setting2.constant === "INFO_MOD_VERSION");
      return setting ? setting.value : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, null, _parent));
      _push(`<div class="flex flex-row h-screen overflow-hidden" data-v-4685dc9a>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "sidebar-open": sidebarOpen.value,
        "sidebar-title": sidebarTitle.value,
        onCloseSidebar: ($event) => sidebarOpen.value = false
      }, null, _parent));
      _push(`<div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" data-v-4685dc9a>`);
      _push(ssrRenderComponent(_sfc_main$6, {
        "showing-navigation-dropdown": showingNavigationDropdown.value,
        onToggleNavigationDropdown: ($event) => showingNavigationDropdown.value = !showingNavigationDropdown.value
      }, null, _parent));
      if (_ctx.$slots.header) {
        _push(`<header class="dark:bg-slate-700 bg-slate-50 shadow" data-v-4685dc9a><div class="max-w-7xl mx-auto py-2 px-1 sm:px-6 lg:px-8" data-v-4685dc9a>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-grow bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${unref(authImage)})`, backgroundAttachment: "fixed" })}" data-v-4685dc9a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(ScrollButtons, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(WidgetPanel, { widgetPanelTitle: sidebarTitle.value }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4685dc9a"]]);
export {
  AppLayout as A
};
