<?php

// resources/lang/kk/admin/requests/VideoRequest.php

return [
    'locale.required' => 'Бейне тілі қажет.',
    'locale.size' => 'Тіл коды :size таңбаларынан тұруы керек.',
    'locale.in' => 'Қабылданатын тілдер: :мәндер.',

    'title.required' => 'Бейне тақырыбы қажет.',
    'title.max' => 'Бейне тақырыбы :max таңбадан аспауы керек.',
    'title.unique' => 'Осындай атауы және тілі бар бейне бұрыннан бар.',

    'url.required' => 'Бейне URL мекенжайы қажет.',
    'url.max' => 'Бейне URL мекенжайы :max таңбадан аспауы керек.',
    'url.regex' => 'URL тек латын әріптерін, сандарын және сызықшаларды қамтуы керек.',
    'url.unique' => 'Осы URL мекенжайы мен тілі бар бейне бұрыннан бар.',

    'published_at.date_format' => 'Жарияланатын күн пішімі дұрыс емес (ЖЖЖЖ-АА-КК күтілуде).',

    'duration.integer' => 'Бейне ұзақтығы бүтін сан (секунд) болуы керек',
    'duration.min' => 'Бейне ұзақтығы теріс болуы мүмкін емес.',

    'source_type.required' => 'Бейне көзі түрін таңдау керек.',
    'source_type.in' => 'Жарамсыз бейне көзі түрі таңдалды.',

    'external_video_id.required' => 'Сіз тек YouTube немесе Vimeo үшін сілтеме/идентификатор беруіңіз керек.',
    'external_video_id.max' => 'Идентификатор/сілтеме/код өрісі тым ұзын (макс:макс таңба).',

    'video_file.required' => 'Сіз жергілікті бейне үшін файлды жүктеп салуыңыз керек.',
    'video_file.file' => 'Бейне файлды жүктеуде мәселе.',
    'video_file.mimes' => 'Бейне файл пішімі жарамсыз. Рұқсат етілген: :мәндер.',
    'video_file.max' => 'Бейне файл тым үлкен (макс:макс КБ).',

    'video_url.required' => 'Сіз жергілікті бейне үшін URL мекенжайын көрсетуіңіз немесе «код» түріне код енгізуіңіз керек.',

    'short.max' => 'Қысқа сипаттама :max таңбадан аспауы керек.',
    'description.max' => 'Сипаттама тым ұзын (макс:макс таңба).', // Шектеу қажет болса қосылады.

    'author.max' => 'Автор аты :max таңбадан аспауы керек.',

    'meta_title.max' => 'Мета тақырыбы :макс таңбадан аспауы керек.',
    'meta_keywords.max' => 'Мета кілт сөздері :макс таңбадан аспауы керек.',
    'meta_desc.max' => 'Мета сипаттамасы тым ұзын (макс: ең көп таңба).', // Жойылған

    'sort.min' => 'Сұрыптау өрісі теріс болуы мүмкін емес.',
    'activity.required' => 'Әрекет өрісі қажет.',
    'left.required' => '"Сол жақ баған" өрісі қажет.',
    'main.required' => '"Негізгі бейне" өрісі қажет.',
    'right.required' => '"Оң жақ баған" өрісі қажет.',

    'sections.*.id.required_with' => 'Бөлім идентификаторы қажет.',
    'sections.*.id.exists' => 'Таңдалған жоқ бөлім (ID: :value).', // :value ID көрсетеді
    'articles.*.id.required_with' => 'Мақаланың идентификаторы қажет.',
    'articles.*.id.exists' => 'Жоқ мақала таңдалды (ID: :value).',

    'related_videos.*.id.required_with' => 'Қатысты бейне идентификаторы қажет.',
    'related_videos.*.id.exists' => 'Болмайтын қатысты бейне (ID: :value) таңдалды.',
    'related_videos.*.id.where_not' => 'Бейне өзіне қатысты болуы мүмкін емес.', // whereNot хабарлама жасамаса да

    'images.*.id.exists' => 'Көрсетілген алдын ала қарау кескіні жоқ (ID: :value).',
    'images.*.id.prohibited' => 'Алдын ала қарау кескінінің идентификаторын жасау кезінде жіберу мүмкін емес.',
    'images.*.order.min' => 'Алдын ала қарау кескіндерінің реті теріс болуы мүмкін емес.',
    'images.*.file.required' => 'Жаңа кескіндер үшін алдын ала қарау кескін файлы қажет.',
    'images.*.file.image' => 'Алдын ала қарау файлы сурет болуы керек.',
    'images.*.file.mimes' => 'Алдын ала қарау файл пішімі жарамсыз. Рұқсат етілген: :мәндер.',
    'images.*.file.max' => 'Алдын ала қарау файлы тым үлкен (макс. :макс КБ).',
    'images.*.file.required_without' => 'Жаңа кескіндер үшін сурет файлы қажет.',

    'deletedImages.*.exists' => 'Алдын ала қараудың жоқ суретін жою әрекеті (ID: :value).',
];
