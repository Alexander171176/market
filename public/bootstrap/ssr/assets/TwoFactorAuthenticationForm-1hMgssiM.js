import { ref, reactive, withCtx, unref, createTextVNode, toDisplayString, createVNode, withKeys, nextTick, useSSRContext, computed, watch, createBlock, createCommentVNode, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$7 } from "./Modal-Q89pHxET.js";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$2 } from "./DialogModal-CdysBQnD.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-g82PTLSj.js";
import { _ as _sfc_main$3 } from "./SecondaryButton-CkEpBeGd.js";
import { _ as _sfc_main$9 } from "./DangerButton-CMZ45e4N.js";
import { _ as _sfc_main$8 } from "./InputLabel-_CyoitNm.js";
import "./SectionTitle-DH6cOuSm.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "ConfirmsPassword",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    button: {
      type: String
    }
  },
  emits: ["confirmed"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const confirmingPassword = ref(false);
    const form = reactive({
      password: "",
      error: "",
      processing: false
    });
    const passwordInput = ref(null);
    const confirmPassword = () => {
      form.processing = true;
      axios.post(route("password.confirm"), {
        password: form.password
      }).then(() => {
        form.processing = false;
        closeModal();
        nextTick().then(() => emit("confirmed"));
      }).catch((error) => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value.focus();
      });
    };
    const closeModal = () => {
      confirmingPassword.value = false;
      form.password = "";
      form.error = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}><span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        show: confirmingPassword.value,
        onClose: closeModal
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("confirmPassword"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("confirmPassword")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("securityMessage"))} <div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: form.password,
              "onUpdate:modelValue": ($event) => form.password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              autocomplete: "current-password",
              onKeyup: confirmPassword
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("securityMessage")) + " ", 1),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$5, {
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: form.password,
                  "onUpdate:modelValue": ($event) => form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  autocomplete: "current-password",
                  onKeyup: withKeys(confirmPassword, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$6, {
                  message: form.error,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, { onClick: closeModal }, {
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
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: ["ms-3", { "opacity-25": form.processing }],
              disabled: form.processing,
              onClick: confirmPassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("confirm"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("confirm")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, { onClick: closeModal }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, {
                class: ["ms-3", { "opacity-25": form.processing }],
                disabled: form.processing,
                onClick: confirmPassword
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmsPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "TwoFactorAuthenticationForm",
  __ssrInlineRender: true,
  props: {
    requiresConfirmation: Boolean
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const enabling = ref(false);
    const confirming = ref(false);
    const disabling = ref(false);
    const qrCode = ref(null);
    const setupKey = ref(null);
    const recoveryCodes = ref([]);
    const confirmationForm = useForm({
      code: ""
    });
    const twoFactorEnabled = computed(() => {
      var _a;
      return !enabling.value && ((_a = page.props.auth.user) == null ? void 0 : _a.two_factor_enabled);
    });
    watch(twoFactorEnabled, () => {
      if (!twoFactorEnabled.value) {
        confirmationForm.reset();
        confirmationForm.clearErrors();
      }
    });
    const enableTwoFactorAuthentication = () => {
      enabling.value = true;
      router.post(
        route("two-factor.enable"),
        {},
        {
          preserveScroll: true,
          onSuccess: () => Promise.all([showQrCode(), showSetupKey(), showRecoveryCodes()]),
          onFinish: () => {
            enabling.value = false;
            confirming.value = props.requiresConfirmation;
          }
        }
      );
    };
    const showQrCode = () => {
      return axios.get(route("two-factor.qr-code")).then((response) => {
        qrCode.value = response.data.svg;
      });
    };
    const showSetupKey = () => {
      return axios.get(route("two-factor.secret-key")).then((response) => {
        setupKey.value = response.data.secretKey;
      });
    };
    const showRecoveryCodes = () => {
      return axios.get(route("two-factor.recovery-codes")).then((response) => {
        recoveryCodes.value = response.data;
      });
    };
    const confirmTwoFactorAuthentication = () => {
      confirmationForm.post(route("two-factor.confirm"), {
        errorBag: "confirmTwoFactorAuthentication",
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          confirming.value = false;
          qrCode.value = null;
          setupKey.value = null;
        }
      });
    };
    const regenerateRecoveryCodes = () => {
      axios.post(route("two-factor.recovery-codes")).then(() => showRecoveryCodes());
    };
    const disableTwoFactorAuthentication = () => {
      disabling.value = true;
      router.delete(route("two-factor.disable"), {
        preserveScroll: true,
        onSuccess: () => {
          disabling.value = false;
          confirming.value = false;
        }
      });
    };
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$7, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("twoFactorAuthentication"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("twoFactorAuthentication")), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("twoFactorAuthenticationDescription"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("twoFactorAuthenticationDescription")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (twoFactorEnabled.value && !confirming.value) {
              _push2(`<h3 class="text-xl font-medium text-orange-400 dark:text-orange-200"${_scopeId}>${ssrInterpolate(unref(t)("twoFactorEnabled"))}</h3>`);
            } else if (twoFactorEnabled.value && confirming.value) {
              _push2(`<h3 class="text-xl font-medium text-orange-400 dark:text-orange-200"${_scopeId}>${ssrInterpolate(unref(t)("completeTwoFactorSetup"))}</h3>`);
            } else {
              _push2(`<h3 class="text-xl font-medium text-orange-400 dark:text-orange-200"${_scopeId}>${ssrInterpolate(unref(t)("twoFactorNotEnabled"))}</h3>`);
            }
            _push2(`<div class="mt-3 max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200"${_scopeId}><p${_scopeId}>${ssrInterpolate(unref(t)("twoFactorExplanation"))}</p></div>`);
            if (twoFactorEnabled.value) {
              _push2(`<div${_scopeId}>`);
              if (qrCode.value) {
                _push2(`<div${_scopeId}><div class="mt-4 max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200"${_scopeId}>`);
                if (confirming.value) {
                  _push2(`<p class="font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("completeTwoFactorEnable"))}</p>`);
                } else {
                  _push2(`<p${_scopeId}>${ssrInterpolate(unref(t)("twoFactorEnabledMessage"))}</p>`);
                }
                _push2(`</div><div class="mt-4 p-2 inline-block bg-white"${_scopeId}>${qrCode.value ?? ""}</div>`);
                if (setupKey.value) {
                  _push2(`<div class="mt-4 max-w-xl text-lg text-orange-500"${_scopeId}><p class="font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("setupKey"))}: <span${_scopeId}>${setupKey.value ?? ""}</span></p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (confirming.value) {
                  _push2(`<div class="mt-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$8, {
                    for: "code",
                    value: unref(t)("code")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    id: "code",
                    modelValue: unref(confirmationForm).code,
                    "onUpdate:modelValue": ($event) => unref(confirmationForm).code = $event,
                    type: "text",
                    name: "code",
                    class: "block mt-1 w-1/2",
                    inputmode: "numeric",
                    autofocus: "",
                    autocomplete: "one-time-code",
                    onKeyup: confirmTwoFactorAuthentication
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$6, {
                    message: unref(confirmationForm).errors.code,
                    class: "mt-2"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (recoveryCodes.value.length > 0 && !confirming.value) {
                _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-lg text-indigo-900 dark:text-sky-200"${_scopeId}><p class="font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("recoveryCodesMessage"))}</p></div><div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-lg bg-gray-100 rounded-lg"${_scopeId}><!--[-->`);
                ssrRenderList(recoveryCodes.value, (code) => {
                  _push2(`<div${_scopeId}>${ssrInterpolate(code)}</div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-5"${_scopeId}>`);
            if (!twoFactorEnabled.value) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: enableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      type: "button",
                      class: { "opacity-25": enabling.value },
                      disabled: enabling.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)("enable"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t)("enable")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        type: "button",
                        class: { "opacity-25": enabling.value },
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("enable")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: confirmTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$4, {
                        type: "button",
                        class: ["me-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(t)("confirm"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(t)("confirm")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 0,
                        type: "button",
                        class: ["me-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("confirm")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: regenerateRecoveryCodes }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (recoveryCodes.value.length > 0 && !confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$3, { class: "me-3" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(t)("regenerateRecoveryCodes"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(t)("regenerateRecoveryCodes")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: "me-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("regenerateRecoveryCodes")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: showRecoveryCodes }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (recoveryCodes.value.length === 0 && !confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$3, { class: "me-3" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(t)("showRecoveryCodes"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(t)("showRecoveryCodes")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      recoveryCodes.value.length === 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: "me-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("showRecoveryCodes")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: disableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$3, {
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
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
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, { onConfirmed: disableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$9, {
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(t)("disable"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(t)("disable")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      !confirming.value ? (openBlock(), createBlock(_sfc_main$9, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("disable")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              twoFactorEnabled.value && !confirming.value ? (openBlock(), createBlock("h3", {
                key: 0,
                class: "text-xl font-medium text-orange-400 dark:text-orange-200"
              }, toDisplayString(unref(t)("twoFactorEnabled")), 1)) : twoFactorEnabled.value && confirming.value ? (openBlock(), createBlock("h3", {
                key: 1,
                class: "text-xl font-medium text-orange-400 dark:text-orange-200"
              }, toDisplayString(unref(t)("completeTwoFactorSetup")), 1)) : (openBlock(), createBlock("h3", {
                key: 2,
                class: "text-xl font-medium text-orange-400 dark:text-orange-200"
              }, toDisplayString(unref(t)("twoFactorNotEnabled")), 1)),
              createVNode("div", { class: "mt-3 max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200" }, [
                createVNode("p", null, toDisplayString(unref(t)("twoFactorExplanation")), 1)
              ]),
              twoFactorEnabled.value ? (openBlock(), createBlock("div", { key: 3 }, [
                qrCode.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "mt-4 max-w-xl font-semibold text-lg text-indigo-900 dark:text-sky-200" }, [
                    confirming.value ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "font-semibold"
                    }, toDisplayString(unref(t)("completeTwoFactorEnable")), 1)) : (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(t)("twoFactorEnabledMessage")), 1))
                  ]),
                  createVNode("div", {
                    class: "mt-4 p-2 inline-block bg-white",
                    innerHTML: qrCode.value
                  }, null, 8, ["innerHTML"]),
                  setupKey.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 max-w-xl text-lg text-orange-500"
                  }, [
                    createVNode("p", { class: "font-semibold" }, [
                      createTextVNode(toDisplayString(unref(t)("setupKey")) + ": ", 1),
                      createVNode("span", { innerHTML: setupKey.value }, null, 8, ["innerHTML"])
                    ])
                  ])) : createCommentVNode("", true),
                  confirming.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-4"
                  }, [
                    createVNode(_sfc_main$8, {
                      for: "code",
                      value: unref(t)("code")
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$5, {
                      id: "code",
                      modelValue: unref(confirmationForm).code,
                      "onUpdate:modelValue": ($event) => unref(confirmationForm).code = $event,
                      type: "text",
                      name: "code",
                      class: "block mt-1 w-1/2",
                      inputmode: "numeric",
                      autofocus: "",
                      autocomplete: "one-time-code",
                      onKeyup: withKeys(confirmTwoFactorAuthentication, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$6, {
                      message: unref(confirmationForm).errors.code,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", { class: "mt-4 max-w-xl text-lg text-indigo-900 dark:text-sky-200" }, [
                    createVNode("p", { class: "font-semibold" }, toDisplayString(unref(t)("recoveryCodesMessage")), 1)
                  ]),
                  createVNode("div", { class: "grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-lg bg-gray-100 rounded-lg" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(recoveryCodes.value, (code) => {
                      return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "mt-5" }, [
                !twoFactorEnabled.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_sfc_main$1, { onConfirmed: enableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, {
                        type: "button",
                        class: { "opacity-25": enabling.value },
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("enable")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ]),
                    _: 1
                  })
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_sfc_main$1, { onConfirmed: confirmTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 0,
                        type: "button",
                        class: ["me-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("confirm")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, { onConfirmed: regenerateRecoveryCodes }, {
                    default: withCtx(() => [
                      recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: "me-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("regenerateRecoveryCodes")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, { onConfirmed: showRecoveryCodes }, {
                    default: withCtx(() => [
                      recoveryCodes.value.length === 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: "me-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("showRecoveryCodes")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, { onConfirmed: disableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cancel")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, { onConfirmed: disableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      !confirming.value ? (openBlock(), createBlock(_sfc_main$9, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("disable")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
