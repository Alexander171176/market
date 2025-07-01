import { mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import _sfc_main$1 from "./ApiTokenManager-BorqtqKD.js";
import { useI18n } from "vue-i18n";
import "@inertiajs/vue3";
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
import "./ActionMessage-CCQQyuRX.js";
import "./Modal-Q89pHxET.js";
import "./SectionTitle-DH6cOuSm.js";
import "./Checkbox-C8VoWyYU.js";
import "./ConfirmationModal-BoRLvAc4.js";
import "./DangerButton-CMZ45e4N.js";
import "./DialogModal-CdysBQnD.js";
import "./FormSection-Ch70r1LF.js";
import "./TextInput-nYw_y7M_.js";
import "./InputLabel-_CyoitNm.js";
import "./PrimaryButton-g82PTLSj.js";
import "./SecondaryButton-CkEpBeGd.js";
import "./SectionBorder-DyqoGRve.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("apiTokens")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate(unref(t)("apiTokens"))}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString(unref(t)("apiTokens")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              tokens: __props.tokens,
              "available-permissions": __props.availablePermissions,
              "default-permissions": __props.defaultPermissions
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$1, {
                    tokens: __props.tokens,
                    "available-permissions": __props.availablePermissions,
                    "default-permissions": __props.defaultPermissions
                  }, null, 8, ["tokens", "available-permissions", "default-permissions"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
