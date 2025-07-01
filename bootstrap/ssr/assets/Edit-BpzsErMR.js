import { watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { b as _sfc_main$5, _ as _sfc_main$6, a as _sfc_main$7 } from "./InputNumber-CmHSfZTP.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$a } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$4 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$8 } from "./DescriptionTextarea-CCbLZPGT.js";
import { _ as _sfc_main$9 } from "./CKEditor-4uxDKYle.js";
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
import "@mayasabha/ckeditor4-vue3";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    plugin: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    useToast();
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      sort: ((_a = props.plugin) == null ? void 0 : _a.sort) ?? "",
      icon: ((_b = props.plugin) == null ? void 0 : _b.icon) ?? "",
      name: ((_c = props.plugin) == null ? void 0 : _c.name) ?? "",
      version: ((_d = props.plugin) == null ? void 0 : _d.version) ?? "",
      description: ((_e = props.plugin) == null ? void 0 : _e.description) ?? "",
      readme: ((_f = props.plugin) == null ? void 0 : _f.readme) ?? "",
      options: ((_g = props.plugin) == null ? void 0 : _g.options) ?? "",
      code: ((_h = props.plugin) == null ? void 0 : _h.code) ?? "",
      templates: ((_i = props.plugin) == null ? void 0 : _i.templates) ?? "",
      activity: Boolean(((_j = props.plugin) == null ? void 0 : _j.activity) ?? false)
    });
    const updateForm = () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
      form.reset({
        _method: "PUT",
        sort: ((_a2 = props.plugin) == null ? void 0 : _a2.sort) ?? "",
        icon: ((_b2 = props.plugin) == null ? void 0 : _b2.icon) ?? "",
        name: ((_c2 = props.plugin) == null ? void 0 : _c2.name) ?? "",
        version: ((_d2 = props.plugin) == null ? void 0 : _d2.version) ?? "",
        description: ((_e2 = props.plugin) == null ? void 0 : _e2.description) ?? "",
        readme: ((_f2 = props.plugin) == null ? void 0 : _f2.readme) ?? "",
        options: ((_g2 = props.plugin) == null ? void 0 : _g2.options) ?? "",
        code: ((_h2 = props.plugin) == null ? void 0 : _h2.code) ?? "",
        templates: ((_i2 = props.plugin) == null ? void 0 : _i2.templates) ?? "",
        activity: Boolean(((_j2 = props.plugin) == null ? void 0 : _j2.activity) ?? false)
      });
    };
    watch(() => props.plugin, updateForm);
    const filterInput = (value) => {
      return value.replace(/[^a-zA-Z0-9\s\.,;:?!@#$%^&*()_+\-=[\]{}|<>\/\\~`"'—–—]/g, "");
    };
    const capitalizeFirstLetter = (value) => {
      if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    };
    watch(() => form.icon, (newVal) => {
      form.icon = filterInput(newVal);
    });
    watch(() => form.name, (newVal) => {
      form.name = filterInput(newVal);
      form.name = capitalizeFirstLetter(form.name);
    });
    watch(() => form.options, (newVal) => {
      form.options = filterInput(newVal);
    });
    watch(() => form.code, (newVal) => {
      form.code = filterInput(newVal);
    });
    watch(() => form.templates, (newVal) => {
      form.templates = filterInput(newVal);
      form.templates = capitalizeFirstLetter(form.templates);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editModule")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editModule"))}: ${ssrInterpolate(props.plugin.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editModule")) + ": " + toDisplayString(props.plugin.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editModule")) + ": " + toDisplayString(props.plugin.name), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.plugins.index")
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
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><form class="p-3 w-full"${_scopeId}><div class="mb-3 flex items-center justify-center"${_scopeId}><div class="flex flex-col items-start mr-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: unref(t)("nameModule")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              type: "text",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col items-start mr-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "version",
              value: unref(t)("version")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "version",
              type: "text",
              modelValue: unref(form).version,
              "onUpdate:modelValue": ($event) => unref(form).version = $event,
              autocomplete: "version"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.version
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col items-start mx-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "sort",
              value: unref(t)("sort"),
              class: "mr-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "sort",
              type: "number",
              modelValue: unref(form).sort,
              "onUpdate:modelValue": ($event) => unref(form).sort = $event,
              autocomplete: "sort"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.sort
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center flex-row mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              modelValue: unref(form).activity,
              "onUpdate:modelValue": ($event) => unref(form).activity = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              for: "activity",
              text: unref(t)("activity")
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "icon",
              value: unref(t)("icon")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: unref(form).icon,
              "onUpdate:modelValue": ($event) => unref(form).icon = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.icon
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: unref(t)("description")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "readme",
              value: unref(t)("readme")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              modelValue: unref(form).readme,
              "onUpdate:modelValue": ($event) => unref(form).readme = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.readme
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "options",
              value: unref(t)("options")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: unref(form).options,
              "onUpdate:modelValue": ($event) => unref(form).options = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.options
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "code",
              value: unref(t)("serviceCode")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "code",
              type: "text",
              modelValue: unref(form).code,
              "onUpdate:modelValue": ($event) => unref(form).code = $event,
              autocomplete: "code"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.code
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "templates",
              value: unref(t)("inTemplates")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: unref(form).templates,
              "onUpdate:modelValue": ($event) => unref(form).templates = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.templates
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.plugins.index"),
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              class: "ms-4",
              type: "submit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("save"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("save")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.plugins.index")
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
                    onSubmit: withModifiers(($event) => unref(form).put(_ctx.route("admin.plugins.update", __props.plugin.id)), ["prevent"]),
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex items-center justify-center" }, [
                      createVNode("div", { class: "flex flex-col items-start mr-4" }, [
                        createVNode(_sfc_main$2, {
                          for: "name",
                          value: unref(t)("nameModule")
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$3, {
                          id: "name",
                          type: "text",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          required: "",
                          autocomplete: "name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-col items-start mr-4" }, [
                        createVNode(_sfc_main$2, {
                          for: "version",
                          value: unref(t)("version")
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$3, {
                          id: "version",
                          type: "text",
                          modelValue: unref(form).version,
                          "onUpdate:modelValue": ($event) => unref(form).version = $event,
                          autocomplete: "version"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(form).errors.version
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-col items-start mx-4" }, [
                        createVNode(_sfc_main$2, {
                          for: "sort",
                          value: unref(t)("sort"),
                          class: "mr-3"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          id: "sort",
                          type: "number",
                          modelValue: unref(form).sort,
                          "onUpdate:modelValue": ($event) => unref(form).sort = $event,
                          autocomplete: "sort"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          class: "mt-2",
                          message: unref(form).errors.sort
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center justify-center flex-row mt-4" }, [
                        createVNode(_sfc_main$6, {
                          modelValue: unref(form).activity,
                          "onUpdate:modelValue": ($event) => unref(form).activity = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$7, {
                          for: "activity",
                          text: unref(t)("activity")
                        }, null, 8, ["text"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "icon",
                        value: unref(t)("icon")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$8, {
                        modelValue: unref(form).icon,
                        "onUpdate:modelValue": ($event) => unref(form).icon = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.icon
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "description",
                        value: unref(t)("description")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$8, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "readme",
                        value: unref(t)("readme")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$9, {
                        modelValue: unref(form).readme,
                        "onUpdate:modelValue": ($event) => unref(form).readme = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.readme
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "options",
                        value: unref(t)("options")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$8, {
                        modelValue: unref(form).options,
                        "onUpdate:modelValue": ($event) => unref(form).options = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.options
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "code",
                        value: unref(t)("serviceCode")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "code",
                        type: "text",
                        modelValue: unref(form).code,
                        "onUpdate:modelValue": ($event) => unref(form).code = $event,
                        autocomplete: "code"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.code
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, {
                        for: "templates",
                        value: unref(t)("inTemplates")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$8, {
                        modelValue: unref(form).templates,
                        "onUpdate:modelValue": ($event) => unref(form).templates = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.templates
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.plugins.index"),
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
                      createVNode(_sfc_main$a, {
                        class: "ms-4",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("save")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Plugins/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
