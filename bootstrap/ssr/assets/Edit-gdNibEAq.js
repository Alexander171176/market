import { onMounted, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$5 } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$4 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$6 } from "./DeleteButton-DysWaxaD.js";
import VueMultiselect from "vue-multiselect";
/* empty css                                                                      */
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
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    role: {
      type: Object,
      required: true
    },
    permissions: Array
  },
  setup(__props) {
    var _a;
    const toast = useToast();
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      name: ((_a = props.role) == null ? void 0 : _a.name) ?? "",
      permissions: []
    });
    const submit = () => {
      form.put(route("admin.roles.update", props.role.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Роль успешно обновлена!");
        },
        onError: (errors) => {
          console.error("Не удалось отправить форму:", errors);
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    onMounted(() => {
      var _a2;
      form.permissions = (_a2 = props.role) == null ? void 0 : _a2.permissions;
    });
    watch(
      () => props.role,
      () => {
        var _a2;
        return form.permissions = (_a2 = props.role) == null ? void 0 : _a2.permissions;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editRole")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editRole"))}: ${ssrInterpolate(props.role.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editRole")) + ": " + toDisplayString(props.role.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editRole")) + ": " + toDisplayString(props.role.name), 1)
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
              href: _ctx.route("admin.roles.index")
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
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><div class="py-4 flex flex-wrap justify-around relative bg-white dark:bg-slate-700"${_scopeId}><form class="p-3 w-full md:w-1/2"${_scopeId}><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("roleName"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("roleName")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "permissions",
              value: unref(t)("permissions"),
              class: "mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VueMultiselect), {
              modelValue: unref(form).permissions,
              "onUpdate:modelValue": ($event) => unref(form).permissions = $event,
              options: props.permissions,
              multiple: true,
              "close-on-select": true,
              placeholder: unref(t)("select"),
              label: "name",
              "track-by": "id"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.roles.index"),
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
            _push2(ssrRenderComponent(_sfc_main$5, {
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
            _push2(`</div></form>`);
            if (props.role.permissions && props.role.permissions.length > 0) {
              _push2(`<div class="relative w-96 bg-white dark:bg-sky-900 shadow-lg rounded-sm border border-slate-200"${_scopeId}><div class="px-5 py-4"${_scopeId}><h2 class="text-center font-semibold text-amber-500 dark:text-amber-200"${_scopeId}>${ssrInterpolate(unref(t)("rolePermissions"))}</h2></div><div class="overflow-x-auto"${_scopeId}><table class="table-auto w-full"${_scopeId}><thead class="text-xs font-semibold uppercase text-slate-700 bg-slate-50 border-t border-b border-slate-200 dark:bg-cyan-800 dark:text-slate-100"${_scopeId}><tr${_scopeId}><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("name"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-end"${_scopeId}>${ssrInterpolate(unref(t)("actions"))}</div></th></tr></thead><tbody class="text-sm divide-y divide-slate-200 dark:text-slate-100"${_scopeId}><!--[-->`);
              ssrRenderList(__props.role.permissions, (rolePermission) => {
                _push2(`<tr${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(rolePermission.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(rolePermission.name)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$6, {
                  href: _ctx.route(
                    "admin.roles.permissions.destroy",
                    [__props.role.id, rolePermission.id]
                  )
                }, null, _parent2, _scopeId));
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.roles.index")
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
                  createVNode("div", { class: "py-4 flex flex-wrap justify-around relative bg-white dark:bg-slate-700" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "p-3 w-full md:w-1/2"
                    }, [
                      createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                        createVNode(_sfc_main$2, { for: "name" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                            createTextVNode(" " + toDisplayString(unref(t)("roleName")), 1)
                          ]),
                          _: 1
                        }),
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
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          for: "permissions",
                          value: unref(t)("permissions"),
                          class: "mb-1"
                        }, null, 8, ["value"]),
                        createVNode(unref(VueMultiselect), {
                          modelValue: unref(form).permissions,
                          "onUpdate:modelValue": ($event) => unref(form).permissions = $event,
                          options: props.permissions,
                          multiple: true,
                          "close-on-select": true,
                          placeholder: unref(t)("select"),
                          label: "name",
                          "track-by": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                      ]),
                      createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                        createVNode(_sfc_main$1, {
                          href: _ctx.route("admin.roles.index"),
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
                        createVNode(_sfc_main$5, {
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
                    ], 32),
                    props.role.permissions && props.role.permissions.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "relative w-96 bg-white dark:bg-sky-900 shadow-lg rounded-sm border border-slate-200"
                    }, [
                      createVNode("div", { class: "px-5 py-4" }, [
                        createVNode("h2", { class: "text-center font-semibold text-amber-500 dark:text-amber-200" }, toDisplayString(unref(t)("rolePermissions")), 1)
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "table-auto w-full" }, [
                          createVNode("thead", { class: "text-xs font-semibold uppercase text-slate-700 bg-slate-50 border-t border-b border-slate-200 dark:bg-cyan-800 dark:text-slate-100" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px" }, [
                                createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("id")), 1)
                              ]),
                              createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("name")), 1)
                              ]),
                              createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                createVNode("div", { class: "font-semibold text-end" }, toDisplayString(unref(t)("actions")), 1)
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "text-sm divide-y divide-slate-200 dark:text-slate-100" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.role.permissions, (rolePermission) => {
                              return openBlock(), createBlock("tr", {
                                key: rolePermission.id
                              }, [
                                createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px" }, [
                                  createVNode("div", { class: "text-left" }, toDisplayString(rolePermission.id), 1)
                                ]),
                                createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-left" }, toDisplayString(rolePermission.name), 1)
                                ]),
                                createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                  createVNode("div", { class: "flex justify-center" }, [
                                    createVNode(_sfc_main$6, {
                                      href: _ctx.route(
                                        "admin.roles.permissions.destroy",
                                        [__props.role.id, rolePermission.id]
                                      )
                                    }, null, 8, ["href"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Roles/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
