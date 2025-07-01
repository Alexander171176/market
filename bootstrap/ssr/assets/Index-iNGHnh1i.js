import { mergeProps, unref, useSSRContext, ref, watch, withCtx, createVNode, toDisplayString, createBlock, openBlock, computed, createTextVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$6, a as _sfc_main$a, b as _sfc_main$d } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$9, a as _sfc_main$b, b as _sfc_main$c } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$3 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$5 } from "./IconEdit-KTqcKHBr.js";
import { _ as _sfc_main$4 } from "./CloneIconButton-D6eQgOYl.js";
import { _ as _sfc_main$8 } from "./BulkActionSelect-Ca2QmpUS.js";
import { _ as _sfc_main$7 } from "./DefaultButton-Clq-JXkW.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-36 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="title">${ssrInterpolate(unref(t)("title"))}</option><option value="locale">${ssrInterpolate(unref(t)("localization"))}</option><option value="views">${ssrInterpolate(unref(t)("views"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Rubric/Sort/SortSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "RubricTable",
  __ssrInlineRender: true,
  props: {
    rubrics: Array,
    selectedRubrics: Array
  },
  emits: [
    "toggle-activity",
    "edit",
    "delete",
    "update-sort-order",
    "clone",
    "toggle-select",
    "toggle-all"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const localRubrics = ref([]);
    watch(() => props.rubrics, (newVal) => {
      localRubrics.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localRubrics.value.map((rubric) => rubric.id);
      emits("update-sort-order", newOrderIds);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.rubrics.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap w-px"><div class="text-center font-medium">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("icon"))}><svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg></div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("localization"))}><svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"></path></svg></div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-left font-medium">${ssrInterpolate(unref(t)("title"))}</div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-left font-medium">${ssrInterpolate(unref(t)("url"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("views"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16"><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg></div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-center font-medium">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-center font-medium"><input type="checkbox"></div></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localRubrics.value,
          "onUpdate:modelValue": ($event) => localRubrics.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: rubric }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-center text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(rubric.id)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10"${_scopeId}>`);
              if (rubric.icon) {
                _push2(`<div class="flex justify-center items-center h-full"${_scopeId}>${rubric.icon ?? ""}</div>`);
              } else {
                _push2(`<div class="flex justify-center items-center h-full text-slate-400"${_scopeId}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"${_scopeId}><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"${_scopeId}></path></svg></div>`);
              }
              _push2(`</td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10"${_scopeId}><div class="text-center uppercase text-orange-500 dark:text-orange-200"${_scopeId}>${ssrInterpolate(rubric.locale)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-yellow-500 dark:text-yellow-200"${_scopeId}>${ssrInterpolate(rubric.title)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}><a${ssrRenderAttr("href", `/rubrics/${encodeURIComponent(rubric.url)}`)} class="text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50" target="_blank" rel="noopener noreferrer"${_scopeId}>${ssrInterpolate(rubric.url)}</a></div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(rubric.views)}</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                isActive: rubric.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", rubric),
                title: rubric.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClone: ($event) => _ctx.$emit("clone", rubric)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route("admin.rubrics.edit", rubric.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                onDelete: ($event) => _ctx.$emit("delete", rubric.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedRubrics.includes(rubric.id)) ? " checked" : ""}${_scopeId}></div></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center text-blue-600 dark:text-blue-200" }, toDisplayString(rubric.id), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10" }, [
                    rubric.icon ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center items-center h-full",
                      innerHTML: rubric.icon
                    }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex justify-center items-center h-full text-slate-400"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
                        fill: "currentColor",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" })
                      ]))
                    ]))
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10" }, [
                    createVNode("div", { class: "text-center uppercase text-orange-500 dark:text-orange-200" }, toDisplayString(rubric.locale), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-yellow-500 dark:text-yellow-200" }, toDisplayString(rubric.title), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left" }, [
                      createVNode("a", {
                        href: `/rubrics/${encodeURIComponent(rubric.url)}`,
                        class: "text-violet-600 dark:text-violet-200 hover:underline hover:text-violet-800 dark:hover:text-violet-50",
                        target: "_blank",
                        rel: "noopener noreferrer"
                      }, toDisplayString(rubric.url), 9, ["href"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(rubric.views), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$3, {
                        isActive: rubric.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", rubric),
                        title: rubric.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$4, {
                        onClone: ($event) => _ctx.$emit("clone", rubric)
                      }, null, 8, ["onClone"]),
                      createVNode(_sfc_main$5, {
                        href: _ctx.route("admin.rubrics.edit", rubric.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$6, {
                        onDelete: ($event) => _ctx.$emit("delete", rubric.id)
                      }, null, 8, ["onDelete"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("input", {
                        type: "checkbox",
                        checked: __props.selectedRubrics.includes(rubric.id),
                        onChange: ($event) => _ctx.$emit("toggle-select", rubric.id)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Rubric/Table/RubricTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["rubrics", "rubricsCount", "adminCountRubrics", "adminSortRubrics"],
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountRubrics);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountRubrics"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortRubrics);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortRubrics"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const rubricToDeleteId = ref(null);
    const rubricToDeleteTitle = ref("");
    const confirmDelete = (id, title) => {
      rubricToDeleteId.value = id;
      rubricToDeleteTitle.value = title;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      rubricToDeleteId.value = null;
      rubricToDeleteTitle.value = "";
    };
    const deleteRubric = () => {
      if (rubricToDeleteId.value === null)
        return;
      const idToDelete = rubricToDeleteId.value;
      const titleToDelete = rubricToDeleteTitle.value;
      router.delete(route("admin.rubrics.destroy", { rubric: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Рубрика "${titleToDelete || "ID: " + idToDelete}" удалена.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Рубрика: ${titleToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          rubricToDeleteId.value = null;
          rubricToDeleteTitle.value = "";
        }
      });
    };
    const toggleActivity = (rubric) => {
      const newActivity = !rubric.activity;
      const actionText = newActivity ? "активирована" : "деактивирована";
      router.put(
        route("admin.actions.rubrics.updateActivity", { rubric: rubric.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Рубрика "${rubric.title}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${rubric.title}".`);
          }
        }
      );
    };
    const cloneRubric = (rubricObject) => {
      const rubricId = rubricObject == null ? void 0 : rubricObject.id;
      const rubricTitle = (rubricObject == null ? void 0 : rubricObject.title) || `ID: ${rubricId}`;
      if (typeof rubricId === "undefined" || rubricId === null) {
        console.error("Не удалось получить ID рубрики для клонирования", rubricObject);
        toast.error("Не удалось определить рубрику для клонирования.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите клонировать рубрику "${rubricTitle}"?`)) {
        return;
      }
      router.post(route("admin.actions.rubrics.clone", { rubric: rubricId }), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          toast.success(`Рубрика "${rubricTitle}" успешно клонирована.`);
        },
        onError: (errors) => {
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || `Ошибка клонирования рубрики "${rubricTitle}".`;
          toast.error(errorMessage);
        }
      });
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortRubrics = (rubrics) => {
      if (sortParam.value === "idAsc") {
        return rubrics.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return rubrics.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return rubrics.filter((rubric) => rubric.activity);
      }
      if (sortParam.value === "inactive") {
        return rubrics.filter((rubric) => !rubric.activity);
      }
      if (sortParam.value === "locale") {
        return rubrics.slice().sort((a, b) => {
          if (a.locale < b.locale)
            return 1;
          if (a.locale > b.locale)
            return -1;
          return 0;
        });
      }
      if (sortParam.value === "views") {
        return rubrics.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
      }
      return rubrics.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredRubrics = computed(() => {
      let filtered = props.rubrics;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (rubric) => rubric.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortRubrics(filtered);
    });
    const paginatedRubrics = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredRubrics.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredRubrics.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.rubrics.updateSortBulk"),
        { rubrics: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок рубрик успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.rubrics || "Не удалось обновить порядок рубрик.");
            router.reload({ only: ["rubrics"], preserveScroll: true });
          }
        }
      );
    };
    const selectedRubrics = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedRubrics.value = [.../* @__PURE__ */ new Set([...selectedRubrics.value, ...ids])];
      } else {
        selectedRubrics.value = selectedRubrics.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectRubric = (rubricId) => {
      const index = selectedRubrics.value.indexOf(rubricId);
      if (index > -1) {
        selectedRubrics.value.splice(index, 1);
      } else {
        selectedRubrics.value.push(rubricId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedRubrics.value.length) {
        toast.warning("Выберите рубрики для активации/деактивации рубрик");
        return;
      }
      axios.put(route("admin.actions.rubrics.bulkUpdateActivity"), {
        ids: selectedRubrics.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedRubrics.value];
        selectedRubrics.value = [];
        paginatedRubrics.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const bulkDelete = () => {
      if (selectedRubrics.value.length === 0) {
        toast.warning("Выберите хотя бы одну рубрику для удаления.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
      }
      router.delete(route("admin.actions.rubrics.bulkDestroy"), {
        data: { ids: selectedRubrics.value },
        preserveScroll: true,
        preserveState: false,
        // Перезагружаем данные страницы
        onSuccess: (page) => {
          selectedRubrics.value = [];
          toast.success("Массовое удаление рубрик успешно завершено.");
        },
        onError: (errors) => {
          console.error("Ошибка массового удаления:", errors);
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || "Произошла ошибка при удалении рубрик.";
          toast.error(errorMessage);
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedRubrics.value = paginatedRubrics.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedRubrics.value = [];
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
        title: unref(t)("rubrics")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("rubrics"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("rubrics")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("rubrics")), 1)
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
              href: _ctx.route("admin.rubrics.create")
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
                  _push3(` ${ssrInterpolate(unref(t)("addRubric"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addRubric")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.rubricsCount) {
              _push2(ssrRenderComponent(_sfc_main$8, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.rubricsCount) {
              _push2(ssrRenderComponent(_sfc_main$9, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.rubricsCount) {
              _push2(ssrRenderComponent(_sfc_main$a, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.rubricsCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.rubricsCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              rubrics: paginatedRubrics.value,
              "selected-rubrics": selectedRubrics.value,
              onToggleActivity: toggleActivity,
              onDelete: confirmDelete,
              onClone: cloneRubric,
              onUpdateSortOrder: handleSortOrderUpdate,
              onToggleSelect: toggleSelectRubric,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.rubricsCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$b, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$c, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredRubrics.value.length,
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
            _push2(ssrRenderComponent(_sfc_main$d, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteRubric,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$7, {
                      href: _ctx.route("admin.rubrics.create")
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
                        createTextVNode(" " + toDisplayString(unref(t)("addRubric")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.rubricsCount ? (openBlock(), createBlock(_sfc_main$8, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.rubricsCount ? (openBlock(), createBlock(_sfc_main$9, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.rubricsCount ? (openBlock(), createBlock(_sfc_main$a, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.rubricsCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$1, {
                    rubrics: paginatedRubrics.value,
                    "selected-rubrics": selectedRubrics.value,
                    onToggleActivity: toggleActivity,
                    onDelete: confirmDelete,
                    onClone: cloneRubric,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onToggleSelect: toggleSelectRubric,
                    onToggleAll: toggleAll
                  }, null, 8, ["rubrics", "selected-rubrics"]),
                  __props.rubricsCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$b, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$c, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredRubrics.value.length,
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
              createVNode(_sfc_main$d, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteRubric,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Rubrics/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
