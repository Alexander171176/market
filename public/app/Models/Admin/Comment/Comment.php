<?php

namespace App\Models\Admin\Comment; // Убедитесь, что неймспейс правильный

use App\Models\User; // Модель пользователя
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo; // Импортируем MorphTo

class Comment extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'commentable_id',   // Добавляем полиморфные поля
        'commentable_type', // Добавляем полиморфные поля
        'parent_id',
        'content',
        'approved',         // Используем новое имя поля
        'activity',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'approved' => 'boolean',
        'activity' => 'boolean',
    ];

    /**
     * Связь с пользователем, который оставил комментарий.
     * Используем optional(), если user_id может быть null (для гостей).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
        // Или просто ->belongsTo(User::class), если user_id всегда обязателен
    }

    /**
     * Полиморфная связь с родительской моделью (статья, видео и т.д.).
     * Имя метода должно совпадать с префиксом колонок (commentable).
     */
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Связь с родительским комментарием (для ответов).
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Связь с дочерними комментариями (ответы на этот комментарий).
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * Опционально: Скоуп для получения только одобренных комментариев.
     * Пример использования: Comment::approved()->get();
     */
    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }

    /**
     * Опционально: Скоуп для получения только активных комментариев.
     * Пример использования: Comment::active()->get();
     */
    public function scopeActive($query)
    {
        return $query->where('activity', true);
    }

    /**
     * Опционально: Скоуп для получения комментариев верхнего уровня (не ответы).
     * Пример использования: Comment::root()->get();
     */
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Опционально: Метод для проверки, одобрен ли комментарий.
     *
     * @return bool
     */
    public function isApproved(): bool
    {
        return $this->approved;
    }

    /**
     * Опционально: Метод для проверки, активен ли комментарий.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }
}
