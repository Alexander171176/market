<?php

namespace Database\Factories\Admin\Comment;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,  // случайный пользователь
            'article_id' => 1,  // статья с id 1
            'section_id' => null, // если нужно указать рубрику, можно изменить это поле
            'parent_id' => null, // для комментариев без родителя
            'content' => $this->faker->sentence,  // случайный текст комментария
            'status' => true,  // заменено на булевое значение
            'activity' => true,  // комментарий активен
        ];
    }
}
