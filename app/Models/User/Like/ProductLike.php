<?php

namespace App\Models\User\Like;

use App\Models\Admin\Product\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductLike extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'product_likes';

    /**
     * The attributes that are mass assignable.
     * Используем $fillable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'product_id'
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
    public function product(): BelongsTo
    {
        // Имя внешнего ключа 'product_id' - ВЕРНО
        return $this->belongsTo(Product::class, 'product_id');
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
