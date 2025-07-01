<?php

namespace App\Http\Resources\Admin\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile_photo_url' => $this->profile_photo_url, // Добавим фото
            // Возвращаем только имена ролей/разрешений
            'roles' => $this->whenLoaded('roles', fn() => $this->getRoleNames()), // Используем whenLoaded для оптимизации
            'permissions' => $this->whenLoaded('permissions', fn() => $this->getPermissionNames()), // Используем whenLoaded для оптимизации
            // 'created_at' => $this->created_at?->toIso8601String(), // Можно добавить дату создания, если нужно
        ];
    }
}
