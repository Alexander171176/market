<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail; // Если используете верификацию email
use App\Models\Admin\Comment\Comment; // Добавляем Comment
use App\Models\User\Like\ArticleLike; // Добавляем ArticleLike
use App\Models\User\Like\VideoLike; // Добавляем VideoLike
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany; // Добавляем HasMany

// Если используете MustVerifyEmail, раскомментируйте его и implements
class User extends Authenticatable /* implements MustVerifyEmail */
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasRoles; // От Spatie/Permission

    protected string $guard_name = 'sanctum'; // ✅ важно для корректной записи в model_has_roles

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
        'current_team_id', // Часто скрывают ID текущей команды
        'profile_photo_path', // Скрываем путь, т.к. используем appends profile_photo_url
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Добавляем каст для автоматического хеширования пароля (рекомендовано в Laravel 10+)
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    // --- НОВЫЕ СВЯЗИ ---

    /**
     * Комментарии, оставленные пользователем.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    /**
     * Лайки статей, поставленные пользователем.
     */
    public function articleLikes(): HasMany
    {
        return $this->hasMany(ArticleLike::class, 'user_id');
    }

    /**
     * Лайки видео, поставленные пользователем.
     */
    public function videoLikes(): HasMany
    {
        return $this->hasMany(VideoLike::class, 'user_id');
    }

    // --- КОНЕЦ НОВЫХ СВЯЗЕЙ ---

    // Вы можете добавить здесь другие связи или методы, специфичные для пользователя
}
