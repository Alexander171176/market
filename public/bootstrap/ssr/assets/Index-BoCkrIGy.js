import { mergeProps, unref, useSSRContext, ref, watch, withCtx, createVNode, toDisplayString, computed, createTextVNode, createBlock, openBlock, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$7 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$8, a as _sfc_main$a, b as _sfc_main$b } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$4 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$5 } from "./IconEdit-KTqcKHBr.js";
import { _ as _sfc_main$6, a as _sfc_main$9, b as _sfc_main$c } from "./CountTable-f38CJ74P.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-44 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="category">${ssrInterpolate(unref(t)("category"))}</option><option value="type">${ssrInterpolate(unref(t)("type"))}</option><option value="option">${ssrInterpolate(unref(t)("parameter"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Parameters/Sort/SortSelect.vue");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Parameters/Select/BulkActionSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ParameterTable",
  __ssrInlineRender: true,
  props: {
    settings: Array,
    selectedSettings: Array
  },
  emits: [
    "toggle-activity",
    "delete",
    "update-sort-order",
    "toggle-select",
    "toggle-all"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const localSettings = ref([]);
    watch(() => props.settings, (newVal) => {
      localSettings.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localSettings.value.map((setting) => setting.id);
      emits("update-sort-order", newOrderIds);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 rounded-md shadow-md border" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.settings.length) {
        _push(`<table class="table-auto w-full text-sm"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${ssrRenderAttr("title", unref(t)("parameter"))}><svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24"><path class="fill-current text-blue-600" d="M10,7H2A1,1,0,0,1,1,6V2A1,1,0,0,1,2,1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,10,7Z"></path><path class="fill-current text-blue-600" d="M10,23H2a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v4A1,1,0,0,1,10,23Z"></path><rect class="fill-current text-sky-500" x="5" y="8" width="2" height="8"></rect><path class="fill-current text-sky-500" d="M19,7H17V5H12V3h6a1,1,0,0,1,1,1Z"></path><path class="fill-current text-sky-500" d="M18,21H12V19h5V17h2v3A1,1,0,0,1,18,21Z"></path><path class="fill-current text-violet-500" d="M18,16a1,1,0,0,1-.515-.143l-5-3a1,1,0,0,1,0-1.714l5-3a1,1,0,0,1,1.03,0l5,3a1,1,0,0,1,0,1.714l-5,3A1,1,0,0,1,18,16Z"></path></svg></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${ssrRenderAttr("title", unref(t)("value"))}><svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24"><path class="fill-current text-sky-500" d="M23.57,10.005l-2.907-.415c-.197-.71-.476-1.385-.831-2.014l1.76-2.348c.148-.199,.129-.478-.047-.653l-2.121-2.121c-.176-.176-.456-.194-.653-.047l-2.348,1.76c-.628-.356-1.303-.634-2.014-.831l-.415-2.907c-.035-.247-.246-.43-.495-.43h-3c-.249,0-.46,.183-.495,.43l-.415,2.907c-.71,.197-1.385,.476-2.014,.831l-2.348-1.76c-.197-.147-.478-.129-.653,.047l-2.121,2.121c-.176,.176-.195,.454-.047,.653l1.76,2.348c-.356,.628-.634,1.303-.831,2.014l-2.907,.415c-.247,.035-.43,.246-.43,.495v3c0,.249,.183,.46,.43,.495l2.907,.415c.197,.71,.476,1.385,.831,2.014l-1.76,2.348c-.148,.199-.129,.478,.047,.653l2.121,2.121c.097,.097,.225,.146,.354,.146,.105,0,.211-.033,.3-.1l2.348-1.76c.628,.356,1.303,.634,2.014,.831l.415,2.907c.035,.247,.246,.43,.495,.43h3c.249,0,.46-.183,.495-.43l.415-2.907c.71-.197,1.385-.476,2.014-.831l2.348,1.76c.089,.066,.194,.1,.3,.1,.129,0,.257-.05,.354-.146l2.121-2.121c.176-.176,.195-.454,.047-.653l-1.76-2.348c.356-.628,.634-1.303,.831-2.014l2.907-.415c.247-.035,.43-.246,.43-.495v-3c0-.249-.183-.46-.43-.495Zm-11.57,5.995c-2.209,0-4-1.791-4-4s1.791-4,4-4,4,1.791,4,4-1.791,4-4,4Z" fill="#212121"></path></svg></th><th class="flex justify-center px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${ssrRenderAttr("title", unref(t)("category"))}><svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24"><path class="fill-current text-blue-600" d="M23.746,16.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path><path class="fill-current text-blue-600" d="M23.746,11.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path><path class="fill-current text-sky-500" d="M23.746,6.564l-11.5-6.5a.507.507,0,0,0-.492,0l-11.5,6.5a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path></svg></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${ssrRenderAttr("title", unref(t)("description"))}><svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24"><path class="fill-current text-sky-500" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path><polygon class="fill-current text-blue-600" points="21.414 6 16 6 16 0.586 21.414 6"></polygon></svg></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("actions"))}</div></th><th><input type="checkbox"></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localSettings.value,
          "onUpdate:modelValue": ($event) => localSettings.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: setting }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(setting.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-sm font-semibold text-orange-400 dark:text-orange-200"${ssrRenderAttr("title", setting.type)}${_scopeId}>${ssrInterpolate(setting.option)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-sm font-semibold text-teal-500 dark:text-teal-200"${_scopeId}>${ssrInterpolate(setting.value)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center py-0.5 px-2 badge bg-blue-500 rounded-sm text-xs text-slate-100"${_scopeId}>${ssrInterpolate(setting.category)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-xs"${_scopeId}>${ssrInterpolate(setting.description)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                isActive: setting.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", setting)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route("admin.parameters.edit", setting.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                onDelete: ($event) => _ctx.$emit("delete", setting.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedSettings.includes(setting.id)) ? " checked" : ""}${_scopeId}></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(setting.id), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", {
                      class: "text-left text-sm font-semibold text-orange-400 dark:text-orange-200",
                      title: setting.type
                    }, toDisplayString(setting.option), 9, ["title"])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-sm font-semibold text-teal-500 dark:text-teal-200" }, toDisplayString(setting.value), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center py-0.5 px-2 badge bg-blue-500 rounded-sm text-xs text-slate-100" }, toDisplayString(setting.category), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-xs" }, toDisplayString(setting.description), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$4, {
                        isActive: setting.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", setting)
                      }, null, 8, ["isActive", "onToggleActivity"]),
                      createVNode(_sfc_main$5, {
                        href: _ctx.route("admin.parameters.edit", setting.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$6, {
                        onDelete: ($event) => _ctx.$emit("delete", setting.id)
                      }, null, 8, ["onDelete"])
                    ])
                  ]),
                  createVNode("td", null, [
                    createVNode("input", {
                      type: "checkbox",
                      checked: __props.selectedSettings.includes(setting.id),
                      onChange: ($event) => _ctx.$emit("toggle-select", setting.id)
                    }, null, 40, ["checked", "onChange"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Parameters/Table/ParameterTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    settings: Array,
    settingsCount: Number,
    adminCountSettings: Number,
    adminSortSettings: String
  },
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountSettings);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountSettings"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortSettings);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortSettings"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const settingToDeleteId = ref(null);
    const confirmDelete = (id) => {
      settingToDeleteId.value = id;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
    };
    const deleteSetting = () => {
      if (settingToDeleteId.value === null)
        return;
      const idToDelete = settingToDeleteId.value;
      router.delete(route("admin.settings.destroy", { setting: idToDelete }), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
          closeModal();
          toast.success(`Параметр ID ${idToDelete} успешно удалён.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || "Ошибка удаления параметра.";
          toast.error(`${errorMsg} (ID: ${idToDelete})`);
        },
        onFinish: () => {
          settingToDeleteId.value = null;
        }
      });
    };
    const toggleActivity = (setting) => {
      const newActivity = !setting.activity;
      router.put(route("admin.actions.settings.updateActivity", { setting: setting.id }), { activity: newActivity }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          if (page.props.flash.success) {
            toast.success(page.props.flash.success);
          } else if (page.props.flash.warning) {
            toast.warning(page.props.flash.warning);
          } else if (page.props.flash.error || page.props.flash.general) {
            toast.error(page.props.flash.error || page.props.flash.general);
          } else {
            toast.info(`Изменение активности параметра "${setting.option}" (ID: ${setting.id}) выполнено.`);
          }
        },
        onError: (errors) => {
          toast.error(errors.activity || errors.general || `Ошибка изменения активности параметра "${setting.option}" (ID: ${setting.id}).`);
        }
      });
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortSettings = (settings) => {
      if (sortParam.value === "idAsc")
        return settings.slice().sort((a, b) => a.id - b.id);
      if (sortParam.value === "idDesc")
        return settings.slice().sort((a, b) => b.id - a.id);
      if (sortParam.value === "activity")
        return settings.filter((p) => p.activity);
      if (sortParam.value === "inactive")
        return settings.filter((p) => !p.activity);
      return settings.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredSettings = computed(() => {
      let filtered = props.settings;
      if (searchQuery.value) {
        filtered = filtered.filter((param) => param.option.toLowerCase().includes(searchQuery.value.toLowerCase()));
      }
      return sortSettings(filtered);
    });
    const paginatedSettings = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredSettings.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredSettings.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
      }));
      router.put(
        route("admin.actions.settings.updateSortBulk"),
        { settings: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок статей успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.settings || "Не удалось обновить порядок статей.");
            router.reload({ only: ["settings"], preserveScroll: true });
          }
        }
      );
    };
    const selectedSettings = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedSettings.value = [.../* @__PURE__ */ new Set([...selectedSettings.value, ...ids])];
      } else {
        selectedSettings.value = selectedSettings.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectSetting = (settingId) => {
      const index = selectedSettings.value.indexOf(settingId);
      if (index > -1) {
        selectedSettings.value.splice(index, 1);
      } else {
        selectedSettings.value.push(settingId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedSettings.value.length) {
        toast.warning("Выберите параметры для активации/деактивации");
        return;
      }
      axios.put(route("admin.actions.settings.bulkUpdateActivity"), {
        ids: selectedSettings.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность парметров массово обновлена");
        const updatedIds = [...selectedSettings.value];
        selectedSettings.value = [];
        paginatedSettings.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность параметров");
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedSettings.value = paginatedSettings.value.map((p) => p.id);
      } else if (action === "deselectAll") {
        selectedSettings.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      }
      event.target.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("parametersHeader")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("parametersHeader"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("parametersHeader")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("parametersHeader")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              href: _ctx.route("admin.parameters.create")
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
                  _push3(` ${ssrInterpolate(unref(t)("addParameter"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addParameter")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.settingsCount) {
              _push2(ssrRenderComponent(_sfc_main$2, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              placeholder: unref(t)("searchByParameter")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.settingsCount)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.settingsCount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              settings: paginatedSettings.value,
              "selected-settings": selectedSettings.value,
              onToggleActivity: toggleActivity,
              onUpdateSortOrder: handleSortOrderUpdate,
              onDelete: confirmDelete,
              onToggleSelect: toggleSelectSetting,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-between items-center flex-col md:flex-row mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              "items-per-page": itemsPerPage.value,
              "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              "current-page": currentPage.value,
              "items-per-page": itemsPerPage.value,
              "total-items": filteredSettings.value.length,
              "onUpdate:currentPage": ($event) => currentPage.value = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              sortParam: sortParam.value,
              "onUpdate:sortParam": (val) => sortParam.value = val
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteSetting,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$7, {
                      href: _ctx.route("admin.parameters.create")
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
                        createTextVNode(" " + toDisplayString(unref(t)("addParameter")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.settingsCount ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode(_sfc_main$8, {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByParameter")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$9, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.settingsCount), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, {
                    settings: paginatedSettings.value,
                    "selected-settings": selectedSettings.value,
                    onToggleActivity: toggleActivity,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectSetting,
                    onToggleAll: toggleAll
                  }, null, 8, ["settings", "selected-settings"]),
                  createVNode("div", { class: "flex justify-between items-center flex-col md:flex-row mt-4" }, [
                    createVNode(_sfc_main$a, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$b, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredSettings.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage"]),
                    createVNode(_sfc_main$3, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$c, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteSetting,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Parameters/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
