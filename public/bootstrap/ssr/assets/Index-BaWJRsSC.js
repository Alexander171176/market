import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext, computed, createTextVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$a } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$9, a as _sfc_main$c, b as _sfc_main$f } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$b, a as _sfc_main$d, b as _sfc_main$e } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$8 } from "./IconEdit-KTqcKHBr.js";
import { _ as _sfc_main$7 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$4, a as _sfc_main$6 } from "./RightToggle-DUyJT3iw.js";
import { _ as _sfc_main$5 } from "./MainToggle-ecPwSyuz.js";
import axios from "axios";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main$3 = {
  __name: "VideoTable",
  __ssrInlineRender: true,
  props: {
    videos: Array,
    selectedVideos: Array
  },
  emits: [
    "toggle-left",
    "toggle-main",
    "toggle-right",
    "toggle-activity",
    "edit",
    "delete",
    "update-sort-order",
    "toggle-select",
    "toggle-all"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      const d = new Date(dateStr);
      if (isNaN(d))
        return "";
      return d.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const localVideos = ref([]);
    watch(() => props.videos, (newVal) => {
      localVideos.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localVideos.value.map((video) => video.id);
      emits("update-sort-order", newOrderIds);
    };
    const getPrimaryImage = (video) => {
      if (video.images && video.images.length) {
        return [...video.images].sort((a, b) => a.order - b.order)[0];
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.videos.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("image"))}><svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("localization"))}><svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("type"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("title"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("url"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("sections"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("articles"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("views"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16"><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("likes"))}><svg class="h-8 w-8 fill-current" viewBox="0 0 32 32"><path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("show"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="text-center"><input type="checkbox"></div></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localVideos.value,
          "onUpdate:modelValue": ($event) => localVideos.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: video }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(video.id)}</div></td><td class="first:pl-5 last:pr-5 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
              if (video.images && video.images.length) {
                _push2(`<img${ssrRenderAttr("src", getPrimaryImage(video).webp_url || getPrimaryImage(video).url)}${ssrRenderAttr("alt", getPrimaryImage(video).alt || unref(t)("defaultImageAlt"))}${ssrRenderAttr("title", getPrimaryImage(video).caption || unref(t)("postImage"))} class="h-8 w-8 object-cover rounded-full"${_scopeId}>`);
              } else {
                _push2(`<img src="/storage/video_images/default-image.png"${ssrRenderAttr("alt", unref(t)("defaultImageTitle"))} class="h-8 w-8 object-cover rounded-full"${_scopeId}>`);
              }
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center uppercase text-orange-500 dark:text-orange-200"${_scopeId}>${ssrInterpolate(video.locale)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-sky-600 dark:text-sky-200"${_scopeId}>${ssrInterpolate(video.source_type)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-teal-600 dark:text-green-200"${ssrRenderAttr("title", formatDate(video.published_at))}${_scopeId}>${ssrInterpolate(video.title)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><a${ssrRenderAttr("href", `/videos/${encodeURIComponent(video.url)}`)} class="text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50" target="_blank" rel="noopener noreferrer"${_scopeId}>${ssrInterpolate(video.url)}</a></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><!--[-->`);
              ssrRenderList(video.sections, (section) => {
                _push2(`<span${_scopeId}><span${ssrRenderAttr("title", section.title)} class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200 rounded-sm text-xs text-slate-100 dark:text-slate-900"${_scopeId}>${ssrInterpolate(section.id)}</span></span>`);
              });
              _push2(`<!--]--></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><!--[-->`);
              ssrRenderList(video.articles, (article) => {
                _push2(`<span${_scopeId}><span${ssrRenderAttr("title", article.title)} class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200 rounded-sm text-xs text-slate-100 dark:text-slate-900"${_scopeId}>${ssrInterpolate(article.id)}</span></span>`);
              });
              _push2(`<!--]--></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(video.views)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(video.likes)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                isActive: video.left,
                onToggleLeft: ($event) => _ctx.$emit("toggle-left", video),
                title: video.left ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                isActive: video.main,
                onToggleMain: ($event) => _ctx.$emit("toggle-main", video),
                title: video.main ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                isActive: video.right,
                onToggleRight: ($event) => _ctx.$emit("toggle-right", video),
                title: video.right ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                isActive: video.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", video),
                title: video.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$8, {
                href: _ctx.route("admin.videos.edit", video.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$9, {
                onDelete: ($event) => _ctx.$emit("delete", video.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedVideos.includes(video.id)) ? " checked" : ""}${_scopeId}></div></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center text-blue-600 dark:text-blue-200" }, toDisplayString(video.id), 1)
                  ]),
                  createVNode("td", { class: "first:pl-5 last:pr-5 py-1" }, [
                    createVNode("div", { class: "flex justify-center" }, [
                      video.images && video.images.length ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: getPrimaryImage(video).webp_url || getPrimaryImage(video).url,
                        alt: getPrimaryImage(video).alt || unref(t)("defaultImageAlt"),
                        title: getPrimaryImage(video).caption || unref(t)("postImage"),
                        class: "h-8 w-8 object-cover rounded-full"
                      }, null, 8, ["src", "alt", "title"])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: "/storage/video_images/default-image.png",
                        alt: unref(t)("defaultImageTitle"),
                        class: "h-8 w-8 object-cover rounded-full"
                      }, null, 8, ["alt"]))
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center uppercase text-orange-500 dark:text-orange-200" }, toDisplayString(video.locale), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-sky-600 dark:text-sky-200" }, toDisplayString(video.source_type), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", {
                      class: "text-left text-teal-600 dark:text-green-200",
                      title: formatDate(video.published_at)
                    }, toDisplayString(video.title), 9, ["title"])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      createVNode("a", {
                        href: `/videos/${encodeURIComponent(video.url)}`,
                        class: "text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50",
                        target: "_blank",
                        rel: "noopener noreferrer"
                      }, toDisplayString(video.url), 9, ["href"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(video.sections, (section) => {
                        return openBlock(), createBlock("span", {
                          key: section.id
                        }, [
                          createVNode("span", {
                            title: section.title,
                            class: "py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200 rounded-sm text-xs text-slate-100 dark:text-slate-900"
                          }, toDisplayString(section.id), 9, ["title"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(video.articles, (article) => {
                        return openBlock(), createBlock("span", {
                          key: article.id
                        }, [
                          createVNode("span", {
                            title: article.title,
                            class: "py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200 rounded-sm text-xs text-slate-100 dark:text-slate-900"
                          }, toDisplayString(article.id), 9, ["title"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(video.views), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(video.likes), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$4, {
                        isActive: video.left,
                        onToggleLeft: ($event) => _ctx.$emit("toggle-left", video),
                        title: video.left ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleLeft", "title"]),
                      createVNode(_sfc_main$5, {
                        isActive: video.main,
                        onToggleMain: ($event) => _ctx.$emit("toggle-main", video),
                        title: video.main ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleMain", "title"]),
                      createVNode(_sfc_main$6, {
                        isActive: video.right,
                        onToggleRight: ($event) => _ctx.$emit("toggle-right", video),
                        title: video.right ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleRight", "title"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$7, {
                        isActive: video.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", video),
                        title: video.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$8, {
                        href: _ctx.route("admin.videos.edit", video.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$9, {
                        onDelete: ($event) => _ctx.$emit("delete", video.id)
                      }, null, 8, ["onDelete"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("input", {
                        type: "checkbox",
                        checked: __props.selectedVideos.includes(video.id),
                        onChange: ($event) => _ctx.$emit("toggle-select", video.id)
                      }, null, 40, ["checked", "onChange"])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</table>`);
      } else {
        _push(`<div class="p-5 text-center text-slate-700 dark:text-slate-100">${ssrInterpolate(unref(t)("noData"))}</div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Video/Table/VideoTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-50 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="published_at">${ssrInterpolate(unref(t)("publishedAt"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="title">${ssrInterpolate(unref(t)("title"))}</option><option value="locale">${ssrInterpolate(unref(t)("localization"))}</option><option value="views">${ssrInterpolate(unref(t)("views"))}</option><option value="likes">${ssrInterpolate(unref(t)("likes"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option><option value="left">${ssrInterpolate(unref(t)("inLeft"))}</option><option value="noLeft">${ssrInterpolate(unref(t)("notLeft"))}</option><option value="main">${ssrInterpolate(unref(t)("inMain"))}</option><option value="noMain">${ssrInterpolate(unref(t)("notMain"))}</option><option value="right">${ssrInterpolate(unref(t)("inRight"))}</option><option value="noRight">${ssrInterpolate(unref(t)("notRight"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Video/Sort/SortSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "BulkActionSelect",
  __ssrInlineRender: true,
  props: {
    handleBulkAction: Function
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option><option value="left">${ssrInterpolate(unref(t)("left"))}</option><option value="noLeft">${ssrInterpolate(unref(t)("noLeft"))}</option><option value="main">${ssrInterpolate(unref(t)("main"))}</option><option value="noMain">${ssrInterpolate(unref(t)("noMain"))}</option><option value="right">${ssrInterpolate(unref(t)("right"))}</option><option value="noRight">${ssrInterpolate(unref(t)("noRight"))}</option><option value="delete">${ssrInterpolate(unref(t)("deleteSelected"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Video/Select/BulkActionSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["videos", "videosCount", "adminCountVideos", "adminSortVideos"],
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountVideos);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountVideos"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortVideos);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortVideos"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const videoToDeleteId = ref(null);
    const videoToDeleteTitle = ref("");
    const confirmDelete = (id, title) => {
      videoToDeleteId.value = id;
      videoToDeleteTitle.value = title;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      videoToDeleteId.value = null;
      videoToDeleteTitle.value = "";
    };
    const deleteVideo = () => {
      if (videoToDeleteId.value === null)
        return;
      const idToDelete = videoToDeleteId.value;
      const titleToDelete = videoToDeleteTitle.value;
      router.delete(route("admin.videos.destroy", { video: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Видео "${titleToDelete || "ID: " + idToDelete}" удалено.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Видео: ${titleToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          videoToDeleteId.value = null;
          videoToDeleteTitle.value = "";
        }
      });
    };
    const toggleLeft = (video) => {
      const newLeft = !video.left;
      const actionText = newLeft ? "активировано в левой колонке" : "деактивировано в левой колонке";
      router.put(
        route("admin.actions.videos.updateLeft", { video: video.id }),
        { left: newLeft },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Видео "${video.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.left || errors.general || `Ошибка изменения активности для "${video.title}".`);
          }
        }
      );
    };
    const toggleMain = (video) => {
      const newMain = !video.main;
      const actionText = newMain ? "активировано в главном" : "деактивировано в главном";
      router.put(
        route("admin.actions.videos.updateMain", { video: video.id }),
        { main: newMain },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Видео "${video.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.main || errors.general || `Ошибка изменения активности для "${video.title}".`);
          }
        }
      );
    };
    const toggleRight = (video) => {
      const newRight = !video.right;
      const actionText = newRight ? "активировано в правой колонке" : "деактивировано в правой колонке";
      router.put(
        route("admin.actions.videos.updateRight", { video: video.id }),
        { right: newRight },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Видео "${video.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.right || errors.general || `Ошибка изменения активности для "${video.title}".`);
          }
        }
      );
    };
    const toggleActivity = (video) => {
      const newActivity = !video.activity;
      const actionText = newActivity ? "активировано" : "деактивировано";
      router.put(
        route("admin.actions.videos.updateActivity", { video: video.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Видео "${video.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${video.title}".`);
          }
        }
      );
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortVideos = (videos) => {
      if (sortParam.value === "idAsc") {
        return videos.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return videos.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "published_at") {
        return videos.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return videos.filter((video) => video.activity);
      }
      if (sortParam.value === "inactive") {
        return videos.filter((video) => !video.activity);
      }
      if (sortParam.value === "left") {
        return videos.filter((video) => video.left);
      }
      if (sortParam.value === "noLeft") {
        return videos.filter((video) => !video.left);
      }
      if (sortParam.value === "main") {
        return videos.filter((video) => video.main);
      }
      if (sortParam.value === "noMain") {
        return videos.filter((video) => !video.main);
      }
      if (sortParam.value === "right") {
        return videos.filter((video) => video.right);
      }
      if (sortParam.value === "noRight") {
        return videos.filter((video) => !video.right);
      }
      if (sortParam.value === "locale") {
        return videos.slice().sort((a, b) => {
          if (a.locale < b.locale)
            return 1;
          if (a.locale > b.locale)
            return -1;
          return 0;
        });
      }
      if (sortParam.value === "views" || sortParam.value === "likes") {
        return videos.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
      }
      return videos.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredVideos = computed(() => {
      let filtered = props.videos;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (video) => video.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortVideos(filtered);
    });
    const paginatedVideos = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredVideos.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredVideos.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.videos.updateSortBulk"),
        { videos: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок видео успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.videos || "Не удалось обновить порядок видео.");
            router.reload({ only: ["videos"], preserveScroll: true });
          }
        }
      );
    };
    const selectedVideos = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedVideos.value = [.../* @__PURE__ */ new Set([...selectedVideos.value, ...ids])];
      } else {
        selectedVideos.value = selectedVideos.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectVideo = (videoId) => {
      const index = selectedVideos.value.indexOf(videoId);
      if (index > -1) {
        selectedVideos.value.splice(index, 1);
      } else {
        selectedVideos.value.push(videoId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedVideos.value.length) {
        toast.warning("Выберите видео для активации/деактивации видео");
        return;
      }
      axios.put(route("admin.actions.videos.bulkUpdateActivity"), {
        ids: selectedVideos.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedVideos.value];
        selectedVideos.value = [];
        paginatedVideos.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const bulkToggleLeft = (newLeft) => {
      if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newLeft ? "активации в левой колонки" : "деактивации в левой колонки"}.`);
        return;
      }
      axios.put(route("admin.actions.videos.bulkUpdateLeft"), {
        ids: selectedVideos.value,
        left: newLeft
      }).then(() => {
        toast.success("Статус в левой колонки массово обновлен");
        const updatedIds = [...selectedVideos.value];
        selectedVideos.value = [];
        paginatedVideos.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.left = newLeft;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить статус в левой колонке");
      });
    };
    const bulkToggleMain = (newMain) => {
      if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newMain ? "активации" : "деактивации"}.`);
        return;
      }
      if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newMain ? "активации в главном" : "деактивации в главном"}.`);
        return;
      }
      axios.put(route("admin.actions.videos.bulkUpdateMain"), {
        ids: selectedVideos.value,
        main: newMain
      }).then(() => {
        toast.success("Статус в главном массово обновлен");
        const updatedIds = [...selectedVideos.value];
        selectedVideos.value = [];
        paginatedVideos.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.main = newMain;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить статус в главном");
      });
    };
    const bulkToggleRight = (newRight) => {
      if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newRight ? "активации" : "деактивации"}.`);
        return;
      }
      axios.put(route("admin.actions.videos.bulkUpdateRight"), {
        ids: selectedVideos.value,
        right: newRight
      }).then(() => {
        toast.success("Статус в правой колонки массово обновлен");
        const updatedIds = [...selectedVideos.value];
        selectedVideos.value = [];
        paginatedVideos.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.right = newRight;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить статус в правой колонке");
      });
    };
    const bulkDelete = () => {
      if (selectedVideos.value.length === 0) {
        toast.warning("Выберите хотя бы одно видео для удаления.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
      }
      router.delete(route("admin.actions.videos.bulkDestroy"), {
        data: { ids: selectedVideos.value },
        preserveScroll: true,
        preserveState: false,
        // Перезагружаем данные страницы
        onSuccess: (page) => {
          selectedVideos.value = [];
          toast.success("Массовое удаление видео успешно завершено.");
        },
        onError: (errors) => {
          console.error("Ошибка массового удаления:", errors);
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || "Произошла ошибка при удалении видео.";
          toast.error(errorMessage);
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedVideos.value = paginatedVideos.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedVideos.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      } else if (action === "left") {
        bulkToggleLeft(true);
      } else if (action === "noLeft") {
        bulkToggleLeft(false);
      } else if (action === "main") {
        bulkToggleMain(true);
      } else if (action === "noMain") {
        bulkToggleMain(false);
      } else if (action === "right") {
        bulkToggleRight(true);
      } else if (action === "noRight") {
        bulkToggleRight(false);
      } else if (action === "delete") {
        bulkDelete();
      }
      event.target.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("videos")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("videos"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("videos")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("videos")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              href: _ctx.route("admin.videos.create")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"${_scopeId2}><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current opacity-50 shrink-0",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("addVideo"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addVideo")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.videosCount) {
              _push2(ssrRenderComponent(_sfc_main$1, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.videosCount) {
              _push2(ssrRenderComponent(_sfc_main$b, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.videosCount) {
              _push2(ssrRenderComponent(_sfc_main$c, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.videosCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.videosCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              videos: paginatedVideos.value,
              "selected-videos": selectedVideos.value,
              onToggleLeft: toggleLeft,
              onToggleMain: toggleMain,
              onToggleRight: toggleRight,
              onToggleActivity: toggleActivity,
              onDelete: confirmDelete,
              onUpdateSortOrder: handleSortOrderUpdate,
              onToggleSelect: toggleSelectVideo,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.videosCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$d, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$e, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredVideos.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$f, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteVideo,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$a, {
                      href: _ctx.route("admin.videos.create")
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 fill-current opacity-50 shrink-0",
                          viewBox: "0 0 16 16"
                        }, [
                          createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("addVideo")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.videosCount ? (openBlock(), createBlock(_sfc_main$1, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.videosCount ? (openBlock(), createBlock(_sfc_main$b, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.videosCount ? (openBlock(), createBlock(_sfc_main$c, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.videosCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$3, {
                    videos: paginatedVideos.value,
                    "selected-videos": selectedVideos.value,
                    onToggleLeft: toggleLeft,
                    onToggleMain: toggleMain,
                    onToggleRight: toggleRight,
                    onToggleActivity: toggleActivity,
                    onDelete: confirmDelete,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onToggleSelect: toggleSelectVideo,
                    onToggleAll: toggleAll
                  }, null, 8, ["videos", "selected-videos"]),
                  __props.videosCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$d, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$e, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredVideos.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$2, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$f, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteVideo,
                cancelText: unref(t)("cancel"),
                confirmText: unref(t)("yesDelete")
              }, null, 8, ["show", "cancelText", "confirmText"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Videos/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
