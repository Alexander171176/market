<?php

// resources/lang/en/admin/requests/PluginRequest.php

return [
    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.',

    'name.required' => 'The plugin name is required.',
    'name.max' => 'The plugin name must not exceed :max characters.',
    'name.unique' => 'A plugin with that name already exists.',

    'version.max' => 'The plugin version must not exceed :max characters.',

    'icon.string' => 'The icon must be a string.',
    'icon.max' => 'The icon content is too long.',

    'description.string' => 'The description must be a string.',
    'description.max' => 'The description is too long.',

    'readme.string' => 'README must be a string.',

    'options.json' => ' Options must be a valid JSON string.', // Added

    'code.string' => 'The code must be a string.',
    'code.max' => 'The code must not exceed :max characters.',
    'code.regex' => 'The code can only contain Latin letters, numbers, and underscores.', // Added
// 'code.unique' => 'A plugin with this code already exists.', // If the code is unique

    'templates.max' => 'The template field must not exceed :max characters.',

    'activity.required' => 'The activity field is required.',
    'activity.boolean' => 'The activity field must be logical.',
];
