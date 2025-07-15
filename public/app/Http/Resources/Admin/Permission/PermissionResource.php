<?php

namespace App\Http\Resources\Admin\Permission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// Можно импортировать RoleResource или RoleSharedResource, если нужна обратная связь
// use App\Http\Resources\Admin\Role\RoleSharedResource;

class PermissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'guard_name' => $this->guard_name, // <--- ДОБАВЛЕНО
            'created_at' => $this->created_at?->toIso8601String(), // <--- ДОБАВЛЕНО
            'updated_at' => $this->updated_at?->toIso8601String(), // <--- ДОБАВЛЕНО

            // Счетчики (если нужны и используются обратные связи/withCount)
            // 'roles_count' => $this->whenCounted('roles'),
            // 'users_count' => $this->whenCounted('users'), // Для прямых назначений пользователям

            // Связи (если нужны и загружены)
            // 'roles' => RoleSharedResource::collection($this->whenLoaded('roles')),
        ];
    }
}
