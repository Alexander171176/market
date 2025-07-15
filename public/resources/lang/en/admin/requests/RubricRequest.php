<?php

// resources/lang/en/admin/requests/RubricRequest.php

return [
    'locale.required' => 'The language of the category is required.',
    'locale.in' => 'Acceptable languages: :values.',

    'title.required' => 'The name of the category is required.',
    'title.max' => 'The category name must not exceed :max characters.',
    'title.unique' => 'A category with the same Name and Language already exists.', // Fixed

    'url.required' => 'The category URL is required.',
    'url.max' => 'The category URL must not exceed :max characters.', // Fixed
    'url.regex' => 'The URL must contain only Latin letters, numbers, and hyphens.', // Added
    'url.unique' => 'A category with this URL and Language already exists.', // Fixed

    'short.max' => 'The short description must not exceed :max characters.',
    'description.string' => 'The description must be a string.', // Added

    'icon.string' => 'The icon must be a string.',
    'icon.max' => 'The icon content is too long.', // Fixed

    'views.integer' => 'The number of views must be a number.', // Added
    'views.min' => 'The number of views cannot be negative.', // Added

    'meta_title.max' => 'Meta header must not exceed :max characters.',
    'meta_keywords.max' => 'Meta keywords must not exceed :max characters.',
    'meta_desc.string' => 'Meta description must be a string.', // Fixed

    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.', // Added
    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    // Messages for sections, if they are validated here
    'sections.array' => 'Sections must be an array.',
    'sections.*.id.required_with' => 'Section ID is required.',
    'sections.*.id.integer' => 'The section ID must be a number.',
    'sections.*.id.exists' => 'A non-existent section has been selected.',
];
