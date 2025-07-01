import { ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
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
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    log: String,
    files: Array,
    selectedFile: String
  },
  setup(__props) {
    const { t } = useI18n();
    useToast();
    const props = __props;
    const clearForm = useForm({});
    const searchQuery = ref("");
    const logLines = computed(() => props.log.split("\n"));
    const filteredLines = computed(() => {
      if (!searchQuery.value)
        return logLines.value;
      return logLines.value.filter((line) => line.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const changeFile = (fileKey) => {
      router.get(route("admin.logs.index", { file: fileKey }));
    };
    const clearLog = () => {
      if (confirm("Очистить выбранный лог?")) {
        clearForm.delete(route("admin.logs.clear", { file: props.selectedFile }));
      }
    };
    const getLineColor = (line) => {
      if (/ERROR|exception|critical/i.test(line))
        return "text-red-500 dark:text-red-200 font-bold";
      if (/WARN|warning/i.test(line))
        return "text-yellow-600 font-semibold";
      if (/INFO/i.test(line))
        return "text-indigo-800 dark:text-indigo-200";
      if (/DEBUG/i.test(line))
        return "text-fuchsia-800 dark:text-fuchsia-200 font-bold";
      return "text-gray-900 dark:text-gray-100";
    };
    const downloadLog = () => {
      window.location.href = route("admin.logs.download", { file: props.selectedFile });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("logs")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("logs"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("logs")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("logs")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="p-6 bg-slate-100 dark:bg-slate-600 rounded shadow"${_scopeId}><h1 class="text-slate-700 dark:text-slate-100 text-center text-xl font-semibold mb-4"${_scopeId}>${ssrInterpolate(unref(t)("viewingLogs"))}</h1><div class="flex flex-wrap gap-4 mb-4"${_scopeId}><select${ssrRenderAttr("value", props.selectedFile)} class="border rounded-sm h-8 py-0 px-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50"${_scopeId}><!--[-->`);
            ssrRenderList(props.files, (file) => {
              _push2(`<option${ssrRenderAttr("value", file)} class="text-md"${_scopeId}>${ssrInterpolate(file)}</option>`);
            });
            _push2(`<!--]--></select><input${ssrRenderAttr("value", searchQuery.value)} placeholder="Поиск..." class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50 border rounded-sm h-8 py-0 px-2 flex-1"${_scopeId}><button${ssrIncludeBooleanAttr(unref(clearForm).processing) ? " disabled" : ""} class="h-8 py-0 px-2 bg-rose-500 text-white rounded-sm hover:bg-amber-500 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(t)("clearLog"))}</button><button class="h-8 py-0 px-2 bg-green-500 text-white rounded-sm hover:bg-teal-500"${_scopeId}>${ssrInterpolate(unref(t)("download"))}</button></div><div class="border rounded p-4 bg-gray-50 dark:bg-gray-700 overflow-auto max-h-[600px] text-sm font-mono"${_scopeId}>`);
            if (filteredLines.value.length === 0) {
              _push2(`<div class="text-slate-700 dark:text-slate-100"${_scopeId}>${ssrInterpolate(unref(t)("noData"))}</div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(filteredLines.value, (line, idx) => {
                _push2(`<div${ssrRenderAttr("id", "line-" + idx)} class="${ssrRenderClass(["group flex hover:bg-yellow-100 dark:hover:bg-slate-900 transition-colors duration-200", getLineColor(line)])}"${_scopeId}><span class="font-semibold text-blue-500 dark:text-blue-200 inline-block w-12 text-right mr-2 select-none"${_scopeId}>${ssrInterpolate(idx + 1)}. </span><pre class="whitespace-pre-wrap flex-1"${_scopeId}>${ssrInterpolate(line)}</pre></div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "p-6 bg-slate-100 dark:bg-slate-600 rounded shadow" }, [
                    createVNode("h1", { class: "text-slate-700 dark:text-slate-100 text-center text-xl font-semibold mb-4" }, toDisplayString(unref(t)("viewingLogs")), 1),
                    createVNode("div", { class: "flex flex-wrap gap-4 mb-4" }, [
                      createVNode("select", {
                        onChange: (e) => changeFile(e.target.value),
                        value: props.selectedFile,
                        class: "border rounded-sm h-8 py-0 px-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.files, (file) => {
                          return openBlock(), createBlock("option", {
                            key: file,
                            value: file,
                            class: "text-md"
                          }, toDisplayString(file), 9, ["value"]);
                        }), 128))
                      ], 40, ["onChange", "value"]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        placeholder: "Поиск...",
                        class: "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50 border rounded-sm h-8 py-0 px-2 flex-1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("button", {
                        onClick: clearLog,
                        disabled: unref(clearForm).processing,
                        class: "h-8 py-0 px-2 bg-rose-500 text-white rounded-sm hover:bg-amber-500 disabled:opacity-50"
                      }, toDisplayString(unref(t)("clearLog")), 9, ["disabled"]),
                      createVNode("button", {
                        onClick: downloadLog,
                        class: "h-8 py-0 px-2 bg-green-500 text-white rounded-sm hover:bg-teal-500"
                      }, toDisplayString(unref(t)("download")), 1)
                    ]),
                    createVNode("div", { class: "border rounded p-4 bg-gray-50 dark:bg-gray-700 overflow-auto max-h-[600px] text-sm font-mono" }, [
                      filteredLines.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-slate-700 dark:text-slate-100"
                      }, toDisplayString(unref(t)("noData")), 1)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredLines.value, (line, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          id: "line-" + idx,
                          class: ["group flex hover:bg-yellow-100 dark:hover:bg-slate-900 transition-colors duration-200", getLineColor(line)]
                        }, [
                          createVNode("span", { class: "font-semibold text-blue-500 dark:text-blue-200 inline-block w-12 text-right mr-2 select-none" }, toDisplayString(idx + 1) + ". ", 1),
                          createVNode("pre", { class: "whitespace-pre-wrap flex-1" }, toDisplayString(line), 1)
                        ], 10, ["id"]);
                      }), 128))
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Log/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
