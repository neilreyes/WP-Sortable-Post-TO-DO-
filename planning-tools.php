<?php

function pa_ajax_script(){
	wp_enqueue_script( 'pa-sortable', get_template_directory_uri() . '/js/pa-sortable.js', array(), false, true );
	wp_localize_script( 'pa-sortable', 'ajaxurl', admin_url('admin-ajax.php') );
}

add_action( 'wp_enqueue_scripts', 'pa_ajax_script' );


function pa_save_todo_reorder() {

    $order = explode(',', $_POST['order']);
    $counter = 0;

    foreach ($order as $item_id) {
    	$post = array(
    		'ID' => intval($item_id),
    		'menu_order' => intval($counter),
            'post_status' => 'publish'
    	);

    	wp_update_post( $post );

    	$counter++;
    }

    die(1);
}
add_action('wp_ajax_pa_save_todo_sort', 'pa_save_todo_reorder');
add_action('wp_ajax_nopriv_pa_save_todo_sort', 'pa_save_todo_reorder');