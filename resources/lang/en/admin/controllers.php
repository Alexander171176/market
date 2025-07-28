<?php

// resources/lang/ru/admin/controllers/controllers.php

return [
    // CRUD actions
    'index_error' => 'Failed to load list.',
    'created_success' => 'Successfully created.',
    'created_error' => 'An error occurred while creating.',
    'updated_success' => 'Successfully updated.',
    'updated_error' => 'An error occurred while updating.',
    'deleted_success' => 'Deleted.',
    'deleted_error' => 'An error occurred while deleting.',

    // Activity
    'activity_updated_success' => 'Activated activity successfully updated.',
    'activity_updated_error' => 'An error occurred while updating activity.',
    'activated_success' => 'activated.',
    'deactivated_success' => 'deactivated.',

    // Sorting
    'sort_updated_success' => 'Sorting updated successfully.',
    'sort_updated_error' => 'Error updating sorting.',

    // Bulk operations
    'count' => 'count: ',
    'bulk_deleted_success' => 'Selected successfully deleted.',
    'bulk_deleted_error' => 'An error occurred while bulk deleting.',
    'bulk_left_updated_error' => 'An error occurred while bulk updating left column',
    'bulk_right_updated_error' => 'An error occurred while bulk updating right column',
    'bulk_main_updated_error' => 'An error occurred while bulk update in main',
    'bulk_sort_updated_success' => 'The order was updated successfully.',
    'bulk_sort_updated_error' => 'Error updating the order in bulk.',

    // Left, right sidebar and main
    'left_updated_success' => 'Successfully updated in the left column.',
    'left_updated_error' => 'Error updating in the left column.',
    'right_updated_success' => 'Successfully updated in the right column.',
    'right_updated_error' => 'Error updating in the right column.',
    'main_updated_success' => 'Successfully updated in the main.',
    'main_updated_error' => 'Error updating in the main.',

    // Cloning
    'cloned_success' => 'Successfully cloned.',
    'cloned_error' => 'Cloning error.',

    // Categories
    'index_locale_error' => 'Failed to load category list for selected locale.',
    'parent_load_error' => 'Failed to load parent category list.',

    'bulk_updated_activity_no_selection' => 'No categories selected for activity update.',
    'invalid_input_error' => 'Invalid input for order update.',
    'invalid_category_ids_error' => 'Invalid category IDs found or categories do not belong to selected locale.',
    'invalid_parent_ids_error' => 'Invalid parent category IDs found or parents do not belong to selected locale.',
    'parent_loop_error' => 'A category cannot be its own parent.',

    // Comments
    'comment_approved' => 'Comment approved',
    'comment_not_approved' => 'Approval not approved',

    // Components
    'file_saved_success' => 'File saved successfully.',
    'file_save_error' => 'Error saving file ":filename".',
    'file_not_allowed_error' => 'Error: Invalid file to save.',

    // Log
    'file_not_found_error' => 'Log file not found.',
    'log_cleared_success' => 'Log cleared',

    // Parameters
    'activity_update_forbidden_error' => 'Activity update is not allowed for this category',

    // Settings
    'value_updated_success' => 'Setting value updated',
    'value_updated_error' => 'Error updating setting value',
    'count_pages_updated_success' => 'Count of items on page updated successfully.',
    'count_pages_updated_error' => 'Error updating item count setting.',
    'sort_pages_updated_success' => 'Default sorting updated successfully.',
    'sort_pages_updated_error' => 'Error updating sorting setting.',

    // System
    'system_created_backup_error' => 'Error creating backup: ',
    'system_created_backup_success' => 'Backup created successfully.',
    'system_created_archive_error' => 'Failed to create backup before restoring: ',
    'system_created_archive_success' => 'Archive created successfully.',
    'system_file_not_found' => 'File not found.',
    'system_deleted_backup_success' => 'Backup deleted successfully.',
    'system_deleted_archive_success' => 'Archive deleted',
    'system_files_success' => 'Files restored successfully.',
    'system_files_error' => 'Error restoring files: ',
    'system_robots_updated_success' => 'Robots.txt file updated.',
    'system_xml_updated_success' => 'sitemap.xml updated',

    // Users
    'cannot_delete_superadmin' => 'Cannot delete admin.',
    'cannot_delete_main_admin' => 'Deleting main admin is prohibited.',
    'cannot_delete_single_admin' => 'Cannot delete user with single admin role.',

    // Roles
    'delete_main_role_error' => 'Deleting main role is prohibited.',
    'delete_base_role_error' => 'Deleting base roles is prohibited.',

    // Likes
    'liked_auth_error' => 'You need to log in to like.',
    'liked_user_error' => 'You already liked.',

    // Comments
    'commented_saved_error' => 'Error saving comment',
    'comment_not_active_error' => 'Comment not found or inactive',
    'comment_not_editing_error' => 'You cannot edit this comment',
    'commented_updated_error' => 'Error updating comment',
    'comment_not_deleted_error' => 'You cannot delete this comment',
    'comment_deleted_success' => 'Comment deleted',
    'comment_deleted_error' => 'Error deleting comment',

];
