import { computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { H as HeadingAuth, I as ImageAuthentication } from "./HeadingAuth-CQWgRw7L.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BltKjphr.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-g82PTLSj.js";
import { useI18n } from "vue-i18n";
import "./auth-image-CfsIGyOn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const verificationLinkSent2 = computed(() => props.status === "verification-link-sent");
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(t)("emailVerificationTitle")
      }, null, _parent));
      _push(`<div class="flex flex-row flex-wrap w-full"><div class="w-full md:w-1/2"><div class="min-h-screen h-full flex flex-col justify-center items-center">`);
      if (verificationLinkSent2.value) {
        _push(`<div class="mb-4 font-medium text-md text-green-600">${ssrInterpolate(unref(t)("verificationLinkSent2"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8"><div class="mb-4 flex flex-col justify-center items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(HeadingAuth, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("resetPassword"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("resetPassword")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mb-4 font-semibold text-md text-gray-900">${ssrInterpolate(unref(t)("confirmEmailPrompt"))}</div><form><div class="mt-4 flex items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: { "opacity-25": unref(form).processing },
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("resendVerification"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("resendVerification")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.show"),
        class: "underline text-md text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("editProfile"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("editProfile")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("logout"),
        method: "post",
        as: "button",
        class: "underline text-md text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ms-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("logout"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></form></div></div></div></div>`);
      _push(ssrRenderComponent(ImageAuthentication, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
