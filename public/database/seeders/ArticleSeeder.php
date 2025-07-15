<?php

namespace Database\Seeders;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Section\Section;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Очищаем таблицу перед добавлением новых записей
        DB::table('articles')->truncate();

        // Получаем рубрику "Новости"
        $section = Section::where('title', 'Новости')->first();

        if (!$section) {
            Log::warning('Рубрика "Новости" не найдена. Сидер ArticleSeeder прерван.');
            return;
        }

        $articles = [
            // HTML Articles
            [
                'sort' => 1,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы HTML: Как начать?',
                'url' => 'osnovy-html-kak-nachat',
                'short' => 'Первый шаг к освоению HTML: базовые теги и их применение.',
                'description' => 'Статья объясняет, как начать работать с HTML, что такое теги и как с ними взаимодействовать для создания базовых структур на веб-страницах.',
                'author' => 'Иван Иванов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'HTML для начинающих: базовые шаги',
                'meta_keywords' => 'html, основы, теги',
                'meta_desc' => 'Начальный путь в HTML, основные теги и их использование для создания веб-страниц.',
            ],
            [
                'sort' => 2,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Семантические теги в HTML',
                'url' => 'semanticheskie-tegi-v-html',
                'short' => 'Значение семантических тегов для правильной структуры веб-страниц.',
                'description' => 'Обзор семантических тегов HTML, таких как <header>, <article>, <footer>, и их значение в SEO и доступности сайтов.',
                'author' => 'Мария Федорова',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'HTML семантика: как улучшить SEO и структуру',
                'meta_keywords' => 'html, семантика, структура',
                'meta_desc' => 'Изучение семантических тегов HTML и их влияние на SEO и доступность сайтов.',
            ],

            // CSS Articles
            [
                'sort' => 3,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы CSS: Как стилизовать страницы',
                'url' => 'osnovy-css-kak-stilizovat-stranicy',
                'short' => 'Основные правила и синтаксис CSS для создания стилей на веб-страницах.',
                'description' => 'Статья раскрывает базовые концепции CSS: как применять стили к элементам HTML, основные свойства и селекторы.',
                'author' => 'Алексей Смирнов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'CSS основы: как начать стилизовать веб-страницы',
                'meta_keywords' => 'css, стили, селекторы',
                'meta_desc' => 'Основы CSS и как использовать стили для улучшения внешнего вида веб-страниц.',
            ],
            [
                'sort' => 4,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Flexbox: Секреты гибкой верстки на CSS',
                'url' => 'flexbox-sekrety-gibkoi-verstki',
                'short' => 'Изучаем возможности Flexbox для создания гибких и адаптивных макетов.',
                'description' => 'Полное руководство по Flexbox: от основ до продвинутых приемов верстки. Как управлять распределением пространства и выравниванием элементов.',
                'author' => 'Иван Иванов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Flexbox в CSS: как создавать адаптивные макеты',
                'meta_keywords' => 'css, flexbox, верстка',
                'meta_desc' => 'Гид по Flexbox, который поможет создавать гибкие и адаптивные макеты на CSS.',
            ],

            // JavaScript Articles
            [
                'sort' => 5,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы JavaScript: Переменные и функции',
                'url' => 'osnovy-javascript-peremennye-i-funktsii',
                'short' => 'Изучаем переменные, типы данных и функции в JavaScript.',
                'description' => 'Статья объясняет ключевые концепции JavaScript: переменные, их типы и как работать с функциями для добавления интерактивности на сайты.',
                'author' => 'Мария Федорова',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'JavaScript основы: как работать с переменными и функциями',
                'meta_keywords' => 'javascript, переменные, функции',
                'meta_desc' => 'Погружение в базовые аспекты JavaScript: как использовать переменные и функции.',
            ],
            [
                'sort' => 6,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'События и манипуляции DOM в JavaScript',
                'url' => 'sobytia-i-manipulyatsii-dom-v-javascript',
                'short' => 'Как работать с событиями и изменять DOM структуру с помощью JavaScript.',
                'description' => 'Рассматриваются основные события JavaScript и способы изменения DOM элементов для динамического взаимодействия с пользователем.',
                'author' => 'Иван Иванов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'JavaScript события: как манипулировать DOM',
                'meta_keywords' => 'javascript, события, dom',
                'meta_desc' => 'Изучение событий JavaScript и способов взаимодействия с DOM для динамических страниц.',
            ],

            // Laravel Articles
            [
                'sort' => 7,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы Laravel: Маршрутизация и контроллеры',
                'url' => 'osnovy-laravel-marshrutizatsiya-i-kontrollery',
                'short' => 'Как настроить маршрутизацию и контроллеры в Laravel.',
                'description' => 'Эта статья поможет разобраться с основными принципами маршрутизации и созданием контроллеров в Laravel.',
                'author' => 'Алексей Смирнов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Laravel маршруты: настройка и работа с контроллерами',
                'meta_keywords' => 'laravel, маршруты, контроллеры',
                'meta_desc' => 'Основы работы с маршрутами и контроллерами в Laravel для создания веб-приложений.',
            ],
            [
                'sort' => 8,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Работа с базой данных в Laravel: миграции и модели',
                'url' => 'rabota-s-bazoi-dannykh-v-laravel-migratsii-i-modeli',
                'short' => 'Как создавать миграции и работать с моделями в Laravel.',
                'description' => 'Статья рассматривает основные аспекты работы с базой данных в Laravel, включая создание миграций и моделей для управления данными.',
                'author' => 'Мария Федорова',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Laravel базы данных: миграции и работа с моделями',
                'meta_keywords' => 'laravel, базы данных, миграции',
                'meta_desc' => 'Руководство по созданию и управлению базами данных в Laravel через миграции и модели.',
            ],

            // Vue.js Articles
            [
                'sort' => 9,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы Vue.js: создание компонентов',
                'url' => 'osnovy-vuejs-sozdanie-komponentov',
                'short' => 'Как начать работу с Vue.js и создавать компоненты для веб-интерфейсов.',
                'description' => 'Погружение в основы Vue.js, создание и использование компонентов для построения интерфейсов.',
                'author' => 'Иван Иванов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Основы Vue.js: как создавать компоненты',
                'meta_keywords' => 'vue.js, компоненты, веб-интерфейсы',
                'meta_desc' => 'Руководство по началу работы с Vue.js и созданию компонентов для построения веб-интерфейсов.',
            ],
            [
                'sort' => 10,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Двустороннее связывание данных во Vue.js',
                'url' => 'dvustoronnee-svyazyvanie-dannykh-vuejs',
                'short' => 'Как работает двустороннее связывание данных в Vue.js и его преимущества.',
                'description' => 'Рассмотрение концепции двустороннего связывания данных во Vue.js и как его можно использовать для создания реактивных приложений.',
                'author' => 'Мария Федорова',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Vue.js: как работает двустороннее связывание данных',
                'meta_keywords' => 'vue.js, связывание данных, реактивность',
                'meta_desc' => 'Изучение двустороннего связывания данных во Vue.js и его роли в создании реактивных интерфейсов.',
            ],

            // Tailwind CSS Articles
            [
                'sort' => 11,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Основы Tailwind CSS: утилитарные классы для быстрого дизайна',
                'url' => 'osnovy-tailwind-css-utilitarnye-klassy',
                'short' => 'Как использовать утилитарные классы Tailwind CSS для создания адаптивных интерфейсов.',
                'description' => 'Рассмотрение основ работы с Tailwind CSS, как быстро и эффективно применять стили с помощью утилитарных классов.',
                'author' => 'Алексей Смирнов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Tailwind CSS основы: использование утилитарных классов',
                'meta_keywords' => 'tailwind css, утилиты, дизайн',
                'meta_desc' => 'Изучение работы с Tailwind CSS для быстрого создания адаптивных и стилизованных интерфейсов с помощью утилитарных классов.',
            ],
            [
                'sort' => 12,
                'activity' => 1,
                'left' => 0,
                'main' => 0,
                'right' => 0,
                'locale' => 'ru',
                'title' => 'Создание адаптивного дизайна с Tailwind CSS',
                'url' => 'sozdanie-adaptivnogo-dizaina-tailwind-css',
                'short' => 'Как использовать Tailwind CSS для создания адаптивных интерфейсов.',
                'description' => 'Гид по созданию адаптивных интерфейсов с помощью Tailwind CSS и правильного применения классов для различных разрешений экранов.',
                'author' => 'Иван Иванов',
                'published_at' => '2025-05-06 00:00:00',
                'views' => 0,
                'likes' => 0,
                'meta_title' => 'Tailwind CSS: создание адаптивного дизайна',
                'meta_keywords' => 'tailwind css, адаптивность, веб-дизайн',
                'meta_desc' => 'Подробное руководство по созданию адаптивного дизайна интерфейсов с помощью Tailwind CSS.',
            ],
        ];

        // Создаем статьи и связываем их с рубрикой
        foreach ($articles as $articleData) {
            $article = Article::create($articleData);
            $article->sections()->attach($section->id);
            Log::info("Создана статья: {$article->title} и связана с рубрикой: {$section->title}");
        }
    }
}
