<?php

// resources/lang/en/admin/requests/PermissionRequest.php

return [
    'name.required' => 'The permission name is required.',
    'name.string' => 'The permission name must be a string.',
    'name.max' => 'The permission name must not exceed :max characters.',
    'name.unique' => 'A permission with the same name already exists for the specified guard.', // Updated

    'guard_name.string' => 'Guard Name must be a string.',
    'guard_name.max' => 'Guard Name must not exceed :max characters.',
];
