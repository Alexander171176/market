<?php

namespace App\Http\Resources\Admin\Role;

use App\Http\Resources\Admin\Permission\PermissionResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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

            // Счетчики
            'permissions_count' => $this->whenCounted('permissions'), // <--- ДОБАВЛЕНО
            // 'users_count' => $this->whenCounted('users'), // Если есть обратная связь users() и нужна

            // Связи
            'permissions' => PermissionResource::collection($this->whenLoaded('permissions')),
            // 'users' => UserSharedResource::collection($this->whenLoaded('users')), // Если нужна связь users()
        ];
    }
}
