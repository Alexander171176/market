<?php

// resources/lang/kk/admin/controllers/controllers.php

return [
    // CRUD әрекеттері
    'index_error' => 'Тізім жүктелмеді.',
    'created_success' => 'Сәтті жасалды.',
    'created_error' => 'Жасау кезінде қате орын алды.',
    'updated_success' => 'Сәтті жаңартылды.',
    'updated_error' => 'Жаңарту кезінде қате орын алды.',
    'deleted_success' => 'Жойылды.',
    'deleted_error' => 'Жою кезінде қате орын алды.',

    // Әрекет
    'activity_updated_success' => 'Әрекет сәтті жаңартылды.',
    'activity_updated_error' => 'Әрекетті жаңарту кезінде қате орын алды.',
    'activated_success' => 'белсенді.',
    'deactivated_success' => 'өшірілген.',

    // Сұрыптау
    'sort_updated_success' => 'Сұрыптау сәтті жаңартылды.',
    'sort_updated_error' => 'Сұрыптауды жаңарту қатесі.',

    // Жаппай операциялар
    'count' => 'саны: ',
    'bulk_deleted_success' => 'Таңдалған элемент сәтті жойылды.',
    'bulk_deleted_error' => 'Жаппай жою кезінде қате орын алды.',
    'bulk_left_updated_error' => 'Сол бағанды жаппай жаңарту кезінде қате орын алды',
    'bulk_right_updated_error' => 'Оң жақ бағанды жаппай жаңарту кезінде қате орын алды',
    'bulk_main_updated_error' => 'Негізгіде жаппай жаңарту кезінде қате орын алды',
    'bulk_sort_updated_success' => 'Тапсырыс сәтті жаңартылды.',
    'bulk_sort_updated_error' => 'Жаппай сұрыптауды жаңарту қатесі.',

    // Сол, оң жақ бүйірлік тақта және негізгі
    'left_updated_success' => 'Сол жақ бағанда сәтті жаңартылды.',
    'left_updated_error' => 'Сол жақ бағанды жаңарту қатесі.',
    'right_updated_success' => 'Оң жақ бағанда сәтті жаңартылды.',
    'right_updated_error' => 'Оң жақ бағанда жаңарту қатесі.',
    'main_updated_success' => 'Негізгіде сәтті жаңартылды.',
    'main_updated_error' => 'Негізгі жаңартуда қате.',

    // Клондау
    'cloned_success' => 'Сәтті клондалды.',
    'cloned_error' => 'Клондалған қате.',

    // Санаттар
    'index_locale_error' => 'Таңдалған тіл үшін санаттар тізімін жүктеу сәтсіз аяқталды.',
    'parent_load_error' => 'Ата-аналық санат тізімі жүктелмеді.',

    'bulk_updated_activity_no_selection' => 'Әрекетті жаңарту үшін ешқандай санат таңдалмаған.',
    'invalid_input_error' => 'Тапсырысты жаңарту үшін жарамсыз енгізу деректері.',
    'invalid_category_ids_error' => 'Жарамсыз санат идентификаторлары табылды немесе санаттар таңдалған тілге жатпайды.',
    'invalid_parent_ids_error' => 'Жарамсыз ата-аналар санатының идентификаторлары табылды немесе ата-аналар таңдалған тілге жатпайды.',
    'parent_loop_error' => 'Категория өзінің ата-анасы бола алмайды.',

    // Түсініктемелер
    'comment_approved' => 'Пікір мақұлданды',
    'comment_not_approved' => 'Бекіту жойылды',

    // Компоненттер
    'file_saved_success' => 'Файл сәтті сақталды.',
    'file_save_error' => '":filename" файлын сақтау қатесі.',
    'file_not_allowed_error' => 'Қате: сақтау үшін жарамсыз файл.',

    // Журнал
    'file_not_found_error' => 'Журнал файлы табылмады.',
    'log_cleared_success' => 'Журнал тазартылды',

    // Параметрлер
    'activity_update_forbidden_error' => 'Бұл санат үшін әрекетті жаңартуға тыйым салынады',

    // Параметрлер
    'value_updated_success' => 'Параметр мәні жаңартылды',
    'value_updated_error' => 'Параметр мәнін жаңарту қатесі',
    'count_pages_updated_success' => 'Беттегі элементтердің саны сәтті жаңартылды.',
    'count_pages_updated_error' => 'Элемент саны параметрін жаңарту қатесі.',
    'sort_pages_updated_success' => 'Әдепкі сұрыптау сәтті жаңартылды.',
    'sort_pages_updated_error' => 'Сұрыптау параметрлерін жаңарту қатесі.',

    // Жүйе
    'system_created_backup_error' => 'Сақтық көшірме жасау қатесі: ',
    'system_created_backup_success' => 'Сақтық көшірме сәтті жасалды.',
    'system_created_archive_error' => 'Қалпына келтірмес бұрын сақтық көшірме жасау мүмкін болмады:',
    'system_created_archive_success' => 'Мұрағат сәтті жасалды.',
    'system_file_not_found' => 'Файл табылмады.',
    'system_deleted_backup_success' => 'Сақтық көшірме сәтті жойылды.',
    'system_deleted_archive_success' => 'Мұрағат жойылды',
    'system_files_success' => 'Файлдар сәтті қалпына келтірілді.',
    'system_files_error' => 'Файлдарды қалпына келтіру кезіндегі қате: ',
    'system_robots_updated_success' => 'Robots.txt файлы жаңартылды.',
    'system_xml_updated_success' => 'sitemap.xml жаңартылды',

    // Пайдаланушылар
    'cannot_delete_superadmin' => 'Superadmin жою мүмкін емес.',
    'cannot_delete_main_admin' => 'Негізгі әкімшіні жою мүмкін емес.',
    'cannot_delete_single_admin' => 'Бір әкімші рөлі бар пайдаланушыны жою мүмкін емес.',

    // Рөлдер
    'delete_main_role_error' => 'Негізгі рөлді жоюға рұқсат етілмейді.',
    'delete_base_role_error' => 'Негізгі рөлдерді жоюға рұқсат етілмейді.',

    // Ұнатады
    'liked_auth_error' => 'Осы жазбаны ұнату үшін жүйеге кіру керек.',
    'liked_user_error' => 'Сізге бұл әлдеқашан ұнады.',

// Түсініктемелер
    'commented_saved_error' => 'Пікірді сақтау қатесі',
    'comment_not_active_error' => 'Пікір табылмады немесе белсенді емес',
    'comment_not_editing_error' => 'Сіз бұл түсініктемені өңдей алмайсыз',
    'commented_updated_error' => 'Пікірді жаңарту қатесі',
    'comment_not_deleted_error' => 'Сіз бұл түсініктемені жоя алмайсыз',
    'comment_deleted_success' => 'Пікір жойылды',
    'comment_deleted_error' => 'Пікірді жою қатесі',

];
