<?php

// resources/lang/kk/admin/requests/RoleRequest.php

return [
    'name.required' => 'Рөл атауы қажет.',
    'name.string' => 'Рөл атауы жол болуы керек.',
    'name.max' => 'Рөл атауы :max таңбадан аспауы керек.',
    'name.unique' => 'Көрсетілген күзетші үшін осындай атпен рөл бұрыннан бар.', // Нақтыланған

    'guard_name.string' => 'Қорғау атауы жол болуы керек.',
    'guard_name.max' => 'Қорғау атауы :max таңбадан аспауы керек.',

    'permissions.array' => 'Рұқсаттар массив болуы керек.',
    'permissions.*.exists' => 'Жоқ рұқсат таңдалды (ID: :value).',
];
