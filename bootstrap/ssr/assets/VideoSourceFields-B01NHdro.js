import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputText-D7S11vGR.js";
const _sfc_main = {
  __name: "VideoSourceFields",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      // Тип источника: 'youtube', 'vimeo', 'local', 'code'
      type: String,
      required: true
    },
    videoUrl: {
      // Для local и code – URL, если вводится вручную
      type: String,
      default: ""
    },
    externalVideoId: {
      // Для youtube/vimeo (ввод ссылки)
      type: String,
      default: ""
    },
    videoFile: {
      // Новый проп для файла локального видео
      type: Object,
      default: null
    },
    embedCode: { type: String, default: "" }
  },
  emits: [
    "update:modelValue",
    "update:videoUrl",
    "update:externalVideoId",
    "update:videoFile",
    "update:embedCode"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const extractYouTubeId = (url) => {
      const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    const extractVimeoId = (url) => {
      const regex = /vimeo\.com\/(?:video\/)?(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    const embedUrl = computed(() => {
      if (!props.externalVideoId)
        return "";
      if (props.modelValue === "youtube") {
        const id = extractYouTubeId(props.externalVideoId);
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
      if (props.modelValue === "vimeo") {
        const id = extractVimeoId(props.externalVideoId);
        return id ? `https://player.vimeo.com/video/${id}` : "";
      }
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.modelValue === "youtube" || __props.modelValue === "vimeo") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full mb-3" }, _attrs))}>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "external_video_url",
          value: unref(t)("externalVideoId")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "external_video_url",
          type: "text",
          modelValue: __props.externalVideoId,
          onInput: ($event) => _ctx.$emit("update:externalVideoId", $event.target.value),
          autocomplete: "external_video_url",
          placeholder: unref(t)("videoLinkInsert")
        }, null, _parent));
        if (embedUrl.value) {
          _push(`<div class="mt-2 text-sm text-green-700 dark:text-green-300">${ssrInterpolate(embedUrl.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (embedUrl.value) {
          _push(`<div class="relative pb-[56.25%] h-0 overflow-hidden bg-black mt-4"><iframe${ssrRenderAttr("src", embedUrl.value)} class="absolute top-0 left-0 w-full h-full border-0" allow="autoplay; fullscreen; picture-in-picture"></iframe></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (__props.modelValue === "local") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full mb-3" }, _attrs))}><div class="mb-3 flex flex-col">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "video_file",
          value: unref(t)("uploadVideo")
        }, null, _parent));
        _push(`<input id="video_file" type="file" class="bg-slate-100 dark:bg-slate-300 text-gray-900 dark:text-gray-700 px-3 py-0.5"></div><div class="mb-3 flex flex-col">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "video_url",
          value: unref(t)("videoUrl")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "video_url",
          type: "text",
          modelValue: __props.videoUrl,
          onInput: ($event) => _ctx.$emit("update:videoUrl", $event.target.value),
          autocomplete: "video_url",
          placeholder: "Введите URL локального видео (если требуется)"
        }, null, _parent));
        _push(`</div>`);
        if (props.videoUrl) {
          _push(`<div class="mt-2 flex justify-center"><video controls${ssrRenderAttr("src", props.videoUrl)} class="max-w-full rounded-sm shadow"></video></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (__props.modelValue === "code") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full mb-3" }, _attrs))}><div class="mb-3 flex flex-col">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "video_code",
          value: unref(t)("videoCode")
        }, null, _parent));
        _push(`<textarea class="h-80 form-textarea …"${ssrRenderAttr("placeholder", unref(t)("videoCodeInsert"))}>${ssrInterpolate(__props.embedCode)}</textarea></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Video/Upload/VideoSourceFields.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
