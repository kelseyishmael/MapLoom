(function() {
  var translations = {
    'new_map': 'New Map',
    'notifications_tab': 'Notifications',
    'no_notifications': 'No notifications',
    'map_layers': 'Map Layers',
    'add_layer_btn': 'Add Layer',
    'add_layers': 'Add Layers',
    'remove_layer': 'Remove Layer',
    'attributes': 'Attributes',
    'local_geoserver': 'Local Geoserver',
    'filter_layers': 'Filter Layers',
    'add_new_server': 'Add New Server',
    'add_server': 'Add Server',
    'server_type': 'Type',
    'server_name': 'Name',
    'server_url': 'URL',
    'close_btn': 'Close',
    'add_btn': 'Add',
    'merge_results': 'Merge Results',
    'cancel_btn': 'Cancel',
    'done_btn': 'Done',
    'remove_btn': 'Remove',
    'conflict': 'CONFLICT',
    'synchronization': 'Synchronization',
    'add_sync': 'Add Sync',
    'merge': 'Merge',
    'config': 'Config',
    'repo': 'Repo',
    'remote': 'Remote',
    'new_remote': 'New Remote',
    'add_remote': 'Add Remote',
    'repo_name': 'Repo Name',
    'remote_name': 'Remote Name',
    'edit_btn': 'Edit',
    'repo_url': 'URL',
    'repo_username': 'Username',
    'repo_password': 'Password',
    'toggle_menu': 'Toggle Menu',
    'single': 'Single',
    'continuous': 'Continuous',
    'into': 'into',
    'error': 'Error',
    'warning': 'Warning',
    'failed_get_capabilities': 'Failed to get capabilities: ',
    'fixed': 'FIXED',
    'adds': 'Adds',
    'modifications': 'Modifications',
    'deletes': 'Deletes',
    'merges': 'Merges',
    'cancel_merge': 'Cancel the merge',
    'complete_merge': 'Complete the merge',
    'save_btn': 'Save',
    'single_conflict': '1 conflict remains',
    'multiple_conflicts': '{{value}} conflicts remain',
    'sure_cancel_merge': 'Are you sure you want to cancel the merge process?',
    'sure_commit_merge': 'Are you sure you want to finalize and commit the merge?',
    'commit_merge': 'Commit Merge',
    'added_1_feature': 'Added 1 feature to \'{{layer}}\' via MapLoom.',
    'modified_1_feature': 'Modified 1 feature in \'{{layer}}\' via MapLoom.',
    'removed_1_feature': 'Removed 1 feature from \'{{layer}}\' via MapLoom.',
    'applied_via_maploom': 'Applied via MapLoom.',
    'conflicts_in': 'Conflicts resolved in \'{{layer}}\'',
    'merged_branch': 'Merged branch \'{{branch}}\'',
    'yes_btn': 'Yes',
    'no_btn': 'No',
    'differences': 'Differences',
    'from': 'From',
    'to': 'To',
    'new_feature': 'New Feature',
    'changed_feature': 'Changed Feature',
    'original_feature': 'Original Feature',
    'removed_feature': 'Removed Feature',
    'merged_feature': 'Merged Feature',
    'location_lon_lat': 'Location ( lon, lat )',
    'show_history': 'Show History',
    'show_table': 'Show Table',
    'show_pics': 'Show Photos',
    'edit_geometry': 'Edit Geometry',
    'edit_attributes': 'Edit Attributes',
    'delete_feature': 'Delete Feature',
    'feature_diff_error': 'Unable to retrieve all the differences for the feature. ' +
        'Check network connection and try again.',
    'no_local_branches': 'Repository had no local branches.',
    'unable_to_get_branches': 'Unable to get the repository\'s branches. Try re-adding the layer.',
    'unable_to_get_remotes': 'Unable to get the repository\'s remotes. Try re-adding the layer.',
    'unable_to_get_datastore': 'Unable to get the datastore.',
    'unable_to_add_remote': 'Unable to add the GeoGit remote: ',
    'unable_to_get_feature_type': 'Unable to get feature type of data store.',
    'unable_to_get_datastore_name': 'Unable to determine the data store name.',
    'layer_was_layer_group': 'Unable to determine if the layer was a layer group.',
    'start_date': 'Start Date:',
    'end_date': 'End Date:',
    'summarize_btn': 'Summarize',
    'anonymous': 'Anonymous',
    'history_failed': 'Failed to fetch the history of the layer. Please try again.',
    'history': 'History',
    'btn_ok': 'OK',
    'summary_of_changes': 'Summary of Changes',
    'too_many_changes': 'There were too many changes to display. If possible, narrow the range.',
    'too_many_changes_refresh': 'There were too many changes to display.  Only the first ' +
        '{{value}} changes will be shown',
    'no_changes_in_time_range': 'No changes were made to the layer in the specified time frame.',
    'no_changes_in_commit': 'No changes were made to the layer in the specified commit.',
    'diff_unknown_error': 'An unknown error occurred while summarizing the differences.  Please try again.',
    'in_lower_case': 'in',
    'to_lower_case': 'to',
    'from_lower_case': 'from',
    'history_for': 'History for {{value}}',
    'drag_zoom_not_supported': 'Drag zoom interaction is not supported on this map.',
    'repository': 'Repository',
    'transaction': 'Transaction',
    'abort': 'Abort',
    'resolve_conflicts': 'Resolve Conflicts',
    'merge_conflicts': 'Merge Conflicts',
    'conflicts_encountered': 'Some conflicts were encountered when performing the operation,' +
        ' would you like to resolve these or abort the merge?',
    'conflict_unknown_error': 'An unknown error occurred when finalizing the transaction.  Please try again.',
    'unable_to_resolve_conflicts': 'Unable to resolve {{value}} conflicts.  Please try again.',
    'merge_unknown_error': 'An unknown error occurred when performing the merge.  Please try again.',
    'merge_successful': 'Merge Successful',
    'merge_no_changes': 'The merge resulted in no changes.',
    'select_date_range': 'Select Date Range',
    'link': 'Link',
    'link_already_exists': 'The link already exists.',
    'synchronize': 'Synchronize',
    'no_email': 'No Email',
    'added': 'Added',
    'removed': 'Removed',
    'modified': 'Modified',
    'feature': 'feature',
    'features': 'features',
    'conflicted_features_resolved': 'Conflicted features resolved: ',
    'id': 'ID',
    'author_name': 'Author Name',
    'author_email': 'Author Email',
    'committer_name': 'Committer Name',
    'committer_email': 'Committer Email',
    'commit_time': 'Commit Time',
    'message': 'Message',
    'export_csv': 'Export CSV',
    'sure_delete_feature': 'Are you sure you want to delete this feature?',
    'drawing_geometry': 'Drawing Geometry',
    'adding_feature': 'Adding Feature',
    'must_create_feature': 'You must create a feature before continuing.',
    'editing_geometry': 'Editing Geometry',
    'save_attributes': 'Save Attributes',
    'invalid_fields': 'There are {{value}} invalid fields, you must fix these problems before you can save.',
    'add_feature': 'Add Feature',
    'toggle_visibility': 'Toggle Visibility',
    'remote_options': 'Remote Options',
    'history_summary': 'History Summary',
    'zoom_world': 'Zoom To World',
    'toggle_legend': 'Toggle Legend',
    'refresh_layers': 'Refresh Layers',
    'sure_remove_layer': 'Are you sure that you want to remove this layer?',
    'pull_unknown_error': 'An unknown error occurred when pulling from the remote.  Please try again.',
    'pull_multiple_error': 'Pull has failed multiple times, perhaps the remote is not available at the moment.' +
        ' Please try again later.',
    'pull_timeout_error': 'Pull is taking longer than normal, this could be caused by the server being overloaded so' +
        ' in an effort to let the server catch up we are stopping auto-sync. Please wait before resuming auto-sync so' +
        ' the server can catch up.',
    'local': 'Local',
    'pull_conflicts': 'Pull Conflicts',
    'feature_id': 'Feature ID',
    'table_view': 'Table View',
    'filter_table': 'Filter',
    'clear_table_filter': 'Clear',
    'word_wrap': 'Toggle Word Wrap',
    'title': 'Title',
    'abstract': 'Abstract',
    'save_this_map': 'Save this map.',
    'save_failed': 'Save failed',
    'map_save_failed': 'Map save failed with the following status: {{value}}.',
    'fetch': 'Fetch',
    'fetch_error': 'There was an error trying to fetch from the remote, please try again later.',
    'fetch_timeout': 'Fetch is taking longer than it should, its possible that it is still working so' +
        ' wait a moment before trying again.',
    'repo_not_compatible': 'The specifed repository is not a compatible remote with your repository.',
    'not_a_repo': 'The specified endpoint isn\'t a repository.',
    'could_not_connect': 'Failed to connect to the specified endpoint.',
    'remote_add_success': '{{value}} was successfully added.',
    'remote_edit_success': '{{value}} was successfully changed.',
    'remote_remove': 'Are you sure you want to remove this remote?',
    'no_compatible_repos': 'There were no compatible repositories found at the given url.',
    'continue_btn': 'Continue',
    'remote_already_exists': 'The specified remote already exists on this repo.',
    'remote_add_error': 'There was an error trying to add your remote.',
    'remote_edit_error': 'There was an error trying to edit your remote.',
    'multiple_compatible_repos': 'There were multiple compatible repositories found. Please choose the one you wish' +
        ' to use.',
    'undo_changes': 'Undo Changes',
    'newer_feature_version': 'This feature has been modified since this notification was posted.' +
        '  Would you like to compare with the newest version?',
    'undo_successful': 'Undo Successful',
    'undo_no_changes': 'The merge resulted in no changes.',
    'fixed_feature': 'Fixed Feature',
    'undo_conflicts': 'Undo Conflicts',
    'changes_undone': 'The changes to the feature have been successfully undone.',
    'reverted_changes_to_feature': 'Reverted changes made to {{feature}}.'
  };

  var module = angular.module('loom_translations_en', ['pascalprecht.translate']);

  module.config(function($translateProvider) {
    $translateProvider.translations('en', translations);
  });

}());
