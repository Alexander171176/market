<?php

namespace Database\Seeders;

use App\Models\Admin\Comment\Comment;
use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Создаем 10 комментариев для статьи с id 1
        Comment::factory()->count(20)->create([
            'article_id' => 1,
        ]);
    }
}
