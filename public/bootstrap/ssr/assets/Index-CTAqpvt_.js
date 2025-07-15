import { useSSRContext, ref, watch, onMounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import hljs from "highlight.js";
import rough from "roughjs/bundled/rough.esm.js";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers, highlightActiveLineGutter, keymap } from "@codemirror/view";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, foldKeymap } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "./ScrollButtons-DpnzINGM.js";
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
const _sfc_main$3 = {
  setup(__props) {
    const props = __props;
    const isCodeDarkTheme = ref(false);
    const codeContainer = ref(null);
    const loadCodeTheme = async (theme) => {
      const existingLink = document.getElementById("hljs-theme");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
      const link = document.createElement("link");
      link.id = "hljs-theme";
      link.rel = "stylesheet";
      link.href = theme;
      document.head.appendChild(link);
    };
    watch(isCodeDarkTheme, async (newVal) => {
      const theme = newVal ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css" : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github.min.css";
      await loadCodeTheme(theme);
      highlightCode();
    });
    const highlightCode = () => {
      if (codeContainer.value) {
        const codeBlock = codeContainer.value.querySelector("code");
        hljs.highlightElement(codeBlock);
      }
    };
    onMounted(async () => {
      const initialTheme = isCodeDarkTheme.value ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css" : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github.min.css";
      await loadCodeTheme(initialTheme);
      highlightCode();
    });
    watch(
      () => props.modelValue,
      () => {
        highlightCode();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3c1dcd86><div class="flex flex-col items-center mb-2" data-v-3c1dcd86><input type="checkbox" name="code-theme-switch" id="code-theme-switch"${ssrIncludeBooleanAttr(Array.isArray(isCodeDarkTheme.value) ? ssrLooseContain(isCodeDarkTheme.value, null) : isCodeDarkTheme.value) ? " checked" : ""} class="code-theme-switch sr-only" data-v-3c1dcd86><label class="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-yellow-100 rounded-full border border-slate-200" for="code-theme-switch" data-v-3c1dcd86>`);
      if (!isCodeDarkTheme.value) {
        _push(`<svg class="w-4 h-4" width="16" height="16" xmlns="http://www.w3.org/2000/svg" data-v-3c1dcd86><path class="fill-current text-slate-400" d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z" data-v-3c1dcd86></path><path class="fill-current text-slate-500" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" data-v-3c1dcd86></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (isCodeDarkTheme.value) {
        _push(`<svg class="w-4 h-4" width="16" height="16" xmlns="http://www.w3.org/2000/svg" data-v-3c1dcd86><path class="fill-current text-slate-400" d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z" data-v-3c1dcd86></path><path class="fill-current text-slate-500" d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z" data-v-3c1dcd86></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label></div><div class="highlight-editor" data-v-3c1dcd86><pre data-v-3c1dcd86><code class="language-javascript" data-v-3c1dcd86>${ssrInterpolate(__props.modelValue)}</code></pre></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/HighlightEditor/HighlightEditor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  setup(__props) {
    const props = __props;
    const canvas = ref(null);
    const drawDirectoryStructure = () => {
      const ctx = canvas.value.getContext("2d");
      const rc = rough.canvas(canvas.value);
      const canvasWidth = canvas.value.width;
      let y = 20;
      const lineHeight = 40;
      const fileSpacing = 10;
      const drawGroup = (groupName, files) => {
        const groupTextWidth = ctx.measureText(groupName).width;
        const groupX = (canvasWidth - groupTextWidth - 20) / 2;
        rc.rectangle(groupX, y, groupTextWidth + 20, 30, { roughness: 0, stroke: "blue" });
        ctx.fillStyle = "blue";
        ctx.fillText(groupName, groupX + 10, y + 20);
        y += lineHeight;
        let currentX = 20;
        Object.keys(files).forEach((fileName) => {
          const fileTextWidth = ctx.measureText(fileName).width;
          if (currentX + fileTextWidth + 20 > canvasWidth - 20) {
            currentX = 20;
            y += lineHeight;
          }
          rc.rectangle(currentX, y, fileTextWidth + 20, 30, { roughness: 0, stroke: "teal", strokeWidth: 1, strokeLineDash: [4, 2] });
          ctx.fillStyle = "orange";
          ctx.fillText(fileName, currentX + 10, y + 20);
          currentX += fileTextWidth + 20 + fileSpacing;
        });
        y += lineHeight * 2;
      };
      Object.keys(props.fileContents).forEach((group) => {
        drawGroup(group, props.fileContents[group]);
        y += lineHeight;
      });
    };
    onMounted(() => {
      const ctx = canvas.value.getContext("2d");
      ctx.font = "12px Times New Roman";
      drawDirectoryStructure();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "canvas-container flex justify-center" }, _attrs))} data-v-be1cb8ff><canvas width="1000" height="1200" class="mt-8" data-v-be1cb8ff></canvas></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Component/DirectoryStructure.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CodeMirrorEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    theme: { type: String, default: "light" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editor = ref(null);
    const isDarkTheme = ref(false);
    let editorView;
    const buildExtensions = (darkTheme = false) => {
      const baseExtensions = [
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        foldGutter(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap]),
        javascript(),
        EditorView.theme({ ".cm-content": { "font-size": "16px" } }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit("update:modelValue", update.state.doc.toString());
          }
        })
      ];
      if (darkTheme)
        baseExtensions.push(oneDark);
      return baseExtensions;
    };
    onMounted(() => {
      editorView = new EditorView({
        state: EditorState.create({
          doc: props.modelValue,
          extensions: buildExtensions(isDarkTheme.value)
        }),
        parent: editor.value
      });
    });
    watch(() => props.modelValue, (newValue) => {
      if (editorView) {
        const currentValue = editorView.state.doc.toString();
        if (newValue !== currentValue) {
          editorView.dispatch({
            changes: { from: 0, to: currentValue.length, insert: newValue }
          });
        }
      }
    });
    watch(isDarkTheme, (newValue) => {
      if (editorView) {
        const newState = EditorState.create({
          doc: editorView.state.doc.toString(),
          extensions: buildExtensions(newValue)
        });
        editorView.setState(newState);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d9dceeee><div class="flex justify-center items-center mb-2" data-v-d9dceeee><input type="checkbox" id="theme-toggle"${ssrIncludeBooleanAttr(Array.isArray(isDarkTheme.value) ? ssrLooseContain(isDarkTheme.value, null) : isDarkTheme.value) ? " checked" : ""} class="sr-only" data-v-d9dceeee><label for="theme-toggle" class="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-yellow-100 rounded-full border border-slate-400 cursor-pointer" data-v-d9dceeee>`);
      if (!isDarkTheme.value) {
        _push(`<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" data-v-d9dceeee><path class="fill-current text-slate-400" d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z" data-v-d9dceeee></path><path class="fill-current text-slate-500" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" data-v-d9dceeee></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" data-v-d9dceeee><path class="fill-current text-slate-400" d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z" data-v-d9dceeee></path><path class="fill-current text-slate-500" d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z" data-v-d9dceeee></path></svg>`);
      }
      _push(`</label></div><div class="code-editor" data-v-d9dceeee></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/CodeMirrorEditor/CodeMirrorEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CodeMirrorEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d9dceeee"]]);
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { props } = usePage();
    const fileContents = ref(props.fileContents);
    const selectedFile = ref("");
    const selectedGroup = ref(Object.keys(fileContents.value)[0]);
    const fileContent = ref("");
    const errorMessage = ref("");
    const selectFile = (fileName, group) => {
      selectedFile.value = fileName;
      selectedGroup.value = group;
      fileContent.value = fileContents.value[group][fileName];
      errorMessage.value = "";
    };
    const saveChanges = async () => {
      router.post(route("admin.components.save"), {
        fileName: selectedFile.value,
        fileContent: fileContent.value
      });
      errorMessage.value = "Не удалось сохранить изменения в файле";
      window.location.reload();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("componentEditorHeader")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("componentEditorHeader"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("componentEditorHeader")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("componentEditorHeader")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><span class="mb-4 py-1 px-3 w-full flex items-center justify-center text-sm italic font-semibold text-rose-400 bg-amber-50 opacity-80 border border-rose-200"${_scopeId}>${ssrInterpolate(unref(t)("componentEditorWarning"))}</span><ul class="flex items-center justify-center flex-row pb-4 text-sm overflow-x-auto flex-nowrap"${_scopeId}><!--[-->`);
            ssrRenderList(Object.keys(fileContents.value), (tab) => {
              _push2(`<li class="inline mr-1"${_scopeId}><a href="#" class="${ssrRenderClass({
                "block px-3 py-1 rounded-t-md bg-blue-600 text-white border border-gray-300 whitespace-nowrap": selectedGroup.value === tab,
                "block px-3 py-1 rounded-t-md bg-zinc-200 dark:bg-zinc-400 border border-zinc-500 text-black whitespace-nowrap": selectedGroup.value !== tab
              })}"${_scopeId}>${ssrInterpolate(tab)}</a></li>`);
            });
            _push2(`<!--]--></ul><div class="flex items-center justify-center flex-row flex-wrap pb-4"${_scopeId}><div class="flex items-center overflow-x-auto"${_scopeId}><!--[-->`);
            ssrRenderList(fileContents.value[selectedGroup.value], (content, fileName) => {
              _push2(`<a href="#" class="${ssrRenderClass({
                "block mr-1 px-3 py-1 text-sm border border-gray-500 rounded-sm hover:text-rose-700 dark:hover:text-red-300 hover:bg-teal-400 dark:hover:bg-teal-700": true,
                "bg-teal-600 text-white": selectedFile.value === fileName && selectedGroup.value === selectedGroup.value,
                "bg-slate-200 text-black dark:border-slate-400 dark:bg-slate-600 dark:text-slate-100": selectedFile.value !== fileName || selectedGroup.value !== selectedGroup.value
              })}"${_scopeId}>${ssrInterpolate(fileName)}</a>`);
            });
            _push2(`<!--]--></div></div>`);
            if (selectedFile.value) {
              _push2(`<div class="border border-gray-400 bg-slate-100 dark:bg-slate-200 overflow-hidden shadow-xl sm:rounded-lg p-4"${_scopeId}><h2 class="mb-1 font-semibold text-gray-900"${_scopeId}><span class="text-sm text-blue-500"${_scopeId}>${ssrInterpolate(unref(t)("editingFile"))}</span> ${ssrInterpolate(selectedFile.value)}</h2>`);
              _push2(ssrRenderComponent(CodeMirrorEditor, {
                modelValue: fileContent.value,
                "onUpdate:modelValue": ($event) => fileContent.value = $event,
                theme: "dark",
                class: "w-full h-auto"
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex justify-end mt-2"${_scopeId}><button class="flex items-center btn px-3 py-1 bg-teal-500 text-white text-md font-semibold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-teal-600 focus:bg-teal-600 focus:outline-none"${_scopeId}><svg class="w-4 h-4 fill-current text-slate-100 mr-1" viewBox="0 0 16 16"${_scopeId}><path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"${_scopeId}></path></svg> ${ssrInterpolate(unref(t)("save"))}</button></div>`);
              if (errorMessage.value) {
                _push2(`<div class="text-red-600 mt-2"${_scopeId}>${ssrInterpolate(errorMessage.value)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("span", { class: "mb-4 py-1 px-3 w-full flex items-center justify-center text-sm italic font-semibold text-rose-400 bg-amber-50 opacity-80 border border-rose-200" }, toDisplayString(unref(t)("componentEditorWarning")), 1),
                createVNode("ul", { class: "flex items-center justify-center flex-row pb-4 text-sm overflow-x-auto flex-nowrap" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(Object.keys(fileContents.value), (tab) => {
                    return openBlock(), createBlock("li", {
                      key: tab,
                      class: "inline mr-1"
                    }, [
                      createVNode("a", {
                        href: "#",
                        onClick: withModifiers(($event) => selectedGroup.value = tab, ["prevent"]),
                        class: {
                          "block px-3 py-1 rounded-t-md bg-blue-600 text-white border border-gray-300 whitespace-nowrap": selectedGroup.value === tab,
                          "block px-3 py-1 rounded-t-md bg-zinc-200 dark:bg-zinc-400 border border-zinc-500 text-black whitespace-nowrap": selectedGroup.value !== tab
                        }
                      }, toDisplayString(tab), 11, ["onClick"])
                    ]);
                  }), 128))
                ]),
                createVNode("div", { class: "flex items-center justify-center flex-row flex-wrap pb-4" }, [
                  createVNode("div", { class: "flex items-center overflow-x-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(fileContents.value[selectedGroup.value], (content, fileName) => {
                      return openBlock(), createBlock("a", {
                        key: fileName,
                        href: "#",
                        onClick: withModifiers(($event) => selectFile(fileName, selectedGroup.value), ["prevent"]),
                        class: {
                          "block mr-1 px-3 py-1 text-sm border border-gray-500 rounded-sm hover:text-rose-700 dark:hover:text-red-300 hover:bg-teal-400 dark:hover:bg-teal-700": true,
                          "bg-teal-600 text-white": selectedFile.value === fileName && selectedGroup.value === selectedGroup.value,
                          "bg-slate-200 text-black dark:border-slate-400 dark:bg-slate-600 dark:text-slate-100": selectedFile.value !== fileName || selectedGroup.value !== selectedGroup.value
                        }
                      }, toDisplayString(fileName), 11, ["onClick"]);
                    }), 128))
                  ])
                ]),
                selectedFile.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "border border-gray-400 bg-slate-100 dark:bg-slate-200 overflow-hidden shadow-xl sm:rounded-lg p-4"
                }, [
                  createVNode("h2", { class: "mb-1 font-semibold text-gray-900" }, [
                    createVNode("span", { class: "text-sm text-blue-500" }, toDisplayString(unref(t)("editingFile")), 1),
                    createTextVNode(" " + toDisplayString(selectedFile.value), 1)
                  ]),
                  createVNode(CodeMirrorEditor, {
                    modelValue: fileContent.value,
                    "onUpdate:modelValue": ($event) => fileContent.value = $event,
                    theme: "dark",
                    class: "w-full h-auto"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "flex justify-end mt-2" }, [
                    createVNode("button", {
                      onClick: saveChanges,
                      class: "flex items-center btn px-3 py-1 bg-teal-500 text-white text-md font-semibold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-teal-600 focus:bg-teal-600 focus:outline-none"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 fill-current text-slate-100 mr-1",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                      ])),
                      createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                    ])
                  ]),
                  errorMessage.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-red-600 mt-2"
                  }, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Components/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
