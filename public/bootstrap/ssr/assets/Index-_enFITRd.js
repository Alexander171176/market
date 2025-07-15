import { mergeProps, unref, useSSRContext, ref, watch, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, computed, createTextVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$9 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$8, a as _sfc_main$b, b as _sfc_main$e } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$a, a as _sfc_main$c, b as _sfc_main$d } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./RightToggle-DUyJT3iw.js";
import { _ as _sfc_main$6 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$7 } from "./IconEdit-KTqcKHBr.js";
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
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-56 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="title">${ssrInterpolate(unref(t)("title"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option><option value="left">${ssrInterpolate(unref(t)("inLeft"))}</option><option value="noLeft">${ssrInterpolate(unref(t)("notLeft"))}</option><option value="right">${ssrInterpolate(unref(t)("inRight"))}</option><option value="noRight">${ssrInterpolate(unref(t)("notRight"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Banner/Sort/SortSelect.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "BannerTable",
  __ssrInlineRender: true,
  props: {
    banners: Array,
    selectedBanners: Array
  },
  emits: [
    "toggle-left",
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
    const localBanners = ref([]);
    watch(() => props.banners, (newVal) => {
      localBanners.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localBanners.value.map((banner) => banner.id);
      emits("update-sort-order", newOrderIds);
    };
    const getPrimaryImage = (banner) => {
      if (banner.images && banner.images.length) {
        return [...banner.images].sort((a, b) => a.order - b.order)[0];
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.banners.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("image"))}><svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("title"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("url"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("sections"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("show"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="text-center"><input type="checkbox"></div></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localBanners.value,
          "onUpdate:modelValue": ($event) => localBanners.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: banner }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(banner.id)}</div></td><td class="first:pl-5 last:pr-5 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
              if (banner.images && banner.images.length) {
                _push2(`<img${ssrRenderAttr("src", getPrimaryImage(banner).webp_url || getPrimaryImage(banner).url)}${ssrRenderAttr("alt", getPrimaryImage(banner).alt || unref(t)("defaultImageAlt"))}${ssrRenderAttr("title", getPrimaryImage(banner).caption || unref(t)("postImage"))} class="h-8 w-8 object-cover rounded-full"${_scopeId}>`);
              } else {
                _push2(`<img src="/storage/banner_images/default-image.png"${ssrRenderAttr("alt", unref(t)("defaultImageTitle"))} class="h-8 w-8 object-cover rounded-full"${_scopeId}>`);
              }
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-teal-600 dark:text-violet-200"${_scopeId}>${ssrInterpolate(banner.title)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-teal-600 dark:text-violet-200"${_scopeId}>${ssrInterpolate(banner.link)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><!--[-->`);
              ssrRenderList(banner.sections, (section) => {
                _push2(`<span${_scopeId}><span${ssrRenderAttr("title", section.title)} class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200 rounded-sm text-xs text-slate-100 dark:text-slate-900"${_scopeId}>${ssrInterpolate(section.id)}</span></span>`);
              });
              _push2(`<!--]--></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                isActive: banner.left,
                onToggleLeft: ($event) => _ctx.$emit("toggle-left", banner),
                title: banner.left ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                isActive: banner.right,
                onToggleRight: ($event) => _ctx.$emit("toggle-right", banner),
                title: banner.right ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                isActive: banner.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", banner),
                title: banner.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$7, {
                href: _ctx.route("admin.banners.edit", banner.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$8, {
                onDelete: ($event) => _ctx.$emit("delete", banner.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedBanners.includes(banner.id)) ? " checked" : ""}${_scopeId}></div></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center text-blue-600 dark:text-blue-200" }, toDisplayString(banner.id), 1)
                  ]),
                  createVNode("td", { class: "first:pl-5 last:pr-5 py-1" }, [
                    createVNode("div", { class: "flex justify-center" }, [
                      banner.images && banner.images.length ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: getPrimaryImage(banner).webp_url || getPrimaryImage(banner).url,
                        alt: getPrimaryImage(banner).alt || unref(t)("defaultImageAlt"),
                        title: getPrimaryImage(banner).caption || unref(t)("postImage"),
                        class: "h-8 w-8 object-cover rounded-full"
                      }, null, 8, ["src", "alt", "title"])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: "/storage/banner_images/default-image.png",
                        alt: unref(t)("defaultImageTitle"),
                        class: "h-8 w-8 object-cover rounded-full"
                      }, null, 8, ["alt"]))
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-teal-600 dark:text-violet-200" }, toDisplayString(banner.title), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-teal-600 dark:text-violet-200" }, toDisplayString(banner.link), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(banner.sections, (section) => {
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
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$4, {
                        isActive: banner.left,
                        onToggleLeft: ($event) => _ctx.$emit("toggle-left", banner),
                        title: banner.left ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleLeft", "title"]),
                      createVNode(_sfc_main$5, {
                        isActive: banner.right,
                        onToggleRight: ($event) => _ctx.$emit("toggle-right", banner),
                        title: banner.right ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleRight", "title"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$6, {
                        isActive: banner.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", banner),
                        title: banner.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$7, {
                        href: _ctx.route("admin.banners.edit", banner.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$8, {
                        onDelete: ($event) => _ctx.$emit("delete", banner.id)
                      }, null, 8, ["onDelete"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("input", {
                        type: "checkbox",
                        checked: __props.selectedBanners.includes(banner.id),
                        onChange: ($event) => _ctx.$emit("toggle-select", banner.id)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Banner/Table/BannerTable.vue");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option><option value="left">${ssrInterpolate(unref(t)("left"))}</option><option value="noLeft">${ssrInterpolate(unref(t)("noLeft"))}</option><option value="right">${ssrInterpolate(unref(t)("right"))}</option><option value="noRight">${ssrInterpolate(unref(t)("noRight"))}</option><option value="delete">${ssrInterpolate(unref(t)("deleteSelected"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Banner/Select/BulkActionSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["banners", "bannersCount", "adminCountBanners", "adminSortBanners"],
  setup(__props) {
    const toast = useToast();
    const { t } = useI18n();
    const props = __props;
    const itemsPerPage = ref(props.adminCountBanners);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountBanners"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortBanners);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortBanners"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const bannerToDeleteId = ref(null);
    const bannerToDeleteTitle = ref("");
    const confirmDelete = (id, title) => {
      bannerToDeleteId.value = id;
      bannerToDeleteTitle.value = title;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      bannerToDeleteId.value = null;
      bannerToDeleteTitle.value = "";
    };
    const deleteBanner = () => {
      if (bannerToDeleteId.value === null)
        return;
      const idToDelete = bannerToDeleteId.value;
      const titleToDelete = bannerToDeleteTitle.value;
      router.delete(route("admin.banners.destroy", { banner: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Баннер "${titleToDelete || "ID: " + idToDelete}" удален.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Баннер: ${titleToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          bannerToDeleteId.value = null;
          bannerToDeleteTitle.value = "";
        }
      });
    };
    const toggleLeft = (banner) => {
      const newLeft = !banner.left;
      const actionText = newLeft ? "активирован в левой колонке" : "деактивирован в левой колонке";
      router.put(
        route("admin.actions.banners.updateLeft", { banner: banner.id }),
        { left: newLeft },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Баннер "${banner.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.left || errors.general || `Ошибка изменения активности для "${banner.title}".`);
          }
        }
      );
    };
    const toggleRight = (banner) => {
      const newRight = !banner.right;
      const actionText = newRight ? "активирован в правой колонке" : "деактивирован в правой колонке";
      router.put(
        route("admin.actions.banners.updateRight", { banner: banner.id }),
        { right: newRight },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Баннер "${banner.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.right || errors.general || `Ошибка изменения активности для "${banner.title}".`);
          }
        }
      );
    };
    const toggleActivity = (banner) => {
      const newActivity = !banner.activity;
      const actionText = newActivity ? "активирован" : "деактивирован";
      router.put(
        route("admin.actions.banners.updateActivity", { banner: banner.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Баннер "${banner.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${banner.title}".`);
          }
        }
      );
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortBanners = (banners) => {
      if (sortParam.value === "idAsc") {
        return banners.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return banners.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return banners.filter((banner) => banner.activity);
      }
      if (sortParam.value === "inactive") {
        return banners.filter((banner) => !banner.activity);
      }
      if (sortParam.value === "left") {
        return banners.filter((banner) => banner.left);
      }
      if (sortParam.value === "noLeft") {
        return banners.filter((banner) => !banner.left);
      }
      if (sortParam.value === "right") {
        return banners.filter((banner) => banner.right);
      }
      if (sortParam.value === "noRight") {
        return banners.filter((banner) => !banner.right);
      }
      return banners.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredBanners = computed(() => {
      let filtered = props.banners;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (banner) => banner.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortBanners(filtered);
    });
    const paginatedBanners = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredBanners.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredBanners.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.banners.updateSortBulk"),
        { banners: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок баннеров успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.banners || "Не удалось обновить порядок баннеров.");
            router.reload({ only: ["banners"], preserveScroll: true });
          }
        }
      );
    };
    const selectedBanners = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedBanners.value = [.../* @__PURE__ */ new Set([...selectedBanners.value, ...ids])];
      } else {
        selectedBanners.value = selectedBanners.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectBanner = (bannerId) => {
      const index = selectedBanners.value.indexOf(bannerId);
      if (index > -1) {
        selectedBanners.value.splice(index, 1);
      } else {
        selectedBanners.value.push(bannerId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedBanners.value.length) {
        toast.warning("Выберите баннер для активации/деактивации баннеров");
        return;
      }
      axios.put(route("admin.actions.banners.bulkUpdateActivity"), {
        ids: selectedBanners.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedBanners.value];
        selectedBanners.value = [];
        paginatedBanners.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const bulkToggleLeft = (newLeft) => {
      if (selectedBanners.value.length === 0) {
        toast.warning(`Выберите баннера для ${newLeft ? "активации в левой колонки" : "деактивации в левой колонки"}.`);
        return;
      }
      axios.put(route("admin.actions.banners.bulkUpdateLeft"), {
        ids: selectedBanners.value,
        left: newLeft
      }).then(() => {
        toast.success("Статус в левой колонки массово обновлен");
        const updatedIds = [...selectedBanners.value];
        selectedBanners.value = [];
        paginatedBanners.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.left = newLeft;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить статус в левой колонке");
      });
    };
    const bulkToggleRight = (newRight) => {
      if (selectedBanners.value.length === 0) {
        toast.warning(`Выберите баннера для ${newRight ? "активации" : "деактивации"}.`);
        return;
      }
      axios.put(route("admin.actions.banners.bulkUpdateRight"), {
        ids: selectedBanners.value,
        right: newRight
      }).then(() => {
        toast.success("Статус в правой колонки массово обновлен");
        const updatedIds = [...selectedBanners.value];
        selectedBanners.value = [];
        paginatedBanners.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.right = newRight;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить статус в правой колонке");
      });
    };
    const bulkDelete = () => {
      if (selectedBanners.value.length === 0) {
        toast.warning("Выберите хотя бы один баннер для удаления.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
      }
      router.delete(route("admin.actions.banners.bulkDestroy"), {
        data: { ids: selectedBanners.value },
        preserveScroll: true,
        preserveState: false,
        // Перезагружаем данные страницы
        onSuccess: (page) => {
          selectedBanners.value = [];
          toast.success("Массовое удаление баннеров успешно завершено.");
        },
        onError: (errors) => {
          console.error("Ошибка массового удаления:", errors);
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || "Произошла ошибка при удалении баннеров.";
          toast.error(errorMessage);
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedBanners.value = paginatedBanners.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedBanners.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      } else if (action === "left") {
        bulkToggleLeft(true);
      } else if (action === "noLeft") {
        bulkToggleLeft(false);
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
        title: unref(t)("banners")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("banners"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("banners")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("banners")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              href: _ctx.route("admin.banners.create")
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
                  _push3(` ${ssrInterpolate(unref(t)("addBanner"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addBanner")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.bannersCount) {
              _push2(ssrRenderComponent(_sfc_main$1, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.bannersCount) {
              _push2(ssrRenderComponent(_sfc_main$a, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.bannersCount) {
              _push2(ssrRenderComponent(_sfc_main$b, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.bannersCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.bannersCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              banners: paginatedBanners.value,
              "selected-banners": selectedBanners.value,
              onToggleLeft: toggleLeft,
              onToggleRight: toggleRight,
              onToggleActivity: toggleActivity,
              onDelete: confirmDelete,
              onUpdateSortOrder: handleSortOrderUpdate,
              onToggleSelect: toggleSelectBanner,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.bannersCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$c, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$d, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredBanners.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteBanner,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$9, {
                      href: _ctx.route("admin.banners.create")
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
                        createTextVNode(" " + toDisplayString(unref(t)("addBanner")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.bannersCount ? (openBlock(), createBlock(_sfc_main$1, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.bannersCount ? (openBlock(), createBlock(_sfc_main$a, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.bannersCount ? (openBlock(), createBlock(_sfc_main$b, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.bannersCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    banners: paginatedBanners.value,
                    "selected-banners": selectedBanners.value,
                    onToggleLeft: toggleLeft,
                    onToggleRight: toggleRight,
                    onToggleActivity: toggleActivity,
                    onDelete: confirmDelete,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onToggleSelect: toggleSelectBanner,
                    onToggleAll: toggleAll
                  }, null, 8, ["banners", "selected-banners"]),
                  __props.bannersCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$c, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$d, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredBanners.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage"]),
                    createVNode(_sfc_main$3, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$e, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteBanner,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Banners/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
