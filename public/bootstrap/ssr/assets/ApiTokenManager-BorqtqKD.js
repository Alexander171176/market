import { ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ActionMessage-CCQQyuRX.js";
import { _ as _sfc_main$8 } from "./Modal-Q89pHxET.js";
import { _ as _sfc_main$7 } from "./Checkbox-C8VoWyYU.js";
import { _ as _sfc_main$b } from "./ConfirmationModal-BoRLvAc4.js";
import { _ as _sfc_main$c } from "./DangerButton-CMZ45e4N.js";
import { _ as _sfc_main$9 } from "./DialogModal-CdysBQnD.js";
import { _ as _sfc_main$1 } from "./FormSection-Ch70r1LF.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$4 } from "./InputLabel-_CyoitNm.js";
import { _ as _sfc_main$3 } from "./PrimaryButton-g82PTLSj.js";
import { _ as _sfc_main$a } from "./SecondaryButton-CkEpBeGd.js";
import { S as SectionBorder } from "./SectionBorder-DyqoGRve.js";
import { useI18n } from "vue-i18n";
import "./SectionTitle-DH6cOuSm.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ApiTokenManager",
  __ssrInlineRender: true,
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    const props = __props;
    const createApiTokenForm = useForm({
      name: "",
      permissions: props.defaultPermissions
    });
    const updateApiTokenForm = useForm({
      permissions: []
    });
    const deleteApiTokenForm = useForm({});
    const displayingToken = ref(false);
    const managingPermissionsFor = ref(null);
    const apiTokenBeingDeleted = ref(null);
    const { t } = useI18n();
    const createApiToken = () => {
      createApiTokenForm.post(route("api-tokens.store"), {
        preserveScroll: true,
        onSuccess: () => {
          displayingToken.value = true;
          createApiTokenForm.reset();
        }
      });
    };
    const manageApiTokenPermissions = (token) => {
      updateApiTokenForm.permissions = token.abilities;
      managingPermissionsFor.value = token;
    };
    const updateApiToken = () => {
      updateApiTokenForm.put(route("api-tokens.update", managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => managingPermissionsFor.value = null
      });
    };
    const confirmApiTokenDeletion = (token) => {
      apiTokenBeingDeleted.value = token;
    };
    const deleteApiToken = () => {
      deleteApiTokenForm.delete(route("api-tokens.destroy", apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => apiTokenBeingDeleted.value = null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmitted: createApiToken }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("createApiToken"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("createApiToken")), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("apiTokensDescription"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("apiTokensDescription")), 1)
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              for: "name",
              value: unref(t)("name")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "name",
              modelValue: unref(createApiTokenForm).name,
              "onUpdate:modelValue": ($event) => unref(createApiTokenForm).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(createApiTokenForm).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.availablePermissions.length > 0) {
              _push2(`<div class="col-span-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                for: "permissions",
                value: unref(t)("permissions")
              }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.availablePermissions, (permission) => {
                _push2(`<div${_scopeId}><label class="flex items-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$7, {
                  checked: unref(createApiTokenForm).permissions,
                  "onUpdate:checked": ($event) => unref(createApiTokenForm).permissions = $event,
                  value: permission
                }, null, _parent2, _scopeId));
                _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(permission)}</span></label></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$4, {
                  for: "name",
                  value: unref(t)("name")
                }, null, 8, ["value"]),
                createVNode(_sfc_main$5, {
                  id: "name",
                  modelValue: unref(createApiTokenForm).name,
                  "onUpdate:modelValue": ($event) => unref(createApiTokenForm).name = $event,
                  type: "text",
                  class: "mt-1 block w-full",
                  autofocus: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$6, {
                  message: unref(createApiTokenForm).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              __props.availablePermissions.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "col-span-6"
              }, [
                createVNode(_sfc_main$4, {
                  for: "permissions",
                  value: unref(t)("permissions")
                }, null, 8, ["value"]),
                createVNode("div", { class: "mt-2 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePermissions, (permission) => {
                    return openBlock(), createBlock("div", { key: permission }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$7, {
                          checked: unref(createApiTokenForm).permissions,
                          "onUpdate:checked": ($event) => unref(createApiTokenForm).permissions = $event,
                          value: permission
                        }, null, 8, ["checked", "onUpdate:checked", "value"]),
                        createVNode("span", { class: "ms-2 text-sm text-gray-600" }, toDisplayString(permission), 1)
                      ])
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              on: unref(createApiTokenForm).recentlySuccessful,
              class: "me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("created"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("created")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: { "opacity-25": unref(createApiTokenForm).processing },
              disabled: unref(createApiTokenForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("create"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("create")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                on: unref(createApiTokenForm).recentlySuccessful,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("created")), 1)
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode(_sfc_main$3, {
                class: { "opacity-25": unref(createApiTokenForm).processing },
                disabled: unref(createApiTokenForm).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("create")), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.tokens.length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(SectionBorder, null, null, _parent));
        _push(`<div class="mt-10 sm:mt-0">`);
        _push(ssrRenderComponent(_sfc_main$8, null, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("manageApiTokens"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("manageApiTokens")), 1)
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("manageApiTokensDescription"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("manageApiTokensDescription")), 1)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tokens, (token) => {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="break-all"${_scopeId}>${ssrInterpolate(token.name)}</div><div class="flex items-center ms-2"${_scopeId}>`);
                if (token.last_used_ago) {
                  _push2(`<div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("lastUsed"))} ${ssrInterpolate(token.last_used_ago)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.availablePermissions.length > 0) {
                  _push2(`<button class="cursor-pointer ms-6 text-sm text-gray-400 underline"${_scopeId}>${ssrInterpolate(unref(t)("permissions"))}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button class="cursor-pointer ms-6 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(t)("delete"))}</button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.tokens, (token) => {
                    return openBlock(), createBlock("div", {
                      key: token.id,
                      class: "flex items-center justify-between"
                    }, [
                      createVNode("div", { class: "break-all" }, toDisplayString(token.name), 1),
                      createVNode("div", { class: "flex items-center ms-2" }, [
                        token.last_used_ago ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-400"
                        }, toDisplayString(unref(t)("lastUsed")) + " " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                        __props.availablePermissions.length > 0 ? (openBlock(), createBlock("button", {
                          key: 1,
                          class: "cursor-pointer ms-6 text-sm text-gray-400 underline",
                          onClick: ($event) => manageApiTokenPermissions(token)
                        }, toDisplayString(unref(t)("permissions")), 9, ["onClick"])) : createCommentVNode("", true),
                        createVNode("button", {
                          class: "cursor-pointer ms-6 text-sm text-red-500",
                          onClick: ($event) => confirmApiTokenDeletion(token)
                        }, toDisplayString(unref(t)("delete")), 9, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$9, {
        show: displayingToken.value,
        onClose: ($event) => displayingToken.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("apiToken"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("apiToken")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>${ssrInterpolate(unref(t)("copyToken"))}</div>`);
            if (_ctx.$page.props.jetstream.flash.token) {
              _push2(`<div class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all"${_scopeId}>${ssrInterpolate(_ctx.$page.props.jetstream.flash.token)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", null, toDisplayString(unref(t)("copyToken")), 1),
              _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all"
              }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              onClick: ($event) => displayingToken.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("close"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("close")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a, {
                onClick: ($event) => displayingToken.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("close")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        show: managingPermissionsFor.value != null,
        onClose: ($event) => managingPermissionsFor.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("apiTokenPermissions"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("apiTokenPermissions")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availablePermissions, (permission) => {
              _push2(`<div${_scopeId}><label class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                checked: unref(updateApiTokenForm).permissions,
                "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event,
                value: permission
              }, null, _parent2, _scopeId));
              _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(permission)}</span></label></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePermissions, (permission) => {
                  return openBlock(), createBlock("div", { key: permission }, [
                    createVNode("label", { class: "flex items-center" }, [
                      createVNode(_sfc_main$7, {
                        checked: unref(updateApiTokenForm).permissions,
                        "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event,
                        value: permission
                      }, null, 8, ["checked", "onUpdate:checked", "value"]),
                      createVNode("span", { class: "ms-2 text-sm text-gray-600" }, toDisplayString(permission), 1)
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              onClick: ($event) => managingPermissionsFor.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("cancel"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: ["ms-3", { "opacity-25": unref(updateApiTokenForm).processing }],
              disabled: unref(updateApiTokenForm).processing,
              onClick: updateApiToken
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
          } else {
            return [
              createVNode(_sfc_main$a, {
                onClick: ($event) => managingPermissionsFor.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$3, {
                class: ["ms-3", { "opacity-25": unref(updateApiTokenForm).processing }],
                disabled: unref(updateApiTokenForm).processing,
                onClick: updateApiToken
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("save")), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$b, {
        show: apiTokenBeingDeleted.value != null,
        onClose: ($event) => apiTokenBeingDeleted.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("deleteApiToken"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("deleteApiToken")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("confirmDeleteToken"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("confirmDeleteToken")), 1)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              onClick: ($event) => apiTokenBeingDeleted.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("cancel"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$c, {
              class: ["ms-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
              disabled: unref(deleteApiTokenForm).processing,
              onClick: deleteApiToken
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("delete"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("delete")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a, {
                onClick: ($event) => apiTokenBeingDeleted.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$c, {
                class: ["ms-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
                disabled: unref(deleteApiTokenForm).processing,
                onClick: deleteApiToken
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("delete")), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Partials/ApiTokenManager.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
