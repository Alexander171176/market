<?php

// resources/lang/en/admin/requests/RoleRequest.php

return [
    'name.required' => 'The role name is required.',
    'name.string' => 'The role name must be a string.',
    'name.max' => 'The role name must not exceed :max characters.',
    'name.unique' => 'A role with the same name already exists for the specified guard.', // Clarified

    'guard_name.string' => 'Guard Name must be a string.',
    'guard_name.max' => 'Guard Name must not exceed :max characters.',

    'permissions.array' => 'Permissions must be an array.',
    'permissions.*.exists' => 'A non-existent permission was selected (ID: :value).',
];
