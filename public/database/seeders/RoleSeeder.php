<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $role_editor = Role::create(['name' => 'editor']);
        $role_user = Role::create(['name' => 'user']);

        $permission_show_users = Permission::create(['name' => 'show-users']);
        $permission_create_users = Permission::create(['name' => 'create-users']);
        $permission_edit_users = Permission::create(['name' => 'edit-users']);
        $permission_delete_users = Permission::create(['name' => 'delete-users']);
        $permission_show_roles = Permission::create(['name' => 'show-roles']);
        $permission_create_roles = Permission::create(['name' => 'create-roles']);
        $permission_edit_roles = Permission::create(['name' => 'edit-roles']);
        $permission_delete_roles = Permission::create(['name' => 'delete-roles']);
        $permission_show_permissions = Permission::create(['name' => 'show-permissions']);
        $permission_create_permissions = Permission::create(['name' => 'create-permissions']);
        $permission_edit_permissions = Permission::create(['name' => 'edit-permissions']);
        $permission_delete_permissions = Permission::create(['name' => 'delete-permissions']);
        $permission_show_settings = Permission::create(['name' => 'show-settings']);
        $permission_create_settings = Permission::create(['name' => 'create-settings']);
        $permission_edit_settings = Permission::create(['name' => 'edit-settings']);
        $permission_delete_settings = Permission::create(['name' => 'delete-settings']);
        $permission_show_plugins = Permission::create(['name' => 'show-plugins']);
        $permission_create_plugins = Permission::create(['name' => 'create-plugins']);
        $permission_edit_plugins = Permission::create(['name' => 'edit-plugins']);
        $permission_delete_plugins = Permission::create(['name' => 'delete-plugins']);
        $permission_show_rubrics = Permission::create(['name' => 'show-rubrics']);
        $permission_create_rubrics = Permission::create(['name' => 'create-rubrics']);
        $permission_edit_rubrics = Permission::create(['name' => 'edit-rubrics']);
        $permission_delete_rubrics = Permission::create(['name' => 'delete-rubrics']);
        $permission_show_sections = Permission::create(['name' => 'show-sections']);
        $permission_create_sections = Permission::create(['name' => 'create-sections']);
        $permission_edit_sections = Permission::create(['name' => 'edit-sections']);
        $permission_delete_sections = Permission::create(['name' => 'delete-sections']);
        $permission_show_articles = Permission::create(['name' => 'show-articles']);
        $permission_create_articles = Permission::create(['name' => 'create-articles']);
        $permission_edit_articles = Permission::create(['name' => 'edit-articles']);
        $permission_delete_articles = Permission::create(['name' => 'delete-articles']);
        $permission_show_banners = Permission::create(['name' => 'show-banners']);
        $permission_create_banners = Permission::create(['name' => 'create-banners']);
        $permission_edit_banners = Permission::create(['name' => 'edit-banners']);
        $permission_delete_banners = Permission::create(['name' => 'delete-banners']);
        $permission_show_videos = Permission::create(['name' => 'show-videos']);
        $permission_create_videos = Permission::create(['name' => 'create-videos']);
        $permission_edit_videos = Permission::create(['name' => 'edit-videos']);
        $permission_delete_videos = Permission::create(['name' => 'delete-videos']);
        $permission_show_athletes = Permission::create(['name' => 'show-athletes']);
        $permission_create_athletes = Permission::create(['name' => 'create-athletes']);
        $permission_edit_athletes = Permission::create(['name' => 'edit-athletes']);
        $permission_delete_athletes = Permission::create(['name' => 'delete-athletes']);
        $permission_show_tournaments = Permission::create(['name' => 'show-tournaments']);
        $permission_create_tournaments = Permission::create(['name' => 'create-tournaments']);
        $permission_edit_tournaments = Permission::create(['name' => 'edit-tournaments']);
        $permission_delete_tournaments = Permission::create(['name' => 'delete-tournaments']);
        $permission_show_tags = Permission::create(['name' => 'show-tags']);
        $permission_create_tags = Permission::create(['name' => 'create-tags']);
        $permission_edit_tags = Permission::create(['name' => 'edit-tags']);
        $permission_delete_tags = Permission::create(['name' => 'delete-tags']);
        $permission_show_components = Permission::create(['name' => 'show-components']);
        $permission_edit_components = Permission::create(['name' => 'edit-components']);
        $permission_show_systems = Permission::create(['name' => 'show-systems']);
        $permission_show_logs = Permission::create(['name' => 'show-logs']);
        $permission_clear_logs = Permission::create(['name' => 'clear-logs']);
        $permission_show_reports = Permission::create(['name' => 'show-reports']);
        $permission_download_reports = Permission::create(['name' => 'download-reports']);
        $permission_show_charts = Permission::create(['name' => 'show-charts']);
        $permission_show_comments = Permission::create(['name' => 'show-comments']);
        $permission_edit_comments = Permission::create(['name' => 'edit-comments']);
        $permission_delete_comments = Permission::create(['name' => 'delete-comments']);
        $permission_approve_comments = Permission::create(['name' => 'approve-comments']);

        $permissions_admin = [
            $permission_show_users,
            $permission_create_users,
            $permission_edit_users,
            $permission_delete_users,
            $permission_show_roles,
            $permission_create_roles,
            $permission_edit_roles,
            $permission_delete_roles,
            $permission_show_permissions,
            $permission_create_permissions,
            $permission_edit_permissions,
            $permission_delete_permissions,
            $permission_show_settings,
            $permission_create_settings,
            $permission_edit_settings,
            $permission_delete_settings,
            $permission_show_plugins,
            $permission_create_plugins,
            $permission_edit_plugins,
            $permission_delete_plugins,
            $permission_show_rubrics,
            $permission_create_rubrics,
            $permission_edit_rubrics,
            $permission_delete_rubrics,
            $permission_show_sections,
            $permission_create_sections,
            $permission_edit_sections,
            $permission_delete_sections,
            $permission_show_articles,
            $permission_create_articles,
            $permission_edit_articles,
            $permission_delete_articles,
            $permission_show_banners,
            $permission_create_banners,
            $permission_edit_banners,
            $permission_delete_banners,
            $permission_show_videos,
            $permission_create_videos,
            $permission_edit_videos,
            $permission_delete_videos,
            $permission_show_athletes,
            $permission_create_athletes,
            $permission_edit_athletes,
            $permission_delete_athletes,
            $permission_show_tournaments,
            $permission_create_tournaments,
            $permission_edit_tournaments,
            $permission_delete_tournaments,
            $permission_show_tags,
            $permission_create_tags,
            $permission_edit_tags,
            $permission_delete_tags,
            $permission_show_components,
            $permission_edit_components,
            $permission_show_systems,
            $permission_show_logs,
            $permission_clear_logs,
            $permission_show_reports,
            $permission_download_reports,
            $permission_show_charts,
            $permission_show_comments,
            $permission_edit_comments,
            $permission_delete_comments,
            $permission_approve_comments,
        ];

        $permissions_editor = [
            $permission_show_users,
            $permission_show_rubrics,
            $permission_create_rubrics,
            $permission_edit_rubrics,
            $permission_delete_rubrics,
            $permission_show_sections,
            $permission_create_sections,
            $permission_edit_sections,
            $permission_delete_sections,
            $permission_show_articles,
            $permission_create_articles,
            $permission_edit_articles,
            $permission_delete_articles,
            $permission_show_banners,
            $permission_create_banners,
            $permission_edit_banners,
            $permission_delete_banners,
            $permission_show_videos,
            $permission_create_videos,
            $permission_edit_videos,
            $permission_delete_videos,
            $permission_show_athletes,
            $permission_create_athletes,
            $permission_edit_athletes,
            $permission_delete_athletes,
            $permission_show_tournaments,
            $permission_create_tournaments,
            $permission_edit_tournaments,
            $permission_delete_tournaments,
            $permission_show_tags,
            $permission_create_tags,
            $permission_edit_tags,
            $permission_delete_tags,
        ];

        $permissions_user = [
            $permission_show_articles,
        ];

        $role_admin->syncPermissions($permissions_admin);
        $role_editor->syncPermissions($permissions_editor);
        $role_user->syncPermissions($permissions_user);
    }
}
