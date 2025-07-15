<?php

// resources/lang/en/admin/requests/VideoRequest.php

return [
    'locale.required'           => 'The language of the video is required.',
    'locale.size'               => 'The language code must consist of :size characters.',
    'locale.in'                 => 'Acceptable languages: :values.',

    'title.required'            => 'The name of the video is required.',
    'title.max' => 'The video title must not exceed :max characters.',
    'title.unique'              => 'A video with the same Name and Language already exists.',

    'url.required'              => 'The URL of the video is required.',
    'url.max' => 'The video URL must not exceed :max characters.',
    'url.regex'                 => 'The URL must contain only Latin letters, numbers, and hyphens.',
    'url.unique'                => 'A video with this URL and Language already exists.',

    'published_at.date_format' => 'Incorrect publication date format (expected YYYY-MM-DD).',

    'duration.integer'          => 'The video duration must be an integer (seconds).',
    'duration.min'              => 'The duration of the video cannot be negative.',

    'source_type.required'      => 'You need to select the type of video source.',
    'source_type.in'            => 'An invalid video source type is selected.',

    'external_video_id.required' => 'You need to specify the link/ID only for YouTube or Vimeo.',
    'external_video_id.max' => 'The ID/link/code field is too long (max. :max characters).',

    'video_file.required'       => 'It is necessary to download the file for the local video.',
    'video_file.file'           => 'There is a problem when uploading a video file.',
    'video_file.mimes'          => 'Invalid video file format. Allowed: :values.',
    'video_file.max'            => 'The video file is too large (max. :max Kb).',

    'video_url.required'        => 'You need to specify the URL for the local video or insert a code for the type "code".',

    'short.max' => 'The short description must not exceed :max characters.',
    'description.max'           => 'The description is too long (max. :max characters).', // Added if a restriction is needed

    'author.max' => 'The author name must not exceed :max characters.',

    'views.min'                 => 'The number of views cannot be negative.',
    'likes.min'                 => 'The number of likes cannot be negative.',

    'meta_title.max' => 'Meta header must not exceed :max characters.',
    'meta_keywords.max' => 'Meta keywords must not exceed :max characters.',
    'meta_desc.max' => 'Meta description is too long (max :max characters).', // Removed

    'sort.min'                  => 'The sort field cannot be negative.',
    'activity.required'         => 'The activity field is required.',
    'left.required'             => 'The "In the left column" field is required.',
    'main.required'             => 'The "Main video" field is required.',
    'right.required'            => 'The "In the right column" field is required.',

    'sections.*.id.required_with' => 'Section ID is required.',
    'sections.*.id.exists'      => 'A non-existent section is selected (ID: :value).', // :value will show the ID
    'articles.*.id.required_with' => 'Article ID is required.',
    'articles.*.id.exists'      => 'A non-existent article has been selected (ID: :value).',

    'related_videos.*.id.required_with' => 'The ID of the linked video is required.',
    'related_videos.*.id.exists'      => 'A non-existent linked video has been selected (ID: :value).',
    'related_videos.*.id.where_not'   => 'The video cannot be linked to itself.', // Although whereNot does not create a message

    'images.*.id.exists'        => 'The specified preview image does not exist (ID: :value).',
    'images.*.id.prohibited'    => 'The preview image ID cannot be transmitted during creation.',
    'images.*.order.min'        => 'The preview image order cannot be negative.',
    'images.*.file.required'    => 'The preview image file is required for new images.',
    'images.*.file.image'       => 'The preview file must be an image.',
    'images.*.file.mimes'       => 'Invalid preview file format. Allowed: :values.',
    'images.*.file.max' => 'The preview file is too large (max. :max Kb).',
    'images.*.file.required_without' => 'The image file is required for new images.',

    'deletedImages.*.exists'    => 'An attempt to delete a non-existent preview image (ID: :value).',
];
