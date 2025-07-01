import { computed, onMounted, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$6, a as _sfc_main$8, b as _sfc_main$f } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$5 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$b } from "./MetaDescTextarea-HG5ywHg1.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$7 } from "./InputNumber-CmHSfZTP.js";
import "./CKEditor-4uxDKYle.js";
import { _ as _sfc_main$4, a as _sfc_main$a } from "./TinyEditor-DRqLGjxa.js";
import { _ as _sfc_main$e } from "./MultiImageUpload-CLyjsinp.js";
import { _ as _sfc_main$d } from "./MultiImageEdit-DdDeFkMb.js";
import { _ as _sfc_main$c } from "./AvatarEditUpload-CHWdlQpM.js";
import { _ as _sfc_main$9 } from "./StanceSelect-B9cbOxcr.js";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "axios";
import "vuedraggable";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
import "@mayasabha/ckeditor4-vue3";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    athlete: { type: Object, required: true }
  },
  setup(__props) {
    const toast = useToast();
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      sort: props.athlete.sort ?? 0,
      locale: props.athlete.locale ?? "",
      nickname: props.athlete.nickname ?? "",
      first_name: props.athlete.first_name ?? "",
      last_name: props.athlete.last_name ?? "",
      date_of_birth: props.athlete.date_of_birth ?? "",
      nationality: props.athlete.nationality ?? "",
      height_cm: props.athlete.height_cm ?? 0,
      reach_cm: props.athlete.reach_cm ?? 0,
      stance: props.athlete.stance ?? null,
      bio: props.athlete.bio ?? "",
      short: props.athlete.short ?? "",
      description: props.athlete.description ?? "",
      wins: props.athlete.wins ?? 0,
      losses: props.athlete.losses ?? 0,
      draws: props.athlete.draws ?? 0,
      no_contests: props.athlete.no_contests ?? 0,
      wins_by_ko: props.athlete.wins_by_ko ?? 0,
      wins_by_submission: props.athlete.wins_by_submission ?? 0,
      wins_by_decision: props.athlete.wins_by_decision ?? 0,
      activity: Boolean(props.athlete.activity),
      avatar: null,
      deletedImages: []
      // массив для хранения ID удалённых изображений
    });
    computed(() => {
      return props.athlete.avatar ? `/storage/${props.athlete.avatar}` : null;
    });
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime()))
        return "";
      return date.toISOString().split("T")[0];
    };
    onMounted(() => {
      if (form.date_of_birth) {
        form.date_of_birth = formatDate(form.date_of_birth);
      }
    });
    const existingImages = ref(
      (props.athlete.images || []).filter((img) => img.url).map((img) => ({
        id: img.id,
        // Если есть WebP-версия, используем её, иначе — оригинальный URL
        url: img.webp_url || img.url,
        order: img.order || 0,
        alt: img.alt || "",
        caption: img.caption || ""
      }))
    );
    const newImages = ref([]);
    const handleExistingImagesUpdate = (images) => {
      existingImages.value = images;
    };
    const handleDeleteExistingImage = (deletedId) => {
      if (!form.deletedImages.includes(deletedId)) {
        form.deletedImages.push(deletedId);
      }
      existingImages.value = existingImages.value.filter((img) => img.id !== deletedId);
    };
    const handleNewImagesUpdate = (images) => {
      newImages.value = images;
    };
    const submit = () => {
      form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        images: [
          ...newImages.value.map((img) => ({
            file: img.file,
            order: img.order,
            alt: img.alt,
            caption: img.caption
          })),
          ...existingImages.value.map((img) => ({
            id: img.id,
            order: img.order,
            alt: img.alt,
            caption: img.caption
          }))
        ],
        deletedImages: form.deletedImages
      }));
      form.post(route("admin.athletes.update", props.athlete.id), {
        forceFormData: true,
        errorBag: "editAthlete",
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Спортсмен успешно обновлён!");
        },
        onError: (errors) => {
          console.error("❌ Ошибки валидации:", errors);
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editAthlete")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editAthlete"))} ID:${ssrInterpolate(props.athlete.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editAthlete")) + " ID:" + toDisplayString(props.athlete.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editAthlete")) + " ID:" + toDisplayString(props.athlete.id), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.athletes.index")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><form enctype="multipart/form-data" class="p-3 w-full"${_scopeId}><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).activity,
              "onUpdate:modelValue": ($event) => unref(form).activity = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "activity",
              text: unref(t)("activity"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2 w-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              modelValue: unref(form).locale,
              "onUpdate:modelValue": ($event) => unref(form).locale = $event,
              errorMessage: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "sort",
              value: unref(t)("sort"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "sort",
              type: "number",
              modelValue: unref(form).sort,
              "onUpdate:modelValue": ($event) => unref(form).sort = $event,
              autocomplete: "sort",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.sort
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "nickname" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("nickname"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("nickname")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).nickname.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "nickname",
              type: "text",
              modelValue: unref(form).nickname,
              "onUpdate:modelValue": ($event) => unref(form).nickname = $event,
              maxlength: "100",
              required: "",
              autocomplete: "nickname"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.nickname
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "first_name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("name"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("name")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).first_name.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "first_name",
              type: "text",
              modelValue: unref(form).first_name,
              "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
              maxlength: "100",
              required: "",
              autocomplete: "first_name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.first_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "last_name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("lastName"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("lastName")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).last_name.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "last_name",
              type: "text",
              modelValue: unref(form).last_name,
              "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
              maxlength: "100",
              required: "",
              autocomplete: "last_name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.last_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="mt-3 flex flex-col items-start w-full"${_scopeId}><div class="flex justify-start w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "date_of_birth",
              value: unref(t)("dateBirth"),
              class: "mb-1 lg:mb-0 lg:mr-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "date_of_birth",
              type: "date",
              modelValue: unref(form).date_of_birth,
              "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
              autocomplete: "date_of_birth",
              class: "w-full max-w-56"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-1 sm:mt-0",
              message: unref(form).errors.date_of_birth
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row items-center justify-end w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "nationality",
              class: "mt-4 mr-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("country"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("country")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-3 flex flex-col items-end w-96"${_scopeId}><div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).nationality.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "nationality",
              type: "text",
              modelValue: unref(form).nationality,
              "onUpdate:modelValue": ($event) => unref(form).nationality = $event,
              maxlength: "100",
              required: "",
              autocomplete: "nationality"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.nationality
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              modelValue: unref(form).stance,
              "onUpdate:modelValue": ($event) => unref(form).stance = $event,
              error: unref(form).errors.stance,
              class: "mt-3"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "height_cm",
              value: unref(t)("cmHeight"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "height_cm",
              type: "number",
              modelValue: unref(form).height_cm,
              "onUpdate:modelValue": ($event) => unref(form).height_cm = $event,
              autocomplete: "height_cm",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.height_cm
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "reach_cm",
              value: unref(t)("cmReach"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "reach_cm",
              type: "number",
              modelValue: unref(form).reach_cm,
              "onUpdate:modelValue": ($event) => unref(form).reach_cm = $event,
              autocomplete: "reach_cm",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.reach_cm
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "losses",
              value: unref(t)("losses"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "losses",
              type: "number",
              modelValue: unref(form).losses,
              "onUpdate:modelValue": ($event) => unref(form).losses = $event,
              autocomplete: "losses",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.losses
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "draws",
              value: unref(t)("draws"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "draws",
              type: "number",
              modelValue: unref(form).draws,
              "onUpdate:modelValue": ($event) => unref(form).draws = $event,
              autocomplete: "draws",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.draws
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "wins",
              value: unref(t)("wins"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "wins",
              type: "number",
              modelValue: unref(form).wins,
              "onUpdate:modelValue": ($event) => unref(form).wins = $event,
              autocomplete: "wins",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.wins
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "wins_by_ko",
              value: unref(t)("winsByKo"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "wins_by_ko",
              type: "number",
              modelValue: unref(form).wins_by_ko,
              "onUpdate:modelValue": ($event) => unref(form).wins_by_ko = $event,
              autocomplete: "wins_by_ko",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.wins_by_ko
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "wins_by_submission",
              value: unref(t)("winsBySubmission"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "wins_by_submission",
              type: "number",
              modelValue: unref(form).wins_by_submission,
              "onUpdate:modelValue": ($event) => unref(form).wins_by_submission = $event,
              autocomplete: "wins_by_submission",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.wins_by_submission
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "wins_by_decision",
              value: unref(t)("winsByDecision"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "wins_by_decision",
              type: "number",
              modelValue: unref(form).wins_by_decision,
              "onUpdate:modelValue": ($event) => unref(form).wins_by_decision = $event,
              autocomplete: "wins_by_decision",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.wins_by_decision
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "no_contests",
              value: unref(t)("noContests"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "no_contests",
              type: "number",
              modelValue: unref(form).no_contests,
              "onUpdate:modelValue": ($event) => unref(form).no_contests = $event,
              autocomplete: "no_contests",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.no_contests
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "bio",
              value: unref(t)("bio"),
              class: "w-full flex justify-center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).bio,
              "onUpdate:modelValue": ($event) => unref(form).bio = $event,
              height: 500
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.bio
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "short",
              value: unref(t)("shortDescription")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).short.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              modelValue: unref(form).short,
              "onUpdate:modelValue": ($event) => unref(form).short = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.short
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "description",
              value: unref(t)("description")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              height: 500
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              modelValue: unref(form).avatar,
              "onUpdate:modelValue": ($event) => unref(form).avatar = $event,
              "current-avatar": props.athlete.avatar,
              error: unref(form).errors.avatar
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$d, {
              images: existingImages.value,
              "onUpdate:images": handleExistingImagesUpdate,
              onDeleteImage: handleDeleteExistingImage
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, { "onUpdate:images": handleNewImagesUpdate }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.athletes.index"),
              class: "mb-3"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$f, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16"${_scopeId2}><path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("save"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.athletes.index")
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                          viewBox: "0 0 16 16"
                        }, [
                          createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2" })
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    enctype: "multipart/form-data",
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).activity,
                          "onUpdate:modelValue": ($event) => unref(form).activity = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          for: "activity",
                          text: unref(t)("activity"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2 w-auto" }, [
                        createVNode(_sfc_main$4, {
                          modelValue: unref(form).locale,
                          "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                          errorMessage: unref(form).errors.locale
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "errorMessage"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.locale
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "sort",
                            value: unref(t)("sort"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "sort",
                          type: "number",
                          modelValue: unref(form).sort,
                          "onUpdate:modelValue": ($event) => unref(form).sort = $event,
                          autocomplete: "sort",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.sort
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, { for: "nickname" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("nickname")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).nickname.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$8, {
                        id: "nickname",
                        type: "text",
                        modelValue: unref(form).nickname,
                        "onUpdate:modelValue": ($event) => unref(form).nickname = $event,
                        maxlength: "100",
                        required: "",
                        autocomplete: "nickname"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.nickname
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, { for: "first_name" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                            createTextVNode(" " + toDisplayString(unref(t)("name")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).first_name.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$8, {
                        id: "first_name",
                        type: "text",
                        modelValue: unref(form).first_name,
                        "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                        maxlength: "100",
                        required: "",
                        autocomplete: "first_name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.first_name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, { for: "last_name" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                            createTextVNode(" " + toDisplayString(unref(t)("lastName")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).last_name.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$8, {
                        id: "last_name",
                        type: "text",
                        modelValue: unref(form).last_name,
                        "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                        maxlength: "100",
                        required: "",
                        autocomplete: "last_name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.last_name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "mt-3 flex flex-col items-start w-full" }, [
                        createVNode("div", { class: "flex justify-start w-full" }, [
                          createVNode(_sfc_main$6, {
                            for: "date_of_birth",
                            value: unref(t)("dateBirth"),
                            class: "mb-1 lg:mb-0 lg:mr-2"
                          }, null, 8, ["value"]),
                          createVNode(_sfc_main$8, {
                            id: "date_of_birth",
                            type: "date",
                            modelValue: unref(form).date_of_birth,
                            "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
                            autocomplete: "date_of_birth",
                            class: "w-full max-w-56"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            class: "mt-1 sm:mt-0",
                            message: unref(form).errors.date_of_birth
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center justify-end w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "nationality",
                          class: "mt-4 mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("country")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mb-3 flex flex-col items-end w-96" }, [
                          createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).nationality.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1),
                          createVNode(_sfc_main$8, {
                            id: "nationality",
                            type: "text",
                            modelValue: unref(form).nationality,
                            "onUpdate:modelValue": ($event) => unref(form).nationality = $event,
                            maxlength: "100",
                            required: "",
                            autocomplete: "nationality"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            class: "mt-2",
                            message: unref(form).errors.nationality
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode(_sfc_main$9, {
                        modelValue: unref(form).stance,
                        "onUpdate:modelValue": ($event) => unref(form).stance = $event,
                        error: unref(form).errors.stance,
                        class: "mt-3"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "height_cm",
                            value: unref(t)("cmHeight"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "height_cm",
                          type: "number",
                          modelValue: unref(form).height_cm,
                          "onUpdate:modelValue": ($event) => unref(form).height_cm = $event,
                          autocomplete: "height_cm",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.height_cm
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "reach_cm",
                            value: unref(t)("cmReach"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "reach_cm",
                          type: "number",
                          modelValue: unref(form).reach_cm,
                          "onUpdate:modelValue": ($event) => unref(form).reach_cm = $event,
                          autocomplete: "reach_cm",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.reach_cm
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "losses",
                            value: unref(t)("losses"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "losses",
                          type: "number",
                          modelValue: unref(form).losses,
                          "onUpdate:modelValue": ($event) => unref(form).losses = $event,
                          autocomplete: "losses",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.losses
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "draws",
                            value: unref(t)("draws"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "draws",
                          type: "number",
                          modelValue: unref(form).draws,
                          "onUpdate:modelValue": ($event) => unref(form).draws = $event,
                          autocomplete: "draws",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.draws
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "wins",
                            value: unref(t)("wins"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "wins",
                          type: "number",
                          modelValue: unref(form).wins,
                          "onUpdate:modelValue": ($event) => unref(form).wins = $event,
                          autocomplete: "wins",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.wins
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "wins_by_ko",
                            value: unref(t)("winsByKo"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "wins_by_ko",
                          type: "number",
                          modelValue: unref(form).wins_by_ko,
                          "onUpdate:modelValue": ($event) => unref(form).wins_by_ko = $event,
                          autocomplete: "wins_by_ko",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.wins_by_ko
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "wins_by_submission",
                            value: unref(t)("winsBySubmission"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "wins_by_submission",
                          type: "number",
                          modelValue: unref(form).wins_by_submission,
                          "onUpdate:modelValue": ($event) => unref(form).wins_by_submission = $event,
                          autocomplete: "wins_by_submission",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.wins_by_submission
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "wins_by_decision",
                            value: unref(t)("winsByDecision"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "wins_by_decision",
                          type: "number",
                          modelValue: unref(form).wins_by_decision,
                          "onUpdate:modelValue": ($event) => unref(form).wins_by_decision = $event,
                          autocomplete: "wins_by_decision",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.wins_by_decision
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                      createVNode("div", { class: "h-8 flex items-center" }, [
                        createVNode(_sfc_main$6, {
                          for: "no_contests",
                          value: unref(t)("noContests"),
                          class: "text-sm"
                        }, null, 8, ["value"])
                      ]),
                      createVNode(_sfc_main$7, {
                        id: "no_contests",
                        type: "number",
                        modelValue: unref(form).no_contests,
                        "onUpdate:modelValue": ($event) => unref(form).no_contests = $event,
                        autocomplete: "no_contests",
                        class: "w-full lg:w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2 lg:mt-0",
                        message: unref(form).errors.no_contests
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "bio",
                        value: unref(t)("bio"),
                        class: "w-full flex justify-center"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).bio,
                        "onUpdate:modelValue": ($event) => unref(form).bio = $event,
                        height: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.bio
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "short",
                          value: unref(t)("shortDescription")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).short.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$b, {
                        modelValue: unref(form).short,
                        "onUpdate:modelValue": ($event) => unref(form).short = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.short
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "description",
                        value: unref(t)("description")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        height: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode(_sfc_main$c, {
                      modelValue: unref(form).avatar,
                      "onUpdate:modelValue": ($event) => unref(form).avatar = $event,
                      "current-avatar": props.athlete.avatar,
                      error: unref(form).errors.avatar
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "current-avatar", "error"]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$d, {
                        images: existingImages.value,
                        "onUpdate:images": handleExistingImagesUpdate,
                        onDeleteImage: handleDeleteExistingImage
                      }, null, 8, ["images"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$e, { "onUpdate:images": handleNewImagesUpdate })
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.athletes.index"),
                        class: "mb-3"
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(_sfc_main$f, {
                        class: ["ms-4", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Athletes/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
