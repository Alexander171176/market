<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
// Используем ресурсы для JSON ответа, если он нужен в таком виде
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Rubric\RubricResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Setting\Setting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response; // Для streamDownload
use Illuminate\Support\Facades\Cache;   // Для кэширования локали
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable; // Для обработки ошибок генерации

class ReportController extends Controller
{
    // Время кэширования локали (в секундах)
    private const LOCALE_CACHE_TTL = 3600;

    /**
     * Отображает страницу отчетов или отдает JSON с данными.
     */
    public function index(Request $request): JsonResponse|InertiaResponse
    {
        // TODO: Проверка прав 'show-reports'
        // $this->authorize('show-reports');

        $locale = $this->getCurrentLocale();
        $type = $request->query('type', 'page'); // 'page' - для Inertia view по умолчанию
        $format = $request->query('format'); // Для JSON запроса может быть не нужен

        // --- Получаем данные в зависимости от типа ---
        try {
            $query = $this->getBaseReportQuery($type, $locale);
            // Для JSON отдаем ВСЕ данные (или пагинируем, если нужно)
            // Для страницы Inertia можно взять только часть или агрегаты
            // Пока оставим get() для простоты, но лучше оптимизировать под нужды страницы/JSON
            $data = $query->get();

        } catch (InvalidArgumentException $e) {
            if ($request->expectsJson()) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
            abort(400, $e->getMessage());
        } catch (Throwable $e) {
            Log::error("Ошибка получения данных для отчета: " . $e->getMessage());
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Ошибка сервера при получении данных.'], 500);
            }
            // Для Inertia можно показать сообщение об ошибке
            // return Inertia::render('Admin/Reports/Index', ['error' => '...']);
            abort(500, 'Ошибка сервера'); // Или просто 500
        }


        // --- Формируем ответ ---
        if ($request->expectsJson() || $type !== 'page') { // Если явно запрошен JSON
            $resource = match ($type) {
                'rubrics' => RubricResource::collection($data),
                'sections' => SectionResource::collection($data),
                'articles', => ArticleResource::collection($data), // По умолчанию статьи
                default => collect(), // Или ошибка, т.к. тип проверен в getBaseReportQuery
            };
            return response()->json(['data' => $resource]);
        } else {
            // --- Готовим данные СПЕЦИАЛЬНО для Inertia View ---
            // (Возможно, нужны не все данные, а агрегаты или пагинация)

            // Пример: передаем пагинированные статьи и количество рубрик/секций
            $articlesPaginated = $this->getBaseReportQuery('articles', $locale)->paginate(15); // Пагинация статей
            $rubricsCount = Rubric::where('locale', $locale)->count();
            $sectionsCount = Section::where('locale', $locale)->where('activity', 1)->count();
            $activeArticlesCount = Article::where('activity', 1)->where('locale', $locale)->count();


            return Inertia::render('Admin/Reports/Index', [
                // Передаем только необходимые данные для страницы
                'articles'            => ArticleResource::collection($articlesPaginated),
                'rubricsCount'        => $rubricsCount,
                'sectionsCount'       => $sectionsCount,
                'activeArticlesCount' => $activeArticlesCount,
                // Можно передать данные для графиков, как в ChartController
                // 'chartData' => [ ... ]
            ]);
        }
    }

    /**
     * Экспорт отчёта в выбранном формате.
     */
    public function download(Request $request): StreamedResponse
    {
        // TODO: Проверка прав 'download-reports'
        // $this->authorize('download-reports');

        // Валидация входных данных
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(['rubrics', 'sections', 'articles'])],
            'format' => ['required', 'string', Rule::in(['csv', 'xls', 'pdf', 'zip'])],
            // TODO: Добавить валидацию других фильтров, если они есть (даты, локаль и т.д.)
            // 'locale' => ['sometimes', 'string', Rule::in(['ru', 'en', 'kz'])],
        ]);

        $type = $validated['type'];
        $format = $validated['format'];
        $locale = $request->query('locale', $this->getCurrentLocale()); // Берем из запроса или текущую

        Log::info("Запрошен экспорт отчета", ['type' => $type, 'format' => $format, 'locale' => $locale]);

        try {
            // Получаем данные (загружаем ВСЕ для экспорта)
            $query = $this->getBaseReportQuery($type, $locale);
            // Для больших отчетов рассмотрите ->cursor() или ->chunk() вместо ->get()
            $data = $query->get();

            if ($data->isEmpty()) {
                // TODO: Вернуть сообщение пользователю, что данных для экспорта нет
                // Возможно, редирект назад с ошибкой?
                return response()->streamDownload(function () { echo "Нет данных для экспорта."; }, "empty_report.txt");
            }

            $filename = "report_{$type}_{$locale}_" . now()->format('YmdHis') . ".{$format}";
            $content = $this->generateReportContent($data, $format, $type); // Генерация контента

            // Установка правильных заголовков
            $headers = $this->getDownloadHeaders($format);

            return Response::streamDownload(function () use ($content) {
                echo $content;
            }, $filename, $headers);

        } catch (InvalidArgumentException $e) {
            Log::warning("Неподдерживаемый формат отчета запрошен: " . $format);
            abort(400, $e->getMessage()); // Возвращаем ошибку клиенту
        } catch (Throwable $e) {
            Log::error("Ошибка при генерации или загрузке отчета: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            // TODO: Вернуть пользователю сообщение об ошибке генерации отчета
            abort(500, 'Ошибка при генерации отчета.');
        }
    }

    /**
     * Формирует базовый запрос для получения данных отчета.
     *
     * @param string $type Тип отчета ('rubrics', 'sections', 'articles')
     * @param string $locale Локаль
     * @return Builder
     * @throws InvalidArgumentException
     */
    private function getBaseReportQuery(string $type, string $locale): Builder
    {
        // TODO: Оптимизировать выборку полей и связей для КАЖДОГО типа отчета
        // Выбирать только то, что реально нужно для отчета/экспорта

        switch ($type) {
            case 'rubrics':
                return Rubric::with([
                    // Загружаем только нужные поля секций и считаем активные статьи
                    'sections' => fn($q) => $q->select('sections.id', 'sections.title', 'sections.locale')
                        ->where('activity', 1)
                        ->where('locale', $locale)
                        ->withCount(['articles' => fn($aq) => $aq->where('activity', 1)->where('locale', $locale)])
                        ->orderBy('sort', 'asc')
                ])
                    ->where('locale', $locale)
                    ->orderBy('sort', 'asc'); // Добавим сортировку для рубрик

            case 'sections':
                return Section::with([
                    // Загружаем только нужные поля статей
                    'articles' => fn($q) => $q->select('articles.id', 'articles.title', 'articles.locale', 'articles.views', 'articles.likes')
                        ->where('activity', 1)
                        ->where('locale', $locale)
                        ->orderBy('sort', 'asc'),
                    // Можно загрузить рубрики, если нужно
                    'rubrics:id,title'
                ])
                    ->withCount(['articles' => fn($q) => $q->where('activity', 1)->where('locale', $locale)]) // Считаем только активные статьи
                    ->where('activity', 1)
                    ->where('locale', $locale)
                    ->orderBy('sort', 'asc');

            case 'articles':
                return Article::with(['sections:id,title', 'tags:id,name', 'images']) // Загружаем только ID/названия связей + изображения
                ->where('activity', 1)
                    ->where('locale', $locale)
                    ->orderBy('sort', 'asc');

            case 'page': // Тип для Inertia view, можно вернуть пустой запрос или базовый
                return Article::query(); // Или вернуть null/выбросить исключение

            default:
                throw new InvalidArgumentException('Неподдерживаемый тип отчета: ' . $type);
        }
    }


    /**
     * Генерирует контент отчета в указанном формате.
     */
    private function generateReportContent($data, string $format, string $type): string
    {
        if ($data->isEmpty()) return '';

        switch ($format) {
            case 'csv':
                return $this->generateCsv($data, $type);
            case 'xls':
                // TODO: Реализовать генерацию XLS
                Log::warning("Генерация XLS не реализована для отчета типа {$type}");
                return "XLS generation not implemented yet."; // Заглушка
            case 'pdf':
                // TODO: Реализовать генерацию PDF
                Log::warning("Генерация PDF не реализована для отчета типа {$type}");
                return "PDF generation not implemented yet."; // Заглушка
            case 'zip':
                // TODO: Реализовать генерацию ZIP
                Log::warning("Генерация ZIP не реализована для отчета типа {$type}");
                return "ZIP generation not implemented yet."; // Заглушка
            default:
                // Исключение уже было выброшено в download() или getBaseReportQuery()
                return '';
        }
    }

    /**
     * Генерирует CSV контент.
     */
    private function generateCsv($data, string $type): string
    {
        // TODO: Улучшить генерацию CSV - выбирать конкретные колонки, разворачивать связи
        $temp = fopen('php://temp', 'r+');
        if ($data->isNotEmpty()) {
            // Получаем заголовки из атрибутов первой модели + имена связей (если нужно)
            $firstItem = $data->first()->toArray(); // Используем toArray ресурса или модели
            // Убираем сложные связи из заголовков CSV по умолчанию
            $headers = array_keys(collect($firstItem)->filter(fn($value) => !is_array($value))->all());
            fputcsv($temp, $headers, ';'); // Используем ';' как разделитель

            foreach ($data as $item) {
                // Преобразуем объект в массив
                $itemArray = $item->toArray();
                // Оставляем только скалярные значения для CSV
                $row = collect($itemArray)->filter(fn($value) => !is_array($value))->all();
                // Приводим булевы значения к 1/0 или Да/Нет
                foreach ($row as $key => &$value) {
                    if (is_bool($value)) {
                        $value = $value ? '1' : '0';
                    }
                }
                fputcsv($temp, $row, ';');
            }
        }
        rewind($temp);
        $csvContent = stream_get_contents($temp);
        fclose($temp);
        // Убедимся, что контент в правильной кодировке (например, Windows-1251 для Excel)
        return mb_convert_encoding($csvContent, 'Windows-1251', 'UTF-8');
        // Или return $csvContent; если UTF-8 достаточно
    }

    /**
     * Возвращает заголовки для скачивания файла.
     */
    private function getDownloadHeaders(string $format): array
    {
        $contentType = match ($format) {
            'csv' => 'text/csv; charset=Windows-1251', // Добавляем charset
            'xls' => 'application/vnd.ms-excel',
            'pdf' => 'application/pdf',
            'zip' => 'application/zip',
            default => 'application/octet-stream',
        };
        return ['Content-Type' => $contentType];
    }

    /**
     * Получает текущую локаль из настроек (с кэшированием).
     */
    private function getCurrentLocale(): string
    {
        return Cache::remember('setting_locale', self::LOCALE_CACHE_TTL, function () {
            return Setting::where('option', 'locale')->value('value') ?? config('app.fallback_locale', 'ru');
        });
    }

    // Методы deleteImages() не нужны в этом контроллере
}
