<?php

// resources/lang/en/admin/requests.php

return [
    // Sorting
    'sort.required' => 'You must specify a sort value.',
    'sort.integer' => 'The sort field must be a number.',
    'sort.min' => 'The sort field cannot be negative.',

    // Activity
    'activity.required' => 'The activity field is required.',
    'activity.boolean' => 'The activity field must be a boolean value.',

    // Left Column
    'left.required' => 'The "Left Column" field is required.',
    'left.boolean' => 'The "Left Column" field must be a boolean value.',

    // Main
    'main.required' => 'The "Main" field is required.',
    'main.boolean' => 'The "In Main" field must be a boolean value.',

    // Right Column
    'right.required' => 'The "In Right Column" field is required.',
    'right.boolean' => 'The "In Right Column" field must be a boolean value.',

    // Localization
    'locale.required' => 'Language is required.',
    'locale.string' => 'Language must be a string.',
    'locale.size' => 'Language code must consist of 2 characters (for example, "ru", "en", "kz").',
    'locale.in' => 'Accepted languages: ru, en, kk.',

    // Title
    'title.required' => 'Title is required.',
    'title.string' => 'Title must be a string.',
    'title.max' => 'Title must not exceed 255 characters.',
    'title.unique' => 'There is already one with this Title and Language.',

    // URL
    'url.required' => 'URL is required.',
    'url.string' => 'URL must be a string.',
    'url.max' => 'URL must not exceed 500 characters.',
    'url.regex' => 'URL must contain only Latin letters, numbers and hyphens.',
    'url.unique' => 'There is already one with this URL and Language.',
    'link.string' => 'Link must be a string.',
    'link.max' => 'Link is too long.',
    'slug.required' => 'Slug of the tag is required.',
    'slug.max' => 'Tag Slug must not exceed :max characters.',
    'slug.regex' => 'Slug must contain only Latin letters, numbers and hyphens.',
    'slug.unique' => 'Tag with such Slug and Language already exists.',

    // Views
    'views.integer' => 'Views must be a number.',
    'views.min' => 'Views cannot be negative.',

    // Description
    'short.string' => 'Short description must be a string.',
    'short.max' => 'Short description must not exceed 255 characters.',
    'description.string' => 'Description must be a string.',
    'description.max' => 'Description is too long.',

    // Comments
    'comment.string' => 'Comment must be a string.',
    'comment.max' => 'Comment must not exceed :max characters.',
    'user_id.exists' => 'Selected user does not exist.',
    'commentable_id.required' => 'The entity to which the comment applies is not specified.',
    'commentable_type.required' => 'The entity type to which the comment applies is not specified.',
    'commentable_type.in' => 'Commenting on this entity type is not supported.',
    'content.required' => 'Comment text is required.',
    'content.max' => 'Comment text is too long.',
    'approved.required' => 'Approval status must be specified.',
    'approved.boolean' => 'Status approval must be Yes/No.',

    // Author
    'author.string' => 'Author name must be a string.',
    'author.max' => 'Author name must not exceed 255 characters.',

    // Published Date
    'published_at.date' => 'Invalid published date format.',
    'published_at.date_format' => 'Invalid published date format (expected YYYY-MM-DD).',

    // Meta SEO
    'meta_title.string' => 'The meta title field must be a string.',
    'meta_title.max' => 'The meta title field must not exceed 255 characters.',
    'meta_keywords.string' => 'The meta keywords field must be a string.',
    'meta_keywords.max' => 'The meta keywords field must not exceed 255 characters.',
    'meta_desc.string' => 'Meta description must be a string.',

    // Video
    'duration.integer' => 'Video duration must be an integer (seconds).',
    'duration.min' => 'Video duration cannot be negative.',
    'source_type.required' => 'You must select a video source type.',
    'source_type.in' => 'Invalid video source type selected.',
    'external_video_id.required' => 'You must specify a link/ID only for YouTube or Vimeo.',
    'external_video_id.max' => 'The ID/link/code field is too long (max :max characters).',
    'video_file.required' => 'You must upload a file for a local video.',
    'video_file.file' => 'Problem loading video file.',
    'video_file.mimes' => 'Invalid video file format. Allowed: :values.',
    'video_file.max' => 'Video file is too large (max :max KB).',
    'video_url.required' => 'You must specify a URL for a local video or paste the code for the "code" type.',

    // Sections
    'sections.array' => 'Sections must be an array.',
    'sections.*.id.required_with' => 'Section ID is required.',
    'sections.*.id.integer' => 'Section ID must be a number.',
    'sections.*.id.exists' => 'Selected non-existent section.',

    // Articles
    'articles.*.id.required_with' => 'Article ID is required.',
    'articles.*.id.exists' => 'Selected non-existent article (ID: :value).',

    // Tags
    'tags.array' => 'Tags must be an array.',
    'tags.*.id.required_with' => 'Tag ID is required.',
    'tags.*.id.integer' => 'Tag ID must be a number.',
    'tags.*.id.exists' => 'Non-existent tag selected.',

    // Recommended Articles
    'related_articles.array' => 'Related articles list must be an array.',
    'related_articles.*.id.required_with' => 'Related article ID is required.',
    'related_articles.*.id.integer' => 'Related article ID must be a number.',
    'related_articles.*.id.exists' => 'Non-existent related article selected.',

    // Recommended Videos
    'related_videos.*.id.required_with' => 'Related video ID is required.',
    'related_videos.*.id.exists' => 'Non-existent related video selected (ID: :value).',
    'related_videos.*.id.where_not' => 'A video cannot be related to itself.',

    // For child Categories
    'parent_id.exists' => 'The selected parent category does not exist or belongs to a different locale.',
    'parent_id.not_in' => 'A category cannot be a child of itself.',
    'parent_id.integer' => 'Parent page ID must be a number.',

    // Products
    'is_new.required' => 'The "is_new" field is required.',
    'is_hit.required' => 'The "is_hit" field is required.',
    'is_sale.required' => 'The "is_sale" field is required.',
    'sku.max' => 'The SKU must not exceed 255 characters.',
    'availability.max' => 'Availability field must not exceed 255 characters.',
    'barcode.max' => 'Barcode must not exceed 255 characters.',
    'price.numeric' => 'Price must be a number.',
    'old_price.numeric' => 'Old price must be a number.',
    'quantity.integer' => 'Quantity must be an integer.',
    'quantity.min' => 'Quantity cannot be less than 0.',
    'weight.numeric' => 'Weight must be a number.',
    'currency.max' => 'Currency code must not exceed 3 characters.',
    'admin.max' => 'Admin field must not exceed 255 characters.',
    'categories.array' => 'Categories must be passed as an array.',
    'categories.*.id.required_with' => 'Each category must contain an ID.',
    'categories.*.id.integer' => 'Category IDs must be integers.',
    'categories.*.id.exists' => 'A non-existent category was selected.',
    'related_products.array' => 'Featured products must be passed as an array.',
    'related_products.*.id.required_with' => 'Each featured product must contain an ID.',
    'related_products.*.id.integer' => 'The ID of a featured product must be an integer.',
    'related_products.*.id.exists' => 'One or more featured products were not found in the database.',
    'product_id.required' => 'The product is required to select.',
    'product_id.exists' => 'The selected product does not exist.',
    'weight.integer' => 'Weight must be an integer.',
    'currency.required' => 'Currency field is required.',
    'currency.size' => 'Currency must be 3 characters long.',
    'options.array' => 'Options must be an array.',

    // Properties
    'property_group_id.integer' => 'Group ID must be an integer.',
    'property_group_id.exists' => 'The selected group was not found.',
    'type.required' => 'Specify the property type.',
    'type.string' => 'Type must be a string.',
    'type.max' => 'Type must be 50 characters or less.',
    'slug.string' => 'Slug must be a string.',
    'all_categories.required' => 'Specify whether this applies to all categories.',
    'all_categories.boolean' => 'Must be a boolean.',
    'is_filterable.required' => 'Specify whether this feature is filterable.',
    'is_filterable.boolean' => 'Must be a boolean.',
    'filter_type.required' => 'Specify the filter type.',
    'filter_type.string' => 'Filter type must be a string.',
    'filter_type.max' => 'Filter type must be 50 characters or less.',
    'property_id.required' => 'A property must be specified.',
    'property_id.integer' => 'The property field must be a number.',
    'property_id.exists' => 'The specified property was not found.',
    'value.unique' => 'This value already exists within this property.',

    // Permissions and Roles
    'permissions.array' => 'Permissions must be an array.',
    'permissions.*.exists' => 'A non-existent permission (ID: :value) was selected.',
    'roles.array' => 'Roles must be an array.',

    // Name
    'name.required' => 'Name is required.',
    'name.string' => 'Name must be a string.',
    'name.max' => 'Name must not exceed :max characters.',
    'name.unique' => 'There is already a guard with this name.',

    // Guard
    'guard_name.string' => 'Guard Name must be a string.',
    'guard_name.max' => 'Guard Name must not exceed :max characters.',

    // Users
    'email.required' => 'Email is required.',
    'email.email' => 'Incorrect email format.',
    'email.unique' => 'This email is already registered.',

    // Plugins
    'version.max' => 'Plugin version must not exceed :max characters.',
    'readme.string' => 'README must be a string.',
    'options.json' => 'Options must be a valid JSON string.',
    'code.string' => 'Code must be a string.',
    'code.max' => 'Code must not exceed :max characters.',
    'code.regex' => 'Code can only contain Latin letters, numbers and underscores.',
    'templates.max' => 'Templates field must not exceed :max characters.',

    // Settings
    'type.in' => 'Invalid field type selected.',
    'option.required' => 'Option is required.',
    'option.unique' => 'A setting with this option already exists.',
    'constant.required' => 'Constant is required.',
    'constant.unique' => 'A setting with this constant already exists.',
    'constant.regex' => 'The constant must start with a CAPITAL Latin letter and contain only CAPITAL Latin letters, numbers and underscores.',
    'value.required' => 'The quantity must be specified.',
    'value.integer' => 'The quantity must be an integer.',
    'value.min' => 'The quantity must be at least :min.',
    'value.string' => 'The value must be a string.',
    'value.max' => 'The value is too long.',

    // Icon
    'icon.string' => 'The icon must be a string.',
    'icon.max' => 'The icon content is too long.',

    // Images
    'images.array' => 'Images must be an array.',
    'images.*.id.integer' => 'Image ID must be a number.',
    'images.*.id.exists' => 'The specified image does not exist.',
    'images.*.id.prohibited' => 'Image ID cannot be passed when creating.',
    'images.*.order.integer' => 'Image order must be a number.',
    'images.*.order.min' => 'Image order cannot be negative.',
    'images.*.alt.string' => 'Image Alt text must be a string.',
    'images.*.alt.max' => 'Alt text must not exceed 255 characters.',
    'images.*.caption.string' => 'Image caption must be string.',
    'images.*.caption.max' => 'The caption must not exceed 255 characters.',
    'images.*.file.required' => 'Image file is required for new images.',
    'images.*.file.file' => 'Problem uploading image file.',
    'images.*.file.image' => 'File must be an image.',
    'images.*.file.mimes' => 'File must be in jpeg, jpg, png, gif, svg or webp format.',
    'images.*.file.max' => 'Image file size must not exceed 10 MB.',
    'images.*.file.required_without' => 'Image file is required for new images.',

    'deletedImages.array' => 'List of deleted images must be an array.',
    'deletedImages.*.integer' => 'The ID of the image to delete must be a number.',
    'deletedImages.*.exists' => 'Attempt to delete a non-existent image.',
];
