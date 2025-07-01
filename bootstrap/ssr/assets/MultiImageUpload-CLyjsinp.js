import { ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputText-D7S11vGR.js";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "MultiImageUpload",
  __ssrInlineRender: true,
  props: {
    existingImages: {
      type: Array,
      default: () => []
      // ✅ Поддержка существующих изображений
    }
  },
  emits: ["update:images"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const previewImages = ref([]);
    const props = __props;
    watch(() => props.existingImages, (newImages) => {
      previewImages.value = newImages.map((img) => ({
        id: img.id,
        order: img.order || 0,
        url: `/storage/article_images/${img.path}`,
        alt: img.alt || "",
        caption: img.caption || ""
      }));
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "multi-image-upload" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: unref(t)("uploadNewImages")
      }, null, _parent));
      _push(`<input type="file" multiple accept="image/*" class="block w-full text-md text-gray-700 dark:text-gray-100 file:mr-4 file:py-0.5 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700">`);
      if (previewImages.value.length) {
        _push(`<div class="mt-4 grid grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(previewImages.value, (image, index) => {
          _push(`<div class="relative border border-slate-500 rounded-sm py-0.5 px-2"><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", unref(t)("view"))} class="h-40 w-full object-cover"><input${ssrRenderAttr("value", image.order)}${ssrRenderAttr("placeholder", unref(t)("sort"))} class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"><input${ssrRenderAttr("value", image.alt)}${ssrRenderAttr("placeholder", unref(t)("seoAltImage"))} class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"><input${ssrRenderAttr("value", image.caption)}${ssrRenderAttr("placeholder", unref(t)("seoTitleImage"))} class="w-full mb-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"><button${ssrRenderAttr("title", unref(t)("delete"))} class="absolute top-0 right-0 bg-rose-500 hover:bg-rose-700 text-white rounded-sm p-1"><svg class="w-4 h-4 shrink-0 fill-current opacity-80" viewBox="0 0 16 16"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"></path></svg></button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Image/MultiImageUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
