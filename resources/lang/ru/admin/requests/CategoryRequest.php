<?php

// resources/lang/ru/admin/requests/PageRequest.php

return [
    'sort.integer' => 'Поле сортировки должно быть числом.',
    'sort.min' => 'Поле сортировки не может быть меньше :min.',

    'activity.required' => 'Поле активности обязательно для заполнения.',
    'activity.boolean' => 'Поле активности должно быть логическим значением.',

    'locale.required' => 'Поле локали обязательно для заполнения.',
    'locale.string' => 'Поле локали должно быть строкой.',
    'locale.size' => 'Поле локали должно содержать ровно :size символа.',
    'locale.in' => 'Выбранное значение локали недопустимо.', // Хорошее сообщение для Rule::in

    'title.required' => 'Поле заголовка обязательно для заполнения.',
    'title.string' => 'Поле заголовка должно быть строкой.',
    'title.max' => 'Поле заголовка не может превышать :max символов.',
    // Сообщение 'unique' уже подходит, т.к. правило unique учитывает локаль
    'title.unique' => 'Категория с таким заголовком уже существует для выбранной локали.',

    'url.required' => 'Поле URL обязательно для заполнения.',
    'url.string' => 'Поле URL должно быть строкой.',
    'url.max' => 'Поле URL не может превышать :max символов.',
    // Обновите это сообщение, если изменили regex (например, если разрешили слеши)
    'url.regex' => 'Поле URL должно содержать только строчные латинские буквы, цифры и дефисы.',
    // Сообщение 'unique' уже подходит
    'url.unique' => 'Категория с таким URL уже существует для выбранной локали.',

    'short.string' => 'Поле краткого описания должно быть строкой.',
    'short.max' => 'Поле краткого описания не может превышать :max символов.',

    'description.string' => 'Поле описания должно быть строкой.',

    'meta_title.string' => 'Поле meta заголовка должно быть строкой.',
    'meta_title.max' => 'Поле meta заголовка не может превышать :max символов.',

    'meta_keywords.string' => 'Поле meta ключевых слов должно быть строкой.',
    'meta_keywords.max' => 'Поле meta ключевых слов не может превышать :max символов.',

    'meta_desc.string' => 'Поле meta описания должно быть строкой.',

    // Обновленное сообщение для exists, включающее проверку локали
    'parent_id.exists' => 'Выбранная родительская категория не существует или принадлежит другой локали.',
    // Добавлено сообщение для not_in (запрет установки родителя на самого себя)
    'parent_id.not_in' => 'Категория не может быть дочерней для самой себя.',
    'parent_id.integer' => 'Идентификатор родительской страницы должен быть числом.', // На всякий случай
];
