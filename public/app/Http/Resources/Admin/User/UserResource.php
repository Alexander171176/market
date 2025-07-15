<?php

namespace App\Http\Resources\Admin\User;

use App\Http\Resources\Admin\Permission\PermissionResource;
use App\Http\Resources\Admin\Role\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id'                 => $this->id,
            'name'               => $this->name,
            'email'              => $this->email,
            'email_verified_at'  => $this->email_verified_at?->toIso8601String(), // <--- ДОБАВЛЕНО
            'profile_photo_url'  => $this->profile_photo_url, // <--- ДОБАВЛЕНО (из $appends)
            'created_at'         => $this->created_at?->toIso8601String(), // <--- ДОБАВЛЕНО
            'updated_at'         => $this->updated_at?->toIso8601String(), // <--- ДОБАВЛЕНО

            // Счетчики (если нужны и используются с withCount)
            'roles_count'        => $this->whenCounted('roles'),       // <--- ДОБАВЛЕНО
            'permissions_count'  => $this->whenCounted('permissions'), // <--- ДОБАВЛЕНО (прямые разрешения)

            // Полные данные связей
            'roles'              => RoleResource::collection($this->whenLoaded('roles')),
            'permissions'        => PermissionResource::collection($this->whenLoaded('permissions')), // Прямые разрешения
            // 'all_permissions' => PermissionResource::collection($this->whenLoaded('allPermissions')), // Если загружали все разрешения (включая через роли)
        ];
    }
}
