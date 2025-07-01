import { onMounted, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$5 } from "./DeleteButton-DysWaxaD.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$6 } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$4 } from "./InputError-DYghIIUw.js";
import VueMultiselect from "vue-multiselect";
import { useI18n } from "vue-i18n";
/* empty css                                                                      */
import "vue-toastification";
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
    user: {
      type: Object,
      required: true
    },
    roles: Array,
    permissions: Array
  },
  setup(__props) {
    var _a, _b;
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      name: ((_a = props.user) == null ? void 0 : _a.name) ?? "",
      email: ((_b = props.user) == null ? void 0 : _b.email) ?? "",
      roles: [],
      permissions: []
    });
    const submit = () => {
      var _a2;
      form.put(route("admin.users.update", (_a2 = props.user) == null ? void 0 : _a2.id), {
        errorBag: "updateUser",
        onSuccess: () => {
        },
        onError: (errors) => {
          console.error("Не удалось обновить пользователя:", errors);
        }
      });
    };
    onMounted(() => {
      var _a2, _b2;
      form.permissions = (_a2 = props.user) == null ? void 0 : _a2.permissions;
      form.roles = (_b2 = props.user) == null ? void 0 : _b2.roles;
    });
    watch(
      () => props.user,
      () => {
        var _a2, _b2;
        form.permissions = (_a2 = props.user) == null ? void 0 : _a2.permissions;
        form.roles = (_b2 = props.user) == null ? void 0 : _b2.roles;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editUser")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editUser"))} ID:${ssrInterpolate(props.user.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editUser")) + " ID:" + toDisplayString(props.user.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editUser")) + " ID:" + toDisplayString(props.user.id), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.users.index")
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
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><form class="p-3 w-full"${_scopeId}><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("userName"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("userName")), 1)
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
            _push2(`</div><div class="mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { for: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("userEmail"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("userEmail")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autocomplete: "email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "roles",
              value: unref(t)("roles"),
              class: "mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VueMultiselect), {
              modelValue: unref(form).roles,
              "onUpdate:modelValue": ($event) => unref(form).roles = $event,
              options: props.roles,
              multiple: true,
              "close-on-select": true,
              placeholder: unref(t)("select"),
              label: "name",
              "track-by": "name",
              class: "pb-16"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3"${_scopeId}>`);
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
              "track-by": "name",
              class: "pb-16"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-wrap justify-around"${_scopeId}><div class="w-96 mb-2 mr-3 bg-white dark:bg-sky-900 shadow-lg rounded-sm border border-slate-200"${_scopeId}><div class="mb-3"${_scopeId}><div class="px-5 py-4"${_scopeId}><h2 class="text-center font-semibold text-amber-500 dark:text-amber-200"${_scopeId}>${ssrInterpolate(unref(t)("userRoles"))}</h2></div><div class="overflow-x-auto"${_scopeId}><table class="table-auto w-full"${_scopeId}><thead class="text-xs font-semibold uppercase text-slate-700 bg-slate-50 dark:bg-cyan-800 border-t border-b border-slate-200 dark:text-slate-100"${_scopeId}><tr${_scopeId}><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("name"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-center"${_scopeId}>${ssrInterpolate(unref(t)("actions"))}</div></th></tr></thead><tbody class="text-sm divide-y divide-slate-200 dark:text-slate-100"${_scopeId}><!--[-->`);
            ssrRenderList(__props.user.roles, (userRole) => {
              _push2(`<tr${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(userRole.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(userRole.name)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route(
                  "admin.users.roles.destroy",
                  [__props.user.id, userRole.id]
                ),
                "preserve-scroll": ""
              }, null, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div><div class="bg-white mr-3 shadow-lg rounded-sm border border-slate-200 w-96 dark:bg-sky-900"${_scopeId}><div${_scopeId}><div class="px-5 py-4"${_scopeId}><h2 class="text-center font-semibold text-amber-500 dark:text-amber-200"${_scopeId}>${ssrInterpolate(unref(t)("userPermissions"))}</h2></div><div class="overflow-x-auto"${_scopeId}><table class="table-auto w-full"${_scopeId}><thead class="text-xs font-semibold uppercase text-slate-700 dark:text-slate-100 bg-slate-50 dark:bg-cyan-800 border-t border-b border-slate-200"${_scopeId}><tr${_scopeId}><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-left"${_scopeId}>${ssrInterpolate(unref(t)("name"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"${_scopeId}><div class="font-semibold text-center"${_scopeId}>${ssrInterpolate(unref(t)("actions"))}</div></th></tr></thead><tbody class="text-sm divide-y divide-slate-200 dark:text-slate-100"${_scopeId}><!--[-->`);
            ssrRenderList(__props.user.permissions, (userPermission) => {
              _push2(`<tr${_scopeId}><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(userPermission.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="text-left"${_scopeId}>${ssrInterpolate(userPermission.name)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route(
                  "admin.users.permissions.destroy",
                  [__props.user.id, userPermission.id]
                ),
                "preserve-scroll": ""
              }, null, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.users.index"),
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
            _push2(ssrRenderComponent(_sfc_main$6, {
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
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-5" }, [
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.users.index")
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
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$2, { for: "name" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                          createTextVNode(" " + toDisplayString(unref(t)("userName")), 1)
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
                    createVNode("div", { class: "mb-3" }, [
                      createVNode(_sfc_main$2, { for: "email" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                          createTextVNode(" " + toDisplayString(unref(t)("userEmail")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$3, {
                        id: "email",
                        type: "email",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autocomplete: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3" }, [
                      createVNode(_sfc_main$2, {
                        for: "roles",
                        value: unref(t)("roles"),
                        class: "mb-1"
                      }, null, 8, ["value"]),
                      createVNode(unref(VueMultiselect), {
                        modelValue: unref(form).roles,
                        "onUpdate:modelValue": ($event) => unref(form).roles = $event,
                        options: props.roles,
                        multiple: true,
                        "close-on-select": true,
                        placeholder: unref(t)("select"),
                        label: "name",
                        "track-by": "name",
                        class: "pb-16"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ]),
                    createVNode("div", { class: "mb-3" }, [
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
                        "track-by": "name",
                        class: "pb-16"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap justify-around" }, [
                      createVNode("div", { class: "w-96 mb-2 mr-3 bg-white dark:bg-sky-900 shadow-lg rounded-sm border border-slate-200" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("div", { class: "px-5 py-4" }, [
                            createVNode("h2", { class: "text-center font-semibold text-amber-500 dark:text-amber-200" }, toDisplayString(unref(t)("userRoles")), 1)
                          ]),
                          createVNode("div", { class: "overflow-x-auto" }, [
                            createVNode("table", { class: "table-auto w-full" }, [
                              createVNode("thead", { class: "text-xs font-semibold uppercase text-slate-700 bg-slate-50 dark:bg-cyan-800 border-t border-b border-slate-200 dark:text-slate-100" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px" }, [
                                    createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("id")), 1)
                                  ]),
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                    createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("name")), 1)
                                  ]),
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                    createVNode("div", { class: "font-semibold text-center" }, toDisplayString(unref(t)("actions")), 1)
                                  ])
                                ])
                              ]),
                              createVNode("tbody", { class: "text-sm divide-y divide-slate-200 dark:text-slate-100" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.user.roles, (userRole) => {
                                  return openBlock(), createBlock("tr", {
                                    key: userRole.id
                                  }, [
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px" }, [
                                      createVNode("div", { class: "text-left" }, toDisplayString(userRole.id), 1)
                                    ]),
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                      createVNode("div", { class: "text-left" }, toDisplayString(userRole.name), 1)
                                    ]),
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                      createVNode("div", { class: "flex justify-center" }, [
                                        createVNode(_sfc_main$5, {
                                          href: _ctx.route(
                                            "admin.users.roles.destroy",
                                            [__props.user.id, userRole.id]
                                          ),
                                          "preserve-scroll": ""
                                        }, null, 8, ["href"])
                                      ])
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white mr-3 shadow-lg rounded-sm border border-slate-200 w-96 dark:bg-sky-900" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "px-5 py-4" }, [
                            createVNode("h2", { class: "text-center font-semibold text-amber-500 dark:text-amber-200" }, toDisplayString(unref(t)("userPermissions")), 1)
                          ]),
                          createVNode("div", { class: "overflow-x-auto" }, [
                            createVNode("table", { class: "table-auto w-full" }, [
                              createVNode("thead", { class: "text-xs font-semibold uppercase text-slate-700 dark:text-slate-100 bg-slate-50 dark:bg-cyan-800 border-t border-b border-slate-200" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px" }, [
                                    createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("id")), 1)
                                  ]),
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                    createVNode("div", { class: "font-semibold text-left" }, toDisplayString(unref(t)("name")), 1)
                                  ]),
                                  createVNode("th", { class: "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" }, [
                                    createVNode("div", { class: "font-semibold text-center" }, toDisplayString(unref(t)("actions")), 1)
                                  ])
                                ])
                              ]),
                              createVNode("tbody", { class: "text-sm divide-y divide-slate-200 dark:text-slate-100" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.user.permissions, (userPermission) => {
                                  return openBlock(), createBlock("tr", {
                                    key: userPermission.id
                                  }, [
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px" }, [
                                      createVNode("div", { class: "text-left" }, toDisplayString(userPermission.id), 1)
                                    ]),
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                      createVNode("div", { class: "text-left" }, toDisplayString(userPermission.name), 1)
                                    ]),
                                    createVNode("td", { class: "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap" }, [
                                      createVNode("div", { class: "flex justify-center" }, [
                                        createVNode(_sfc_main$5, {
                                          href: _ctx.route(
                                            "admin.users.permissions.destroy",
                                            [__props.user.id, userPermission.id]
                                          ),
                                          "preserve-scroll": ""
                                        }, null, 8, ["href"])
                                      ])
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.users.index"),
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
                      createVNode(_sfc_main$6, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
