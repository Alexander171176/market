<?php

namespace App\Http\Requests\Admin\Comment;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Admin\Comment\Comment; // Импортируем модель

class ApproveCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Проверяем, может ли текущий пользователь одобрять комментарии
        // TODO: Заменить 'approve comments' на ваше реальное разрешение
        // Или можно проверять право на конкретный комментарий: $this->user()->can('approve', $this->route('comment'))
        return $this->user()->can('approve comments');
        // return true; // Временно для теста
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Для простого одобрения (установки approved=true) обычно дополнительные
        // правила валидации данных из запроса не нужны.
        // Мы валидируем сам факт возможности действия через authorize().
        // Если бы вы передавали статус (одобрить/отклонить) в теле запроса,
        // то здесь было бы правило: 'approved' => 'required|boolean'
        return [
            //
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            // Сообщения не нужны, так как правил нет
        ];
    }
}
