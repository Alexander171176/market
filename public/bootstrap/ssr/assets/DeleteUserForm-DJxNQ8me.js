import { ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Modal-Q89pHxET.js";
import { _ as _sfc_main$2 } from "./DangerButton-CMZ45e4N.js";
import { _ as _sfc_main$3 } from "./DialogModal-CdysBQnD.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-CkEpBeGd.js";
import { useI18n } from "vue-i18n";
import "./SectionTitle-DH6cOuSm.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
      setTimeout(() => passwordInput.value.focus(), 250);
    };
    const deleteUser = () => {
      form.delete(route("current-user.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("deleteAccountButton"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("deleteAccountDescription"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("deleteAccountDescription")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200"${_scopeId}>${ssrInterpolate(unref(t)("deleteAccountWarning"))}</div><div class="mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: confirmUserDeletion }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("deleteAccountButton"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: confirmingUserDeletion.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("deleteAccountButton"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("deleteAccountConfirmation"))} <div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: unref(t)("password"),
                    autocomplete: "current-password",
                    onKeyup: deleteUser
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("deleteAccountConfirmation")) + " ", 1),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$5, {
                        ref_key: "passwordInput",
                        ref: passwordInput,
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        type: "password",
                        class: "mt-1 block w-3/4",
                        placeholder: unref(t)("password"),
                        autocomplete: "current-password",
                        onKeyup: withKeys(deleteUser, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$6, {
                        message: unref(form).errors.password,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { onClick: closeModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("cancel"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    class: ["ms-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("deleteAccountButton"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$2, {
                      class: ["ms-3", { "opacity-25": unref(form).processing }],
                      disabled: unref(form).processing,
                      onClick: deleteUser
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                      ]),
                      _: 1
                    }, 8, ["class", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200" }, toDisplayString(unref(t)("deleteAccountWarning")), 1),
              createVNode("div", { class: "mt-5" }, [
                createVNode(_sfc_main$2, { onClick: confirmUserDeletion }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode(_sfc_main$3, {
                show: confirmingUserDeletion.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                ]),
                content: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("deleteAccountConfirmation")) + " ", 1),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(_sfc_main$5, {
                      ref_key: "passwordInput",
                      ref: passwordInput,
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: "password",
                      class: "mt-1 block w-3/4",
                      placeholder: unref(t)("password"),
                      autocomplete: "current-password",
                      onKeyup: withKeys(deleteUser, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_sfc_main$6, {
                      message: unref(form).errors.password,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$4, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$2, {
                    class: ["ms-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("deleteAccountButton")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
