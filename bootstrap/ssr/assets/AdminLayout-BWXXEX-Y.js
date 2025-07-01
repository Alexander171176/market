import { mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext, ref, watch, onMounted, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, Fragment, renderList, onUnmounted, computed, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Link, router, usePage, Head } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import { D as DigitalClock, _ as _sfc_main$b, a as _sfc_main$c, S as ScrollButtons } from "./ScrollButtons-DpnzINGM.js";
import { _ as _sfc_main$a, A as ApplicationMark, a as _sfc_main$d } from "./ResponsiveNavLink-DqF2K04_.js";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import draggable from "vuedraggable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$e } from "./LocaleSelectOption-D2q2yRl9.js";
import { a as authImage } from "./auth-image-CfsIGyOn.js";
import { Container } from "vue-smooth-dnd";
const _sfc_main$9 = {
  __name: "ResponsiveNavLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pt-2 pb-24 space-y-1" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.index"),
        active: _ctx.route().current("admin.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("adminPanel"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("adminPanel")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.users.index"),
        active: _ctx.route().current("admin.users.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("users"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("users")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.roles.index"),
        active: _ctx.route().current("admin.roles.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("roles"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("roles")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.permissions.index"),
        active: _ctx.route().current("admin.permissions.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("permissions"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("permissions")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.athletes.index"),
        active: _ctx.route().current("admin.athletes.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("athletes"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("athletes")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.tournaments.index"),
        active: _ctx.route().current("admin.tournaments.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("tournaments"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("tournaments")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.rubrics.index"),
        active: _ctx.route().current("admin.rubrics.index")
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
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.sections.index"),
        active: _ctx.route().current("admin.sections.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("sections"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("sections")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.articles.index"),
        active: _ctx.route().current("admin.articles.index")
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
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.tags.index"),
        active: _ctx.route().current("admin.tags.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("tags"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("tags")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.comments.index"),
        active: _ctx.route().current("admin.comments.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("comments"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("comments")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.banners.index"),
        active: _ctx.route().current("admin.banners.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("banners"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("banners")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.videos.index"),
        active: _ctx.route().current("admin.videos.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("videos"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("videos")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.reports.index"),
        active: _ctx.route().current("admin.reports.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("reports"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("reports")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.charts.index"),
        active: _ctx.route().current("admin.charts.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("charts"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("charts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.settings.index"),
        active: _ctx.route().current("admin.settings.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("settings"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.parameters.index"),
        active: _ctx.route().current("admin.parameters.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("parameters"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("parameters")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.logs.index"),
        active: _ctx.route().current("admin.logs.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("logs"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("logs")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.phpinfo.index"),
        active: _ctx.route().current("admin.phpinfo.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`phpinfo`);
          } else {
            return [
              createTextVNode("phpinfo")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.composer.index"),
        active: _ctx.route().current("admin.composer.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`composer`);
          } else {
            return [
              createTextVNode("composer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.package.index"),
        active: _ctx.route().current("admin.package.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`package`);
          } else {
            return [
              createTextVNode("package")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.env.index"),
        active: _ctx.route().current("admin.env.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`env`);
          } else {
            return [
              createTextVNode("env")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.components.index"),
        active: _ctx.route().current("admin.components.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("components"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("components")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.diagrams.index"),
        active: _ctx.route().current("admin.diagrams.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("diagrams"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("diagrams")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        href: _ctx.route("admin.plugins.index"),
        active: _ctx.route().current("admin.plugins.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("plugins"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("plugins")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Links/ResponsiveNavLinks.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6a1bc83d><button class="fixed top-0 right-3 z-50 hidden md:inline-block px-3 py-3 cursor-pointer" data-v-6a1bc83d><svg class="w-6 h-6" viewBox="0 0 20 20" data-v-6a1bc83d><circle fill="none" class="stroke-red-300 dark:stroke-violet-500" cx="9.997" cy="10" r="3.31" data-v-6a1bc83d></circle><path fill="none" class="stroke-red-300 dark:stroke-violet-500" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z" data-v-6a1bc83d></path></svg></button>`);
      if (isPanelOpen.value) {
        _push(`<div class="fixed top-0 left-0 right-0 bg-slate-700 dark:bg-slate-100 bg-opacity-90 dark:bg-opacity-90 shadow-md font-semibold text-center text-lg z-40 h-12 py-2 overflow-y-auto flex items-center justify-center space-x-4" data-v-6a1bc83d><form class="flex items-center space-x-2" data-v-6a1bc83d><span class="text-teal-200 dark:text-teal-600" data-v-6a1bc83d>HEX:#</span><input maxlength="6" size="6" id="out" name="out"${ssrRenderAttr("value", hexInput.value)} class="border rounded px-2 py-1 w-20 text-lg" data-v-6a1bc83d><span class="text-red-200 dark:text-red-400" data-v-6a1bc83d>RGB:</span><input maxlength="12" size="12" name="out2"${ssrRenderAttr("value", rgbInput.value)} class="border rounded px-2 py-1 w-32 text-lg" data-v-6a1bc83d><input type="range" class="input-range ml-2" id="inputr" name="inputr" min="0" max="99"${ssrRenderAttr("value", rangeInput.value)} data-v-6a1bc83d></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Admin/TopPanel.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const TopPanel = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6a1bc83d"]]);
const _sfc_main$7 = {
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
      _push(`<nav class="border-b border-gray-100"><div class="max-w-full mx-auto px-4 sm:px-0"><div class="flex items-center justify-between h-12"><div class="flex items-center justify-center"><div class="shrink-0 flex items-center md:hidden">`);
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
      _push(ssrRenderComponent(_sfc_main$b, {
        align: "right",
        width: "60",
        class: "relative z-10"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$page.props.jetstream.managesProfilePhotos) {
              _push2(`<button class="flex items-center px-2 py-1 font-semibold text-md text-sky-600 dark:text-slate-100 border-2 border-transparent rounded-full focus:outline-none focus:border-gray-400 transition"${_scopeId}><img class="h-8 w-8 mr-2 rounded-full object-cover"${ssrRenderAttr("src", _ctx.$page.props.auth.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.auth.user.name)}${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</span></button>`);
            } else {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center bg-white active:bg-gray-50 px-3 py-2 border border-transparent rounded-md text-md leading-4 font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"${_scopeId}></path></svg></button></span>`);
            }
          } else {
            return [
              _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock("button", {
                key: 0,
                class: "flex items-center px-2 py-1 font-semibold text-md text-sky-600 dark:text-slate-100 border-2 border-transparent rounded-full focus:outline-none focus:border-gray-400 transition"
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
            _push2(ssrRenderComponent(_sfc_main$c, {
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
              _push2(ssrRenderComponent(_sfc_main$c, {
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
            _push2(ssrRenderComponent(_sfc_main$c, { as: "button" }, {
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
              createVNode(_sfc_main$c, {
                href: _ctx.route("profile.show")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("profile")), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(_sfc_main$c, {
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
                createVNode(_sfc_main$c, { as: "button" }, {
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
        _push(ssrRenderComponent(_sfc_main$b, {
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
              _push2(ssrRenderComponent(_sfc_main$c, {
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
                _push2(ssrRenderComponent(_sfc_main$c, {
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
                  _push2(ssrRenderComponent(_sfc_main$c, { as: "button" }, {
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
                  createVNode(_sfc_main$c, {
                    href: _ctx.route("teams.show", _ctx.$page.props.auth.user.current_team)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("teamSettings")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  _ctx.$page.props.jetstream.canCreateTeams ? (openBlock(), createBlock(_sfc_main$c, {
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
                        createVNode(_sfc_main$c, { as: "button" }, {
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
      _push(ssrRenderComponent(_sfc_main$d, { class: "relative z-10" }, null, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-slate-500 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({ hidden: __props.showingNavigationDropdown, "inline-flex": !__props.showingNavigationDropdown })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({ hidden: !__props.showingNavigationDropdown, "inline-flex": __props.showingNavigationDropdown })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: __props.showingNavigationDropdown, hidden: !__props.showingNavigationDropdown }, "sm:hidden"])}">`);
      _push(ssrRenderComponent(_sfc_main$9, null, null, _parent));
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Admin/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const sidebarIcons = {
  admin: `
        <path class="fill-current text-blue-500" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"/>
        <path class="fill-current text-blue-600" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"/>
        <path class="fill-current text-blue-200" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"/>
    `,
  apiTokens: `
        <path class="fill-current text-blue-700" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"></path>
        <path class="fill-current text-blue-600" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"></path>
        <path class="fill-current text-blue-400" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"></path>
    `,
  teamSettings: `
        <path class="fill-current text-blue-600" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"></path>
        <path class="fill-current text-blue-400" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"></path>
        <path class="fill-current text-blue-600" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"></path>
        <path class="fill-current text-blue-400" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"></path>
    `,
  users: `
        <path class="fill-current text-blue-600" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path>
        <path class="fill-current text-blue-400" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path>
    `,
  roles: `
        <path class="fill-current text-blue-600" d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"></path>
        <path class="fill-current text-blue-400" d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"></path>
    `,
  permissions: `
        <circle class="fill-current text-blue-400" cx="18.5" cy="5.5" r="4.5"></circle>
        <circle class="fill-current text-blue-600" cx="5.5" cy="5.5" r="4.5"></circle>
        <circle class="fill-current text-blue-600" cx="18.5" cy="18.5" r="4.5"></circle>
        <circle class="fill-current text-blue-400" cx="5.5" cy="18.5" r="4.5"></circle>
    `,
  athletes: `
        <path class="fill-current text-blue-600" d="M3,7H1V2A1,1,0,0,1,2,1H7V3H3Z"></path>
        <path class="fill-current text-blue-600" d="M23,7H21V3H17V1h5a1,1,0,0,1,1,1Z"></path>
        <path class="fill-current text-blue-600" d="M7,23H2a1,1,0,0,1-1-1V17H3v4H7Z"></path>
        <path class="fill-current text-blue-600" d="M22,23H17V21h4V17h2v5A1,1,0,0,1,22,23Z"></path>
        <path class="fill-current text-blue-400" d="M18.242,18.03l-2.727-.681a1,1,0,0,1-.744-.806l-.249-1.491A6.792,6.792,0,0,0,17,10V9A5,5,0,0,0,7,9v1a6.792,6.792,0,0,0,2.478,5.052l-.249,1.491a1,1,0,0,1-.743.806l-2.728.681A1,1,0,0,0,6,20H18a1,1,0,0,0,.242-1.97Z"></path>
    `,
  tournaments: `
        <path class="fill-current text-blue-600" d="M19.5,2a3.588,3.588,0,0,0-.5.05V4a6.958,6.958,0,0,1-1.524,4.347A3.5,3.5,0,1,0,19.5,2Z"></path>
        <path class="fill-current text-blue-600" d="M4.5,2a3.588,3.588,0,0,1,.5.05V4A6.958,6.958,0,0,0,6.524,8.347,3.5,3.5,0,1,1,4.5,2Z"></path>
        <path class="fill-current text-blue-600" d="M16,0a7.585,7.585,0,0,0-3.407.808A6.956,6.956,0,0,1,14,5a1,1,0,0,1-2,0A5.006,5.006,0,0,0,7,0V4A5,5,0,0,0,17,4V0Z"></path>
        <path class="fill-current text-blue-400" d="M14.618,20H9.382L8.105,22.553A1,1,0,0,0,9,24h6a1,1,0,0,0,.895-1.447Z"></path>
        <path class="fill-current text-blue-400" d="M21.157,10.793a2.771,2.771,0,0,0-3.828,0,.709.709,0,0,1-1,0,2.772,2.772,0,0,0-3.829,0,.722.722,0,0,1-1,0,2.771,2.771,0,0,0-3.828,0,.709.709,0,0,1-1,0,2.772,2.772,0,0,0-3.829,0,1,1,0,0,0,0,1.412L8.6,18H15.4l5.756-5.795A1,1,0,0,0,21.157,10.793Z"></path>
    `,
  rubrics: `
        <circle class="fill-current text-blue-600" cx="16" cy="8" r="8"></circle>
        <circle class="fill-current text-blue-400" cx="8" cy="16" r="8"></circle>
    `,
  sections: `
        <path class="fill-current text-blue-600" d="M1 3h22v20H1z"></path>
        <path class="fill-current text-blue-400" d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"></path>
    `,
  articles: `
        <path class="fill-current text-blue-400" d="M21,0H3c-.552,0-1,.448-1,1V23c0,.552,.448,1,1,1H21c.552,0,1-.448,1-1V1c0-.552-.448-1-1-1Zm-3,19.5c0,.276-.224,.5-.5,.5H6.5c-.276,0-.5-.224-.5-.5v-1c0-.276,.224-.5,.5-.5h11c.276,0,.5,.224,.5,.5v1Zm0-5c0,.276-.224,.5-.5,.5H6.5c-.276,0-.5-.224-.5-.5v-1c0-.276,.224-.5,.5-.5h11c.276,0,.5,.224,.5,.5v1Zm0-5c0,.276-.224,.5-.5,.5H6.5c-.276,0-.5-.224-.5-.5V4.5c0-.276,.224-.5,.5-.5h11c.276,0,.5,.224,.5,.5v5Z"></path>
    `,
  tags: `
        <path class="fill-current text-blue-400" d="M 19.152344 13.753906 C 19.152344 13.316406 18.996094 12.933594 18.683594 12.605469 L 9.644531 3.578125 C 9.324219 3.257812 8.894531 2.984375 8.355469 2.761719 C 7.816406 2.539062 7.324219 2.425781 6.878906 2.425781 L 1.617188 2.425781 C 1.179688 2.425781 0.800781 2.585938 0.480469 2.90625 C 0.160156 3.226562 0 3.605469 0 4.046875 L 0 9.304688 C 0 9.75 0.113281 10.246094 0.335938 10.785156 C 0.558594 11.324219 0.832031 11.75 1.152344 12.0625 L 10.191406 21.113281 C 10.5 21.425781 10.882812 21.582031 11.328125 21.582031 C 11.765625 21.582031 12.148438 21.425781 12.476562 21.113281 L 18.6875 14.894531 C 18.996094 14.582031 19.152344 14.203125 19.152344 13.753906 Z M 5.191406 7.617188 C 4.875 7.933594 4.492188 8.089844 4.046875 8.089844 C 3.597656 8.089844 3.21875 7.933594 2.902344 7.617188 C 2.585938 7.300781 2.425781 6.917969 2.425781 6.472656 C 2.425781 6.027344 2.585938 5.644531 2.902344 5.328125 C 3.21875 5.011719 3.597656 4.855469 4.046875 4.855469 C 4.492188 4.855469 4.875 5.011719 5.191406 5.328125 C 5.503906 5.644531 5.664062 6.027344 5.664062 6.472656 C 5.664062 6.917969 5.503906 7.300781 5.191406 7.617188 Z M 5.191406 7.617188 "/>
        <path class="fill-current text-blue-600" d="M 23.539062 12.605469 L 14.5 3.578125 C 14.179688 3.257812 13.75 2.984375 13.210938 2.761719 C 12.671875 2.539062 12.179688 2.425781 11.730469 2.425781 L 8.898438 2.425781 C 9.347656 2.425781 9.839844 2.539062 10.378906 2.761719 C 10.917969 2.984375 11.347656 3.257812 11.667969 3.578125 L 20.707031 12.605469 C 21.019531 12.933594 21.175781 13.316406 21.175781 13.753906 C 21.175781 14.203125 21.019531 14.582031 20.707031 14.894531 L 14.765625 20.835938 C 15.019531 21.097656 15.242188 21.285156 15.4375 21.402344 C 15.628906 21.523438 15.878906 21.582031 16.183594 21.582031 C 16.621094 21.582031 17.003906 21.425781 17.332031 21.113281 L 23.539062 14.894531 C 23.851562 14.582031 24.007812 14.203125 24.007812 13.753906 C 24.007812 13.316406 23.851562 12.933594 23.539062 12.605469 Z M 23.539062 12.605469 "/>
    `,
  comments: `
    <path class="fill-current text-blue-600" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"></path>
    <path class="fill-current text-blue-400" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"></path>
    `,
  banners: `
    <path class="fill-current text-blue-400" d="M23,2H1A1,1,0,0,0,0,3V21a1,1,0,0,0,1,1H23a1,1,0,0,0,1-1V3A1,1,0,0,0,23,2ZM22,4V14.3L17.759,9.35A1,1,0,0,0,17.005,9a.879.879,0,0,0-.757.342l-6.3,7.195L6.707,13.293A.988.988,0,0,0,5.955,13a1,1,0,0,0-.723.358L2,17.238V4Z"></path>
    <circle class="fill-current text-blue-600" cx="9" cy="8" r="2"></circle>
    `,
  videos: `
    <path class="fill-current text-blue-400" d="M 9.601562 0 L 21.601562 0 C 22.921875 0 24 1.34375 24 3 L 24 13.5 C 24 15.15625 22.921875 16.5 21.601562 16.5 L 9.601562 16.5 C 8.277344 16.5 7.199219 15.15625 7.199219 13.5 L 7.199219 3 C 7.199219 1.34375 8.277344 0 9.601562 0 Z M 17.851562 5 C 17.679688 4.6875 17.398438 4.5 17.101562 4.5 C 16.800781 4.5 16.519531 4.6875 16.351562 5 L 14.25 8.9375 L 13.601562 7.921875 C 13.429688 7.65625 13.171875 7.5 12.898438 7.5 C 12.628906 7.5 12.367188 7.65625 12.199219 7.921875 L 9.796875 11.671875 C 9.582031 12.007812 9.539062 12.472656 9.691406 12.863281 C 9.839844 13.25 10.15625 13.5 10.5 13.5 L 20.699219 13.5 C 21.035156 13.5 21.335938 13.269531 21.496094 12.90625 C 21.652344 12.539062 21.632812 12.09375 21.449219 11.75 Z M 12.601562 4.5 C 12.601562 3.671875 12.0625 3 11.398438 3 C 10.738281 3 10.199219 3.671875 10.199219 4.5 C 10.199219 5.328125 10.738281 6 11.398438 6 C 12.0625 6 12.601562 5.328125 12.601562 4.5 Z M 2.398438 6 L 6 6 L 6 19.5 C 6 20.328125 6.535156 21 7.199219 21 L 12 21 C 12.664062 21 13.199219 20.328125 13.199219 19.5 L 13.199219 18 L 19.199219 18 L 19.199219 21 C 19.199219 22.65625 18.125 24 16.800781 24 L 2.398438 24 C 1.078125 24 0 22.65625 0 21 L 0 9 C 0 7.34375 1.078125 6 2.398438 6 Z M 2.699219 9 C 2.371094 9 2.101562 9.335938 2.101562 9.75 L 2.101562 10.5 C 2.101562 10.914062 2.371094 11.25 2.699219 11.25 L 3.300781 11.25 C 3.628906 11.25 3.898438 10.914062 3.898438 10.5 L 3.898438 9.75 C 3.898438 9.335938 3.628906 9 3.300781 9 Z M 2.699219 13.875 C 2.371094 13.875 2.101562 14.210938 2.101562 14.625 L 2.101562 15.375 C 2.101562 15.789062 2.371094 16.125 2.699219 16.125 L 3.300781 16.125 C 3.628906 16.125 3.898438 15.789062 3.898438 15.375 L 3.898438 14.625 C 3.898438 14.210938 3.628906 13.875 3.300781 13.875 Z M 2.699219 18.75 C 2.371094 18.75 2.101562 19.085938 2.101562 19.5 L 2.101562 20.25 C 2.101562 20.664062 2.371094 21 2.699219 21 L 3.300781 21 C 3.628906 21 3.898438 20.664062 3.898438 20.25 L 3.898438 19.5 C 3.898438 19.085938 3.628906 18.75 3.300781 18.75 Z M 15.300781 19.5 L 15.300781 20.25 C 15.300781 20.664062 15.570312 21 15.898438 21 L 16.5 21 C 16.828125 21 17.101562 20.664062 17.101562 20.25 L 17.101562 19.5 C 17.101562 19.085938 16.828125 18.75 16.5 18.75 L 15.898438 18.75 C 15.570312 18.75 15.300781 19.085938 15.300781 19.5 Z M 15.300781 19.5 "/>
    `,
  reports: `
        <path class="fill-current text-blue-600" d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"></path>
        <path class="fill-current text-blue-400" d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"></path>
    `,
  charts: `
        <path class="fill-current text-blue-400" d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"></path>
        <path class="fill-current text-blue-700" d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"></path>
        <path class="fill-current text-blue-600" d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"></path>
    `,
  diagrams: `
        <path class="fill-current text-blue-600" d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"></path>
        <path class="fill-current text-blue-400" d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"></path>
    `,
  settings: `
        <path class="fill-current text-blue-600" d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a7.978 7.978 0 00-2.3-1.34l-.38-2.65a.5.5 0 00-.5-.42h-4a.5.5 0 00-.5.42l-.38 2.65a7.978 7.978 0 00-2.3 1.34l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 00-.12.64l2 3.46c.13.23.4.3.61.22l2.49-1c.68.56 1.45 1.02 2.3 1.34l.38 2.65c.03.24.23.42.5.42h4c.26 0 .47-.18.5-.42l.38-2.65a7.978 7.978 0 002.3-1.34l2.49 1c.23.1.48.03.61-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65zm-7.43 2.52a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"></path>
        <path class="fill-current text-blue-400" d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"></path>
    `,
  parameters: `
        <path class="fill-current text-blue-400" d="M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.54,13.55 13.45,14.65 13.45,16C13.45,17.35 14.54,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92A1.58,1.58 0 0,0 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z" />
    `,
  logs: `
        <path class="fill-current text-blue-400" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
        <polygon class="fill-current text-blue-400" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    `,
  phpinfo: `
        <path class="fill-current text-blue-400" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
        <polygon class="fill-current text-blue-400" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    `,
  composer: `
        <path class="fill-current text-blue-400" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
        <polygon class="fill-current text-blue-400" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    `,
  package: `
        <path class="fill-current text-blue-400" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
        <polygon class="fill-current text-blue-400" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    `,
  env: `
        <path class="fill-current text-blue-400" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
        <polygon class="fill-current text-blue-400" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    `,
  components: `
        <circle class="fill-current text-blue-600" cx="16" cy="8" r="8"></circle>
        <circle class="fill-current text-blue-400" cx="8" cy="16" r="8"></circle>
    `,
  plugins: `
        <path class="fill-current text-blue-400" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"></path>
        <path class="fill-current text-blue-700" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"></path>
        <path class="fill-current text-blue-600" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"></path>
    `
};
const _sfc_main$6 = {
  __name: "DraggableSidebarLink",
  __ssrInlineRender: true,
  props: {
    id: String,
    expanded: Boolean
  },
  setup(__props) {
    const { siteSettings } = usePage().props;
    const props = __props;
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
    const colorText = computed(() => {
      return isDarkMode.value ? siteSettings.AdminSidebarDarkText || "text-slate-200" : siteSettings.AdminSidebarLightText || "text-slate-200";
    });
    const colorTextHover = computed(() => {
      return isDarkMode.value ? siteSettings.AdminSidebarDarkHoverText || "text-orange-300" : siteSettings.AdminSidebarLightHoverText || "text-orange-300";
    });
    const colorTextActive = computed(() => {
      return isDarkMode.value ? siteSettings.AdminSidebarDarkActiveText || "text-yellow-200" : siteSettings.AdminSidebarLightActiveText || "text-yellow-200";
    });
    const { t } = useI18n();
    const { props: pageProps } = usePage();
    const linkInfo = {
      admin: { label: t("adminPanel"), route: "admin.index" },
      // Уже исправлено
      // Для API токенов и команд используем стандартные имена Jetstream/Fortify
      apiTokens: { label: t("apiTokens"), route: "api-tokens.index" },
      teamSettings: { label: t("teamSettings"), route: "teams.show", params: { team: pageProps.auth.user.current_team } },
      users: { label: t("users"), route: "admin.users.index" },
      roles: { label: t("roles"), route: "admin.roles.index" },
      permissions: { label: t("permissions"), route: "admin.permissions.index" },
      athletes: { label: t("athletes"), route: "admin.athletes.index" },
      tournaments: { label: t("tournaments"), route: "admin.tournaments.index" },
      rubrics: { label: t("rubrics"), route: "admin.rubrics.index" },
      sections: { label: t("sections"), route: "admin.sections.index" },
      articles: { label: t("posts"), route: "admin.articles.index" },
      tags: { label: t("tags"), route: "admin.tags.index" },
      comments: { label: t("comments"), route: "admin.comments.index" },
      banners: { label: t("banners"), route: "admin.banners.index" },
      videos: { label: t("videos"), route: "admin.videos.index" },
      reports: { label: t("reports"), route: "admin.reports.index" },
      charts: { label: t("charts"), route: "admin.charts.index" },
      diagrams: { label: t("diagrams"), route: "admin.diagrams.index" },
      settings: { label: t("settings"), route: "admin.settings.index" },
      parameters: { label: t("parameters"), route: "admin.parameters.index" },
      logs: { label: t("logs"), route: "admin.logs.index" },
      phpinfo: { label: "phpinfo", route: "admin.phpinfo.index" },
      composer: { label: "composer", route: "admin.composer.index" },
      package: { label: "package", route: "admin.package.index" },
      env: { label: "env", route: "admin.env.index" },
      components: { label: t("components"), route: "admin.components.index" },
      plugins: { label: t("plugins"), route: "admin.plugins.index" }
    };
    const link = computed(() => linkInfo[props.id]);
    const svgContent = computed(() => sidebarIcons[props.id]);
    const classes = computed(() => {
      if (link.value.route === route().current()) {
        return `flex items-center px-1 pt-1 text-sm font-medium leading-3 ${colorTextActive.value} hover:${colorTextHover.value} focus:${colorTextHover.value} focus:outline-none transition duration-150 ease-in-out`;
      } else {
        return `flex items-center px-1 pt-1 text-sm font-medium leading-3 ${colorText.value} hover:${colorTextActive.value} focus:${colorTextActive.value} focus:outline-none transition duration-150 ease-in-out`;
      }
    });
    const containerClasses = computed(() => {
      return props.expanded ? "mb-1" : "mb-3";
    });
    const textClasses = computed(() => {
      return props.expanded ? "ml-3 opacity-100" : "ml-3 opacity-0 whitespace-nowrap overflow-hidden";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: containerClasses.value }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route(link.value.route, link.value.params || {}),
        class: classes.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24"${_scopeId}>${svgContent.value ?? ""}</svg><span class="${ssrRenderClass([textClasses.value, "text-sm font-medium transition-opacity duration-200 max-w-full"])}"${_scopeId}>${ssrInterpolate(link.value.label)}</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "shrink-0 h-4 w-4",
                viewBox: "0 0 24 24",
                innerHTML: svgContent.value
              }, null, 8, ["innerHTML"])),
              createVNode("span", {
                class: ["text-sm font-medium transition-opacity duration-200 max-w-full", textClasses.value]
              }, toDisplayString(link.value.label), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Links/DraggableSidebarLink.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "DraggableSidebarGroupLink",
  __ssrInlineRender: true,
  props: {
    expanded: Boolean
  },
  emits: ["update:mainLinks", "update:hiddenLinks"],
  setup(__props, { emit: __emit }) {
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
    const colorTextActive = computed(() => {
      return isDarkMode.value ? siteSettings.AdminSidebarDarkActiveText || "text-yellow-200" : siteSettings.AdminSidebarLightActiveText || "text-yellow-200";
    });
    const emit = __emit;
    const { t } = useI18n();
    const mainLinks = ref(JSON.parse(localStorage.getItem("mainLinks")) || [
      "admin",
      "athletes",
      "tournaments",
      "rubrics",
      "sections",
      "articles",
      "tags",
      "comments",
      "banners",
      "videos",
      "reports",
      "charts",
      "users",
      "roles",
      "permissions",
      "settings",
      "parameters",
      "logs",
      "phpinfo",
      "composer",
      "package",
      "env",
      "components",
      "diagrams",
      "plugins"
    ]);
    const hiddenLinks = ref(JSON.parse(localStorage.getItem("hiddenLinks")) || [
      "apiTokens",
      "teamSettings"
    ]);
    const showHiddenLinks = ref(false);
    const handleDragEnd = () => {
      localStorage.setItem("mainLinks", JSON.stringify(mainLinks.value));
      localStorage.setItem("hiddenLinks", JSON.stringify(hiddenLinks.value));
      emit("update:mainLinks", mainLinks.value);
      emit("update:hiddenLinks", hiddenLinks.value);
    };
    watch(mainLinks, (newVal) => {
      localStorage.setItem("mainLinks", JSON.stringify(newVal));
      emit("update:mainLinks", newVal);
    });
    watch(hiddenLinks, (newVal) => {
      localStorage.setItem("hiddenLinks", JSON.stringify(newVal));
      emit("update:hiddenLinks", newVal);
    });
    onMounted(() => {
      mainLinks.value = JSON.parse(localStorage.getItem("mainLinks")) || mainLinks.value;
      hiddenLinks.value = JSON.parse(localStorage.getItem("hiddenLinks")) || hiddenLinks.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(draggable), {
        modelValue: mainLinks.value,
        "onUpdate:modelValue": ($event) => mainLinks.value = $event,
        onEnd: handleDragEnd,
        itemKey: "id",
        group: "links",
        tag: "ul"
      }, {
        item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, {
              id: element,
              expanded: __props.expanded
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$6, {
                id: element,
                expanded: __props.expanded
              }, null, 8, ["id", "expanded"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex justify-center items-center w-full pt-3 mb-0"><span class="${ssrRenderClass([[colorTextActive.value], "text-xs uppercase font-semibold"])}">${ssrInterpolate(unref(t)("more"))}</span></button>`);
      if (showHiddenLinks.value) {
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: hiddenLinks.value,
          "onUpdate:modelValue": ($event) => hiddenLinks.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id",
          group: "links",
          tag: "ul",
          class: "my-3"
        }, {
          item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$6, {
                id: element,
                expanded: __props.expanded
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$6, {
                  id: element,
                  expanded: __props.expanded
                }, null, 8, ["id", "expanded"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<br><!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Links/DraggableSidebarGroupLink.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "SidebarLinkPlugin",
  __ssrInlineRender: true,
  props: {
    href: String,
    active: Boolean,
    expanded: Boolean
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return props.active ? "flex items-center px-1 pt-1 text-sm font-medium leading-3 text-yellow-100 focus:outline-none transition duration-150 ease-in-out" : "flex items-center px-1 pt-1 text-sm font-medium leading-3 text-slate-300 hover:text-yellow-100 focus:outline-none focus:text-yellow-100 transition duration-150 ease-in-out";
    });
    const containerClasses = computed(() => {
      return props.expanded ? "mb-1" : "mb-3";
    });
    const textClasses = computed(() => {
      return props.expanded ? "ml-3 opacity-100" : "ml-3 whitespace-nowrap overflow-hidden";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: containerClasses.value }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.href,
        class: classes.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<span class="${ssrRenderClass([textClasses.value, "text-sm font-medium duration-200 max-w-full"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "text", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode("span", {
                class: ["text-sm font-medium duration-200 max-w-full", textClasses.value]
              }, [
                renderSlot(_ctx.$slots, "text")
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</li>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Links/SidebarLinkPlugin.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    sidebarOpen: Boolean,
    sidebarTitle: String
  },
  emits: ["close-sidebar"],
  setup(__props, { emit: __emit }) {
    library.add(fas);
    const { t } = useI18n();
    const { siteSettings } = usePage().props;
    const props = __props;
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
      return isDarkMode.value ? siteSettings.AdminSidebarDarkColor || "bg-cyan-900" : siteSettings.AdminSidebarLightColor || "bg-cyan-900";
    });
    const colorTextActive = computed(() => {
      return isDarkMode.value ? siteSettings.AdminSidebarDarkActiveText || "text-yellow-200" : siteSettings.AdminSidebarLightActiveText || "text-yellow-200";
    });
    const emit = __emit;
    const trigger = ref(null);
    const sidebar = ref(null);
    const sidebarExpanded = ref(localStorage.getItem("sidebar-expanded") === "true");
    const currentPath = ref(window.location.pathname);
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
    onMounted(async () => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });
    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });
    watch(sidebarExpanded, (newVal) => {
      localStorage.setItem("sidebar-expanded", newVal.toString());
    });
    const isActive = (path) => {
      return currentPath.value === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([__props.sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none", "fixed inset-0 z-20 bg-cyan-800 dark:bg-gray-700 dark:border-r dark:border-gray-600 bg-opacity-30 md:hidden md:z-auto transition-opacity duration-200"])}" aria-hidden="true"></div><div id="sidebar" class="${ssrRenderClass([[bgColorClass.value, { "translate-x-0": __props.sidebarOpen, "-translate-x-64": !__props.sidebarOpen, "hidden md:flex": true, "md:w-16": !sidebarExpanded.value, "md:!w-64 2xl:!w-64": sidebarExpanded.value }], "h-screen absolute z-40 w-64 left-0 top-0 pb-16 p-2 flex flex-col dark:border-r dark:border-gray-600 md:static md:left-auto md:top-auto md:translate-x-0 md:overflow-y-auto overflow-y-scroll no-scrollbar transition-all duration-200 ease-in-out"])}"><div class="flex justify-around items-center mb-5 pr-3 md:px-0"><button title="t(&#39;toggleSidebar&#39;)"><svg class="${ssrRenderClass([{ "rotate-180": sidebarExpanded.value }, "mx-1 w-6 h-6 py-1 fill-current transition-transform duration-200 border border-gray-400 hover:border-red-400"])}" viewBox="0 0 24 24"><path class="text-slate-400 hover:text-red-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"></path><path class="text-slate-600" d="M3 23H1V1h2z"></path></svg></button>`);
      if (sidebarExpanded.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ApplicationMark, { class: "h-6 w-auto 2xl:block" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(ApplicationMark, { class: "h-6 w-auto 2xl:block" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (sidebarExpanded.value) {
        _push(`<span class="text-indigo-300 font-semibold text-md hidden 2xl:block"> Pulsar CMS ${ssrInterpolate(__props.sidebarTitle)}</span>`);
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
        _push(`<span class="${ssrRenderClass([[colorTextActive.value], "flex justify-center text-xs uppercase font-semibold pl-3"])}">${ssrInterpolate(unref(t)("pages"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$5, { expanded: sidebarExpanded.value }, null, _parent));
      if (sidebarExpanded.value) {
        _push(`<span class="${ssrRenderClass([[colorTextActive.value], "flex justify-center text-xs uppercase font-semibold pl-3 mt-0"])}">${ssrInterpolate(unref(t)("plugins"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul><!--[-->`);
      ssrRenderList(_ctx.$page.props.plugins, (plugin) => {
        _push(ssrRenderComponent(_sfc_main$4, {
          class: "mt-0",
          key: plugin.id,
          href: `/admin/plugins/${plugin.id}`,
          active: isActive(`/admin/plugins/${plugin.id}`),
          expanded: props.expanded
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="icon-class"${_scopeId}>${plugin.icon ?? ""}</span>`);
            } else {
              return [
                createVNode("span", {
                  innerHTML: plugin.icon,
                  class: "icon-class"
                }, null, 8, ["innerHTML"])
              ];
            }
          }),
          text: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(plugin.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(plugin.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Admin/Sidebar.vue");
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
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "sticky px-4 py-2 bottom-0 bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 z-20" }, _attrs))}><div class="flex items-center justify-center sm:justify-between flex-wrap"><div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <a href="/" target="_blank" class="font-semibold text-red-400 hover:text-rose-300">Pulsar CMS</a> ${ssrInterpolate(unref(t)("allRightsReserved"))}</div><button class="flex items-center btn px-3 text-slate-900 dark:text-slate-100 rounded-sm border-2 border-slate-400 my-2 mx-1 sm:my-0 sm:mx-0"><svg class="w-4 h-4 fill-current text-red-400 shrink-0 mr-2" viewBox="0 0 16 16"><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path></svg> ${ssrInterpolate(unref(t)("clearCache"))}</button><div class="flex items-center space-x-2"><a href="https://t.me/k_a_v_www" target="_blank" class="flex items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.175 8.89l-1.4 6.63c-.105.467-.405.578-.82.36l-2.27-1.67-1.093 1.054c-.12.12-.222.222-.45.222l.168-2.39 4.35-3.923c.19-.168-.04-.263-.29-.095L8.78 11.167l-2.42-.76c-.464-.14-.474-.464.096-.684l9.452-3.65c.44-.16.82.108.66.717z"></path></svg><span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(t)("supportService"))}</span></a>`);
      _push(ssrRenderComponent(_sfc_main$e, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Admin/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "WidgetPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row-span-full" }, _attrs))} data-v-bf7e6609><div id="widgetPanel" style="${ssrRenderStyle(widgetPanelStyle.value)}" class="flex-col items-center h-full w-4 z-20 bg-cyan-800 dark:bg-gray-700 dark:border-l dark:border-gray-600 overflow-y-scroll hidden md:flex md:z-auto no-scrollbar transition-all duration-200 ease-in-out" data-v-bf7e6609><a href="/" target="_blank" class="mt-20 ml-1"${ssrRenderAttr("title", unref(t)("website"))} data-v-bf7e6609><svg class="w-6 h-6 shrink-0 fill-current text-indigo-500 mr-2" viewBox="0 0 16 16" data-v-bf7e6609><path d="M10 16h4c.6 0 1-.4 1-.998V6.016c0-.3-.1-.6-.4-.8L8.6.226c-.4-.3-.9-.3-1.3 0l-6 4.992c-.2.2-.3.5-.3.799v8.986C1 15.6 1.4 16 2 16h4c.6 0 1-.4 1-.998v-2.996h2v2.996c0 .599.4.998 1 .998Zm-4-5.99c-.6 0-1 .399-1 .998v2.995H3V6.515L8 2.32l5 4.194v7.488h-2v-2.995c0-.6-.4-.999-1-.999H6Z" data-v-bf7e6609></path></svg></a><a href="/dashboard" target="_blank" class="mt-4 ml-1"${ssrRenderAttr("title", unref(t)("dashboard"))} data-v-bf7e6609><svg class="w-6 h-6 shrink-0 fill-current text-indigo-500 mr-2" viewBox="0 0 16 16" data-v-bf7e6609><path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" data-v-bf7e6609></path></svg></a></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Partials/Admin/WidgetPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WidgetPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bf7e6609"]]);
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const sidebarOpen = ref(false);
    const showingNavigationDropdown = ref(false);
    const { props: pageProps } = usePage();
    const toast = useToast();
    watch(() => Container.props.flash, (flashMessages) => {
      if (flashMessages) {
        if (flashMessages.success) {
          toast.success(flashMessages.success);
        }
        if (flashMessages.error) {
          toast.error(flashMessages.error);
        }
        if (flashMessages.warning) {
          toast.warning(flashMessages.warning);
        }
        if (flashMessages.info) {
          toast.info(flashMessages.info);
        }
      }
    }, {
      deep: true
      // Наблюдаем за изменениями внутри объекта flash
      // immediate: true // Раскомментируйте, если нужно проверить flash при первой загрузке лэйаута
    });
    const sidebarTitle = computed(() => {
      const setting = pageProps.settings.find((setting2) => setting2.constant === "INFO_MOD_VERSION");
      return setting ? setting.value : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, null, _parent));
      _push(`<div class="flex flex-row h-screen overflow-hidden" data-v-8afc6f26>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "sidebar-open": sidebarOpen.value,
        "sidebar-title": sidebarTitle.value,
        onCloseSidebar: ($event) => sidebarOpen.value = false
      }, null, _parent));
      _push(`<div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" data-v-8afc6f26>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        "showing-navigation-dropdown": showingNavigationDropdown.value,
        onToggleNavigationDropdown: ($event) => showingNavigationDropdown.value = !showingNavigationDropdown.value
      }, null, _parent));
      if (_ctx.$slots.header) {
        _push(`<header class="dark:bg-slate-700 bg-slate-50 shadow" data-v-8afc6f26><div class="max-w-7xl mx-auto py-2 px-1 sm:px-6 lg:px-8" data-v-8afc6f26>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-grow bg-center border-l border-r border-slate-400" style="${ssrRenderStyle({ backgroundImage: `url(${unref(authImage)})`, backgroundAttachment: "fixed" })}" data-v-8afc6f26>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8afc6f26"]]);
export {
  AdminLayout as A
};
