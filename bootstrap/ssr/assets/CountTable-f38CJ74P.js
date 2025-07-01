import { watch, onMounted, onUnmounted, computed, unref, useSSRContext, mergeProps } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
const _sfc_main$2 = {
  __name: "DangerModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
    },
    onCancel: {
      type: Function,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-slate-800 opacity-25"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([maxWidthClass.value, "mb-6 bg-white dark:bg-slate-300 rounded overflow-hidden shadow transform transition-all max-w-lg w-full max-h-full sm:w-full sm:mx-auto"])}"><div class="p-5 flex justify-center space-x-4"><div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100"><svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"></path></svg></div><div><div class="mb-2 mt-2"><div class="text-md font-semibold text-slate-800">${ssrInterpolate(unref(t)("confirmDeleteMessage"))}</div></div><div class="mb-10"><div class="space-y-2"><p class="font-semibold text-sm text-rose-400">${ssrInterpolate(unref(t)("confirmDeleteWarning"))}</p></div></div><div class="flex flex-wrap justify-end space-x-2"><button class="flex items-center px-2 py-0.5 bg-sky-600 text-white rounded-sm shadow-md transition-colors duration-300 ease-in-out hover:bg-sky-700 focus:bg-sky-700 focus:outline-none"><svg class="w-4 h-4 fill-current"><path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path></svg><span class="ml-1">${ssrInterpolate(unref(t)("cancel"))}</span></button><button class="flex items-center px-2 py-0.5 bg-rose-500 text-white rounded-sm shadow-md transition-colors duration-300 ease-in-out hover:bg-rose-700 focus:bg-rose-700 focus:outline-none"><svg class="w-4 h-4 fill-current"><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"></path></svg><span class="ml-1">${ssrInterpolate(unref(t)("yesDelete"))}</span></button></div></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Modal/DangerModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteIconButton",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const { t } = useI18n();
    const buttonClass = computed(() => [
      "flex items-center py-2 px-2 rounded",
      "border border-slate-300",
      "hover:border-rose-500",
      "dark:border-rose-300 dark:hover:border-rose-100"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: buttonClass.value,
        title: unref(t)("delete")
      }, _attrs))}><svg class="w-4 h-4 fill-current text-rose-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-100 shrink-0" viewBox="0 0 16 16"><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"></path></svg></button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/DeleteIconButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "CountTable",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-1 text-right" }, _attrs))}><h2 class="text-sm font-semibold text-slate-800 dark:text-slate-100">${ssrInterpolate(unref(t)("total"))} <span class="text-blue-500 dark:text-blue-200 font-medium">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></h2></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Count/CountTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  _sfc_main$2 as b
};
