<?php

namespace App\Http\Requests\Admin\Video;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use Illuminate\Http\UploadedFile; // Для проверки типа файла

class VideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // if ($this->isMethod('POST')) return $this->user()->can('create videos');
        // if ($this->isMethod('PUT') || $this->isMethod('PATCH')) return $this->user()->can('update', $this->route('video'));
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isCreating = $this->isMethod('post');
        $videoId    = $this->route('video')?->id;

        // условное правило для запрета связывать видео само с собой
        $relatedExistsRule = Rule::exists('videos', 'id')->where(function($query) use ($videoId) {
            if ($videoId) {
                $query->where('id', '!=', $videoId);
            }
        });

        return [
            'sort'            => 'nullable|integer|min:0',
            'activity'        => 'required|boolean',
            'left'            => 'required|boolean',
            'main'            => 'required|boolean',
            'right'           => 'required|boolean',
            'locale'          => ['required', 'string', 'size:2', Rule::in(['ru','en','kk'])],
            'title'           => [
                'required','string','max:255',
                Rule::unique('videos')->where(fn($q)=>$q->where('locale',$this->input('locale')))->ignore($videoId),
            ],
            'url'             => [
                'required','string','max:500','regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('videos')->where(fn($q)=>$q->where('locale',$this->input('locale')))->ignore($videoId),
            ],
            'short'           => 'nullable|string|max:255',
            'description'     => 'nullable|string',
            'author'          => 'nullable|string|max:255',
            'published_at'    => 'nullable|date_format:Y-m-d',
            'duration'        => 'nullable|integer|min:0',
            'source_type'       => ['required', Rule::in(['local','youtube','vimeo','code'])],

            // для кодового варианта вводим отдельное поле embed_code:
            'embed_code' => [
                Rule::requiredIf(fn() => $this->input('source_type') === 'code'),
                'nullable','string','max:65535', // количество символов кода HTML
            ],

            // Для YouTube/Vimeo
            'external_video_id' => [
                'nullable',
                Rule::requiredIf(fn() => in_array($this->input('source_type'), ['youtube','vimeo'])),
                'string',
                'max:65535',
            ],

            // для локального: требуем либо файл, либо URL
            'video_file' => [
                'nullable',
                Rule::requiredIf(fn() => $this->input('source_type') === 'local' && $isCreating),
                'file',
                'mimes:mp4,mov,ogg,qt,webm,avi,mpeg,wmv',
                'max:204800', // размер видеофайла
            ],
            // вот это поле — пока просто nullable
            'video_url'       => ['nullable', 'string', 'max:500'], // количество символов url

            'views'           => 'nullable|integer|min:0',
            'likes'           => 'nullable|integer|min:0',
            'meta_title'      => 'nullable|string|max:255',
            'meta_keywords'   => 'nullable|string|max:255',
            'meta_desc'       => 'nullable|string',

            'sections'        => ['nullable','array'],
            'sections.*.id'   => ['required_with:sections','integer','exists:sections,id'],

            'articles'        => ['nullable','array'],
            'articles.*.id'   => ['required_with:articles','integer','exists:articles,id'],

            'related_videos'     => ['nullable','array'],
            'related_videos.*.id' => ['required_with:related_videos','integer',$relatedExistsRule],

            'images'          => ['nullable','array'],
            'images.*.id'     => [
                'nullable','integer',
                Rule::exists('video_images','id'),
                Rule::prohibitedIf(fn() => $isCreating),
            ],
            'images.*.order'   => ['nullable','integer','min:0'],
            'images.*.alt'     => ['nullable','string','max:255'],
            'images.*.caption' => ['nullable','string','max:255'],
            'images.*.file'    => [
                'nullable','file','image',
                'mimes:jpeg,jpg,png,gif,svg,webp','max:10240',
                'required_without:images.*.id',
            ],

            'deletedImages'     => ['sometimes','array'],
            'deletedImages.*'   => ['integer','exists:video_images,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/VideoRequest');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'activity' => filter_var($this->input('activity'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'left' => filter_var($this->input('left'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'main' => filter_var($this->input('main'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'right' => filter_var($this->input('right'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
        ]);

        $this->merge([
            'views' => is_numeric($this->input('views')) ? (int)$this->input('views') : 0,
            'likes' => is_numeric($this->input('likes')) ? (int)$this->input('likes') : 0,
        ]);

        parent::prepareForValidation();
        // Очистим поля в зависимости от source_type
        if ($this->input('source_type') !== 'code') {
            $this->merge(['embed_code' => null]);
        }
        if (! in_array($this->input('source_type'), ['youtube','vimeo'])) {
            $this->merge(['external_video_id' => null]);
        }
        if ($this->input('source_type') !== 'local') {
            $this->merge(['video_file' => null, 'video_url' => null]);
        }
    }
}
