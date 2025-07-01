import { ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import _sfc_main$1 from "./CloseIconButton-BYqsdd_Q.js";
import _sfc_main$4 from "./LabelInput-BaQuE6Kg.js";
import _sfc_main$6 from "./InputText-C0W1G6RK.js";
import _sfc_main$7 from "./DescriptionTextarea-CkxBdvIU.js";
import _sfc_main$9 from "./CancelButton-NNew7dhD.js";
import _sfc_main$8 from "./PrimaryButton-ILA-nA-V.js";
import _sfc_main$3 from "./LabelCheckbox-CbOmZm7Q.js";
import _sfc_main$2 from "./ActivityCheckbox-g5mMgvhJ.js";
import _sfc_main$5 from "./InputNumber-CoBO-NzH.js";
const _sfc_main = {
  __name: "EditBlockModal",
  __ssrInlineRender: true,
  props: {
    block: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    pluginName: {
      type: String,
      required: true
    }
  },
  emits: ["close", "update"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const block = ref({ ...props.block });
    watch(() => props.block, (newBlock) => {
      block.value = { ...newBlock };
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 flex items-center justify-center z-50 overflow-y-auto custom-scrollbar" }, _attrs))}><div class="fixed inset-0 bg-black opacity-50"></div><div class="absolute w-full max-w-screen-2xl max-h-screen overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 custom-scrollbar">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          onClose: ($event) => emit("close")
        }, null, _parent));
        _push(`<h2 class="text-center text-lg font-bold mb-2 text-gray-600 dark:text-slate-100 tracking-wide">${ssrInterpolate(__props.isEdit ? "Редактировать блок" : "Создать блок")}</h2><form class="p-3 w-full"><div class="pb-12"><div class="mb-3 flex items-center"><div class="flex justify-between w-full"><div class="flex flex-row items-center">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: block.value.activity,
          "onUpdate:modelValue": ($event) => block.value.activity = $event
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          for: "activity",
          text: unref(t)("activity")
        }, null, _parent));
        _push(`</div></div><div class="flex flex-row items-center">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          for: "sort",
          value: unref(t)("sort"),
          class: "mr-3"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$5, {
          id: "sort",
          type: "number",
          modelValue: block.value.sort,
          "onUpdate:modelValue": ($event) => block.value.sort = $event,
          autocomplete: "sort"
        }, null, _parent));
        _push(`</div></div><div class="mb-3 flex flex-col items-start">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          for: "block.links",
          value: "Ссылка блока"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          id: "links",
          type: "text",
          modelValue: block.value.links,
          "onUpdate:modelValue": ($event) => block.value.links = $event,
          autocomplete: "links"
        }, null, _parent));
        _push(`</div><div class="mb-3 flex flex-col items-start">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          for: "svg_blocks",
          value: "SVG блока"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          modelValue: block.value.svg_blocks,
          "onUpdate:modelValue": ($event) => block.value.svg_blocks = $event,
          class: "w-full"
        }, null, _parent));
        _push(`</div><div class="mb-3 flex flex-col items-start">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          for: "title",
          value: "Текст заголовка"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          id: "title",
          type: "text",
          modelValue: block.value.title,
          "onUpdate:modelValue": ($event) => block.value.title = $event,
          autocomplete: "links"
        }, null, _parent));
        _push(`</div><div class="mb-3 flex flex-col items-start">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          for: "paragraph",
          value: "Текст параграфа"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          modelValue: block.value.paragraph,
          "onUpdate:modelValue": ($event) => block.value.paragraph = $event,
          class: "w-full"
        }, null, _parent));
        _push(`</div></div><div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 shadow-md z-20 w-full max-w-screen-2xl"><div class="flex justify-end">`);
        _push(ssrRenderComponent(_sfc_main$8, { type: "submit" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.isEdit ? "Сохранить" : "Создать")}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.isEdit ? "Сохранить" : "Создать"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$9, {
          onClick: ($event) => emit("close"),
          class: "ml-2"
        }, null, _parent));
        _push(`</div></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Part/EditBlockModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
