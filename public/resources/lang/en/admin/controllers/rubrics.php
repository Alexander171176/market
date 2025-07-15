<?php

// resources/lang/en/admin/controllers/rubrics.php

return [

    // General actions
    'created' => 'The category was created successfully.',
    'updated' => 'The category has been successfully updated.',
    'deleted' => 'The category was successfully deleted.',
    'create_error' => 'An error occurred when creating the category.',
    'update_error' => 'An error occurred when updating the category.',
    'delete_error' => 'An error occurred when deleting a category.',

    // Bulk operations
    'bulk_deleted' => 'The selected categories (:count pcs.) have been successfully deleted.',
    'bulk_delete_error' => 'An error occurred when deleting categories.',

    // Activity
    'activated' => 'activated',
    'deactivated' => 'deactivated',
    'activity' => 'Category ":title" was :action.',
    'update_activity_error' => 'An error occurred while updating the activity.',

    // Sorting
    'update_sort_error' => 'The sorting could not be updated.',
    'update_sort_bulk_error' => 'not can update the order of the categories.',

    // Cloning
    'cloned' => 'The category has been successfully cloned.',
    'clone_error' => 'Category cloning error.',
    'clone_title_error' => 'Error: A category with that Name and Language already exists.',
    'clone_url_error' => 'Error: A category with this URL and Language already exists.',
    'clone_unique_error' => 'Cloning error: Violation of uniqueness.',

    // Loading the list
    'index_load_error' => 'not can load the list of categories.',

];
