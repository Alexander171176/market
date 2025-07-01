import { mergeProps, unref, useSSRContext, ref, watch, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, createSlots, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { Link, router } from "@inertiajs/vue3";
import draggable from "vuedraggable";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$6 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$5, a as _sfc_main$7, b as _sfc_main$8 } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$3 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$4 } from "./IconEdit-KTqcKHBr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ScrollButtons-DpnzINGM.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "axios";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main$2 = {
  __name: "BulkActionSelect",
  __ssrInlineRender: true,
  props: {
    handleBulkAction: Function
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Category/Select/BulkActionSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CategoryTreeItem",
  __ssrInlineRender: true,
  props: {
    category: Object,
    level: Number,
    selectedCategories: Array
  },
  emits: [
    "toggle-activity",
    "delete",
    "toggle-select",
    "request-drag-end"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const isExpanded = ref(true);
    watch(() => props.category, (newVal, oldVal) => {
    }, { deep: true });
    watch(() => props.selectedCategories, (newVal, oldVal) => {
    }, { deep: true });
    const handleInnerDragEnd = (event) => {
      emits("request-drag-end", event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CategoryTreeItem = resolveComponent("CategoryTreeItem", true);
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="category-item mb-1" style="${ssrRenderStyle({ marginLeft: __props.level * 20 + "px" })}"><div class="flex items-center justify-between py-1 px-3 border border-gray-400 rounded-sm bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition duration-150 ease-in-out"><div class="flex items-center space-x-2 flex-grow min-w-0"><span class="handle cursor-move mr-1 flex-shrink-0"${ssrRenderAttr("title", unref(t)("dragDrop"))}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4"><path class="fill-current text-sky-500 dark:text-sky-200" d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 96-96 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 96 0 0 96-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0 0-96 96 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 32-96 0 0-96 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"></path></svg></span>`);
      if (__props.category.children && __props.category.children.length) {
        _push(`<button${ssrRenderAttr("title", isExpanded.value ? unref(t)("collapse") : unref(t)("expand"))} class="flex-shrink-0 text-slate-900 hover:text-red-500 dark:text-slate-100 dark:hover:text-red-200"><svg class="${ssrRenderClass([{ "rotate-90": isExpanded.value }, "w-5 h-5 transform transition-transform duration-150"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>`);
      } else {
        _push(`<span class="w-4 h-4 inline-block flex-shrink-0"></span>`);
      }
      _push(`<input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedCategories.includes(__props.category.id)) ? " checked" : ""} class="form-checkbox rounded-sm text-indigo-500 flex-shrink-0"><span class="font-semibold text-sm text-amber-600 dark:text-amber-200 mr-1 flex-shrink-0">${ssrInterpolate(__props.category.id)}</span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.categories.edit", __props.category.id),
        class: "font-medium text-teal-600 dark:text-teal-100 hover:text-indigo-600 dark:hover:text-indigo-300 truncate",
        title: __props.category.url
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.category.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.category.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="${ssrRenderClass([__props.category.activity ? "bg-amber-100 dark:bg-amber-700/50 text-amber-700 dark:text-amber-300" : "bg-blue-200 dark:bg-blue-900/50 text-gray-900 dark:text-gray-100", "text-xs ml-1 px-1.5 py-0.5 rounded-sm border border-slate-400 flex-shrink-0"])}">${ssrInterpolate(__props.category.locale.toUpperCase())}</span></div><div class="flex items-center space-x-1 flex-shrink-0 ml-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        isActive: __props.category.activity,
        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", __props.category),
        title: __props.category.activity ? unref(t)("enabled") : unref(t)("disabled")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        href: _ctx.route("admin.categories.edit", __props.category.id)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        onClick: ($event) => _ctx.$emit("delete", __props.category)
      }, null, _parent));
      _push(`</div></div></div><div style="${ssrRenderStyle(isExpanded.value && __props.category.children && __props.category.children.length ? null : { display: "none" })}" class="children-container mt-1">`);
      _push(ssrRenderComponent(unref(draggable), {
        modelValue: __props.category.children,
        "onUpdate:modelValue": ($event) => __props.category.children = $event,
        tag: "div",
        "item-key": "id",
        handle: ".handle",
        group: "categories",
        onEnd: handleInnerDragEnd,
        class: "category-tree-children",
        "data-parent-id": __props.category.id
      }, {
        item: withCtx(({ element: childCategory }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CategoryTreeItem, {
              category: childCategory,
              level: __props.level + 1,
              "selected-categories": __props.selectedCategories,
              onToggleActivity: (p) => _ctx.$emit("toggle-activity", p),
              onDelete: (p) => _ctx.$emit("delete", p),
              onToggleSelect: (id) => _ctx.$emit("toggle-select", id),
              onRequestDragEnd: handleInnerDragEnd
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CategoryTreeItem, {
                category: childCategory,
                level: __props.level + 1,
                "selected-categories": __props.selectedCategories,
                onToggleActivity: (p) => _ctx.$emit("toggle-activity", p),
                onDelete: (p) => _ctx.$emit("delete", p),
                onToggleSelect: (id) => _ctx.$emit("toggle-select", id),
                onRequestDragEnd: handleInnerDragEnd
              }, null, 8, ["category", "level", "selected-categories", "onToggleActivity", "onDelete", "onToggleSelect"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Category/Tree/CategoryTreeItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    // Теперь это иерархический массив
    categoriesCount: Number,
    currentLocale: String,
    availableLocales: Array,
    errors: Object
    // Ошибки валидации от Laravel (если есть)
  },
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const localCategories = ref([]);
    watch(() => props.categories, (newVal) => {
      localCategories.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const showConfirmDeleteModal = ref(false);
    const categoryToDeleteId = ref(null);
    const categoryToDeleteTitle = ref("");
    const confirmDelete = (category) => {
      categoryToDeleteId.value = category.id;
      categoryToDeleteTitle.value = category.title;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      categoryToDeleteId.value = null;
      categoryToDeleteTitle.value = "";
    };
    const deleteCategory = () => {
      if (categoryToDeleteId.value === null)
        return;
      const idToDelete = categoryToDeleteId.value;
      const titleToDelete = categoryToDeleteTitle.value;
      router.delete(route("admin.categories.destroy", { category: idToDelete }), {
        preserveScroll: true,
        // preserveState: false, // Перезагружаем данные после удаления
        onSuccess: () => {
          toast.success(`Страница "${titleToDelete || "ID: " + idToDelete}" удалена.`);
        },
        onError: (errors) => {
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Страница: ${titleToDelete || "ID: " + idToDelete})`);
        },
        onFinish: () => {
          closeModal();
        }
      });
    };
    const toggleActivity = (category) => {
      const newActivity = !category.activity;
      const actionText = newActivity ? t("activated") : t("deactivated");
      router.put(
        route("admin.actions.categories.updateActivity", { category: category.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          preserveState: true,
          // Оптимистичное обновление или дождаться success
          onSuccess: () => {
            const findAndUpdateActivity = (nodes, id, activity) => {
              for (const node of nodes) {
                if (node.id === id) {
                  node.activity = activity;
                  return true;
                }
                if (node.children && node.children.length > 0) {
                  if (findAndUpdateActivity(node.children, id, activity)) {
                    return true;
                  }
                }
              }
              return false;
            };
            findAndUpdateActivity(localCategories.value, category.id, newActivity);
            toast.success(`Страница "${category.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${category.title}".`);
          }
        }
      );
    };
    const handleDragEnd = (event) => {
      let changes = [];
      const updateSortAndCollectChanges = (nodes, parentId) => {
        nodes.forEach((node, index) => {
          let changed = false;
          if (node.sort !== index) {
            node.sort = index;
            changed = true;
          }
          if (node.parent_id !== parentId) {
            changed = true;
          }
          if (changed) {
            changes.push({
              id: node.id,
              sort: node.sort,
              parent_id: parentId
              // Используем новый parentId
            });
          }
          if (node.children && node.children.length) {
            updateSortAndCollectChanges(node.children, node.id);
          }
        });
      };
      updateSortAndCollectChanges(localCategories.value, null);
      const uniqueChanges = changes.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          Object.assign(x, current);
          return acc;
        }
      }, []);
      if (uniqueChanges.length > 0) {
        router.put(route("admin.actions.categories.updateSortBulk"), {
          categories: uniqueChanges,
          locale: props.currentLocale
          // Передаем текущую локаль
        }, {
          preserveScroll: true,
          preserveState: true,
          // Чтобы не перерисовывать все дерево при успехе
          onSuccess: () => {
            toast.success("Иерархия успешно обновлена");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.message || "Ошибка обновления иерархии");
            router.reload({ only: ["categories"], preserveScroll: true });
          }
        });
      } else {
        console.log("Никаких изменений в порядке сортировки нет.");
      }
    };
    const selectedCategories = ref([]);
    const getAllIds = (nodes) => {
      let ids = [];
      nodes.forEach((node) => {
        ids.push(node.id);
        if (node.children && node.children.length) {
          ids = ids.concat(getAllIds(node.children));
        }
      });
      return ids;
    };
    const toggleAll = (event) => {
      var _a;
      const checked = (_a = event.target) == null ? void 0 : _a.checked;
      const allNodeIds = getAllIds(localCategories.value);
      if (checked === true) {
        selectedCategories.value = allNodeIds;
      } else if (checked === false) {
        selectedCategories.value = [];
      }
    };
    const toggleSelectCategory = (categoryId) => {
      const index = selectedCategories.value.indexOf(categoryId);
      if (index > -1) {
        selectedCategories.value.splice(index, 1);
      } else {
        selectedCategories.value.push(categoryId);
      }
    };
    const updateActivityByIds = (nodes, ids, activity) => {
      nodes.forEach((node) => {
        if (ids.includes(node.id)) {
          node.activity = activity;
        }
        if (node.children && node.children.length) {
          updateActivityByIds(node.children, ids, activity);
        }
      });
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedCategories.value.length) {
        toast.warning("Выберите страницы для активации/деактивации");
        return;
      }
      const idsToUpdate = [...selectedCategories.value];
      router.put(route("admin.actions.categories.bulkUpdateActivity"), {
        ids: idsToUpdate,
        activity: newActivity
      }, {
        preserveScroll: true,
        preserveState: true,
        // Остаемся на месте
        onSuccess: () => {
          updateActivityByIds(localCategories.value, idsToUpdate, newActivity);
          selectedCategories.value = [];
          toast.success("Статус активации массово обновлены");
        },
        onError: () => {
          toast.error("Произошла оштбка при массовом обновлении статуса активности");
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        toggleAll({ target: { checked: true } });
      } else if (action === "deselectAll") {
        toggleAll({ target: { checked: false } });
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      }
      event.target.value = "";
    };
    const localeLink = (locale) => {
      return route("admin.categories.index", { locale });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("categories")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("categories"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("categories")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("categories")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" data-v-f52a1ca0${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" data-v-f52a1ca0${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2" data-v-f52a1ca0${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              href: _ctx.route("admin.categories.create", { locale: __props.currentLocale })
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16" data-v-f52a1ca0${_scopeId2}><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" data-v-f52a1ca0${_scopeId2}></path></svg>`);
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
                  _push3(` ${ssrInterpolate(unref(t)("addCategory"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addCategory")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.categoriesCount > 0) {
              _push2(ssrRenderComponent(_sfc_main$2, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-between mt-5" data-v-f52a1ca0${_scopeId}><div class="flex items-center justify-end space-x-2 px-3 py-1 border-x border-t border-gray-400 rounded-t-lg bg-gray-100 dark:bg-gray-900" data-v-f52a1ca0${_scopeId}><span class="text-sm font-medium text-slate-700 dark:text-slate-200" data-v-f52a1ca0${_scopeId}>${ssrInterpolate(unref(t)("localization"))}: </span><!--[-->`);
            ssrRenderList(__props.availableLocales, (locale) => {
              _push2(ssrRenderComponent(unref(Link), {
                href: localeLink(locale),
                class: [
                  "px-3 py-1 text-sm font-medium rounded-sm",
                  __props.currentLocale === locale ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                ],
                "preserve-scroll": "",
                "preserve-state": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(locale.toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(locale.toUpperCase()), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="flex items-center" data-v-f52a1ca0${_scopeId}>`);
            if (__props.categoriesCount) {
              _push2(ssrRenderComponent(_sfc_main$7, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.categoriesCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.categoriesCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="checkbox" id="select-all-header" class="form-checkbox rounded-sm text-indigo-500 ml-2"${ssrRenderAttr("title", unref(t)("selectAll"))} data-v-f52a1ca0${_scopeId}></div></div><div class="bg-gray-300 dark:bg-gray-900 border border-gray-400 relative" data-v-f52a1ca0${_scopeId}>`);
            _push2(ssrRenderComponent(unref(draggable), {
              modelValue: localCategories.value,
              "onUpdate:modelValue": ($event) => localCategories.value = $event,
              tag: "div",
              "item-key": "id",
              handle: ".handle",
              group: "categories",
              onEnd: handleDragEnd,
              class: "category-tree-root",
              "data-parent-id": null
            }, createSlots({
              item: withCtx(({ element: category }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    category,
                    level: 0,
                    "selected-categories": selectedCategories.value,
                    onToggleActivity: toggleActivity,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectCategory,
                    onRequestDragEnd: handleDragEnd
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1, {
                      category,
                      level: 0,
                      "selected-categories": selectedCategories.value,
                      onToggleActivity: toggleActivity,
                      onDelete: confirmDelete,
                      onToggleSelect: toggleSelectCategory,
                      onRequestDragEnd: handleDragEnd
                    }, null, 8, ["category", "selected-categories"])
                  ];
                }
              }),
              _: 2
            }, [
              localCategories.value.length === 0 && __props.categoriesCount > 0 ? {
                name: "header",
                fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-4 text-center text-slate-500 dark:text-slate-400" data-v-f52a1ca0${_scopeId2}>${ssrInterpolate(unref(t)("loading"))}... </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-4 text-center text-slate-500 dark:text-slate-400" }, toDisplayString(unref(t)("loading")) + "... ", 1)
                    ];
                  }
                }),
                key: "0"
              } : void 0,
              localCategories.value.length === 0 && __props.categoriesCount === 0 ? {
                name: "footer",
                fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-4 text-center text-slate-900 dark:text-slate-100" data-v-f52a1ca0${_scopeId2}>${ssrInterpolate(unref(t)("noData"))}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-4 text-center text-slate-900 dark:text-slate-100" }, toDisplayString(unref(t)("noData")), 1)
                    ];
                  }
                }),
                key: "1"
              } : void 0
            ]), _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteCategory,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$6, {
                      href: _ctx.route("admin.categories.create", { locale: __props.currentLocale })
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
                        createTextVNode(" " + toDisplayString(unref(t)("addCategory")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.categoriesCount > 0 ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center justify-between mt-5" }, [
                    createVNode("div", { class: "flex items-center justify-end space-x-2 px-3 py-1 border-x border-t border-gray-400 rounded-t-lg bg-gray-100 dark:bg-gray-900" }, [
                      createVNode("span", { class: "text-sm font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(unref(t)("localization")) + ": ", 1),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.availableLocales, (locale) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: locale,
                          href: localeLink(locale),
                          class: [
                            "px-3 py-1 text-sm font-medium rounded-sm",
                            __props.currentLocale === locale ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                          ],
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(locale.toUpperCase()), 1)
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      __props.categoriesCount ? (openBlock(), createBlock(_sfc_main$7, { key: 0 }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.categoriesCount), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode("input", {
                        type: "checkbox",
                        id: "select-all-header",
                        onChange: toggleAll,
                        class: "form-checkbox rounded-sm text-indigo-500 ml-2",
                        title: unref(t)("selectAll")
                      }, null, 40, ["title"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-gray-300 dark:bg-gray-900 border border-gray-400 relative" }, [
                    createVNode(unref(draggable), {
                      modelValue: localCategories.value,
                      "onUpdate:modelValue": ($event) => localCategories.value = $event,
                      tag: "div",
                      "item-key": "id",
                      handle: ".handle",
                      group: "categories",
                      onEnd: handleDragEnd,
                      class: "category-tree-root",
                      "data-parent-id": null
                    }, createSlots({
                      item: withCtx(({ element: category }) => [
                        createVNode(_sfc_main$1, {
                          category,
                          level: 0,
                          "selected-categories": selectedCategories.value,
                          onToggleActivity: toggleActivity,
                          onDelete: confirmDelete,
                          onToggleSelect: toggleSelectCategory,
                          onRequestDragEnd: handleDragEnd
                        }, null, 8, ["category", "selected-categories"])
                      ]),
                      _: 2
                    }, [
                      localCategories.value.length === 0 && __props.categoriesCount > 0 ? {
                        name: "header",
                        fn: withCtx(() => [
                          createVNode("div", { class: "p-4 text-center text-slate-500 dark:text-slate-400" }, toDisplayString(unref(t)("loading")) + "... ", 1)
                        ]),
                        key: "0"
                      } : void 0,
                      localCategories.value.length === 0 && __props.categoriesCount === 0 ? {
                        name: "footer",
                        fn: withCtx(() => [
                          createVNode("div", { class: "p-4 text-center text-slate-900 dark:text-slate-100" }, toDisplayString(unref(t)("noData")), 1)
                        ]),
                        key: "1"
                      } : void 0
                    ]), 1032, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$8, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteCategory,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Categories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f52a1ca0"]]);
export {
  Index as default
};
