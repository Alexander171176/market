import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, computed, createTextVNode, createBlock, openBlock, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$7 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$6, a as _sfc_main$9, b as _sfc_main$c } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$8, a as _sfc_main$a, b as _sfc_main$b } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$4 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$5 } from "./IconEdit-KTqcKHBr.js";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
const _sfc_main$3 = {
  __name: "TagTable",
  __ssrInlineRender: true,
  props: {
    tags: Array,
    selectedTags: Array
  },
  emits: [
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
    const localTags = ref([]);
    watch(() => props.tags, (newVal) => {
      localTags.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localTags.value.map((tag) => tag.id);
      emits("update-sort-order", newOrderIds);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.tags.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm font-semibold uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-semibold text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("localization"))}><svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-semibold text-left">${ssrInterpolate(unref(t)("name"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-semibold text-left">${ssrInterpolate(unref(t)("url"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("views"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16"><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-semibold text-end">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-center font-medium"><input type="checkbox"></div></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localTags.value,
          "onUpdate:modelValue": ($event) => localTags.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: tag }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(tag.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center uppercase text-orange-500 dark:text-orange-200"${_scopeId}>${ssrInterpolate(tag.locale)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-teal-600 dark:text-violet-200"${_scopeId}>${ssrInterpolate(tag.name)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><a${ssrRenderAttr("href", `/tags/${encodeURIComponent(tag.slug)}`)} class="text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50" target="_blank" rel="noopener noreferrer"${_scopeId}>${ssrInterpolate(tag.slug)}</a></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(tag.views)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                isActive: tag.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", tag),
                title: tag.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route("admin.tags.edit", tag.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                onClick: ($event) => _ctx.$emit("delete", tag.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedTags.includes(tag.id)) ? " checked" : ""}${_scopeId}></div></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center text-blue-600 dark:text-blue-200" }, toDisplayString(tag.id), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center uppercase text-orange-500 dark:text-orange-200" }, toDisplayString(tag.locale), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-teal-600 dark:text-violet-200" }, toDisplayString(tag.name), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      createVNode("a", {
                        href: `/tags/${encodeURIComponent(tag.slug)}`,
                        class: "text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50",
                        target: "_blank",
                        rel: "noopener noreferrer"
                      }, toDisplayString(tag.slug), 9, ["href"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(tag.views), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-end space-x-2" }, [
                      createVNode(_sfc_main$4, {
                        isActive: tag.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", tag),
                        title: tag.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$5, {
                        href: _ctx.route("admin.tags.edit", tag.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$6, {
                        onClick: ($event) => _ctx.$emit("delete", tag.id)
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("input", {
                        type: "checkbox",
                        checked: __props.selectedTags.includes(tag.id),
                        onChange: ($event) => _ctx.$emit("toggle-select", tag.id)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Tag/Table/TagTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option><option value="delete">${ssrInterpolate(unref(t)("deleteSelected"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Tag/Select/BulkActionSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-36 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="name">${ssrInterpolate(unref(t)("name"))}</option><option value="locale">${ssrInterpolate(unref(t)("localization"))}</option><option value="views">${ssrInterpolate(unref(t)("views"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Tag/Sort/SortSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["tags", "tagsCount", "adminCountTags", "adminSortTags"],
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountTags);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountTags"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortTags);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortTags"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const tagToDeleteId = ref(null);
    const tagToDeleteName = ref("");
    const confirmDelete = (id, name) => {
      tagToDeleteId.value = id;
      tagToDeleteName.value = name;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      tagToDeleteId.value = null;
      tagToDeleteName.value = "";
    };
    const deleteTag = () => {
      if (tagToDeleteId.value === null)
        return;
      const idToDelete = tagToDeleteId.value;
      const nameToDelete = tagToDeleteName.value;
      router.delete(route("admin.tags.destroy", { tag: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Тег "${nameToDelete || "ID: " + idToDelete}" удален.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Тег: ${nameToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          tagToDeleteId.value = null;
          tagToDeleteName.value = "";
        }
      });
    };
    const toggleActivity = (tag) => {
      const newActivity = !tag.activity;
      const actionText = newActivity ? "активирован" : "деактивирован";
      router.put(
        route("admin.actions.tags.updateActivity", { tag: tag.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Тег "${tag.name}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${tag.name}".`);
          }
        }
      );
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortTags = (tags) => {
      if (sortParam.value === "idAsc") {
        return tags.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return tags.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return tags.filter((tag) => tag.activity);
      }
      if (sortParam.value === "inactive") {
        return tags.filter((tag) => !tag.activity);
      }
      if (sortParam.value === "locale") {
        return tags.slice().sort((a, b) => {
          if (a.locale < b.locale)
            return 1;
          if (a.locale > b.locale)
            return -1;
          return 0;
        });
      }
      if (sortParam.value === "views") {
        return tags.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
      }
      return tags.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredTags = computed(() => {
      let filtered = props.tags;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (tag) => tag.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortTags(filtered);
    });
    const paginatedTags = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredTags.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredTags.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.tags.updateSortBulk"),
        { tags: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок тегов успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.tags || "Не удалось обновить порядок тегов.");
            router.reload({ only: ["tags"], preserveScroll: true });
          }
        }
      );
    };
    const selectedTags = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedTags.value = [.../* @__PURE__ */ new Set([...selectedTags.value, ...ids])];
      } else {
        selectedTags.value = selectedTags.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectTag = (tagId) => {
      const index = selectedTags.value.indexOf(tagId);
      if (index > -1) {
        selectedTags.value.splice(index, 1);
      } else {
        selectedTags.value.push(tagId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedTags.value.length) {
        toast.warning("Выберите теги для активации/деактивации тегов");
        return;
      }
      axios.put(route("admin.actions.tags.bulkUpdateActivity"), {
        ids: selectedTags.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedTags.value];
        selectedTags.value = [];
        paginatedTags.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const bulkDelete = () => {
      if (selectedTags.value.length === 0) {
        toast.warning("Выберите хотя бы один тег для удаления.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
      }
      router.delete(route("admin.actions.tags.bulkDestroy"), {
        data: { ids: selectedTags.value },
        preserveScroll: true,
        preserveState: false,
        // Перезагружаем данные страницы
        onSuccess: (page) => {
          selectedTags.value = [];
          toast.success("Массовое удаление тегов успешно завершено.");
        },
        onError: (errors) => {
          console.error("Ошибка массового удаления:", errors);
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || "Произошла ошибка при удалении тегов.";
          toast.error(errorMessage);
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedTags.value = paginatedTags.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedTags.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      } else if (action === "delete") {
        bulkDelete();
      }
      event.target.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("tags")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("tags"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("tags")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("tags")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              href: _ctx.route("admin.tags.create")
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
                  _push3(` ${ssrInterpolate(unref(t)("addTag"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addTag")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.tagsCount) {
              _push2(ssrRenderComponent(_sfc_main$2, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.tagsCount) {
              _push2(ssrRenderComponent(_sfc_main$8, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.tagsCount) {
              _push2(ssrRenderComponent(_sfc_main$9, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.tagsCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.tagsCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              tags: paginatedTags.value,
              "selected-tags": selectedTags.value,
              onToggleActivity: toggleActivity,
              onUpdateSortOrder: handleSortOrderUpdate,
              onDelete: confirmDelete,
              onToggleSelect: toggleSelectTag,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.tagsCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$a, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$b, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredTags.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteTag,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$7, {
                      href: _ctx.route("admin.tags.create")
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
                        createTextVNode(" " + toDisplayString(unref(t)("addTag")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.tagsCount ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.tagsCount ? (openBlock(), createBlock(_sfc_main$8, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.tagsCount ? (openBlock(), createBlock(_sfc_main$9, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.tagsCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$3, {
                    tags: paginatedTags.value,
                    "selected-tags": selectedTags.value,
                    onToggleActivity: toggleActivity,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectTag,
                    onToggleAll: toggleAll
                  }, null, 8, ["tags", "selected-tags"]),
                  __props.tagsCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$a, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$b, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredTags.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$1, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$c, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteTag,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tags/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
