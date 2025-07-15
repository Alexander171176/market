import { ref, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { H as HeadingAuth, I as ImageAuthentication } from "./HeadingAuth-CQWgRw7L.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BltKjphr.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$2 } from "./InputLabel-_CyoitNm.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-g82PTLSj.js";
import { useI18n } from "vue-i18n";
import "./auth-image-CfsIGyOn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "TwoFactorChallenge",
  __ssrInlineRender: true,
  setup(__props) {
    const recovery = ref(false);
    const form = useForm({
      code: "",
      recovery_code: ""
    });
    const recoveryCodeInput = ref(null);
    const codeInput = ref(null);
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(t)("twoFactorConfirmationTitle")
      }, null, _parent));
      _push(`<div class="flex flex-row flex-wrap w-full"><div class="w-full md:w-1/2"><div class="min-h-screen h-full flex flex-col justify-center items-center"><div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8"><div class="mb-4 flex flex-col justify-center items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(HeadingAuth, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("twoFactorConfirmation"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("twoFactorConfirmation")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mb-4 font-semibold text-md text-gray-900">`);
      if (!recovery.value) {
        _push(`<!--[-->${ssrInterpolate(unref(t)("authCodeDescription"))}<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(unref(t)("recoveryCodeDescription"))}<!--]-->`);
      }
      _push(`</div><form>`);
      if (!recovery.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          for: "code",
          value: unref(t)("authCode")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          id: "code",
          ref_key: "codeInput",
          ref: codeInput,
          modelValue: unref(form).code,
          "onUpdate:modelValue": ($event) => unref(form).code = $event,
          type: "text",
          inputmode: "numeric",
          class: "mt-1 block w-full",
          autofocus: "",
          autocomplete: "one-time-code"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$4, {
          class: "mt-2",
          message: unref(form).errors.code
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          for: "recovery_code",
          value: unref(t)("recoveryCode")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          id: "recovery_code",
          ref_key: "recoveryCodeInput",
          ref: recoveryCodeInput,
          modelValue: unref(form).recovery_code,
          "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
          type: "text",
          class: "mt-1 block w-full",
          autocomplete: "one-time-code"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$4, {
          class: "mt-2",
          message: unref(form).errors.recovery_code
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="flex items-center justify-end mt-4"><button type="button" class="text-md text-gray-600 hover:text-gray-900 underline cursor-pointer">`);
      if (!recovery.value) {
        _push(`<!--[-->${ssrInterpolate(unref(t)("useRecoveryCode"))}<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(unref(t)("useAuthCode"))}<!--]-->`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        class: ["ms-4", { "opacity-25": unref(form).processing }],
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("login"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div></div></div>`);
      _push(ssrRenderComponent(ImageAuthentication, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
