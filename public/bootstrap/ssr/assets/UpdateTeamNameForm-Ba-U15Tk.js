import { mergeProps, createSlots, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ActionMessage-CCQQyuRX.js";
import { _ as _sfc_main$1 } from "./FormSection-Ch70r1LF.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$2 } from "./InputLabel-_CyoitNm.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-g82PTLSj.js";
import { useI18n } from "vue-i18n";
import "./SectionTitle-DH6cOuSm.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "UpdateTeamNameForm",
  __ssrInlineRender: true,
  props: {
    team: Object,
    permissions: Object
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      name: props.team.name
    });
    const updateTeamName = () => {
      form.put(route("teams.update", props.team), {
        errorBag: "updateTeamName",
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateTeamName }, _attrs), createSlots({
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("teamName"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("teamName")), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("teamNameDescription"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("teamNameDescription")), 1)
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              value: unref(t)("teamOwner")
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center mt-2"${_scopeId}><img class="w-12 h-12 rounded-full object-cover"${ssrRenderAttr("src", __props.team.owner.profile_photo_url)}${ssrRenderAttr("alt", __props.team.owner.name)}${_scopeId}><div class="ms-4 leading-tight"${_scopeId}><div class="font-semibold text-orange-400 text-lg"${_scopeId}>${ssrInterpolate(__props.team.owner.name)}</div><div class="font-semibold text-teal-600 text-lg"${_scopeId}>${ssrInterpolate(__props.team.owner.email)}</div></div></div></div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: unref(t)("teamName")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              disabled: !__props.permissions.canUpdateTeam
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "col-span-6" }, [
                createVNode(_sfc_main$2, {
                  value: unref(t)("teamOwner")
                }, null, 8, ["value"]),
                createVNode("div", { class: "flex items-center mt-2" }, [
                  createVNode("img", {
                    class: "w-12 h-12 rounded-full object-cover",
                    src: __props.team.owner.profile_photo_url,
                    alt: __props.team.owner.name
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "ms-4 leading-tight" }, [
                    createVNode("div", { class: "font-semibold text-orange-400 text-lg" }, toDisplayString(__props.team.owner.name), 1),
                    createVNode("div", { class: "font-semibold text-teal-600 text-lg" }, toDisplayString(__props.team.owner.email), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$2, {
                  for: "name",
                  value: unref(t)("teamName")
                }, null, 8, ["value"]),
                createVNode(_sfc_main$3, {
                  id: "name",
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  type: "text",
                  class: "mt-1 block w-full",
                  disabled: !__props.permissions.canUpdateTeam
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode(_sfc_main$4, {
                  message: unref(form).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        _: 2
      }, [
        __props.permissions.canUpdateTeam ? {
          name: "actions",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                on: unref(form).recentlySuccessful,
                class: "me-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("saved"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("saved")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
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
                createVNode(_sfc_main$5, {
                  on: unref(form).recentlySuccessful,
                  class: "me-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("saved")), 1)
                  ]),
                  _: 1
                }, 8, ["on"]),
                createVNode(_sfc_main$6, {
                  class: { "opacity-25": unref(form).processing },
                  disabled: unref(form).processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("save")), 1)
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Partials/UpdateTeamNameForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
