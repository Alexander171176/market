<?php

// resources/lang/ru/admin/requests/RoleRequest.php

return [
    'name.required' => 'Название роли обязательно.',
    'name.string' => 'Название роли должно быть строкой.',
    'name.max' => 'Название роли не должно превышать :max символов.',
    'name.unique' => 'Роль с таким названием для указанного guard уже существует.', // Уточнено

    'guard_name.string' => 'Guard Name должен быть строкой.',
    'guard_name.max' => 'Guard Name не должен превышать :max символов.',

    'permissions.array' => 'Разрешения должны быть массивом.',
    'permissions.*.exists' => 'Выбрано несуществующее разрешение (ID: :value).',
];
