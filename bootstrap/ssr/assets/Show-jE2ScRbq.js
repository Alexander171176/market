import { mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import _sfc_main$3 from "./DeleteTeamForm-BJ8NggGt.js";
import { S as SectionBorder } from "./SectionBorder-DyqoGRve.js";
import _sfc_main$2 from "./TeamMemberManager-D4AIlRU3.js";
import _sfc_main$1 from "./UpdateTeamNameForm-Ba-U15Tk.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
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
import "./Modal-Q89pHxET.js";
import "./SectionTitle-DH6cOuSm.js";
import "./ConfirmationModal-BoRLvAc4.js";
import "./DangerButton-CMZ45e4N.js";
import "./SecondaryButton-CkEpBeGd.js";
import "./ActionMessage-CCQQyuRX.js";
import "./DialogModal-CdysBQnD.js";
import "./FormSection-Ch70r1LF.js";
import "./TextInput-nYw_y7M_.js";
import "./InputLabel-_CyoitNm.js";
import "./PrimaryButton-g82PTLSj.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    team: Object,
    availableRoles: Array,
    permissions: Object
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("teamSettings")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("teamSettings"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("teamSettings")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("teamSettings")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              team: __props.team,
              permissions: __props.permissions
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-10 sm:mt-0",
              team: __props.team,
              "available-roles": __props.availableRoles,
              "user-permissions": __props.permissions
            }, null, _parent2, _scopeId));
            if (__props.permissions.canDeleteTeam && !__props.team.personal_team) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(SectionBorder, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "mt-10 sm:mt-0",
                team: __props.team
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$1, {
                    team: __props.team,
                    permissions: __props.permissions
                  }, null, 8, ["team", "permissions"]),
                  createVNode(_sfc_main$2, {
                    class: "mt-10 sm:mt-0",
                    team: __props.team,
                    "available-roles": __props.availableRoles,
                    "user-permissions": __props.permissions
                  }, null, 8, ["team", "available-roles", "user-permissions"]),
                  __props.permissions.canDeleteTeam && !__props.team.personal_team ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(SectionBorder),
                    createVNode(_sfc_main$3, {
                      class: "mt-10 sm:mt-0",
                      team: __props.team
                    }, null, 8, ["team"])
                  ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
