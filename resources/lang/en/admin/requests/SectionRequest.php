<?php

// resources/lang/en/admin/requests/SectionRequest.php

return [
    'locale.required' => 'The language of the section is required.',
    'locale.string' => 'The language must be a string.',
    'locale.size' => 'The language code must consist of 2 characters.',
    'locale.in' => 'Acceptable languages: :values.', // Use :values

    'title.required' => 'The section name is required.',
    'title.string' => 'The section name must be a string.',
    'title.max' => 'The section name must not exceed :max characters.',
    'title.unique' => 'A section with the same Name and Language already exists.', // Updated

    // Comment if you have added a url
    /*
    'url.required' => 'The section URL is required.',
    'url.string' => 'The section URL must be a string.',
    'url.max' => 'The section URL must not exceed :max characters.',
    'url.regex' => 'The URL must contain only Latin letters, numbers, and hyphens.',
    'url.unique' => 'A section with this URL and Language already exists.',
    */

    'short.string' => 'The short description must be a string.',
    'short.max' => 'The short description must not exceed :max characters.',

    'description.string' => 'The description must be a string.', // Added

    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.', // Added
    'activity.required' => 'The activity field must be filled in.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    'icon.string' => 'The icon must be a string.',
    'icon.max' => 'The icon must not exceed :max characters.',
    // 'icon_file.image' => 'The icon file must be an image.', // If the icon is a file
    // 'icon_file.mimes' => 'Acceptable icon formats are:values.',
    // 'icon_file.max' => 'The size of the icon file must not exceed :max KB.',
];
