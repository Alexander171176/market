1) `php artisan key:generate --ansi` <br><br>

2) Install Webp, Spatie Media Library <br>
`прежде отключить файрвол антивируса, потом снова включить` <br>
`composer require spatie/laravel-sitemap` <br>
`composer require intervention/image:^2.7` <br>
`composer require spatie/laravel-image-optimizer` <br>
`composer require mcamara/laravel-localization` <br>
`docker exec market-php-app php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"` <br>
`docker exec -it market-php-app composer require spatie/laravel-medialibrary:"^11.0" --with-all-dependencies` <br>
`docker exec market-php-app php artisan vendor:publish --tag="medialibrary-migrations"`  <br>
`docker exec market-php-app php artisan migrate`<br>
`docker exec market-php-app php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-config"`<br>

3) Make directory for docker: <br>
   `mkdir ./storage/docker` <br>

4) Copy .env.example <br>
   `cp .env.example .env` <br>

5) Add host user to .env <br>
   `echo UID=$(id -u) >> .env` <br>
   `echo GID=$(id -g) >> .env` <br>

6) Run services docker <br>
   `docker-compose up -d --build` <br>

7) Install eslint, prettier <br>
   `npm install --save-dev @rushstack/eslint-patch` <br>
   `npm install --save-dev @vue/eslint-config-prettier` <br>
   `npm install --save-dev eslint` <br>
   `npm install --save-dev eslint-plugin-vue` <br>
   `npm install --save-dev prettier` <br>

8) `npm run lint` <br>

9) Install npm dependencies <br>
   `npm install` <br>
   `npm run dev` <br>
   `vite build` <br>
   `vite` <br>

10) composer require unisharp/laravel-filemanager
    `php artisan vendor:publish --tag=lfm_config` <br>
    `php artisan vendor:publish --tag=lfm_public` <br>
    web.php: `Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
    });` <br>
    .env: `FILESYSTEM_DRIVER=public` <br>

11) Create link Storage <br>
   `docker exec market-php-app php artisan storage:link`<br>

12)  npm install <br>
    `npm install @inertiajs/inertia` <br>
    `npm install @mayasabha/ckeditor4-vue3` <br>
    `npm install tinymce` <br>
    `npm install chart.js chartjs-adapter-moment` <br>
    `npm install xlsx html2pdf.js jszip file-saver docx` <br>
    `npm install codemirror @codemirror/lang-javascript @codemirror/state @codemirror/view @codemirror/theme-one-dark` <br>
    `npm install @fortawesome/vue-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons` <br>
    `npm install vue-i18n@next` <br>
    `npm install vue-draggable-next` <br>
    `npm install roughjs` <br>
    `npm install @vueuse/head` <br>
    `npm install @vue-flow/core @vue-flow/background @vue-flow/controls @vue-flow/minimap` <br>
    `npm i flowchart` <br>
    `npm i vue-echarts-v3` <br>
    `npm install date-fns` <br>
    `npm install highlight.js` <br>
    `npm install vue-toastification@next` <br>
     `npm i ` <br>

13) Install Jetstream <br>
    `composer require laravel/jetstream` <br>
    `docker exec market-php-app php artisan jetstream:install inertia --ssr --teams` <br>
    `npm install` <br>
    `npm run dev` <br>

14) Install Spatie <br>
    `composer require spatie/laravel-permission` <br>
    `docker exec market-php-app php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"` <br>
    `docker exec market-php-app php artisan optimize:clear` <br>
    `docker exec market-php-app php artisan migrate`<br>
    `docker exec market-php-app php artisan migrate:rollback`<br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan db:seed` <br>
    `// The User model requires this trait
    use HasRoles;`<br>

15) creating business logic app Role <br>
    `docker exec market-php-app php artisan make:controller Admin/Role/RoleController --resource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Role/RoleResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Role/RoleRequest` <br>
    `docker exec market-php-app php artisan make:seeder RoleSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=RoleSeeder` <br>

16) creating business logic app Permission <br>
    `docker exec market-php-app php artisan make:controller Admin/Permission/PermissionController --resource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Permission/PermissionResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Permission/PermissionRequest` <br>

17) creating business logic app User <br>
    `docker exec market-php-app php artisan make:controller Admin/User/UserController --resource` <br>
    `docker exec market-php-app php artisan make:resource Admin/User/UserResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/User/UserSharedResource` <br>

18) Create revoke controllers <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemovePermissionFromRoleController --invokable` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveRoleFromUserController --invokable` <br>
    `docker exec market-php-app php artisan make:request Admin/User/StoreUserRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/User/UpdateUserRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemovePermissionFromUserController --invokable` <br>

19) creating business logic app Setting <br>
    `docker exec market-php-app php artisan make:model Admin/Setting/Setting -m` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:seeder SettingSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=SettingSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Setting/SettingResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/SettingRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Parameter/ParameterRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateLocaleRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateCountSettingRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateSortSettingRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateWidgetPanelRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateSidebarSettingsRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Setting/SettingController --resource` <br>
    `docker exec market-php-app php artisan make:request Admin/Setting/UpdateSettingValueRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Parameter/UpdateParameterValueRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Parameter/ParameterController --resource` <br>

20) creating business logic app System <br>
    `docker exec market-php-app php artisan make:controller Admin/Log/LogController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/PhpInfoController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/ComposerController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/PackageController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/EnvController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/RobotController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/SitemapController` <br>

21)  Create middleware ShareSettings <br>
     `docker exec market-php-app php artisan make:resource Admin/Setting/SettingSharedResource` <br>
     `docker exec market-php-app php artisan make:controller Admin/System/SystemController` <br>
     `docker exec market-php-app php artisan make:controller Api/Parameter/ApiParameterController --api` <br>
     `docker exec market-php-app php artisan make:controller Api/Setting/ApiSettingController --api` <br>

22) creating business logic app Plugin <br>
    `docker exec market-php-app php artisan make:model Admin/Plugin/Plugin -mf` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:seeder PluginsSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=PluginsSeeder` <br>
    `docker exec market-php-app php artisan make:controller Api/Plugin/ApiPluginController --api` <br>
    `docker exec market-php-app php artisan make:controller Admin/Plugin/PluginController --resource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Plugin/PluginResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Plugin/PluginSharedResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Plugin/PluginRequest` <br>

23) creating business logic app Rubric <br>
    `docker exec market-php-app php artisan make:model Admin/Rubric/Rubric -mf` <br>
    `docker exec market-php-app php artisan migrate`<br>
    `docker exec market-php-app php artisan make:seeder RubricSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=RubricSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Rubric/RubricResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Rubric/RubricRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/UpdateActivityRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/UpdateSortEntityRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Rubric/Rubric/RubricController --resource` <br>
    `docker exec market-php-app php artisan make:controller Public/Default/RubricController` <br>
    `docker exec market-php-app php artisan make:resource Admin/Rubric/RubricSharedResource` <br>

24) creating business logic app Section <br>
    `docker exec market-php-app php artisan make:model Admin/Section/Section -mf` <br>
    `docker exec market-php-app php artisan make:migration create_rubric_has_sections_table --create=rubric_has_sections` <br>
    `docker exec market-php-app php artisan migrate`<br>
    `docker exec market-php-app php artisan make:seeder SectionSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=SectionSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Section/SectionResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Section/SectionSharedResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Section/SectionRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Section/SectionController --resource` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveRubricFromSectionController --invokable` <br>

25) creating business logic app Article <br>
    `docker exec market-php-app php artisan make:model Admin/Article/Article -mf` <br>
    `docker exec market-php-app php artisan make:migration create_article_has_section_table --create=article_has_section` <br>
    `docker exec market-php-app php artisan migrate`<br>
    `docker exec market-php-app php artisan make:seeder ArticleSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=ArticleSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Article/ArticleResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Article/ArticleRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/UpdateLeftRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/UpdateMainRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/UpdateRightRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Article/ArticleController --resource` <br>
    `docker exec market-php-app php artisan make:controller Public/Default/ArticleController` <br>
    `docker exec market-php-app php artisan make:resource Admin/Article/ArticleSharedResource` <br>

26) Create revoke controllers Section and Article <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveArticleFromSectionController --invokable` <br>

27) creating business logic app Image Article <br>
    `docker exec market-php-app php artisan make:model Admin/Article/ArticleImage -mf` <br>
    `docker exec market-php-app php artisan make:migration create_article_has_images_table --create=article_has_images` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:seeder ArticleImageSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=ArticleImageSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Article/ArticleImageResource` <br>
    `docker exec market-php-app php artisan make:migration create_article_related_table --create=article_related` <br>
    `docker exec market-php-app php artisan make:migration add_img_column_to_articles_table` <br>
    `docker exec market-php-app php artisan migrate` <br>

28) creating business logic app Comment <br>
    `docker exec market-php-app php artisan make:model Admin/Comment/Comment -m`
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:factory Admin/Comment/CommentFactory --model=Comment` <br>
    `docker exec market-php-app php artisan make:seeder CommentsSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=CommentsSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Comment/CommentResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Comment/CommentRequest` <br>
    `docker exec market-php-app php artisan make:request Admin/Comment/ApproveCommentRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Comment/CommentController --resource` <br>
    `docker exec market-php-app php artisan make:controller Public/CommentController --resource` <br>

29) creating business logic app Like <br>
    `docker exec market-php-app php artisan make:migration create_article_likes_table --create=article_likes` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:model User/Like/ArticleLike` <br>

30) creating business logic app Tag <br>
    `docker exec market-php-app php artisan make:model Admin/Tag/Tag -mf` <br>
    `docker exec market-php-app php artisan make:migration create_article_has_tag_table --create=article_has_tag` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:seeder TagSeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=TagSeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Tag/TagResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Tag/TagRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Tag/TagController --resource` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveArticleFromTagController --invokable` <br>
    `docker exec market-php-app php artisan make:controller Public/Default/TagController` <br>

31) creating business logic app Report <br>
    `docker exec market-php-app php artisan make:controller Admin/Report/ReportController --resource` <br>

32) creating business logic app Chart <br>
    `docker exec market-php-app php artisan make:controller Admin/Chart/ChartController --resource` <br>

33) creating business logic app Component <br>
    `docker exec market-php-app php artisan make:controller Admin/Component/ComponentController --resource` <br>

34) creating business logic app Editor <br>
    `docker exec market-php-app php artisan make:controller Admin/Editor/EditorController --resource` <br>

35) creating business logic app Diagram <br>
  `docker exec market-php-app php artisan make:controller Admin/Diagram/DiagramController --resource` <br>

36) creating business logic ap Banner
    `docker exec market-php-app php artisan make:model Admin/Banner/Banner -mf` <br>
    `docker exec market-php-app php artisan make:migration create_banner_has_section_table --create=banner_has_section` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:resource Admin/Banner/BannerResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Banner/BannerRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Banner/BannerController --resource` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveBannerFromSectionController --invokable` <br>
    `docker exec market-php-app php artisan make:model Admin/Banner/BannerImage -mf` <br>
    `docker exec market-php-app php artisan make:migration create_banner_has_images_table --create=banner_has_images` <br>
    `docker exec market-php-app php artisan make:resource Admin/Banner/BannerImageResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Banner/BannerSharedResource` <br>
    `docker exec market-php-app php artisan migrate` <br>

37) creating business logic ap Video
    `docker exec market-php-app php artisan make:model Admin/Video/Video -mf` <br>
    `docker exec market-php-app php artisan make:migration create_section_has_video_table --create=section_has_video` <br>
    `docker exec market-php-app php artisan make:migration create_article_has_video_table --create=article_has_video` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveSectionFromVideoController --invokable` <br>
    `docker exec market-php-app php artisan make:controller Admin/Invokable/RemoveArticleFromVideoController --invokable` <br>
    `docker exec market-php-app php artisan make:model Admin/Video/VideoImage -mf` <br>
    `docker exec market-php-app php artisan make:migration create_video_has_images_table --create=video_has_images` <br>
    `docker exec market-php-app php artisan make:resource Admin/Video/VideoResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Video/VideoSharedResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Video/VideoImageResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Video/VideoRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Video/VideoController --resource` <br>
    `docker exec market-php-app php artisan make:controller Public/Default/VideoController` <br>
    `docker exec market-php-app php artisan make:migration create_video_related_table --create=video_related` <br>
    `docker exec market-php-app php artisan make:migration create_video_likes_table --create=video_likes` <br>
    `docker exec market-php-app php artisan make:model User/Like/VideoLike` <br>
    `docker exec market-php-app php artisan migrate` <br>

38) creating business logic ap Category
    `docker exec market-php-app php artisan make:model Admin/Category/Category -mf` <br>
    `docker exec market-php-app php artisan migrate` <br>
    `docker exec market-php-app php artisan make:seeder CategorySeeder` <br>
    `docker exec market-php-app php artisan db:seed --class=CategorySeeder` <br>
    `docker exec market-php-app php artisan make:resource Admin/Category/CategoryResource` <br>
    `docker exec market-php-app php artisan make:resource Admin/Category/CategorySharedResource` <br>
    `docker exec market-php-app php artisan make:request Admin/Category/CategoryRequest` <br>
    `docker exec market-php-app php artisan make:controller Admin/Category/CategoryController --resource` <br>

39) creating business logic app API <br>
    `composer require "darkaonline/l5-swagger` <br>
    `docker exec market-php-app php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"` <br>
    `docker exec market-php-app php artisan make:controller Api/User/ApiUserController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Permission/ApiPermissionController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Role/ApiRoleController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Rubric/ApiRubricController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Section/ApiSectionController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Article/ApiArticleController --api` <br>
    `docker exec market-php-app php artisan make:controller Api/Parameter/ApiParameterController --api` <br>
    `docker exec market-php-app php artisan l5-swagger:generate` <br>
    `docker exec -it market-php-app rm /var/www/public/storage` Удалите текущую символьную ссылку <br>
    `docker exec -it market-php-app ln -s /var/www/storage /var/www/public/storage` Пересоздайте символьную ссылку <br>
    `docker exec -it market-php-app ls -l /var/www/public/storage` Проверьте, правильно ли создана символьная ссылка <br>
    `docker exec -it market-php-app ls -l /var/www/storage/api-docs/` Убедитесь, что права доступа к директории и файлу корректны <br>
    `docker exec -it --user root market-php-app chmod -R 777 /var/www/storage/api-docs` Установите права доступа к папке <br>
    `docker exec -it market-php-app ls -l /var/www/public/storage/api-docs/api-docs.json` Убедитесь, что файл api-docs.json доступен через веб-сервер <br>
    `docker exec -it market-php-app ls /var/www/storage/api-docs/api-docs.json` После генерации проверьте наличие файла <br>
    `docker-compose restart` <br>
    `docker exec market-php-app php artisan l5-swagger:generate` <br>

40) Помощь в командах
    Удалите существующие символические ссылки <br>
    `docker exec -it market-php-app rm /var/www/public/storage` <br>
    `docker exec -it market-php-app rm /var/www/storage/api-docs` <br>
    Создайте новые символические ссылки внутри контейнера <br>
    `docker exec -it market-php-app ln -s /var/www/storage/app/public /var/www/public/storage`  <br>
    `docker exec -it market-php-app ln -s /var/www/storage/api-docs /var/www/public/storage/api-docs`  <br>
    Установите правильные права доступа <br>
    `docker exec -it --user root market-php-app sh`  <br>
    `chmod -R 775 /var/www/storage/app/public`  <br>
    `chmod -R 775 /var/www/storage/api-docs`  <br>
    `exit`  <br>
    Скопируйте нужные файлы <br>
    `docker exec -it market-php-app mkdir -p /var/www/public/vendor/swagger-api/swagger-ui/dist`  <br>
    `docker exec -it market-php-app cp -r /var/www/vendor/swagger-api/swagger-ui/dist/. /var/www/public/vendor/swagger-api/swagger-ui/dist/`  <br>
    Очистите кэш и перезапустите контейнер:  <br>
    `docker exec -it market-php-app php artisan cache:clear`  <br>
    `docker exec -it market-php-app php artisan config:clear`  <br>
    `docker exec -it market-php-app php artisan route:clear`  <br>
    `docker exec -it market-php-app php artisan view:clear`  <br>
    `docker restart market-php-app`  <br>
    `docker exec -it market-php-app php artisan route:list`  <br>
    `mkdir -p app/Services`  <br>
41) `composer config --global disable-tls true` <br> отключение сертификатов, если нужно
    `php --ini` <br> найти php.ini
    `composer diagnose` <br> диагностика composer
    `composer self-update` <br> обновление текущей версии composer
    `docker exec -it market-php-app sh` <br> открытие командной строки в linux
    `docker exec market-php-app php -m` <br> проверка расширений контейнера сервера
    `docker exec -it market-php-app composer dump-autoload` <br> очистка кеша перед пересборкой
    `docker exec -it market-php-app composer install --no-cache --no-interaction --prefer-dist` <br> пересборка зависимостей composer
    `composer config --global disable-tls false` <br> включение сертификатов обратно

42) creating business logic Backup
    `docker exec market-php-app php artisan make:controller Admin/System/DatabaseBackupController` <br>
    `docker exec market-php-app php artisan make:controller Admin/System/FileBackupController` <br>
____________________________
43) 
