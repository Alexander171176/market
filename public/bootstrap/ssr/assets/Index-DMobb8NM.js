import { mergeProps, unref, useSSRContext, computed, withCtx, createBlock, openBlock, createVNode, ref, watch, toDisplayString, createTextVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$b } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$a, a as _sfc_main$d, b as _sfc_main$g } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$c, a as _sfc_main$e, b as _sfc_main$f } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$8 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$9 } from "./IconEdit-KTqcKHBr.js";
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
const _sfc_main$7 = {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Select/BulkActionSelect.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="name">${ssrInterpolate(unref(t)("name"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Sort/SortSelect.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "ViewIconButton",
  __ssrInlineRender: true,
  props: {
    title: String,
    href: String
  },
  setup(__props) {
    const buttonClass = computed(() => [
      "flex items-center py-1 px-1 rounded",
      "border border-slate-300",
      "hover:border-teal-500",
      "dark:border-teal-300 dark:hover:border-teal-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        class: buttonClass.value,
        href: __props.href,
        title: __props.title
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"${_scopeId}><path class="fill-current text-teal-500" d="M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.54,13.55 13.45,14.65 13.45,16C13.45,17.35 14.54,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92A1.58,1.58 0 0,0 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "shrink-0 h-6 w-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  class: "fill-current text-teal-500",
                  d: "M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.54,13.55 13.45,14.65 13.45,16C13.45,17.35 14.54,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92A1.58,1.58 0 0,0 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Buttons/ViewIconButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "InfoIconButton",
  __ssrInlineRender: true,
  props: {
    title: String,
    href: String
  },
  setup(__props) {
    const buttonClass = computed(() => [
      "flex items-center py-1 px-2 rounded",
      "border border-slate-300",
      "hover:border-indigo-400",
      "dark:border-indigo-300 dark:hover:border-indigo-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: buttonClass.value,
        title: __props.title
      }, _attrs))}><svg class="w-4 h-4 fill-current text-indigo-400" viewBox="0 0 16 16"><path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z"></path></svg></button>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Buttons/InfoIconButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "DescriptionModal",
  __ssrInlineRender: true,
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    modalDescription: {
      type: String,
      required: true
    }
  },
  emits: ["toggleModal"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.showModal) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6 z-50",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="fixed inset-0 bg-slate-900 opacity-50 z-40"></div><div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full dark:bg-gray-800 z-50"><div class="px-5 py-3 border-b border-slate-200 dark:border-gray-700"><div class="flex justify-between items-center"><svg class="w-6 h-6 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path></svg><div class="text-xl font-semibold text-sky-800 dark:text-sky-400">${ssrInterpolate(unref(t)("description"))}</div><button class="text-slate-700 hover:text-rose-400 dark:text-slate-400 dark:hover:text-red-400"><svg class="w-4 h-4 fill-current"><path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path></svg></button></div></div><div class="px-5 pt-4 pb-5"><div class="text-xl text-center font-semibold text-slate-800 dark:text-gray-200"><div class="space-y-2"><p>${ssrInterpolate(__props.modalDescription)}</p></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Modal/DescriptionModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ReadmeModal",
  __ssrInlineRender: true,
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    modalReadme: {
      type: String,
      required: true
    }
  },
  emits: ["toggleModal"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.showModal) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6 z-50",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="fixed inset-0 bg-slate-900 opacity-50 z-40"></div><div class="bg-white rounded shadow-lg overflow-auto max-w-7xl w-full max-h-full dark:bg-gray-800 z-50"><div class="px-5 py-3 border-b border-slate-200 dark:border-gray-700"><div class="flex justify-between items-center"><svg class="w-5 h-5 shrink-0 fill-current text-indigo-400 mr-2" viewBox="0 0 16 16"><path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z"></path></svg><div class="text-xl font-semibold text-sky-800 dark:text-sky-400">${ssrInterpolate(unref(t)("readme"))}</div><button class="text-slate-700 hover:text-rose-400 dark:text-slate-400 dark:hover:text-red-400"><svg class="w-4 h-4 fill-current"><path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path></svg></button></div></div><div class="px-5 pt-4 pb-5"><div class="text-xl text-center font-semibold text-slate-800 dark:text-gray-200"><div class="space-y-2"><div>${__props.modalReadme ?? ""}</div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Modal/ReadmeModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PluginTable",
  __ssrInlineRender: true,
  props: {
    plugins: Array,
    selectedPlugins: Array
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
    const localPlugins = ref([]);
    watch(() => props.plugins, (newVal) => {
      localPlugins.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localPlugins.value.map((plugin) => plugin.id);
      emits("update-sort-order", newOrderIds);
    };
    const showDescriptionModal = ref(false);
    const currentDescription = ref("");
    const showReadmeModal = ref(false);
    const currentReadme = ref("");
    const closeDescriptionModal = () => {
      showDescriptionModal.value = false;
      currentDescription.value = "";
    };
    const openReadmeModal = (readme) => {
      currentReadme.value = readme;
      showReadmeModal.value = true;
    };
    const closeReadmeModal = () => {
      showReadmeModal.value = false;
      currentReadme.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative"><div class="overflow-x-auto">`);
      if (__props.plugins.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("icon"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("nameModule"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("version"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("description"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-center">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap"><div class="text-center font-medium"><input type="checkbox"></div></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localPlugins.value,
          "onUpdate:modelValue": ($event) => localPlugins.value = $event,
          onEnd: handleDragEnd,
          itemKey: "id"
        }, {
          item: withCtx(({ element: plugin }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}>${ssrInterpolate(plugin.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><span class="icon-class"${_scopeId}>${plugin.icon ?? ""}</span></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-teal-600 dark:text-violet-200"${_scopeId}>${ssrInterpolate(plugin.name)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-orange-400 dark:text-orange-200"${_scopeId}>${ssrInterpolate(plugin.version)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(plugin.description)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: `/admin/plugins/${plugin.id}`,
                title: unref(t)("goToModule")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$8, {
                isActive: plugin.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", plugin),
                title: plugin.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$9, {
                href: _ctx.route("admin.plugins.edit", plugin.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$a, {
                onDelete: ($event) => _ctx.$emit("delete", plugin.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: ($event) => openReadmeModal(plugin.readme),
                title: unref(t)("readme")
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap"${_scopeId}><div class="text-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedPlugins.includes(plugin.id)) ? " checked" : ""}${_scopeId}></div></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, toDisplayString(plugin.id), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("span", {
                      innerHTML: plugin.icon,
                      class: "icon-class"
                    }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-teal-600 dark:text-violet-200" }, toDisplayString(plugin.name), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-orange-400 dark:text-orange-200" }, toDisplayString(plugin.version), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-left text-blue-600 dark:text-blue-200" }, toDisplayString(plugin.description), 1)
                  ]),
                  createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "flex justify-center space-x-2" }, [
                      createVNode(_sfc_main$5, {
                        href: `/admin/plugins/${plugin.id}`,
                        title: unref(t)("goToModule")
                      }, null, 8, ["href", "title"]),
                      createVNode(_sfc_main$8, {
                        isActive: plugin.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", plugin),
                        title: plugin.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$9, {
                        href: _ctx.route("admin.plugins.edit", plugin.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$a, {
                        onDelete: ($event) => _ctx.$emit("delete", plugin.id)
                      }, null, 8, ["onDelete"]),
                      createVNode(_sfc_main$4, {
                        onClick: ($event) => openReadmeModal(plugin.readme),
                        title: unref(t)("readme")
                      }, null, 8, ["onClick", "title"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("input", {
                        type: "checkbox",
                        checked: __props.selectedPlugins.includes(plugin.id),
                        onChange: ($event) => _ctx.$emit("toggle-select", plugin.id)
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
      _push(ssrRenderComponent(_sfc_main$3, {
        showModal: showDescriptionModal.value,
        modalDescription: currentDescription.value,
        onToggleModal: closeDescriptionModal
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        showModal: showReadmeModal.value,
        modalReadme: currentReadme.value,
        onToggleModal: closeReadmeModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Plugins/Table/PluginTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["plugins", "pluginsCount", "adminCountPlugins", "adminSortPlugins"],
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountPlugins);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountPlugins"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortPlugins);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortPlugins"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const pluginToDeleteId = ref(null);
    const pluginToDeleteName = ref("");
    const confirmDelete = (id, name) => {
      pluginToDeleteId.value = id;
      pluginToDeleteName.value = name;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      pluginToDeleteId.value = null;
      pluginToDeleteName.value = "";
    };
    const deletePlugin = () => {
      if (pluginToDeleteId.value === null)
        return;
      const idToDelete = pluginToDeleteId.value;
      const nameToDelete = pluginToDeleteName.value;
      router.delete(route("admin.plugins.destroy", { plugin: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Модуль "${nameToDelete || "ID: " + idToDelete}" удален.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Тег: ${nameToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          pluginToDeleteId.value = null;
          pluginToDeleteName.value = "";
        }
      });
    };
    const toggleActivity = (plugin) => {
      const newActivity = !plugin.activity;
      const actionText = newActivity ? "активирован" : "деактивирован";
      router.put(
        route("admin.actions.plugins.updateActivity", { plugin: plugin.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Модуль "${plugin.name}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${plugin.name}".`);
          }
        }
      );
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortPlugins = (plugins) => {
      if (sortParam.value === "idAsc") {
        return plugins.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return plugins.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return plugins.filter((plugin) => plugin.activity);
      }
      if (sortParam.value === "inactive") {
        return plugins.filter((plugin) => !plugin.activity);
      }
      return plugins.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredPlugins = computed(() => {
      let filtered = props.plugins;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (plugin) => plugin.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortPlugins(filtered);
    });
    const paginatedPlugins = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredPlugins.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredPlugins.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.plugins.updateSortBulk"),
        { plugins: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок модулей успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.plugins || "Не удалось обновить порядок модулей.");
            router.reload({ only: ["plugins"], preserveScroll: true });
          }
        }
      );
    };
    const selectedPlugins = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedPlugins.value = [.../* @__PURE__ */ new Set([...selectedPlugins.value, ...ids])];
      } else {
        selectedPlugins.value = selectedPlugins.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectPlugin = (pluginId) => {
      const index = selectedPlugins.value.indexOf(pluginId);
      if (index > -1) {
        selectedPlugins.value.splice(index, 1);
      } else {
        selectedPlugins.value.push(pluginId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedPlugins.value.length) {
        toast.warning("Выберите модули для активации/деактивации модулей");
        return;
      }
      axios.put(route("admin.actions.plugins.bulkUpdateActivity"), {
        ids: selectedPlugins.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedPlugins.value];
        selectedPlugins.value = [];
        paginatedPlugins.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedPlugins.value = paginatedPlugins.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedPlugins.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      }
      event.target.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("plugins")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("plugins"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("plugins")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("plugins")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              href: _ctx.route("admin.plugins.create")
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
                  _push3(` ${ssrInterpolate(unref(t)("registerModule"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("registerModule")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.pluginsCount) {
              _push2(ssrRenderComponent(_sfc_main$7, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.pluginsCount) {
              _push2(ssrRenderComponent(_sfc_main$c, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="mb-4 py-1 px-3 w-full flex items-center justify-center text-md italic font-semibold text-rose-400 bg-amber-50 opacity-80 border border-rose-200"${_scopeId}>${ssrInterpolate(unref(t)("componentParametersWarning"))}</span>`);
            if (__props.pluginsCount) {
              _push2(ssrRenderComponent(_sfc_main$d, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.pluginsCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.pluginsCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              plugins: paginatedPlugins.value,
              "selected-plugins": selectedPlugins.value,
              onToggleActivity: toggleActivity,
              onUpdateSortOrder: handleSortOrderUpdate,
              onDelete: confirmDelete,
              onToggleSelect: toggleSelectPlugin,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.pluginsCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$e, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$f, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredPlugins.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deletePlugin,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$b, {
                      href: _ctx.route("admin.plugins.create")
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
                        createTextVNode(" " + toDisplayString(unref(t)("registerModule")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.pluginsCount ? (openBlock(), createBlock(_sfc_main$7, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.pluginsCount ? (openBlock(), createBlock(_sfc_main$c, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  createVNode("span", { class: "mb-4 py-1 px-3 w-full flex items-center justify-center text-md italic font-semibold text-rose-400 bg-amber-50 opacity-80 border border-rose-200" }, toDisplayString(unref(t)("componentParametersWarning")), 1),
                  __props.pluginsCount ? (openBlock(), createBlock(_sfc_main$d, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.pluginsCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$1, {
                    plugins: paginatedPlugins.value,
                    "selected-plugins": selectedPlugins.value,
                    onToggleActivity: toggleActivity,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectPlugin,
                    onToggleAll: toggleAll
                  }, null, 8, ["plugins", "selected-plugins"]),
                  __props.pluginsCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$e, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$f, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredPlugins.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$6, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$g, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deletePlugin,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Plugins/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
