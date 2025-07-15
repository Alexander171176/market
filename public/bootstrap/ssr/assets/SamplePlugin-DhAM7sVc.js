import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "SamplePlugin",
  __ssrInlineRender: true,
  props: {
    id: {
      type: Number,
      required: true
    },
    blocks: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const selectedBlock = computed(() => {
      const activeBlocks = props.blocks.filter((block2) => block2.activity);
      const block = activeBlocks.find((block2) => block2.id === props.id);
      return block || null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (selectedBlock.value) {
        _push(`<a${ssrRenderAttrs(mergeProps({
          href: selectedBlock.value.links,
          class: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
        }, _attrs))}><div><div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">${selectedBlock.value.svg_blocks ?? ""}</div><h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(selectedBlock.value.title)}</h2><p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">${ssrInterpolate(selectedBlock.value.paragraph)}</p></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Public/SamplePlugin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
