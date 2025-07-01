<?php

namespace App\Models\User\Like;

use App\Models\Admin\Video\Video; // Убедитесь, что неймспейс правильный
use App\Models\User;               // Убедитесь, что неймспейс User правильный
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoLike extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'video_likes';

    /**
     * The attributes that are mass assignable.
     * Используем $fillable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'video_id'
    ];

    // $guarded больше не нужен
    // protected $guarded = false;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    // protected $casts = [];

    // --- Связи ---

    /**
     * Видео, к которому относится лайк.
     */
    public function video(): BelongsTo
    {
        // Имя внешнего ключа 'video_id' - ВЕРНО
        return $this->belongsTo(Video::class, 'video_id');
    }

    /**
     * Пользователь, который поставил лайк.
     */
    public function user(): BelongsTo
    {
        // Имя внешнего ключа 'user_id' - ВЕРНО
        return $this->belongsTo(User::class, 'user_id');
    }
    // --- Конец связей ---
}
