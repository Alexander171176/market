import { ref, watch, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import draggable from "vuedraggable";
import { _ as _sfc_main$1 } from "./InputText-D7S11vGR.js";
const _sfc_main = {
  __name: "MultiImageEdit",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:images", "delete-image"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const localImages = ref([]);
    watch(
      () => props.images,
      (newImages) => {
        localImages.value = newImages.map((img) => ({
          id: img.id,
          order: img.order || 0,
          url: img.url,
          // ожидаем, что URL уже вычислен в родителе
          alt: img.alt || "",
          caption: img.caption || ""
        })).sort((a, b) => a.order - b.order);
      },
      { immediate: true }
    );
    const updateImages = () => {
      emit("update:images", localImages.value);
    };
    const updateOrder = () => {
      localImages.value.forEach((image, index) => {
        image.order = index + 1;
      });
      updateImages();
    };
    const removeImage = (index) => {
      const removedImage = localImages.value[index];
      emit("delete-image", removedImage.id);
      localImages.value.splice(index, 1);
      updateOrder();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "multi-image-edit" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: unref(t)("editImages")
      }, null, _parent));
      if (localImages.value.length) {
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: localImages.value,
          "onUpdate:modelValue": ($event) => localImages.value = $event,
          group: "images",
          "item-key": "id",
          onEnd: updateOrder,
          class: "grid grid-cols-4 gap-4"
        }, {
          item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative border border-slate-500 rounded-sm py-0.5 px-2"${_scopeId}><img${ssrRenderAttr("src", element.url)} alt="Existing Image" class="h-40 w-full object-cover"${_scopeId}><input${ssrRenderAttr("value", element.order)}${ssrRenderAttr("placeholder", unref(t)("sort"))} class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"${_scopeId}><input${ssrRenderAttr("value", element.alt)}${ssrRenderAttr("placeholder", unref(t)("seoAltImage"))} class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"${_scopeId}><input${ssrRenderAttr("value", element.caption)}${ssrRenderAttr("placeholder", unref(t)("seoTitleImage"))} class="w-full mb-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"${_scopeId}><button type="button" class="absolute top-2 right-2 bg-rose-500 hover:bg-rose-700 text-white rounded-sm p-1"${_scopeId}><svg class="w-4 h-4 fill-current opacity-80" viewBox="0 0 16 16"${_scopeId}><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"${_scopeId}></path></svg></button></div>`);
            } else {
              return [
                createVNode("div", { class: "relative border border-slate-500 rounded-sm py-0.5 px-2" }, [
                  createVNode("img", {
                    src: element.url,
                    alt: "Existing Image",
                    class: "h-40 w-full object-cover"
                  }, null, 8, ["src"]),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => element.order = $event,
                    onInput: updateImages,
                    placeholder: unref(t)("sort"),
                    class: "w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                  }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, element.order]
                  ]),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => element.alt = $event,
                    onInput: updateImages,
                    placeholder: unref(t)("seoAltImage"),
                    class: "w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                  }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, element.alt]
                  ]),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => element.caption = $event,
                    onInput: updateImages,
                    placeholder: unref(t)("seoTitleImage"),
                    class: "w-full mb-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                  }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, element.caption]
                  ]),
                  createVNode("button", {
                    type: "button",
                    onClick: ($event) => removeImage(index),
                    class: "absolute top-2 right-2 bg-rose-500 hover:bg-rose-700 text-white rounded-sm p-1"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current opacity-80",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" })
                    ]))
                  ], 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><p>${ssrInterpolate(unref(t)("noData"))}</p></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Image/MultiImageEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
