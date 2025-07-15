import { mergeProps, useSSRContext, useModel, ref, onMounted, unref, withCtx, createTextVNode, toDisplayString, watch, createVNode, createBlock, createCommentVNode, openBlock } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrGetDynamicModelProps, ssrRenderComponent } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$9 } from "./InputError-DYghIIUw.js";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "axios";
import "vuedraggable";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main$8 = {
  __name: "LabelInput",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block font-medium text-sm text-indigo-600 dark:text-sky-500" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Input/LabelInput.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "InputText",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      type: String,
      required: true
    },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const model = useModel(__props, "modelValue");
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: "mt-1 block w-fit flex-grow px-2 py-1 bg-slate-100 dark:bg-cyan-800 border border-slate-500 dark:border-slate-100 rounded-md shadow-sm font-semibold text-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-300 dark:text-slate-100",
        ref_key: "input",
        ref: input
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Input/InputText.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "IconSaveButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    const isPressed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["flex items-center btn mt-1 px-1 py-1 bg-teal-500 text-white text-md font-semibold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-teal-600 focus:bg-teal-600 focus:outline-none", { "ring-2 ring-teal-500 ring-offset-2 ring-offset-white": isPressed.value }]
      }, _attrs))}><svg class="w-6 h-6 fill-current text-slate-100" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg></button>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/IconSaveButton.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "InfoIconButton",
  __ssrInlineRender: true,
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: "w-6 h-6 shrink-0 fill-current text-amber-500",
        viewBox: "0 0 16 16"
      }, _attrs))}><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"></path></svg>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Button/InfoIconButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "SiteLayoutSetting",
  __ssrInlineRender: true,
  props: {
    setting: Object
  },
  setup(__props) {
    useToast();
    const { t } = useI18n();
    const props = __props;
    const siteLayoutSetting = ref(props.setting);
    const siteLayoutForm = useForm({
      _method: "PUT",
      value: siteLayoutSetting.value ? siteLayoutSetting.value.value : ""
    });
    const handleSiteLayoutInput = (event) => {
      let value = event.target.value;
      value = value.charAt(0).toUpperCase() + value.slice(1);
      value = value.replace(/[^a-zA-Z]/g, "");
      siteLayoutForm.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (siteLayoutSetting.value) {
        _push(`<form${ssrRenderAttrs(_attrs)}><div class="mb-2 flex items-center space-x-4">`);
        _push(ssrRenderComponent(_sfc_main$8, {
          for: "value",
          value: unref(t)("settingSiteLayout"),
          class: "whitespace-nowrap"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          id: "value",
          type: "text",
          modelValue: unref(siteLayoutForm).value,
          "onUpdate:modelValue": ($event) => unref(siteLayoutForm).value = $event,
          autocomplete: "value",
          onInput: handleSiteLayoutInput
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          class: { "opacity-25": unref(siteLayoutForm).processing },
          disabled: unref(siteLayoutForm).processing
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("save"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("save")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$5, {
          onClick: ($event) => _ctx.$emit("toggle-modal", siteLayoutSetting.value.description)
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$9, {
          class: "mt-2",
          message: unref(siteLayoutForm).errors.value
        }, null, _parent));
        _push(`</form>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Parameters/SiteLayoutSetting.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "SettingsCheckbox",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: "false"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        type: "checkbox",
        id: __props.id,
        checked: __props.modelValue === "true",
        class: "mt-1 block w-6 h-6 bg-slate-100 dark:bg-cyan-800 border border-gray-500 dark:border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Input/SettingsCheckbox.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "DowntimeSetting",
  __ssrInlineRender: true,
  props: {
    setting: Object
  },
  setup(__props) {
    useToast();
    const { t } = useI18n();
    const props = __props;
    const downtimeSetting = ref(props.setting);
    const downtimeForm = useForm({
      _method: "PUT",
      value: downtimeSetting.value ? downtimeSetting.value.value === "true" ? "true" : "false" : "false"
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (downtimeSetting.value) {
        _push(`<form${ssrRenderAttrs(_attrs)}><div class="mb-2 flex items-center justify-between space-x-4">`);
        _push(ssrRenderComponent(_sfc_main$8, {
          for: "downtimeSite",
          value: unref(t)("settingDowntimeSite"),
          class: "whitespace-nowrap"
        }, null, _parent));
        _push(`<div class="flex items-center space-x-4">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          id: "downtimeSite",
          modelValue: unref(downtimeForm).value,
          "onUpdate:modelValue": ($event) => unref(downtimeForm).value = $event
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          class: { "opacity-25": unref(downtimeForm).processing },
          disabled: unref(downtimeForm).processing
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("save"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("save")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$5, {
          onClick: ($event) => _ctx.$emit("toggle-modal", downtimeSetting.value.description)
        }, null, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_sfc_main$9, {
          class: "mt-2",
          message: unref(downtimeForm).errors.value
        }, null, _parent));
        _push(`</form>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Parameters/DowntimeSetting.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Modal",
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
        }, _attrs))}><div class="fixed inset-0 bg-slate-900 opacity-50 z-50"></div><div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full dark:bg-gray-800 z-60"><div class="px-5 py-3 border-b border-slate-200 dark:border-gray-700"><div class="flex justify-between items-center"><svg class="w-6 h-6 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path></svg><div class="text-xl font-semibold text-sky-800 dark:text-sky-400">${ssrInterpolate(unref(t)("description"))}</div><button class="text-slate-700 hover:text-rose-400 dark:text-slate-400 dark:hover:text-red-400"><svg class="w-4 h-4 fill-current"><path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path></svg></button></div></div><div class="px-5 pt-4 pb-5"><div class="text-xl text-center font-semibold text-slate-800 dark:text-gray-200"><div class="space-y-2"><p>${ssrInterpolate(__props.modalDescription)}</p></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Setting/Modal/Modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    settings: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const showModal = ref(false);
    const modalDescription = ref("");
    const toggleModal = (description = "") => {
      modalDescription.value = description;
      showModal.value = !showModal.value;
    };
    const siteLayoutSetting = ref(props.settings.find((s) => s.option === "siteLayout") || null);
    const downtimeSetting = ref(props.settings.find((s) => s.option === "downtimeSite") || null);
    const localeSetting = ref(props.settings.find((s) => s.option === "locale") || null);
    const widgetHexColorSetting = ref(props.settings.find((s) => s.option === "widgetHexColor") || null);
    const widgetOpacitySetting = ref(props.settings.find((s) => s.option === "widgetOpacity") || null);
    watch(
      () => props.settings,
      (newSettings) => {
        siteLayoutSetting.value = newSettings.find((s) => s.option === "siteLayout") || null;
        downtimeSetting.value = newSettings.find((s) => s.option === "downtimeSite") || null;
        localeSetting.value = newSettings.find((s) => s.option === "locale") || null;
        widgetHexColorSetting.value = newSettings.find((s) => s.option === "widgetHexColor") || null;
        widgetOpacitySetting.value = newSettings.find((s) => s.option === "widgetOpacity") || null;
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("siteSettingsTitle")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("siteSettingsTitle"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("siteSettingsTitle")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("siteSettingsTitle")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95 space-x-4"${_scopeId}>`);
            if (siteLayoutSetting.value) {
              _push2(ssrRenderComponent(_sfc_main$4, {
                setting: siteLayoutSetting.value,
                onToggleModal: toggleModal
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (downtimeSetting.value) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                setting: downtimeSetting.value,
                onToggleModal: toggleModal
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showModal.value) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                showModal: showModal.value,
                modalDescription: modalDescription.value,
                onToggleModal: toggleModal
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95 space-x-4" }, [
                  siteLayoutSetting.value ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    setting: siteLayoutSetting.value,
                    onToggleModal: toggleModal
                  }, null, 8, ["setting"])) : createCommentVNode("", true),
                  downtimeSetting.value ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 1,
                    setting: downtimeSetting.value,
                    onToggleModal: toggleModal
                  }, null, 8, ["setting"])) : createCommentVNode("", true)
                ])
              ]),
              showModal.value ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                showModal: showModal.value,
                modalDescription: modalDescription.value,
                onToggleModal: toggleModal
              }, null, 8, ["showModal", "modalDescription"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
