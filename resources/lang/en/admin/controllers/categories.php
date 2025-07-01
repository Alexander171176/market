<?php

// resources/lang/en/admin/controllers/categories.php

return [

    // Loading errors
    'index_error' => 'The list of categories could not be loaded.',
    'index_locale_error' => 'The list of categories for the selected locale could not be loaded.',
    'parent_load_error' => 'The list of parent categories could not be loaded.',

    // General actions
    'created' => 'The category was created successfully.',
    'create_error' => 'An error occurred when creating the category.',
    'updated' => 'The category has been updated successfully.',
    'update_error' => 'An error occurred when updating the category.',
    'deleted' => 'The category was successfully deleted.',
    'delete_error' => 'An error occurred when deleting the category.',

    // Activity
    'activity' => 'Category activity status ":title" updated: :action.',
    'activated' => 'activated',
    'deactivated' => 'deactivated',
    'update_activity_error' => 'An error occurred while updating the categories activity status.',

    // Massive activity update
    'bulk_update_activity_no_selection' => 'No categories have been selected to update the activity.',
    'bulk_update_activity_success' => 'The activity status has been updated for :count categories(s): :action.',
    'bulk_update_activity_error' => 'An error occurred during a massive category activity update.',

    // Sorting
    'update_sort_error' => 'An error occurred when updating the category sorting.',
    'order_updated' => 'The category order has been successfully updated.',
    'bulk_update_sort_error' => 'An error occurred when updating the category order. Check the data and try again.',

    // Validation errors
    'invalid_input' => 'Incorrect input data for updating the order.',
    'invalid_category_ids' => 'Incorrect category IDs were detected or categories do not belong to the selected locale.',
    'invalid_parent_ids' => 'Incorrect parent category IDs were found, or the parents do not belong to the selected locale.',
    'parent_loop_error' => 'A category cannot be a parent to itself.',
];
