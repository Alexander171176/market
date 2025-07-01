import { unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { H as HeadingAuth, I as ImageAuthentication } from "./HeadingAuth-CQWgRw7L.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BltKjphr.js";
import { _ as _sfc_main$5 } from "./Checkbox-C8VoWyYU.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$2 } from "./InputLabel-_CyoitNm.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-g82PTLSj.js";
import { useI18n } from "vue-i18n";
import "./auth-image-CfsIGyOn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(t)("loginTitle")
      }, null, _parent));
      _push(`<div class="flex flex-row flex-wrap w-full"><div class="w-full md:w-1/2"><div class="min-h-screen h-full flex flex-col justify-center items-center">`);
      if (__props.status) {
        _push(`<div class="w-full mb-4 font-medium text-md text-green-600">${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8"><div class="mb-4 flex flex-col justify-center items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(HeadingAuth, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("loginUser"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("loginUser")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<form><div>`);
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
      _push(`</div><div class="mt-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "password",
        value: unref(t)("password")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "password",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full",
        required: "",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div class="block mt-4"><label class="flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        checked: unref(form).remember,
        "onUpdate:checked": ($event) => unref(form).remember = $event,
        name: "remember"
      }, null, _parent));
      _push(`<span class="ms-2 text-md text-gray-600">${ssrInterpolate(unref(t)("rememberMe"))}</span></label></div><div class="flex items-center justify-end mt-4">`);
      if (__props.canResetPassword) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("password.request"),
          class: "border-b-[2px] text-lg text-sky-600 hover:text-sky-900"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("forgotPassword"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("forgotPassword")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$6, {
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
      _push(`</div></form><div class="pt-5 mt-6 border-t border-slate-200"><div class="text-center text-lg">${ssrInterpolate(unref(t)("registerPrompt"))} `);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "border-b-[2px] text-lg text-sky-600 hover:text-sky-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("register"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("register")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-5"><div class="bg-amber-100 text-amber-600 px-3 py-2 rounded"><svg class="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12"><path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"></path></svg><span class="text-sm">${ssrInterpolate(unref(t)("loginWarning"))}</span></div></div></div></div></div></div></div>`);
      _push(ssrRenderComponent(ImageAuthentication, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
