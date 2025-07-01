<?php

// resources/lang/en/admin/requests/ArticleRequest.php

return [
    'locale.required' => 'The language of the article is required.',
    'locale.string' => 'The language must be a string.',
    'locale.size' => 'The language code must consist of 2 characters (for example, "ru", "en", "kz").',
    'locale.in ' => 'Acceptable languages: ru, en, kk.',

    'title.required' => 'The title of the article is required.',
    'title.string' => 'The title of the article must be a string.',
    'title.max' => 'The title of the article should not exceed 255 characters.',
    'title.unique' => 'An article with the same Name and Language already exists.', // Updated

    'url.required' => 'The URL of the article is required.',
    'url.string' => 'The URL of the article must be a string.',
    'url.max' => 'The URL of the article must not exceed 500 characters.', // Fixed
    'url.regex' => 'The URL must contain only Latin letters, numbers, and hyphens.', // Added
    'url.unique' => 'An article with this URL and Language already exists.', // Updated

    'published_at.date' => 'Incorrect publication date format.', // Added

    'short.string' => 'The short description must be a string.',
    'short.max' => 'The short description must not exceed 255 characters.',

    'description.string' => 'The description must be a string.',

    'author.string' => 'The author name must be a string.',
    'author.max' => 'The author name must not exceed 255 characters.',

    'views.integer' => 'The number of views must be a number.',
    'views.min' => 'The number of views cannot be negative.',

    'likes.integer' => 'The number of likes must be a number.',
    'likes.min' => 'The number of likes cannot be negative.',

    'meta_title.max' => 'Meta title must not exceed 255 characters.',
    'meta_keywords.max' => 'Meta keywords must not exceed 255 characters.',
    'meta_desc.string' => 'Meta description must be a string.', // Fixed

    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.', // Added
    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    'left.required' => 'The field "In the left column" must be filled in.', // Clarified
    'left.boolean' => 'The "In the left column" field must be a boolean value.',

    'main.required' => 'The "Main news" field must be filled in.', // Clarified
    'main.boolean' => 'The "Main News" field must be a boolean value.',

    'right.required' => 'The field "In the right column" must be filled in.', // Clarified
    'right.boolean' => 'The "In the right column" field must be a boolean value.',

    'sections.array' => 'Sections must be an array.',
    'sections.*.id.required_with' => 'Section ID is required.',
    'sections.*.id.integer' => 'The section ID must be a number.',
    'sections.*.id.exists' => 'A non-existent section has been selected.',

    'tags.array' => 'Tags must be an array.',
    'tags.*.id.required_with' => 'Tag ID is required.',
    'tags.*.id.integer' => 'The tag ID must be a number.',
    'tags.*.id.exists' => 'A non-existent tag is selected.',

    'related_articles.array' => 'The list of related articles should be an array.',
    'related_articles.*.id.required_with' => 'The ID of the linked article is required.',
    'related_articles.*.id.integer' => 'The ID of the linked article must be a number.',
    'related_articles.*.id.exists' => 'A non-existent linked article has been selected.',

    'images.array' => 'Images must be an array.',
    'images.*.id.integer' => 'The image ID must be a number.',
    'images.*.id.exists' => 'The specified image does not exist.',
    'images.*.id.prohibited' => 'Image ID cannot be passed during creation.', // Added
    'images.*.order.integer' => 'The order of the image should be a number.',
    'images.*.order.min' => 'The image order cannot be negative.',
    'images.*.alt.string' => 'Alt image text must be a string.',
    'images.*.alt.max' => 'Alt text must not exceed 255 characters.',
    'images.*.caption.string' => 'The image caption must be a string.',
    'images.*.caption.max' => 'The signature must not exceed 255 characters.',
    'images.*.file.required' => 'Image file is required for new images.', // Added
    'images.*.file.file' => 'There is a problem with uploading the image file.', // Added
    'images.*.file.image' => 'The file must be an image.',
    'images.*.file.mimes' => 'The file must be in jpeg, jpg, png, gif, svg or webp format.', // Formats added
    'images.*.file.max' => 'The size of the image file must not exceed 10 MB.',
    'images.*.file.required_without' => 'The image file is required for new images.',

    'deletedImages.array' => 'The list of deleted images must be an array.',
    'deletedImages.*.integer' => 'The ID of the deleted image must be a number.',
    'deletedImages.*.exists' => 'An attempt to delete a non-existent image.',
];
