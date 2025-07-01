import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, useSSRContext, computed, createTextVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$7 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$6, a as _sfc_main$9, b as _sfc_main$c } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$8, a as _sfc_main$a, b as _sfc_main$b } from "./SearchInput-CRP4iAYT.js";
import draggable from "vuedraggable";
import { _ as _sfc_main$4 } from "./ActivityToggle-BO_B69au.js";
import { _ as _sfc_main$5 } from "./IconEdit-KTqcKHBr.js";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "axios";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main$3 = {
  __name: "AthleteTable",
  __ssrInlineRender: true,
  props: {
    athletes: Array,
    selectedAthletes: Array
  },
  emits: [
    "toggle-activity",
    "edit",
    "delete",
    "update-sort-order",
    "toggle-select",
    "toggle-all"
  ],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const localAthletes = ref([]);
    watch(() => props.athletes, (newVal) => {
      localAthletes.value = JSON.parse(JSON.stringify(newVal || []));
    }, { immediate: true, deep: true });
    const handleDragEnd = () => {
      const newOrderIds = localAthletes.value.map((athlete) => athlete.id);
      emits("update-sort-order", newOrderIds);
    };
    const getPrimaryImage = (athlete) => {
      if (Array.isArray(athlete.images) && athlete.images.length > 0 && athlete.images[0].url) {
        return athlete.images[0].url;
      }
      if (athlete.avatar) {
        return `/storage/${athlete.avatar}`;
      }
      return "/storage/athlete_avatar/default-image.png";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.athletes.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 py-1 whitespace-nowrap w-1/12"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 py-1 whitespace-nowrap w-1/12"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("image"))}><svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg></div></th><th class="px-2 py-1 whitespace-nowrap w-1/12"><div class="flex justify-center"${ssrRenderAttr("title", unref(t)("localization"))}><svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"></path></svg></div></th><th class="px-2 py-1 whitespace-nowrap w-2/12"><div class="font-medium text-left">${ssrInterpolate(unref(t)("country"))}</div></th><th class="px-2 py-1 whitespace-nowrap w-2/12"><div class="font-medium text-left">${ssrInterpolate(unref(t)("nickname"))}</div></th><th class="px-2 py-1 whitespace-nowrap w-2/12"><div class="font-medium text-left">${ssrInterpolate(unref(t)("name"))}</div></th><th class="px-2 py-1 whitespace-nowrap w-2/12"><div class="font-medium text-left">${ssrInterpolate(unref(t)("lastName"))}</div></th><th class="px-2 py-1 whitespace-nowrap text-left w-2/12"><div class="flex justify-start space-x-3.5"><div class="text-orange-500 dark:text-orange-200 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("wins"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M19.5,2a3.588,3.588,0,0,0-.5.05V4a6.958,6.958,0,0,1-1.524,4.347A3.5,3.5,0,1,0,19.5,2Z"></path><path d="M4.5,2a3.588,3.588,0,0,1,.5.05V4A6.958,6.958,0,0,0,6.524,8.347,3.5,3.5,0,1,1,4.5,2Z"></path><path d="M16,0a7.585,7.585,0,0,0-3.407.808A6.956,6.956,0,0,1,14,5a1,1,0,0,1-2,0A5.006,5.006,0,0,0,7,0V4A5,5,0,0,0,17,4V0Z"></path><path d="M14.618,20H9.382L8.105,22.553A1,1,0,0,0,9,24h6a1,1,0,0,0,.895-1.447Z"></path><path d="M21.157,10.793a2.771,2.771,0,0,0-3.828,0,.709.709,0,0,1-1,0,2.772,2.772,0,0,0-3.829,0,.722.722,0,0,1-1,0,2.771,2.771,0,0,0-3.828,0,.709.709,0,0,1-1,0,2.772,2.772,0,0,0-3.829,0,1,1,0,0,0,0,1.412L8.6,18H15.4l5.756-5.795A1,1,0,0,0,21.157,10.793Z"></path></svg></div><div class="text-blue-500 dark:text-blue-200 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("draws"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M16.536,13.41a1,1,0,0,0-1.414,1.414l2.82,2.82-1.317,1.317-2.82-2.82a1,1,0,1,0-1.414,1.414l2.557,2.558a5.043,5.043,0,0,1-2.281.377,3.565,3.565,0,0,1-.8,1.923,7.091,7.091,0,0,0,1.135.1,6.983,6.983,0,0,0,4.95-2.047l2.108-2.136a1,1,0,0,0-.006-1.411Z"></path><path d="M1.821,12.856a3.591,3.591,0,0,1,1.023-.7A6.052,6.052,0,0,1,9.082,3.09l.433-.433A9.188,9.188,0,0,1,10.9,1.517,8.068,8.068,0,0,0,1.321,13.5,3.628,3.628,0,0,1,1.821,12.856Z"></path><rect x="0.786" y="15.158" width="11.894" height="5.222" rx="2.611" ry="2.611" transform="translate(14.537 0.443) rotate(45)"></rect><path d="M21.636,3.364a8.071,8.071,0,0,0-11.414,0L5.585,8l.708.707a3.125,3.125,0,0,0,4.414,0L12.5,6.916l8.424,8.576.714-.714a8.071,8.071,0,0,0,0-11.414Z"></path></svg></div><div class="text-violet-500 dark:text-violet-200 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("losses"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M19,7c0-3.86-3.141-7-7-7S5,3.14,5,7c0,3.519,2.614,6.432,6,6.92V20h2v-6.08C16.386,13.432,19,10.519,19,7z"></path><path d="M15,16.118v1.998c4.146,0.331,6.656,1.293,6.986,1.883c-0.404,0.722-4.061,2-9.986,2 c-6.043,0-9.727-1.33-10.006-1.958c0.229-0.586,2.76-1.586,7.006-1.925v-1.999C4.796,16.438,0,17.482,0,20c0,3.158,7.543,4,12,4 s12-0.842,12-4C24,17.482,19.204,16.438,15,16.118z"></path></svg></div><div class="text-red-400 dark:text-red-400 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("winsByKo"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M14.586,9.439S15.7,2.858,11.138,0A8.055,8.055,0,0,1,8.1,5.831C6.149,7.546,2.481,11.4,2.52,15.51A9.435,9.435,0,0,0,7.7,24a5.975,5.975,0,0,1,2.091-4.132,4.877,4.877,0,0,0,1.869-3.278,8.786,8.786,0,0,1,4.652,7.322v.02a8.827,8.827,0,0,0,5.137-7.659c.324-3.863-1.792-9.112-3.668-10.828A10.192,10.192,0,0,1,14.586,9.439Z"></path></svg></div><div class="text-rose-500 dark:text-rose-200 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("winsBySubmission"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M3.1,5.3C2.8,4.8,2.2,4.6,1.8,4.9C1.3,5.2,1.1,5.8,1.4,6.3l9.5,16.5c0.2,0.3,0.5,0.5,0.9,0.5 c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.6-0.9,0.4-1.4L3.1,5.3z"></path><path d="M22.6,9l-4.5-7.8C18,1,17.7,0.8,17.4,0.8c-0.3,0-0.6,0-0.8,0.3c-1.3,1.2-2.8,1.3-4.3,1.3l-1.1,0 c-2,0-4.2,0.2-5.9,2.7l5.6,9.6c0.2-0.1,0.3-0.2,0.4-0.4c1.2-2.1,2.6-2.2,4.5-2.2l1,0c1.8,0,3.8-0.1,5.7-1.8C22.8,10,22.8,9.5,22.6,9 z"></path></svg></div><div class="text-teal-500 dark:text-teal-200 flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("winsByDecision"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M15.334,1.278a21.767,21.767,0,0,0-14.668,0A1,1,0,0,0,0,2.221V12a8,8,0,0,0,16,0V2.221A1,1,0,0,0,15.334,1.278ZM3,8A1,1,0,0,1,4,7H5A1,1,0,0,1,5,9H4A1,1,0,0,1,3,8Zm5,9a3,3,0,0,1-3-3h6A3,3,0,0,1,8,17Zm4-8H11a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z"></path><path d="M23.334,5.273A22.073,22.073,0,0,0,18,4.1V12a1,1,0,0,1,1-1h1a1,1,0,0,1,0,2H19a1,1,0,0,1-1-1V12a9.938,9.938,0,0,1-2.016,6H16a3,3,0,0,1,3,3H15v0H12.276a9.862,9.862,0,0,1-1.877.7A7.993,7.993,0,0,0,24,16V6.215A1,1,0,0,0,23.334,5.273Z"></path></svg></div><div class="flex justify-left w-1/12"${ssrRenderAttr("title", unref(t)("noContests"))}><svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><circle cx="12" cy="3" r="3"></circle><path d="M22,7H2c-.552,0-1,.448-1,1h0c0,.552,.448,1,1,1h7v14.263c0,.407,.33,.737,.737,.737h.525c.407,0,.737-.33,.737-.737v-7.263h2v7.263c0,.407,.33,.737,.737,.737h.525c.407,0,.737-.33,.737-.737V9h7c.552,0,1-.448,1-1h0c0-.552-.448-1-1-1Z"></path></svg></div></div></th><th class="px-2 py-1 whitespace-nowrap w-2/12"><div class="font-medium text-right">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 py-1 whitespace-nowrap text-center w-1/12"><input type="checkbox"></th></tr></thead>`);
        _push(ssrRenderComponent(unref(draggable), {
          tag: "tbody",
          modelValue: localAthletes.value,
          "onUpdate:modelValue": ($event) => localAthletes.value = $event,
          "item-key": "id",
          onEnd: handleDragEnd
        }, {
          item: withCtx(({ element: athlete }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<tr class="text-sm font-semibold border-b hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId}><td class="px-2 py-1 whitespace-nowrap w-1/12"${_scopeId}><div class="text-center text-blue-600 dark:text-blue-200"${_scopeId}>${ssrInterpolate(athlete.id)}</div></td><td class="px-2 py-1 whitespace-nowrap w-1/12"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
              if (getPrimaryImage(athlete)) {
                _push2(`<img${ssrRenderAttr("src", getPrimaryImage(athlete))} class="h-8 w-8 object-cover rounded-full" alt="avatar"${_scopeId}>`);
              } else {
                _push2(`<img src="/storage/athlete_avatar/default-image.png" class="h-8 w-8 object-cover rounded-full" alt="avatar"${_scopeId}>`);
              }
              _push2(`</div></td><td class="px-2 py-1 whitespace-nowrap w-1/12"${_scopeId}><div class="text-center uppercase text-orange-500 dark:text-orange-200"${_scopeId}>${ssrInterpolate(athlete.locale)}</div></td><td class="px-2 py-1 whitespace-nowrap w-2/12"${_scopeId}><div class="text-left text-amber-600 dark:text-amber-200"${_scopeId}>${ssrInterpolate(athlete.nationality)}</div></td><td class="px-2 py-1 whitespace-nowrap w-2/12"${_scopeId}><div class="text-left text-rose-500 dark:text-rose-200"${ssrRenderAttr("title", athlete.nationality)}${_scopeId}>${ssrInterpolate(athlete.nickname)}</div></td><td class="px-2 py-1 whitespace-nowrap w-2/12"${_scopeId}><div class="text-left text-teal-600 dark:text-teal-200"${ssrRenderAttr("title", athlete.date_of_birth)}${_scopeId}>${ssrInterpolate(athlete.first_name)}</div></td><td class="px-2 py-1 whitespace-nowrap text-left w-2/12"${_scopeId}><div class="text-left text-violet-600 dark:text-violet-200"${_scopeId}>${ssrInterpolate(athlete.last_name)}</div></td><td class="px-2 py-1 whitespace-nowrap font-bold text-left w-2/12"${_scopeId}><div class="flex justify-start space-x-4"${_scopeId}><div class="text-orange-500 dark:text-orange-200 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.wins)}</div><div class="text-blue-500 dark:text-blue-200 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.draws)}</div><div class="text-violet-500 dark:text-violet-200 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.losses)}</div><div class="text-red-400 dark:text-red-400 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.wins_by_ko)}</div><div class="text-rose-500 dark:text-rose-200 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.wins_by_submission)}</div><div class="text-teal-500 dark:text-teal-200 flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.wins_by_decision)}</div><div class="flex justify-left w-1/12"${_scopeId}>${ssrInterpolate(athlete.no_contests)}</div></div></td><td class="px-2 py-1 whitespace-nowrap text-right w-2/12"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                isActive: athlete.activity,
                onToggleActivity: ($event) => _ctx.$emit("toggle-activity", athlete),
                title: athlete.activity ? unref(t)("enabled") : unref(t)("disabled")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: _ctx.route("admin.athletes.edit", athlete.id)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, {
                onClick: ($event) => _ctx.$emit("delete", athlete.id)
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-2 py-1 whitespace-nowrap text-center w-1/12"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedAthletes.includes(athlete.id)) ? " checked" : ""}${_scopeId}></td></tr>`);
            } else {
              return [
                createVNode("tr", { class: "text-sm font-semibold border-b hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-1/12" }, [
                    createVNode("div", { class: "text-center text-blue-600 dark:text-blue-200" }, toDisplayString(athlete.id), 1)
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-1/12" }, [
                    createVNode("div", { class: "flex justify-center" }, [
                      getPrimaryImage(athlete) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: getPrimaryImage(athlete),
                        class: "h-8 w-8 object-cover rounded-full",
                        alt: "avatar"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: "/storage/athlete_avatar/default-image.png",
                        class: "h-8 w-8 object-cover rounded-full",
                        alt: "avatar"
                      }))
                    ])
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-1/12" }, [
                    createVNode("div", { class: "text-center uppercase text-orange-500 dark:text-orange-200" }, toDisplayString(athlete.locale), 1)
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-2/12" }, [
                    createVNode("div", { class: "text-left text-amber-600 dark:text-amber-200" }, toDisplayString(athlete.nationality), 1)
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-2/12" }, [
                    createVNode("div", {
                      class: "text-left text-rose-500 dark:text-rose-200",
                      title: athlete.nationality
                    }, toDisplayString(athlete.nickname), 9, ["title"])
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap w-2/12" }, [
                    createVNode("div", {
                      class: "text-left text-teal-600 dark:text-teal-200",
                      title: athlete.date_of_birth
                    }, toDisplayString(athlete.first_name), 9, ["title"])
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap text-left w-2/12" }, [
                    createVNode("div", { class: "text-left text-violet-600 dark:text-violet-200" }, toDisplayString(athlete.last_name), 1)
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap font-bold text-left w-2/12" }, [
                    createVNode("div", { class: "flex justify-start space-x-4" }, [
                      createVNode("div", { class: "text-orange-500 dark:text-orange-200 flex justify-left w-1/12" }, toDisplayString(athlete.wins), 1),
                      createVNode("div", { class: "text-blue-500 dark:text-blue-200 flex justify-left w-1/12" }, toDisplayString(athlete.draws), 1),
                      createVNode("div", { class: "text-violet-500 dark:text-violet-200 flex justify-left w-1/12" }, toDisplayString(athlete.losses), 1),
                      createVNode("div", { class: "text-red-400 dark:text-red-400 flex justify-left w-1/12" }, toDisplayString(athlete.wins_by_ko), 1),
                      createVNode("div", { class: "text-rose-500 dark:text-rose-200 flex justify-left w-1/12" }, toDisplayString(athlete.wins_by_submission), 1),
                      createVNode("div", { class: "text-teal-500 dark:text-teal-200 flex justify-left w-1/12" }, toDisplayString(athlete.wins_by_decision), 1),
                      createVNode("div", { class: "flex justify-left w-1/12" }, toDisplayString(athlete.no_contests), 1)
                    ])
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap text-right w-2/12" }, [
                    createVNode("div", { class: "flex justify-end space-x-2" }, [
                      createVNode(_sfc_main$4, {
                        isActive: athlete.activity,
                        onToggleActivity: ($event) => _ctx.$emit("toggle-activity", athlete),
                        title: athlete.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, 8, ["isActive", "onToggleActivity", "title"]),
                      createVNode(_sfc_main$5, {
                        href: _ctx.route("admin.athletes.edit", athlete.id)
                      }, null, 8, ["href"]),
                      createVNode(_sfc_main$6, {
                        onClick: ($event) => _ctx.$emit("delete", athlete.id)
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("td", { class: "px-2 py-1 whitespace-nowrap text-center w-1/12" }, [
                    createVNode("input", {
                      type: "checkbox",
                      checked: __props.selectedAthletes.includes(athlete.id),
                      onChange: ($event) => _ctx.$emit("toggle-select", athlete.id)
                    }, null, 40, ["checked", "onChange"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</table>`);
      } else {
        _push(`<div class="p-5 text-center text-slate-700 dark:text-slate-100">${ssrInterpolate(unref(t)("noData"))}</div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Athlete/Table/AthleteTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "BulkActionSelect",
  __ssrInlineRender: true,
  props: {
    handleBulkAction: Function
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center" }, _attrs))}><label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold text-sm text-slate-700 dark:text-slate-500">${ssrInterpolate(unref(t)("bulkActions"))}</label><select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="" disabled selected>${ssrInterpolate(unref(t)("selectAction"))}</option><option value="selectAll">${ssrInterpolate(unref(t)("selectAll"))}</option><option value="deselectAll">${ssrInterpolate(unref(t)("deselectAll"))}</option><option value="activate">${ssrInterpolate(unref(t)("activate"))}</option><option value="deactivate">${ssrInterpolate(unref(t)("deactivate"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Athlete/Select/BulkActionSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-36 px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="sort">${ssrInterpolate(unref(t)("sortNumber"))}</option><option value="nickname">${ssrInterpolate(unref(t)("nickname"))}</option><option value="first_name">${ssrInterpolate(unref(t)("name"))}</option><option value="last_name">${ssrInterpolate(unref(t)("lastName"))}</option><option value="nationality">${ssrInterpolate(unref(t)("country"))}</option><option value="date_of_birth">${ssrInterpolate(unref(t)("dateBirth"))}</option><option value="wins">${ssrInterpolate(unref(t)("wins"))}</option><option value="draws">${ssrInterpolate(unref(t)("draws"))}</option><option value="losses">${ssrInterpolate(unref(t)("losses"))}</option><option value="wins_by_ko">${ssrInterpolate(unref(t)("winsByKo"))}</option><option value="wins_by_submission">${ssrInterpolate(unref(t)("winsBySubmission"))}</option><option value="wins_by_decision">${ssrInterpolate(unref(t)("winsByDecision"))}</option><option value="no_contests">${ssrInterpolate(unref(t)("noContests"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Athlete/Sort/SortSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["athletes", "athletesCount", "adminCountAthletes", "adminSortAthletes"],
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const itemsPerPage = ref(props.adminCountAthletes);
    watch(itemsPerPage, (newVal) => {
      router.put(route("admin.settings.updateAdminCountAthletes"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления кол-ва элементов.")
      });
    });
    const sortParam = ref(props.adminSortAthletes);
    watch(sortParam, (newVal) => {
      router.put(route("admin.settings.updateAdminSortAthletes"), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info("Сортировка успешно изменена"),
        onError: (errors) => toast.error(errors.value || "Ошибка обновления сортировки.")
      });
    });
    const showConfirmDeleteModal = ref(false);
    const athleteToDeleteId = ref(null);
    const athleteToDeleteNickname = ref("");
    const confirmDelete = (id, nickname) => {
      athleteToDeleteId.value = id;
      athleteToDeleteNickname.value = nickname;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
      athleteToDeleteId.value = null;
      athleteToDeleteNickname.value = "";
    };
    const deleteAthlete = () => {
      if (athleteToDeleteId.value === null)
        return;
      const idToDelete = athleteToDeleteId.value;
      const nicknameToDelete = athleteToDeleteNickname.value;
      router.delete(route("admin.athletes.destroy", { athlete: idToDelete }), {
        // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          closeModal();
          toast.success(`Спортсмен "${nicknameToDelete || "ID: " + idToDelete}" удален.`);
        },
        onError: (errors) => {
          closeModal();
          const errorMsg = errors.general || errors[Object.keys(errors)[0]] || "Произошла ошибка при удалении.";
          toast.error(`${errorMsg} (Спортсмен: ${nicknameToDelete || "ID: " + idToDelete})`);
          console.error("Ошибка удаления:", errors);
        },
        onFinish: () => {
          athleteToDeleteId.value = null;
          athleteToDeleteNickname.value = "";
        }
      });
    };
    const toggleActivity = (athlete) => {
      const newActivity = !athlete.activity;
      const actionText = newActivity ? "активирован" : "деактивирован";
      router.put(
        route("admin.actions.athletes.updateActivity", { athlete: athlete.id }),
        { activity: newActivity },
        {
          preserveScroll: true,
          // Сохраняем скролл
          preserveState: true,
          // Обновляем только измененные props (если бэк отдает reload: false)
          // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
          onSuccess: () => {
            toast.success(`Спортсмен "${athlete.nickname}" ${actionText}.`);
          },
          onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${athlete.nickname}".`);
          }
        }
      );
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortAthletes = (athletes) => {
      if (sortParam.value === "idAsc") {
        return athletes.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return athletes.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return athletes.filter((athlete) => athlete.activity);
      }
      if (sortParam.value === "inactive") {
        return athletes.filter((athlete) => !athlete.activity);
      }
      if (sortParam.value === "wins" || sortParam.value === "draws" || sortParam.value === "losses" || sortParam.value === "wins_by_ko" || sortParam.value === "wins_by_submission" || sortParam.value === "wins_by_decision" || sortParam.value === "no_contests") {
        return athletes.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
      }
      return athletes.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredAthletes = computed(() => {
      let filtered = props.athletes;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (athlete) => athlete.nickname && athlete.nickname.toLowerCase().includes(query) || athlete.first_name && athlete.first_name.toLowerCase().includes(query) || athlete.last_name && athlete.last_name.toLowerCase().includes(query)
        );
      }
      return sortAthletes(filtered);
    });
    const paginatedAthletes = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredAthletes.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredAthletes.value.length / itemsPerPage.value));
    const handleSortOrderUpdate = (orderedIds) => {
      const startSort = (currentPage.value - 1) * itemsPerPage.value;
      const sortData = orderedIds.map((id, index) => ({
        id,
        sort: startSort + index + 1
        // Глобальный порядок на основе позиции на странице
      }));
      router.put(
        route("admin.actions.athletes.updateSortBulk"),
        { athletes: sortData },
        // Отправляем массив объектов
        {
          preserveScroll: true,
          preserveState: true,
          // Сохраняем состояние, т.к. на сервере нет редиректа
          onSuccess: () => {
            toast.success("Порядок спортсменов успешно обновлен.");
          },
          onError: (errors) => {
            console.error("Ошибка обновления сортировки:", errors);
            toast.error(errors.general || errors.athletes || "Не удалось обновить порядок спортсменов.");
            router.reload({ only: ["athletes"], preserveScroll: true });
          }
        }
      );
    };
    const selectedAthletes = ref([]);
    const toggleAll = ({ ids, checked }) => {
      if (checked) {
        selectedAthletes.value = [.../* @__PURE__ */ new Set([...selectedAthletes.value, ...ids])];
      } else {
        selectedAthletes.value = selectedAthletes.value.filter((id) => !ids.includes(id));
      }
    };
    const toggleSelectAthlete = (athleteId) => {
      const index = selectedAthletes.value.indexOf(athleteId);
      if (index > -1) {
        selectedAthletes.value.splice(index, 1);
      } else {
        selectedAthletes.value.push(athleteId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      if (!selectedAthletes.value.length) {
        toast.warning("Выберите спортсменов для активации/деактивации спортсменов");
        return;
      }
      axios.put(route("admin.actions.athletes.bulkUpdateActivity"), {
        ids: selectedAthletes.value,
        activity: newActivity
      }).then(() => {
        toast.success("Активность массово обновлена");
        const updatedIds = [...selectedAthletes.value];
        selectedAthletes.value = [];
        paginatedAthletes.value.forEach((a) => {
          if (updatedIds.includes(a.id)) {
            a.activity = newActivity;
          }
        });
      }).catch(() => {
        toast.error("Не удалось обновить активность");
      });
    };
    const bulkDelete = () => {
      if (selectedAthletes.value.length === 0) {
        toast.warning("Выберите хотя бы одного спортсмена для удаления.");
        return;
      }
      if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
      }
      router.delete(route("admin.actions.athletes.bulkDestroy"), {
        data: { ids: selectedAthletes.value },
        preserveScroll: true,
        preserveState: false,
        // Перезагружаем данные страницы
        onSuccess: (page) => {
          selectedAthletes.value = [];
          toast.success("Массовое удаление спортсменов успешно завершено.");
        },
        onError: (errors) => {
          console.error("Ошибка массового удаления:", errors);
          const errorKey = Object.keys(errors)[0];
          const errorMessage = errors[errorKey] || "Произошла ошибка при удалении спортсменов.";
          toast.error(errorMessage);
        }
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        selectedAthletes.value = paginatedAthletes.value.map((r) => r.id);
      } else if (action === "deselectAll") {
        selectedAthletes.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      } else if (action === "delete") {
        bulkDelete();
      }
      event.target.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("athletes")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("athletes"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("athletes")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("athletes")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              href: _ctx.route("admin.athletes.create")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"${_scopeId2}><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current opacity-50 shrink-0",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("addAthlete"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("addAthlete")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.athletesCount) {
              _push2(ssrRenderComponent(_sfc_main$2, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.athletesCount) {
              _push2(ssrRenderComponent(_sfc_main$8, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.athletesCount) {
              _push2(ssrRenderComponent(_sfc_main$9, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.athletesCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.athletesCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              athletes: paginatedAthletes.value,
              "selected-athletes": selectedAthletes.value,
              onToggleActivity: toggleActivity,
              onUpdateSortOrder: handleSortOrderUpdate,
              onDelete: confirmDelete,
              onToggleSelect: toggleSelectAthlete,
              onToggleAll: toggleAll
            }, null, _parent2, _scopeId));
            if (__props.athletesCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$a, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$b, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredAthletes.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteAthlete,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$7, {
                      href: _ctx.route("admin.athletes.create")
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 fill-current opacity-50 shrink-0",
                          viewBox: "0 0 16 16"
                        }, [
                          createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("addAthlete")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.athletesCount ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.athletesCount ? (openBlock(), createBlock(_sfc_main$8, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("searchByName")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.athletesCount ? (openBlock(), createBlock(_sfc_main$9, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.athletesCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$3, {
                    athletes: paginatedAthletes.value,
                    "selected-athletes": selectedAthletes.value,
                    onToggleActivity: toggleActivity,
                    onUpdateSortOrder: handleSortOrderUpdate,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectAthlete,
                    onToggleAll: toggleAll
                  }, null, 8, ["athletes", "selected-athletes"]),
                  __props.athletesCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$a, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$b, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredAthletes.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$1, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$c, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteAthlete,
                cancelText: unref(t)("cancel"),
                confirmText: unref(t)("yesDelete")
              }, null, 8, ["show", "cancelText", "confirmText"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Athletes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
