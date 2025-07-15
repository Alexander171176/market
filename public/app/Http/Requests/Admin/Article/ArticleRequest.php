<?php

namespace App\Http\Requests\Admin\Article;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class ArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO: Добавить проверку прав доступа (например, $this->user()->can('create articles') или 'update articles')
        return true;
    }

    public function rules(): array
    {
        // Получаем ID статьи из маршрута, если это обновление
        $articleId = $this->route('article')?->id ?? null; // Используем null safe оператор и null coalescing

        return [
            'sort'               => 'nullable|integer|min:0',
            'activity'           => 'required|boolean',
            'left'               => 'required|boolean',
            'main'               => 'required|boolean',
            'right'              => 'required|boolean',
            'locale'             => [
                'required','string','size:2',
                Rule::in(['ru','en','kk']),
            ],
            'title'              => [
                'required','string','max:255',
                Rule::unique('articles')->where(fn($q) => $q->where('locale', $this->input('locale')))
                    ->ignore($articleId),
            ],
            'url'                => [
                'required','string','max:500',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('articles')->where(fn($q) => $q->where('locale', $this->input('locale')))
                    ->ignore($articleId),
            ],
            'short'              => 'nullable|string|max:255',
            'description'        => 'nullable|string',
            'author'             => 'nullable|string|max:255',
            'published_at'       => 'nullable|date',
            'views'              => 'nullable|integer|min:0',
            'likes'              => 'nullable|integer|min:0',

            'meta_title'         => 'nullable|string|max:255',
            'meta_keywords'      => 'nullable|string|max:255',
            'meta_desc'          => 'nullable|string',

            'sections'           => ['nullable','array'],
            'sections.*.id'      => ['required_with:sections','integer','exists:sections,id'],

            'tags'               => ['nullable','array'],
            'tags.*.id'          => ['required_with:tags','integer','exists:tags,id'],

            'related_articles'   => ['nullable','array'],
            'related_articles.*.id' => ['required_with:related_articles','integer','exists:articles,id'],

            'images'             => ['nullable','array'],
            'images.*.id'        => [
                'nullable','integer',
                Rule::exists('article_images','id'),
                Rule::prohibitedIf(fn() => $this->isMethod('POST')),
            ],
            'images.*.order'     => ['nullable','integer','min:0'],
            'images.*.alt'       => ['nullable','string','max:255'],
            'images.*.caption'   => ['nullable','string','max:255'],
            'images.*.file'      => [
                'nullable',
                'required_without:images.*.id',
                'file',
                'image',
                'mimes:jpeg,jpg,png,gif,svg,webp',
                'max:10240',
            ],

            'deletedImages'      => ['sometimes','array'],
            'deletedImages.*'    => ['integer','exists:article_images,id'],
        ];
    }

    // Сообщения валидации полей (оставляем ваши, но можно добавить для published_at, связей, deletedImages)
    public function messages(): array
    {
        return Lang::get('admin/requests/ArticleRequest');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        // Преобразуем значения чекбоксов, если они приходят как 'true'/'false' или on/off
        $this->merge([
            'activity' => filter_var($this->input('activity'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'left' => filter_var($this->input('left'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'main' => filter_var($this->input('main'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'right' => filter_var($this->input('right'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
        ]);

        // Автоматическая генерация URL, если он пуст и есть title
        if (empty($this->input('url')) && !empty($this->input('title'))) {
            // TODO: Убедиться, что функция transliterate подключена или использовать Str::slug
            // $this->merge(['url' => Str::slug($this->input('title'))]);
            // $this->merge(['url' => transliterate($this->input('title'))]);
        } else if (!empty($this->input('url'))) {
            // Очищаем URL от лишнего, если он введен вручную
            // $this->merge(['url' => Str::slug($this->input('url'))]);
        }
    }
}
