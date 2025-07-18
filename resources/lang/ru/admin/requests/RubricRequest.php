<?php

// resources/lang/ru/admin/requests/RubricRequest.php

return [
    'locale.required' => 'Язык рубрики обязателен.',
    'locale.in' => 'Допустимые языки: :values.',

    'title.required' => 'Название рубрики обязательно.',
    'title.max' => 'Название рубрики не должно превышать :max символов.',
    'title.unique' => 'Рубрика с таким Названием и Языком уже существует.', // Исправлено

    'url.required' => 'URL рубрики обязателен.',
    'url.max' => 'URL рубрики не должен превышать :max символов.', // Исправлено
    'url.regex' => 'URL должен содержать только латинские буквы, цифры и дефисы.', // Добавлено
    'url.unique' => 'Рубрика с таким URL и Языком уже существует.', // Исправлено

    'short.max' => 'Краткое описание не должно превышать :max символов.',
    'description.string' => 'Описание должно быть строкой.', // Добавлено

    'icon.string' => 'Иконка должна быть строкой.',
    'icon.max' => 'Содержимое иконки слишком длинное.', // Исправлено

    'views.integer' => 'Количество просмотров должно быть числом.', // Добавлено
    'views.min' => 'Количество просмотров не может быть отрицательным.', // Добавлено

    'meta_title.max' => 'Meta заголовок не должен превышать :max символов.',
    'meta_keywords.max' => 'Meta ключевые слова не должны превышать :max символов.',
    'meta_desc.string' => 'Meta описание должно быть строкой.', // Исправлено

    'sort.integer' => 'Поле сортировки должно быть числом.',
    'sort.min' => 'Поле сортировки не может быть отрицательным.', // Добавлено
    'activity.required' => 'Поле активности обязательно для заполнения.',
    'activity.boolean' => 'Поле активности должно быть логическим значением.',

    // Сообщения для секций, если они здесь валидируются
    'sections.array' => 'Секции должны быть массивом.',
    'sections.*.id.required_with' => 'ID секции обязателен.',
    'sections.*.id.integer' => 'ID секции должен быть числом.',
    'sections.*.id.exists' => 'Выбрана несуществующая секция.',
];
