(function($){
    itemList = $('#sortable');
    itemList.sortable({
        update: function(event, ui) {
            console.log('loading...');
            //$('#loading-animation').show();  Show the animate loading gif while waiting

            opts = {
                url: ajaxurl, // ajaxurl is defined by WordPress and points to /wp-admin/admin-ajax.php
                type: 'POST',
                async: true,
                cache: false,
                dataType: 'json',
                data:{
                    action: 'pa_save_todo_sort', // Tell WordPress how to handle this ajax request
                    order: itemList.sortable('toArray').toString()  // Passes ID's of list items in  1,3,2 format
                },
                success: function(response) {
                    console.log('success... ' + response );
                    // $('#loading-animation').hide();Hide the loading animation
                    return;
                },
                error: function(xhr,textStatus,e) {  // This can be expanded to provide more information
                    console.log('error: ' + e);
                    // alert('There was an error saving the updates');
                     // $('#loading-animation').hide();Hide the loading animation
                    return; 
                }
            };
            $.ajax(opts);

            console.log(opts.data.order);
        }
    });
    
}(jQuery));