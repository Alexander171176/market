import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$7 } from "./InputNumber-CmHSfZTP.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$4, a as _sfc_main$9, b as _sfc_main$b } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$8 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$a } from "./MetaDescTextarea-HG5ywHg1.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./CategorySelect-BXjxE4_J.js";
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
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const { t } = useI18n();
    const form = useForm({
      sort: 0,
      type: "",
      option: "",
      value: "",
      constant: "",
      category: "",
      description: "",
      activity: false
    });
    const handleOptionInput = (event) => {
      const cleaned = event.target.value.replace(/[^A-Za-z0-9\-]/g, "");
      form.option = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    };
    const toUpperCaseWithUnderscore = (str) => {
      return str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
    };
    const handleConstantFocus = () => {
      if (form.option) {
        form.constant = toUpperCaseWithUnderscore(form.option);
      }
    };
    const submitForm = () => {
      form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0
      }));
      form.post(route("admin.parameters.store"), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Параметр успешно создан!");
        },
        onError: (errors) => {
          console.error("Не удалось отправить форму:", errors);
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("createParameter")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("createParameter"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("createParameter")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("createParameter")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.parameters.index")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><form class="p-3 w-full"${_scopeId}><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex justify-between w-full"${_scopeId}><div class="flex flex-row items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).activity,
              "onUpdate:modelValue": ($event) => unref(form).activity = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "activity",
              text: unref(t)("activity")
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "category",
              value: unref(t)("parameterCategory"),
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              modelValue: unref(form).category,
              "onUpdate:modelValue": ($event) => unref(form).category = $event,
              error: unref(form).errors.category
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "type",
              value: unref(t)("type"),
              class: "mr-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              error: unref(form).errors.type,
              class: "w-full lg:w-64 mr-3"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "sort",
              value: unref(t)("sort"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "sort",
              type: "number",
              modelValue: unref(form).sort,
              "onUpdate:modelValue": ($event) => unref(form).sort = $event,
              autocomplete: "sort",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.sort
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "option",
              value: unref(t)("parameterName")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).option.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "option",
              type: "text",
              modelValue: unref(form).option,
              "onUpdate:modelValue": ($event) => unref(form).option = $event,
              onInput: handleOptionInput,
              required: "",
              maxlength: "255",
              autocomplete: "option",
              pattern: "[A-Za-z0-9\\-]+",
              title: unref(t)("urlVerification")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              class: "mt-2",
              message: unref(form).errors.option
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "constant",
              value: unref(t)("parameterConstant")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "constant",
              type: "text",
              modelValue: unref(form).constant,
              "onUpdate:modelValue": ($event) => unref(form).constant = $event,
              onFocus: handleConstantFocus,
              required: "",
              autocomplete: "constant",
              pattern: "[A-Z][A-Z0-9_]*"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              class: "mt-2",
              message: unref(form).errors.constant
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "value",
              value: unref(t)("parameterValue")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).value.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "value",
              type: "text",
              modelValue: unref(form).value,
              "onUpdate:modelValue": ($event) => unref(form).value = $event,
              maxlength: "255",
              autocomplete: "value",
              pattern: "^(https?:\\/\\/)?[A-Za-z0-9\\.\\-]+(:[0-9]+)?(\\/[A-Za-z0-9\\-\\/]+)?$",
              title: unref(t)("urlVerification")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              class: "mt-2",
              message: unref(form).errors.value
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "description",
              value: unref(t)("parameterDescription")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).description.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.parameters.index"),
              class: "mb-3"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16"${_scopeId2}><path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("save"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.parameters.index")
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                          viewBox: "0 0 16 16"
                        }, [
                          createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2" })
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode("div", { class: "flex flex-row items-center" }, [
                          createVNode(_sfc_main$2, {
                            modelValue: unref(form).activity,
                            "onUpdate:modelValue": ($event) => unref(form).activity = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$3, {
                            for: "activity",
                            text: unref(t)("activity")
                          }, null, 8, ["text"])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center" }, [
                        createVNode(_sfc_main$4, {
                          for: "category",
                          value: unref(t)("parameterCategory"),
                          class: "w-full"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          modelValue: unref(form).category,
                          "onUpdate:modelValue": ($event) => unref(form).category = $event,
                          error: unref(form).errors.category
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$4, {
                          for: "type",
                          value: unref(t)("type"),
                          class: "mr-3"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$6, {
                          modelValue: unref(form).type,
                          "onUpdate:modelValue": ($event) => unref(form).type = $event,
                          error: unref(form).errors.type,
                          class: "w-full lg:w-64 mr-3"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$4, {
                            for: "sort",
                            value: unref(t)("sort"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "sort",
                          type: "number",
                          modelValue: unref(form).sort,
                          "onUpdate:modelValue": ($event) => unref(form).sort = $event,
                          autocomplete: "sort",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$8, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.sort
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$4, {
                          for: "option",
                          value: unref(t)("parameterName")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).option.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$9, {
                        id: "option",
                        type: "text",
                        modelValue: unref(form).option,
                        "onUpdate:modelValue": ($event) => unref(form).option = $event,
                        onInput: handleOptionInput,
                        required: "",
                        maxlength: "255",
                        autocomplete: "option",
                        pattern: "[A-Za-z0-9\\-]+",
                        title: unref(t)("urlVerification")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "title"]),
                      createVNode(_sfc_main$8, {
                        class: "mt-2",
                        message: unref(form).errors.option
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$4, {
                        for: "constant",
                        value: unref(t)("parameterConstant")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$9, {
                        id: "constant",
                        type: "text",
                        modelValue: unref(form).constant,
                        "onUpdate:modelValue": ($event) => unref(form).constant = $event,
                        onFocus: handleConstantFocus,
                        required: "",
                        autocomplete: "constant",
                        pattern: "[A-Z][A-Z0-9_]*"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$8, {
                        class: "mt-2",
                        message: unref(form).errors.constant
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$4, {
                          for: "value",
                          value: unref(t)("parameterValue")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).value.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$9, {
                        id: "value",
                        type: "text",
                        modelValue: unref(form).value,
                        "onUpdate:modelValue": ($event) => unref(form).value = $event,
                        maxlength: "255",
                        autocomplete: "value",
                        pattern: "^(https?:\\/\\/)?[A-Za-z0-9\\.\\-]+(:[0-9]+)?(\\/[A-Za-z0-9\\-\\/]+)?$",
                        title: unref(t)("urlVerification")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "title"]),
                      createVNode(_sfc_main$8, {
                        class: "mt-2",
                        message: unref(form).errors.value
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$4, {
                          for: "description",
                          value: unref(t)("parameterDescription")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).description.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$8, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.parameters.index"),
                        class: "mb-3"
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(_sfc_main$b, {
                        class: ["ms-4", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ])
                  ], 32)
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Parameters/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
