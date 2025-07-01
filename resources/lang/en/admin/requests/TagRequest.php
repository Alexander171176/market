<?php

// resources/lang/en/admin/requests/TagRequest.php

return [
    'locale.required' => 'The tag language is required.',
    'locale.in' => 'Acceptable languages: :values.',

    'name.required' => 'The tag name is required.',
    'name.max' => 'The tag name must not exceed :max characters.',
    'name.unique' => 'An tag with the same Name and Language already exists.', // Fixed

    'slug.required' => 'Tag slug is required.',
    'slug.max' => 'The tag slug must not exceed :max characters.',
    'slug.regex' => 'Slug must contain only Latin letters, numbers, and hyphens.', // Added
    'slug.unique' => 'An tag with such a Slug and Language already exists.', // Fixed

    'short.max' => 'The short description must not exceed :max characters.',
    'description.string' => 'The description must be a string.',

    'meta_title.max' => 'Meta header must not exceed :max characters.',
    'meta_keywords.max' => 'Meta keywords must not exceed :max characters.',
    'meta_desc.string' => 'Meta description must be a string.', // Fixed

    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.', // Added
    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.', // Added

    'views.integer' => 'The number of views must be a number.', // Added
    'views.min' => 'The number of views cannot be negative.', // Added
];
