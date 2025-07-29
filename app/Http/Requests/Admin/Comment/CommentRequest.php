<?php

namespace App\Http\Requests\Admin\Comment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use App\Models\Admin\Comment\Comment; // Убедитесь, что путь к модели Comment верный
use App\Models\User;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // if ($this->isMethod('POST')) return $this->user()->can('create comments');
        // if ($this->isMethod('PUT') || $this->isMethod('PATCH')) return $this->user()->can('update', $this->route('comment'));
        // if ($this->isMethod('DELETE')) return $this->user()->can('delete', $this->route('comment'));
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Определяем допустимые типы моделей для commentable
        // TODO: Дополните этот массив реальными классами ваших комментируемых моделей
        $commentableTypes = [
            \App\Models\Admin\Article\Article::class,
            \App\Models\Admin\Video\Video::class,
            // \App\Models\Product::class,
        ];

        // Получаем ID комментария из маршрута для ignore() при проверке parent_id
        $commentId = $this->route('comment')?->id ?? null;

        return [
            'user_id' => [
                'nullable',
                'integer',
                Rule::exists(User::class, 'id')
            ],
            'commentable_id' => [
                Rule::requiredIf(fn() => $this->isMethod('POST')),
                'integer',
                // TODO: Добавить кастомную проверку существования commentable
            ],
            'commentable_type' => [
                Rule::requiredIf(fn() => $this->isMethod('POST')),
                'string',
                Rule::in($commentableTypes)
            ],
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists(Comment::class, 'id')->where(function ($query) use ($commentId) {
                    // Добавляем проверку, чтобы нельзя было выбрать текущий комментарий как родителя
                    if ($commentId) {
                        $query->where('id', '!=', $commentId);
                    }
                    // Опционально: проверяем, что родительский комментарий относится к той же сущности
                    // if ($this->input('commentable_id') && $this->input('commentable_type')) {
                    //     $query->where('commentable_id', $this->input('commentable_id'))
                    //           ->where('commentable_type', $this->input('commentable_type'));
                    // }
                }),
            ],
            'content' => 'required|string|max:65535',
            'approved' => 'required|boolean', // Используем новое имя поля
            'activity' => 'required|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        // Преобразуем булевы значения
        $this->merge([
            'approved' => filter_var($this->input('approved'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'activity' => filter_var($this->input('activity'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true,
        ]);

        // Преобразуем пустой parent_id в null
        if ($this->input('parent_id') === '' || $this->input('parent_id') === 0 || $this->input('parent_id') === '0') {
            $this->merge(['parent_id' => null]);
        }
    }
}
