import { unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
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
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(t)("passwordRecovery")
      }, null, _parent));
      _push(`<div class="flex flex-row flex-wrap w-full"><div class="w-full md:w-1/2"><div class="min-h-screen h-full flex flex-col justify-center items-center">`);
      if (__props.status) {
        _push(`<div class="mb-4 font-medium text-sm text-green-600">${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8"><div class="mb-4 flex flex-col justify-center items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(HeadingAuth, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("passwordReset"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("passwordReset")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mb-4 font-semibold text-md text-gray-900">${ssrInterpolate(unref(t)("forgotPasswordMessage"))}</div><form><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "email",
        value: unref(t)("email")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        type: "email",
        class: "mt-1 block w-full",
        required: "",
        autofocus: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-center mt-4">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        class: { "opacity-25": unref(form).processing },
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("resetPasswordLink"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("resetPasswordLink")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
