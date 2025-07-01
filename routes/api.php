<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Импорты Контроллеров ---
use App\Http\Controllers\Api\Setting\ApiSettingController as PublicSettingController;

// Для публичных настроек
use App\Http\Controllers\Api\Plugin\ApiPluginController;

// Для публичных и админских действий с плагинами/блоками
use App\Http\Controllers\Admin\Plugin\PluginController as AdminPluginController;

// Для админских действий с настройками плагинов
use App\Http\Controllers\Admin\Setting\SettingController as AdminSettingController;

// Для админских действий с настройками сайта
// Импорты для ресурсных API контроллеров (Swagger)
use App\Http\Controllers\Api\Rubric\ApiRubricController;
use App\Http\Controllers\Api\Article\ApiArticleController;
use App\Http\Controllers\Api\User\ApiUserController;
use App\Http\Controllers\Api\Role\ApiRoleController;
use App\Http\Controllers\Api\Permission\ApiPermissionController;
use App\Http\Controllers\Api\Parameter\ApiParameterController;

// use App\Http\Controllers\Api\Section\ApiSectionController; // Раскомментировать при добавлении
// use App\Http\Controllers\Api\Tag\ApiTagController;       // Раскомментировать при добавлении
// use App\Http\Controllers\Api\Video\ApiVideoController; // Раскомментировать при добавлении
// use App\Http\Controllers\Api\Banner\ApiBannerController; // Раскомментировать при добавлении

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Публичные API Маршруты (не требуют аутентификации или защищены иначе) ---

Route::get('/site-settings', [PublicSettingController::class, 'index'])->name('api.site-settings');

// Определение контроллеров публичной части
$siteLayout = config('site_settings.siteLayout', 'Default');
$publicRubricControllerClass = "App\\Http\\Controllers\\Public\\{$siteLayout}\\RubricController";
$publicCommentControllerClass = "App\\Http\\Controllers\\Public\\{$siteLayout}\\CommentController";

// Рубрики для меню
if (class_exists($publicRubricControllerClass)) {
    Route::get('/menu-rubrics', [$publicRubricControllerClass, 'menuRubrics'])->name('api.rubrics.menu');
}

// Комментарии (публичная часть)
if (class_exists($publicCommentControllerClass)) {
    Route::prefix('comments')->name('api.comments.')->group(function () use ($publicCommentControllerClass) {
        // Получение комментариев для сущности
        Route::get('/', [$publicCommentControllerClass, 'index'])->name('index'); // Параметры commentable_type/id передаются как GET
        // Создание нового комментария (защищено Sanctum)
        Route::post('/', [$publicCommentControllerClass, 'store'])->name('store')->middleware('auth:sanctum');
        // Редактирование комментария (защищено Sanctum)
        Route::put('/{comment}', [$publicCommentControllerClass, 'update'])->name('update')->middleware('auth:sanctum');
        // Удаление комментария (защищено Sanctum)
        Route::delete('/{comment}', [$publicCommentControllerClass, 'destroy'])->name('destroy')->middleware('auth:sanctum');
    });
}

// Настройки сайта (для админки)
Route::prefix('settings')->name('settings.')->group(function () {
    Route::get('/downtimeSite', [AdminSettingController::class, 'getDowntimeSiteSetting'])->name('downtime');
    Route::get('/widget-panel', [AdminSettingController::class, 'getWidgetPanelSettings'])->name('widget-panel.get');
    Route::post('/widget-panel', [AdminSettingController::class, 'updateWidgetPanelSettings'])->name('widget-panel.update');
    // TODO: Добавить другие маршруты для настроек админки?
});

// --- Маршруты, Требующие Аутентификации (Sanctum) ---

Route::middleware('auth:sanctum')->group(function () {
    // Получение данных текущего пользователя
    Route::get('/user', function (Request $request) {
        // Используем UserResource из Admin пространства имен, т.к. он обычно более полный
        return new \App\Http\Resources\Admin\User\UserResource($request->user()->loadMissing(['roles', 'permissions']));
    })->name('api.user');

    // TODO: Добавить другие защищенные API маршруты для пользователя
});

// --- Маршруты API СТРОГО для Админ-панели ---
// Защищаем группу через middleware (Sanctum + проверка роли/разрешения)
Route::middleware([/* 'auth:sanctum', 'role:admin' // TODO: Добавить проверку роли/разрешения */])
    ->prefix('admin') // Префикс URL /api/admin/...
    ->name('api.admin.') // Префикс имени api.admin.*
    ->group(function () {

        // Плагины (для админки)
        Route::prefix('plugins')->name('plugins.')->group(function () {
            // Исправленный маршрут для получения активных плагинов
            Route::get('/active', [ApiPluginController::class, 'getActivePlugins'])->name('active');
            Route::post('/create-table', [ApiPluginController::class, 'createTable'])->name('create-table');

            // Админские действия с настройками/данными плагина
            Route::get('/{pluginName}/data', [AdminPluginController::class, 'getPluginData'])->name('data');
            Route::get('/{pluginName}/settings', [AdminPluginController::class, 'getPluginSettings'])->name('settings.get');
            Route::post('/{pluginName}/update-settings', [AdminPluginController::class, 'updatePluginSettings'])->name('settings.update');

            // CRUD для блоков плагина
            Route::prefix('{pluginName}/blocks')->name('blocks.')->group(function () {
                Route::get('/', [ApiPluginController::class, 'indexBlocks'])->name('index');
                Route::post('/', [ApiPluginController::class, 'storeBlock'])->name('store');
                Route::get('{block}', [ApiPluginController::class, 'showBlock'])->name('show');
                Route::put('{block}', [ApiPluginController::class, 'updateBlock'])->name('update');
                Route::delete('{block}', [ApiPluginController::class, 'destroyBlock'])->name('destroy');
                Route::put('{block}/sort', [ApiPluginController::class, 'updateBlockSort'])->name('sort');
                Route::put('{block}/activity', [ApiPluginController::class, 'updateBlockActivity'])->name('activity');
            });
        });

        // TODO: Добавить другие API маршруты, специфичные для админки

    }); // Конец группы admin API

// --- Ресурсные API Маршруты (могут быть как публичными, так и админскими - требуют защиты по необходимости) ---
// Если они ТОЛЬКО для админки, переместите их внутрь группы ->prefix('admin') выше
// Если они ПУБЛИЧНЫЕ, оставьте здесь, но рассмотрите добавление middleware, если нужно
// Защита может быть добавлена либо здесь ->middleware(...), либо в конструкторе контроллера

Route::apiResource('rubrics', ApiRubricController::class);
Route::apiResource('articles', ApiArticleController::class);
Route::apiResource('users', ApiUserController::class); // Обычно требует защиты
Route::apiResource('roles', ApiRoleController::class); // Обычно требует защиты
Route::apiResource('permissions', ApiPermissionController::class); // Обычно требует защиты
Route::apiResource('parameters', ApiParameterController::class); // Защита?
Route::apiResource('plugins', ApiPluginController::class)->except(['getActivePlugins', 'createTable']); // Исключаем не-CRUD методы

// TODO: Раскомментируйте и добавьте защиту/middleware по мере необходимости
// --- Ресурсные API Маршруты (Swagger/OpenAPI) ---
// Эти маршруты могут использоваться как для публичного API, так и для админки (требуют защиты)

Route::apiResource('rubrics', \App\Http\Controllers\Api\Rubric\ApiRubricController::class);
Route::apiResource('articles', \App\Http\Controllers\Api\Article\ApiArticleController::class);
Route::apiResource('users', \App\Http\Controllers\Api\User\ApiUserController::class);
Route::apiResource('roles', \App\Http\Controllers\Api\Role\ApiRoleController::class);
Route::apiResource('permissions', \App\Http\Controllers\Api\Permission\ApiPermissionController::class);
Route::apiResource('parameters', \App\Http\Controllers\Api\Parameter\ApiParameterController::class);
Route::apiResource('plugins', \App\Http\Controllers\Api\Plugin\ApiPluginController::class); // Для CRUD самих плагинов
// Route::apiResource('sections', \App\Http\Controllers\Api\Section\ApiSectionController::class); // Добавьте, если нужен API для секций
// Route::apiResource('tags', \App\Http\Controllers\Api\Tag\ApiTagController::class);       // Добавьте, если нужен API для тегов
// Route::apiResource('videos', \App\Http\Controllers\Api\Video\ApiVideoController::class); // Добавьте, если нужен API для видео
// Route::apiResource('banners', \App\Http\Controllers\Api\Banner\ApiBannerController::class); // Добавьте, если нужен API для баннеров
