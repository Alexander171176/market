import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const dictionary = {
  "а": "a",
  "ә": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "ғ": "gh",
  "д": "d",
  "е": "e",
  "ё": "e",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "й": "y",
  "к": "k",
  "қ": "q",
  "л": "l",
  "м": "m",
  "н": "n",
  "ң": "ng",
  "о": "o",
  "ө": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ұ": "u",
  "ү": "u",
  "ф": "f",
  "х": "kh",
  "һ": "h",
  "ц": "ts",
  "ч": "ch",
  "ш": "sh",
  "щ": "shch",
  "ы": "y",
  "і": "i",
  "э": "e",
  "ю": "yu",
  "я": "ya",
  "ь": "",
  "ъ": "",
  " ": "-"
};
const transliterate = (text) => {
  return text.toLowerCase().split("").map((char) => dictionary[char] || char).join("").replace(/-+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
};
const _sfc_main = {
  __name: "MetatagsButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    const isPressed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["flex items-center btn px-2 py-0.5 bg-green-300 rounded-sm shadow-md text-slate-600 text-sm font-semibold transition-colors duration-300 ease-in-out hover:text-slate-700 focus:text-slate-700 hover:bg-green-400 focus:bg-green-400 focus:outline-none", { "ring-2 ring-green-400 ring-offset-2 ring-offset-white": isPressed.value }]
      }, _attrs))}><span>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
        _push(`<svg class="w-4 h-4 fill-current text-slate-600 shrink-0 mr-2" viewBox="0 0 16 16"><path d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"></path></svg>`);
      }, _push, _parent);
      _push(`</span><span class="hidden xs:block ml-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Buttons/MetatagsButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  transliterate as t
};
