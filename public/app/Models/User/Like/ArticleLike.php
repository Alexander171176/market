<?php

namespace App\Models\User\Like;

use App\Models\Admin\Article\Article; // Убедитесь, что неймспейс правильный
use App\Models\User;                   // Убедитесь, что неймспейс User правильный
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleLike extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'article_likes';

    /**
     * The attributes that are mass assignable.
     * Используем $fillable для безопасности.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'article_id',
    ];

    // $guarded больше не нужен, если используем $fillable
    // protected $guarded = false;

    /**
     * The attributes that should be cast.
     * (Здесь нет очевидных полей для кастинга, кроме ключей, которые Laravel обрабатывает сам)
     *
     * @var array<string, string>
     */
    // protected $casts = [];

    // --- Связи ---

    /**
     * Статья, к которой относится лайк.
     */
    public function article(): BelongsTo
    {
        // Имя внешнего ключа 'article_id' угадывается Laravel, но можно указать явно
        return $this->belongsTo(Article::class, 'article_id');
    }

    /**
     * Пользователь, который поставил лайк.
     */
    public function user(): BelongsTo
    {
        // Имя внешнего ключа 'user_id' угадывается Laravel, но можно указать явно
        return $this->belongsTo(User::class, 'user_id');
    }

    // --- Конец связей ---
}
