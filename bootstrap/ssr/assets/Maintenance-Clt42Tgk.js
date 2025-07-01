import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
const _imports_0 = "/build/assets/hot_air_baloon-CNl2vZtY.png";
const _sfc_main = {
  __name: "Maintenance",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({
      title: "На сайте проводятся технические работы",
      meta: [
        { name: "robots", content: "none" },
        // Указывает поисковым системам не индексировать страницу
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
        // Настройки viewport для мобильных устройств
        { name: "theme-color", content: "#b0d2f7" },
        // Цвет темы для мобильных браузеров
        { name: "apple-mobile-web-app-capable", content: "yes" },
        // Настройки для Apple мобильных устройств
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        // Стиль статус-бара для Apple устройств
        { property: "og:title", content: "На сайте проводятся технические работы" },
        // Open Graph заголовок
        { property: "og:description", content: "Пожалуйста, попробуйте зайти позже. Спасибо за понимание!" },
        // Open Graph описание
        { property: "og:image", content: "../../hot_air_baloon.png" },
        // Open Graph изображение
        { property: "og:type", content: "website" },
        // Open Graph тип контента
        { name: "description", content: "Пожалуйста, попробуйте зайти позже. Спасибо за понимание!" },
        // Описание страницы
        { name: "keywords", content: "технические работы, обслуживание, недоступность" },
        // Ключевые слова страницы
        { name: "DC.title", content: "На сайте проводятся технические работы" },
        // Dublin Core заголовок
        { name: "DC.description", content: "Пожалуйста, попробуйте зайти позже. Спасибо за понимание!" },
        // Dublin Core описание
        { name: "DC.subject", content: "технические работы" },
        // Dublin Core ключевые слова
        { name: "DC.type", content: "Text" },
        // Dublin Core тип контента
        { name: "author", content: "Александр Косолапов" },
        // Автор страницы
        { name: "DC.creator", content: "Pulsar CMS" },
        // Dublin Core создатель
        { name: "DC.publisher", content: "DigitalPro" },
        // Dublin Core издатель
        { name: "DC.date", content: (/* @__PURE__ */ new Date()).toISOString() },
        // Dublin Core дата публикации
        { property: "og:url", content: window.location.href },
        // Open Graph URL страницы
        { property: "og:site_name", content: "Pulsar CMS" },
        // Open Graph название сайта
        { property: "og:locale", content: "ru_RU" },
        // Open Graph локаль
        { name: "twitter:card", content: "summary_large_image" },
        // Twitter Card тип
        { name: "twitter:site", content: "@yoursite" },
        // Twitter аккаунт сайта
        { name: "twitter:title", content: "На сайте проводятся технические работы" },
        // Twitter заголовок
        { name: "twitter:description", content: "Пожалуйста, попробуйте зайти позже. Спасибо за понимание!" },
        // Twitter описание
        { name: "twitter:image", content: "../../hot_air_baloon.png" }
        // Twitter изображение
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-screen bg-slate-200 text-center" }, _attrs))}><div class="max-w-lg p-6 bg-white rounded-lg shadow-md"><img${ssrRenderAttr("src", _imports_0)} alt="Сайт закрыт" class="w-full h-auto mb-6"><h1 class="text-2xl font-semibold text-teal-500 mb-4">${ssrInterpolate(unref(t)("technicalWorkTitle"))}</h1><span class="text-orange-600 text-lg font-semibold">${ssrInterpolate(unref(t)("technicalWorkText"))} <span class="text-gray-500 block mt-2 font-bold">${ssrInterpolate(unref(t)("technicalWorkThanks"))}</span></span></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Maintenance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
