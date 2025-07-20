<?php

namespace Database\Seeders;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Comment\Comment;
use App\Models\Admin\Video\Video;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $articles = Article::limit(8)->get();
        $videos = Video::limit(3)->get(); // ← ограничиваем видео

        $commentables = [
            Article::class => $articles,
            Video::class => $videos,
        ];

        foreach ($commentables as $modelClass => $models) {
            foreach ($models as $model) {
                // 3 корневых комментария
                $parents = Comment::factory()
                    ->count(3)
                    ->create([
                        'user_id' => $users->random()->id,
                        'commentable_id' => $model->id,
                        'commentable_type' => $modelClass,
                        'parent_id' => null,
                    ]);

                foreach ($parents as $parentLevel1) {
                    // 1–2 ответа ко 2-му уровню
                    $childrenLevel2 = Comment::factory()
                        ->count(rand(1, 2))
                        ->create([
                            'user_id' => $users->random()->id,
                            'commentable_id' => $parentLevel1->commentable_id,
                            'commentable_type' => $parentLevel1->commentable_type,
                            'parent_id' => $parentLevel1->id,
                        ]);

                    foreach ($childrenLevel2 as $parentLevel2) {
                        // 1–2 ответа к 3-му уровню
                        Comment::factory()
                            ->count(rand(1, 2))
                            ->create([
                                'user_id' => $users->random()->id,
                                'commentable_id' => $parentLevel2->commentable_id,
                                'commentable_type' => $parentLevel2->commentable_type,
                                'parent_id' => $parentLevel2->id,
                            ]);
                    }
                }
            }
        }
    }
}
