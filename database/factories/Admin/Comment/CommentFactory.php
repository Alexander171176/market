<?php

namespace Database\Factories\Admin\Comment;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin\Comment\Comment>
 */
class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id, // два юзера
            'commentable_id' => null,      // задается извне
            'commentable_type' => null,    // задается извне
            'parent_id' => null,           // можно переопределить в сидере
            'content' => $this->faker->realText(100),
            'approved' => $this->faker->boolean(80),
            'activity' => $this->faker->boolean(90),
        ];
    }
}
