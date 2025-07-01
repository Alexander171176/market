import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$2 } from "./InputError-DYghIIUw.js";
const _sfc_main = {
  __name: "AvatarEditUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: File,
    currentAvatar: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const previewUrl = ref(null);
    watch(
      () => props.modelValue,
      (file) => {
        if (file instanceof File) {
          previewUrl.value = URL.createObjectURL(file);
        } else {
          previewUrl.value = null;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-3 flex flex-col items-start" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "avatar-upload",
        value: "Avatar"
      }, null, _parent));
      if (previewUrl.value) {
        _push(`<div class="mb-2"><img${ssrRenderAttr("src", previewUrl.value)} alt="Preview" class="w-32 h-32 object-cover rounded border border-gray-300 dark:border-gray-600"></div>`);
      } else if (__props.currentAvatar) {
        _push(`<div class="mb-2"><img${ssrRenderAttr("src", `/storage/${__props.currentAvatar}`)} alt="Current Avatar" class="w-32 h-32 object-cover rounded border border-gray-300 dark:border-gray-600"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input id="avatar-upload" type="file" accept="image/png" class="mt-1 text-sm text-gray-700 dark:text-gray-300">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "mt-2",
        message: __props.error
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Athlete/Avatar/AvatarEditUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
