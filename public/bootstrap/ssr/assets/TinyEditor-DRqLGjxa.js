import { a as __vite_glob_0_2, b as __vite_glob_0_1, c as __vite_glob_0_0 } from "./LocaleSelectOption-D2q2yRl9.js";
import { ref, onMounted, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext, watch, onBeforeUnmount } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$2 } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$3 } from "./InputError-DYghIIUw.js";
const _sfc_main$1 = {
  __name: "SelectLocale",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    // Двустороннее связывание данных
    errorMessage: String
    // Сообщение об ошибке
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const localeModules = /* @__PURE__ */ Object.assign({ "../../../locales/en.js": __vite_glob_0_0, "../../../locales/kk.js": __vite_glob_0_1, "../../../locales/ru.js": __vite_glob_0_2 });
    const locales = ref(
      Object.keys(localeModules).map((file) => {
        const match = file.match(/\/([a-z]{2})\.js$/i);
        if (match) {
          const code = match[1];
          return { label: code.toUpperCase(), value: code };
        }
        return null;
      }).filter((locale) => locale !== null)
    );
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row items-center gap-2 w-auto" }, _attrs))}><div class="h-8 flex items-center justify-between w-full">`);
      _push(ssrRenderComponent(_sfc_main$2, { for: "locale" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm text-red-500 dark:text-red-300 font-semibold"${_scopeId}>*</span> ${ssrInterpolate(unref(t)("localization"))}`);
          } else {
            return [
              createVNode("span", { class: "text-sm text-red-500 dark:text-red-300 font-semibold" }, "*"),
              createTextVNode(" " + toDisplayString(unref(t)("localization")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><select id="locale"${ssrRenderAttr("value", __props.modelValue)} class="block w-full py-0.5 border-slate-500 font-semibold text-sm focus:border-indigo-500 focus:ring-indigo-300 rounded-sm shadow-sm dark:bg-cyan-800 dark:text-slate-100"><option value="" disabled>${ssrInterpolate(unref(t)("selectLocale"))}</option><!--[-->`);
      ssrRenderList(locales.value, (locale) => {
        _push(`<option${ssrRenderAttr("value", locale.value)}>${ssrInterpolate(locale.label)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2 lg:mt-0",
        message: __props.errorMessage
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Select/SelectLocale.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "TinyEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    height: { type: Number, default: 300 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const editorId = `editor-${Math.random().toString(36).substr(2, 9)}`;
    const isDarkTheme = ref(document.documentElement.classList.contains("dark"));
    const editorInstance = ref(null);
    const isInitialized = ref(false);
    const applyContainerHeight = (heightValue) => {
      requestAnimationFrame(() => {
        if (editorInstance.value && editorInstance.value.getContainer()) {
          const container = editorInstance.value.getContainer();
          if (container && heightValue) {
            container.style.height = `${heightValue}px`;
            container.style.minHeight = `${heightValue}px`;
          }
        }
      });
    };
    const getEditorConfig = () => ({
      selector: `#${editorId}`,
      min_height: props.height,
      // Используем как min_height для области текста
      resize: false,
      // Запрещаем ресайз пользователем (autoresize сделает свое дело)
      menubar: true,
      plugins: `accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount`,
      toolbar: `undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | link image media | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code preview fullscreen`,
      skin_url: isDarkTheme.value ? "/tinymce/skins/ui/oxide-dark" : "/tinymce/skins/ui/oxide",
      content_css: isDarkTheme.value ? "/tinymce/skins/content/dark/content.min.css" : "/tinymce/skins/content/default/content.min.css",
      language_url: "/tinymce/langs/ru.js",
      language: "ru",
      branding: false,
      license_key: "gpl",
      setup(editor) {
        editorInstance.value = editor;
        editor.on("init", (e) => {
          isInitialized.value = true;
          editor.setContent(props.modelValue || "");
          applyContainerHeight(props.height);
        });
        editor.on("change input", () => {
          const newContent = editor.getContent();
          if (props.modelValue !== newContent) {
            emit("update:modelValue", newContent);
          }
        });
        editor.on("blur", () => {
          const newContent = editor.getContent();
          if (props.modelValue !== newContent) {
            emit("update:modelValue", newContent);
          }
        });
      }
    });
    const initEditor = () => {
      if (!window.tinymce) {
        return;
      }
      const existingEditor = window.tinymce.get(editorId);
      if (existingEditor) {
        existingEditor.destroy();
        editorInstance.value = null;
        isInitialized.value = false;
      }
      window.tinymce.init(getEditorConfig());
    };
    const toggleTheme = () => {
      const currentContent = editorInstance.value ? editorInstance.value.getContent() : props.modelValue;
      isDarkTheme.value = !isDarkTheme.value;
      initEditor();
      setTimeout(() => {
        if (editorInstance.value && isInitialized.value) {
          if (editorInstance.value.getContent() !== (currentContent || "")) {
            editorInstance.value.setContent(currentContent || "");
          }
        }
      }, 150);
    };
    watch(() => props.modelValue, (newValue, oldValue) => {
      if (editorInstance.value && isInitialized.value && newValue !== oldValue && editorInstance.value.getContent() !== newValue) {
        editorInstance.value.setContent(newValue || "");
      }
    });
    watch(() => props.height, (newHeight) => {
      if (isInitialized.value) {
        applyContainerHeight(newHeight);
      }
    });
    let observer = null;
    const checkSystemTheme = () => {
      const systemIsDark = document.documentElement.classList.contains("dark");
      if (systemIsDark !== isDarkTheme.value) {
        toggleTheme();
      }
    };
    onMounted(() => {
      initEditor();
      observer = new MutationObserver(checkSystemTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
    });
    onBeforeUnmount(() => {
      var _a;
      const editor = (_a = window.tinymce) == null ? void 0 : _a.get(editorId);
      if (editor) {
        editor.destroy();
        editorInstance.value = null;
      }
      if (observer) {
        observer.disconnect();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row justify-between items-start" }, _attrs))}><div class="flex-grow"><textarea${ssrRenderAttr("id", editorId)}>${ssrInterpolate(props.modelValue)}</textarea></div><button type="button"${ssrRenderAttr("title", unref(t)("changeEditorTheme"))} class="flex items-center justify-center ml-2 w-6 h-6 flex-shrink-0 rounded-full &lt;!-- flex-shrink-0 чтобы кнопка не сжималась --&gt; bg-slate-100 dark:bg-slate-900 hover:bg-yellow-100 dark:hover:bg-slate-600/80 transition-colors">`);
      if (!isDarkTheme.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" width="16" height="16"><path class="fill-current text-red-400 dark:text-yellow-200" d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"></path><path class="fill-current text-red-400 dark:text-yellow-200" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" width="16" height="16"><path class="fill-current text-slate-900 dark:text-white" d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"></path><path class="fill-current text-slate-900 dark:text-white" d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"></path></svg>`);
      }
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/TinyEditor/TinyEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
