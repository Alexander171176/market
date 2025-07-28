<?php

// resources/lang/en/admin/controllers/controllers.php

return [
    // CRUD действия
    'index_error' => 'Не удалось загрузить список.',
    'created_success' => 'Успешно создано.',
    'created_error' => 'Произошла ошибка при создании.',
    'updated_success' => 'Успешно обновлено.',
    'updated_error' => 'Произошла ошибка при обновлении.',
    'deleted_success' => 'Удалено.',
    'deleted_error' => 'Произошла ошибка при удалении.',

    // Активность
    'activity_updated_success' => 'Активность успешно обновлена.',
    'activity_updated_error' => 'Произошла ошибка при обновлении активности.',
    'activated_success' => 'активировано.',
    'deactivated_success' => 'деактивировано.',

    // Сортировка
    'sort_updated_success' => 'Сортировка успешно обновлена.',
    'sort_updated_error' => 'Ошибка обновления сортировки.',

    // Массовые операции
    'count' => 'количество: ',
    'bulk_deleted_success' => 'Выбранное успешно удалено.',
    'bulk_deleted_error' => 'Произошла ошибка при массовом удалении.',
    'bulk_left_updated_error' => 'Произошла ошибка при массовом обновлении в левой колонке',
    'bulk_right_updated_error' => 'Произошла ошибка при массовом обновлении в правой колонке',
    'bulk_main_updated_error' => 'Произошла ошибка при массовом обновлении в главном',
    'bulk_sort_updated_success' => 'Порядок успешно обновлен.',
    'bulk_sort_updated_error' => 'Ошибка массового обновления порядка.',

    // Левый, правый сайдбар и главная
    'left_updated_success' => 'Успешно обновлено в левой колонке.',
    'left_updated_error' => 'Ошибка обновления в левой колонке.',
    'right_updated_success' => 'Успешно обновлено в правой колонке.',
    'right_updated_error' => 'Ошибка обновления в правой колонке.',
    'main_updated_success' => 'Успешно обновлено в главном.',
    'main_updated_error' => 'Ошибка обновления в главном.',

    // Клонирование
    'cloned_success' => 'Успешно клонировано.',
    'cloned_error' => 'Ошибка клонирования.',

    // Категории
    'index_locale_error' => 'Не удалось загрузить список категорий для выбранной локали.',
    'parent_load_error' => 'Не удалось загрузить список родительских категорий.',

    'bulk_updated_activity_no_selection' => 'Не выбраны категории для обновления активности.',
    'invalid_input_error' => 'Некорректные входные данные для обновления порядка.',
    'invalid_category_ids_error' => 'Обнаружены неверные ID категорий или категории не принадлежат выбранной локали.',
    'invalid_parent_ids_error' => 'Обнаружены неверные ID родительских категорий или родители не принадлежат выбранной локали.',
    'parent_loop_error' => 'Категория не может быть родителем самой себе.',

    // Комментарии
    'comment_approved' => 'Комментарий одобрен',
    'comment_not_approved' => 'Одобрение снято',

    // Компоненты
    'file_saved_success' => 'Файл успешно сохранен.',
    'file_save_error' => 'Ошибка при сохранении файла ":filename".',
    'file_not_allowed_error' => 'Ошибка: Недопустимый файл для сохранения.',

    // Лог
    'file_not_found_error' => 'Файл лога не найден.',
    'log_cleared_success' => 'Лог очищен',

    // Параметры
    'activity_update_forbidden_error' => 'Изменение активности запрещено для этой категории',

    // Настройки
    'value_updated_success' => 'Значение настройки обновлено',
    'value_updated_error' => 'Ошибка при обновлении значения настройки',
    'count_pages_updated_success' => 'Количество элементов на странице успешно обновлено.',
    'count_pages_updated_error' => 'Ошибка обновления настройки количества элементов.',
    'sort_pages_updated_success' => 'Сортировка по умолчанию успешно обновлена.',
    'sort_pages_updated_error' => 'Ошибка обновления настройки сортировки.',

    // Системные
    'system_created_backup_error' => 'Ошибка при создании бэкапа: ',
    'system_created_backup_success' => 'Бэкап успешно создан.',
    'system_created_archive_error' => 'Не удалось создать резервную копию перед восстановлением: ',
    'system_created_archive_success' => 'Архив успешно создан.',
    'system_file_not_found' => 'Файл не найден.',
    'system_deleted_backup_success' => 'Бэкап успешно удалён.',
    'system_deleted_archive_success' => 'Архив удалён',
    'system_files_success' => 'Файлы успешно восстановлены.',
    'system_files_error' => 'Ошибка при восстановлении файлов: ',
    'system_robots_updated_success' => 'Файл robots.txt обновлён.',
    'system_xml_updated_success' => 'sitemap.xml обновлён',

    // Пользователи
    'cannot_delete_superadmin' => 'Нельзя удалить администратора.',
    'cannot_delete_main_admin' => 'Удаление основного администратора запрещено.',
    'cannot_delete_single_admin' => 'Нельзя удалить пользователя с единственной ролью admin.',

    // Роли
    'delete_main_role_error' => 'Удаление основной роли запрещено.',
    'delete_base_role_error' => 'Запрещено удалять базовые роли.',

    // Лайки
    'liked_auth_error' => 'Для постановки лайка нужно авторизоваться.',
    'liked_user_error' => 'Вы уже поставили лайк.',

    // Комментарии
    'commented_saved_error' => 'Ошибка при сохранении комментария',
    'comment_not_active_error' => 'Комментарий не найден или неактивен',
    'comment_not_editing_error' => 'Вы не можете редактировать этот комментарий',
    'commented_updated_error' => 'Ошибка при обновлении комментария',
    'comment_not_deleted_error' => 'Вы не можете удалить этот комментарий',
    'comment_deleted_success' => 'Комментарий удалён',
    'comment_deleted_error' => 'Ошибка при удалении комментария',

    //
    '' => '',
    '' => '',
];
