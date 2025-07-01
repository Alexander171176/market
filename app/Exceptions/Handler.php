<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\Access\AuthorizationException; // <--- Импортировать
use Illuminate\Http\Request; // <--- Импортировать Request
use Symfony\Component\HttpFoundation\Response; // <--- Импортировать Response для статусов
// use Inertia\Inertia; // Импортировать, если будете рендерить кастомную страницу через Inertia

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Оставляем стандартный reportable
        $this->reportable(function (Throwable $e) {
            // Здесь можно добавить логику для репортинга исключений (Sentry, Telescope и т.д.)
            // Например: if (app()->bound('sentry') && $this->shouldReport($e)) { app('sentry')->captureException($e); }
        });

        // --- ДОБАВЛЯЕМ ОБРАБОТКУ AuthorizationException ---
        $this->renderable(function (AuthorizationException $e, Request $request) {
            // Формируем сообщение об ошибке
            // Используем сообщение из самого исключения, если оно есть (например, из Policy),
            // иначе - стандартное сообщение.
            $message = $e->getMessage() && $e->getMessage() !== 'This action is unauthorized.'
                ? $e->getMessage()
                : 'У вас нет прав для выполнения этого действия.'; // Дефолтное сообщение

            // Если это AJAX или Inertia запрос
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                // Возвращаем JSON ответ со статусом 403 Forbidden
                return response()->json([
                    'message' => $message, // Сообщение для пользователя
                    // Добавляем флаги, чтобы фронтенд знал, как показать ошибку
                    'show_alert' => true,   // Показать alert?
                    'alert_type' => 'error', // Тип сообщения (error, warning)
                    // Можно добавить другие флаги при необходимости
                ], Response::HTTP_FORBIDDEN); // 403 статус
            }

            // Если это обычный веб-запрос (не AJAX/Inertia)
            // Редиректим пользователя назад с сообщением об ошибке во flash-сессии
            return redirect()->back()
                ->withInput($request->except($this->dontFlash)) // Возвращаем ввод (кроме паролей и т.п.)
                ->with('error', $message); // Сообщение будет доступно в сессии как 'error'

            // --- АЛЬТЕРНАТИВА для обычных веб-запросов: Показ кастомной страницы 403 ---
            // return response()->view('errors.403', ['message' => $message], Response::HTTP_FORBIDDEN);
            // --- АЛЬТЕРНАТИВА для Inertia: Показ кастомной страницы 403 через Inertia ---
            // return Inertia::render('Error', [ // Предполагая, что у вас есть компонент Error.vue
            //     'status' => Response::HTTP_FORBIDDEN,
            //     'message' => $message,
            // ])->toResponse($request)->setStatusCode(Response::HTTP_FORBIDDEN);

        });

        // --- Можно добавить обработку других типов исключений здесь ---
        /*
        $this->renderable(function (NotFoundHttpException $e, Request $request) {
             if ($request->expectsJson() || $request->header('X-Inertia')) {
                  return response()->json(['message' => 'Запрошенный ресурс не найден.'], Response::HTTP_NOT_FOUND);
              }
              // Для веб-запросов можно показать errors.404
        });
        */

    } // Конец register()

    // Если вам нужно переопределить метод render полностью (старый подход или сложная логика)
    /*
    public function render($request, Throwable $e)
    {
        if ($e instanceof AuthorizationException) {
            $message = $e->getMessage() && $e->getMessage() !== 'This action is unauthorized.'
                       ? $e->getMessage()
                       : 'У вас нет прав для выполнения этого действия.';

            if ($request->expectsJson() || $request->header('X-Inertia')) {
                return response()->json([
                    'message' => $message,
                    'show_alert' => true,
                    'alert_type' => 'error',
                ], 403);
            }

            return redirect()->back()
                   ->withInput($request->except($this->dontFlash))
                   ->with('error', $message);
        }

        return parent::render($request, $e);
    }
    */

} // Конец класса Handler
