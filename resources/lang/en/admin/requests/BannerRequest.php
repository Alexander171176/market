<?php

// resources/lang/en/admin/requests/BannerRequest.php

return [
    'title.required' => 'The banner name must be filled in.', // Fixed
    'title.string' => 'The banner name must be a string.', // Fixed
    'title.max' => 'The banner name must not exceed :max characters.', // Fixed
    'title.unique' => 'A banner with that Name already exists.', // Fixed

    'link.string' => 'The link must be a string.', // Fixed
    'link.max' => 'The link is too long.', // Added

    'short.string' => 'The short description must be a string.',
    'short.max' => 'The short description must not exceed :max characters.',

    'comment.string' => 'The comment should be a line.', // Fixed
    'comment.max' => 'The comment must not exceed :max characters.', // Fixed

    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.', // Added
    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    'left.required' => 'The field "In the left column" must be filled in.',
    'left.boolean' => 'The "In the left column" field must be a boolean value.',

    'right.required' => 'The "In the right column" field must be filled in.',
    'right.boolean' => 'The "In the right column" field must be a boolean value.',

    'sections.array' => 'Sections must be an array.',
    'sections.*.id.required_with' => 'Section ID is required.', // Added
    'sections.*.id.integer' => 'Section ID must be a number.', // Added
    'sections.*.id.exists' => 'A non-existent section has been selected.', // Added

    'images.array' => 'Images must be an array.',
    'images.*.id.integer' => 'Image ID must be a number.', // Added
    'images.*.id.exists' => 'The specified banner image does not exist.', // Updated
    'images.*.id.prohibited' => 'Image ID cannot be passed during creation.', // Added
    'images.*.order.integer' => 'The order of the image must be a number.', // Added
    'images.*.order.min' => 'The order of the image cannot be negative.', // Added
    'images.*.alt.string' => 'Alt image text must be a string.',
    'images.*.alt.max' => 'Alt text must not exceed :max characters.',
    'images.*.caption.string' => 'The image caption must be a string.',
    'images.*.caption.max' => 'The signature must not exceed :max characters.',
    'images.*.file.required' => 'Image file is required for new images.', // Added
    'images.*.file.file' => 'There is a problem with uploading the image file.',
    'images.*.file.image' => 'The file must be an image.',
    'images.*.file.mimes' => 'The file must be in jpeg, jpg, png, gif, svg or webp format.', // Expanded
    'images.*.file.max' => 'The size of the image file must not exceed :max Kb.', // Specified Kb
    'images.*.file.required_without' => 'The image file is required for new images.',

    'deletedImages.array' => 'The list of deleted images must be an array.', // Added
    'deletedImages.*.integer' => 'The ID of the deleted image must be a number.', // Added
    'deletedImages.*.exists' => 'An attempt to delete a non-existent banner image.', // Clarified
];
