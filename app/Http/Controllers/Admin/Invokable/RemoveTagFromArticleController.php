<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Tag\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class RemoveTagFromArticleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Article $article, Tag $tag): RedirectResponse
    {
        try {
            $detached = $article->tags()->detach($tag->id);

            if ($detached) {
                Log::info('Тег успешно удален у статьи', [
                    'tag_id' => $tag->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Тег '{$tag->name}' успешно удалён у статьи '{$article->title}'.");
            } else {
                Log::warning('Связь тега и статьи отсутствовала', [
                    'tag_id' => $tag->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', 'Связь уже была удалена.');
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при удалении тега у статьи: " . $e->getMessage(), [
                'tag_id' => $tag->id,
                'article_id' => $article->id,
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при удалении связи.');
        }
    }

}
