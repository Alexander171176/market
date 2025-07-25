<?php

// resources/lang/en/admin/requests/CategoryRequest.php

return [
    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be less than :min.',

    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    'locale.required' => 'The locale field must be filled in.',
    'locale.string' => 'The locale field must be a string.',
    'locale.size' => 'The locale field must contain exactly :the size of the character.',
    'locale.in' => 'The selected locale value is invalid.', // A good message for Rule::in

    'title.required' => 'The header field must be filled in.',
    'title.string' => 'The header field must be a string.',
    'title.max' => 'The header field must not exceed :max characters.',
// The message 'unique' is already suitable, because the unique rule takes into account the locale
    'title.unique' => 'A category with this title already exists for the selected locale.',

    'url.required' => 'The URL field must be filled in.',
    'url.string' => 'The URL field must be a string.',
    'url.max' => 'The URL field must not exceed :max characters.',
    // Update this message if you have changed the regex (for example, if slashes are allowed)
    'url.regex' => 'The URL field should contain only lowercase Latin letters, numbers, and hyphens.',
// The message 'unique' is already suitable
    'url.unique' => 'A category with this URL already exists for the selected locale.',

    'short.string' => 'The short description field must be a string.',
    'short.max' => 'The short description field must not exceed :max characters.',

    'description.string' => 'The description field must be a string.',

    'meta_title.string' => 'The meta header field must be a string.',
    'meta_title.max' => 'The meta header field cannot exceed :max characters.',

    'meta_keywords.string' => 'The meta keywords field must be a string.',
    'meta_keywords.max' => 'The meta keyword field cannot exceed :max characters.',

    'meta_desc.string' => 'The meta description field must be a string.',

    // Updated message for exists, including locale check
    'parent_id.exists' => 'The selected parent category does not exist or belongs to a different locale.',
    // Added a message for not_in (forbidding the installation of a parent on itself)
    'parent_id.not_in' => 'A category cannot be a child of itself.',
    'parent_id.integer' => 'The ID of the parent category must be a number.', // Just in case

    'images.array' => 'Images must be an array.',
    'images.*.id.integer' => 'Image ID must be a number.',
    'images.*.id.exists' => 'The specified image does not exist.',
    'images.*.id.prohibited' => 'Image ID cannot be passed when creating.', // Added
    'images.*.order.integer' => 'Image order must be a number.',
    'images.*.order.min' => 'Image order cannot be negative.',
    'images.*.alt.string' => 'Image Alt text must be a string.',
    'images.*.alt.max' => 'Alt text must not exceed 255 characters.',
    'images.*.caption.string' => 'Caption images must be a string.',
    'images.*.caption.max' => 'Caption must not exceed 255 characters.',
    'images.*.file.required' => 'Image file is required for new images.', // Added
    'images.*.file.file' => 'Problem uploading image file.', // Added
    'images.*.file.image' => 'File must be an image.',
    'images.*.file.mimes' => 'File must be jpeg, jpg, png, gif, svg, or webp.', // Added formats
    'images.*.file.max' => 'Image file size must not exceed 10 MB.',
    'images.*.file.required_without' => 'Image file is required for new images.',

    'deletedImages.array' => 'The list of images to delete must be an array.',
    'deletedImages.*.integer' => 'The ID of the image to delete must be a number.',
    'deletedImages.*.exists' => 'Attempt to delete a non-existent image.',
];
