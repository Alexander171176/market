<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use App\Models\Admin\Category\Category; // Импортируем модель

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Пример проверки прав доступа через Spatie/Laravel-Permissions
        // $permission = $this->isMethod('post') ? 'create categories' : 'update categories';
        // return $this->user()->can($permission);

        // Пока разрешаем, если пользователь аутентифицирован
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем модель Category из маршрута (для update) или null (для store)
        // Важно: имя параметра 'category' должно совпадать с тем, что в web.php/api.php
        // Например: Route::put('categories/{category}', ...);
        $category = $this->route('category');
        $categoryId = $category?->id; // ID текущей редактируемой ктегории (null при создании)

        // Получаем локаль из запроса
        $locale = $this->input('locale'); // Мы ожидаем, что локаль будет передана в запросе

        // Правило для проверки, что parent_id не указывает на саму редактируемую категорию
        $notSelf = $categoryId ? Rule::notIn([$categoryId]) : null; // Применяем только при обновлении

        return [
            'sort' => [
                'nullable', // Позволяем контроллеру управлять сортировкой по умолчанию
                'integer',
                'min:0'
            ],
            'activity' => [
                'required',
                'boolean'
            ],
            'locale' => [
                'required',
                'string',
                'size:2',
                // Используем Rule::in для явного перечисления допустимых локалей
                Rule::in(['ru', 'en', 'kk']), // Обновите список локалей по мере необходимости
            ],
            'title' => [
                'required',
                'string',
                'max:255',
                // Уникальность в пределах локали, игнорируя текущую категорию при обновлении
                Rule::unique('categories', 'title')
                    ->where('locale', $locale) // Используем $locale из input
                    ->ignore($categoryId) // Игнорируем текущий ID при обновлении
            ],
            'url' => [
                'required',
                'string',
                'max:500',
                // Ваше регулярное выражение (строчные буквы, цифры, дефисы)
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                // Если нужны слеши для иерархии: 'regex:/^[a-z0-9\-\/]+$/i',
                // Уникальность в пределах локали, игнорируя текущую категорию при обновлении
                Rule::unique('categories', 'url')
                    ->where('locale', $locale) // Используем $locale из input
                    ->ignore($categoryId) // Игнорируем текущий ID при обновлении
            ],
            'short' => [
                'nullable',
                'string',
                'max:255'
            ],
            'description' => [
                'nullable',
                'string'
            ],
            'meta_title' => [
                'nullable',
                'string',
                'max:255'
            ],
            'meta_keywords' => [
                'nullable',
                'string',
                'max:255'
            ],
            'meta_desc' => [
                'nullable',
                'string'
            ],
            'parent_id' => [
                'nullable', // Корневые категории разрешены
                'integer',
                // Проверка на то, что категория не является родителем самой себе (только при обновлении)
                $notSelf, // Добавляем правило $notSelf (будет проигнорировано если null)
                // Проверка существования parent_id И соответствия локали
                Rule::exists('categories', 'id')
                    ->where(function ($query) use ($locale) {
                        // Это условие гарантирует, что родительская категория
                        // принадлежит той же локали, что и текущая категория
                        $query->where('locale', $locale);
                    }),
                // Важно: Убедитесь, что в вашем lang файле есть сообщение для not_in
                // 'parent_id.not_in' => 'Категория не может быть родителем самой себе.'
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        // Загружаем сообщения из lang файла
        $messages = Lang::get('admin/requests/CategoryRequest');

        // Добавляем сообщение для правила not_in, если его нет в lang файле
        if (!isset($messages['parent_id.not_in'])) {
            $messages['parent_id.not_in'] = 'Категория не может быть дочерней для самой себя.';
        }

        // Уточняем сообщение для exists, чтобы оно включало проверку локали
        if (isset($messages['parent_id.exists'])) {
            $messages['parent_id.exists'] = 'Выбранная родительская категория не существует или принадлежит другой локали.';
        }


        return $messages;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    // protected function prepareForValidation(): void
    // {
    // Например, убедиться, что parent_id это null, а не пустая строка, если он не выбран
    // if ($this->input('parent_id') === '') {
    //     $this->merge(['parent_id' => null]);
    // }

    // Автогенерация URL, если он пуст (если это нужно)
    // if (!$this->input('url') && $this->input('title')) {
    //     $this->merge([
    //         'url' => \Illuminate\Support\Str::slug($this->input('title'))
    //     ]);
    // }
    // }
}
