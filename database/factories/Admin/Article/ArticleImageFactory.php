<?php

namespace Database\Factories\Admin\Article;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin\Article\ArticleImage>
 */
class ArticleImageFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'path' => substr($this->faker->imageUrl(), 0, 255),
            'alt' => $this->faker->optional()->words(3, true),
            'caption' => $this->faker->optional()->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
