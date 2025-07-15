import { mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FormSection-Ch70r1LF.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./TextInput-nYw_y7M_.js";
import { _ as _sfc_main$3 } from "./InputLabel-_CyoitNm.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-g82PTLSj.js";
import { useI18n } from "vue-i18n";
import "./SectionTitle-DH6cOuSm.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CreateTeamForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const form = useForm({
      name: ""
    });
    const createTeam = () => {
      form.post(route("teams.store"), {
        errorBag: "createTeam",
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: createTeam }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("teamInformation"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("teamInformation")), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("createNewTeamDesc"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("createNewTeamDesc")), 1)
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              value: unref(t)("teamOwner")
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center mt-2"${_scopeId}><img class="object-cover w-12 h-12 rounded-full"${ssrRenderAttr("src", _ctx.$page.props.auth.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.auth.user.name)}${_scopeId}><div class="ms-4 leading-tight"${_scopeId}><div class="font-semibold text-orange-400 text-lg"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="font-semibold text-teal-600 text-lg"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div></div></div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "name",
              value: unref(t)("teamName")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "block w-full mt-1",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "col-span-6" }, [
                createVNode(_sfc_main$3, {
                  value: unref(t)("teamOwner")
                }, null, 8, ["value"]),
                createVNode("div", { class: "flex items-center mt-2" }, [
                  createVNode("img", {
                    class: "object-cover w-12 h-12 rounded-full",
                    src: _ctx.$page.props.auth.user.profile_photo_url,
                    alt: _ctx.$page.props.auth.user.name
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "ms-4 leading-tight" }, [
                    createVNode("div", { class: "font-semibold text-orange-400 text-lg" }, toDisplayString(_ctx.$page.props.auth.user.name), 1),
                    createVNode("div", { class: "font-semibold text-teal-600 text-lg" }, toDisplayString(_ctx.$page.props.auth.user.email), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$3, {
                  for: "name",
                  value: unref(t)("teamName")
                }, null, 8, ["value"]),
                createVNode(_sfc_main$4, {
                  id: "name",
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  type: "text",
                  class: "block w-full mt-1",
                  autofocus: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$5, {
                  message: unref(form).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
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
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Partials/CreateTeamForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
