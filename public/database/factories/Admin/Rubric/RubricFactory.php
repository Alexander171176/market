<?php

namespace Database\Factories\Admin\Rubric;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin\Rubric\Rubric>
 */
class RubricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(3);
        $url = Str::slug($title);

        return [
            'sort' => $this->faker->numberBetween(1, 100),
            'activity' => $this->faker->boolean(),
            'icon' => '<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3" viewBox="0 0 16 16"><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6 0 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z"></path></svg>',
            'locale' => $this->faker->randomElement(['ru', 'en', 'kz']),
            'title' => $title,
            'url' => $url,
            'short' => $this->faker->optional()->sentence(),
            'meta_title' => $this->faker->optional()->sentence(5),
            'meta_keywords' => $this->faker->optional()->words(5, true),
            'meta_desc' => $this->faker->optional()->sentence(10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
