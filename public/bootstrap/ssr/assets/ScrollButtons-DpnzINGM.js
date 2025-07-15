import { ref, onMounted, onUnmounted, computed, mergeProps, unref, useSSRContext, withCtx, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$3 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: Array,
      default: () => ["py-1", "bg-white"]
    }
  },
  setup(__props) {
    const props = __props;
    let open = ref(false);
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      }
      if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      }
      return "origin-top";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        unref(open) ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "w-60 dark:bg-slate-900 dark:border dark:border-gray-100 rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: String,
    as: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.as == "button") {
        _push(`<button type="submit" class="block w-full px-4 py-2 text-start text-md leading-5 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:text-slate-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      } else if (__props.as == "a") {
        _push(`<a${ssrRenderAttr("href", __props.href)} class="block w-full px-4 py-2 text-md leading-5 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:text-slate-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</a>`);
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "block w-full px-4 py-2 text-md leading-5 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:text-slate-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DigitalClock",
  __ssrInlineRender: true,
  setup(__props) {
    const time = ref("");
    const date = ref("");
    const week = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const updateTime = () => {
      const cd = /* @__PURE__ */ new Date();
      time.value = zeroPadding(cd.getHours(), 2) + ":" + zeroPadding(cd.getMinutes(), 2) + ":" + zeroPadding(cd.getSeconds(), 2);
      date.value = zeroPadding(cd.getFullYear(), 4) + "-" + zeroPadding(cd.getMonth() + 1, 2) + "-" + zeroPadding(cd.getDate(), 2) + " " + week[cd.getDay()];
    };
    const zeroPadding = (num, digit) => {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    };
    let timerID;
    onMounted(() => {
      updateTime();
      timerID = setInterval(updateTime, 1e3);
    });
    onUnmounted(() => {
      clearInterval(timerID);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "clock",
        class: "relative h-fit px-1 ml-1 hidden lg:block rounded bg-slate-200 dark:bg-slate-700 border border-slate-400 transform -text-center font-mono font-semibold"
      }, _attrs))} data-v-29ca3c54><p data-v-29ca3c54><span class="date text-lg mr-2 text-teal-500 dark:text-cyan-100" data-v-29ca3c54>${ssrInterpolate(date.value)}</span><span class="time text-xl text-center text-slate-500 dark:text-cyan-100" data-v-29ca3c54>${ssrInterpolate(time.value)}</span></p></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/CurrentTime/DigitalClock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DigitalClock = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-29ca3c54"]]);
const _sfc_main = {
  __name: "ScrollButtons",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollContainer = ref(null);
    const showScrollToTop = ref(false);
    const showScrollToBottom = ref(true);
    let scrollInterval = null;
    const findScrollContainer = () => {
      let parent = document.querySelector("main");
      while (parent && getComputedStyle(parent).overflowY !== "auto") {
        parent = parent.parentElement;
      }
      return parent;
    };
    const handleScroll = () => {
      if (scrollContainer.value) {
        const scrollTop = scrollContainer.value.scrollTop;
        const scrollHeight = scrollContainer.value.scrollHeight;
        const clientHeight = scrollContainer.value.clientHeight;
        showScrollToTop.value = scrollTop > 0;
        showScrollToBottom.value = scrollTop + clientHeight < scrollHeight;
      }
    };
    onMounted(() => {
      scrollContainer.value = findScrollContainer();
      if (scrollContainer.value) {
        scrollContainer.value.addEventListener("scroll", handleScroll);
        handleScroll();
      }
    });
    onUnmounted(() => {
      if (scrollContainer.value) {
        scrollContainer.value.removeEventListener("scroll", handleScroll);
      }
      clearInterval(scrollInterval);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-5 bottom-16 flex flex-col space-y-2 z-50" }, _attrs))} data-v-e099f145><button style="${ssrRenderStyle(showScrollToTop.value ? null : { display: "none" })}" class="scroll-button" data-v-e099f145> ↑ </button><button style="${ssrRenderStyle(showScrollToBottom.value ? null : { display: "none" })}" class="scroll-button" data-v-e099f145> ↓ </button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Scroll/ScrollButtons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ScrollButtons = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e099f145"]]);
export {
  DigitalClock as D,
  ScrollButtons as S,
  _sfc_main$3 as _,
  _sfc_main$2 as a
};
