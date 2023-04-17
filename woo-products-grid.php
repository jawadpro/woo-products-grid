<?php
/**
 * Plugin Name:       Woo Products Grid
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       woo-products-grid
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_woo_products_grid_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_woo_products_grid_block_init' );


function add_price_to_product_api_response( $data, $product, $request ) {

	 $productObj = wc_get_product( $product->ID );

	 $data->data['meta']['_price'] = $productObj->get_price();

	 $fields = wpg_get_product_custom_fields( $product->ID );

	 if( count($fields) > 0 )
	 {
		$data->data['meta']['fields'] = $fields;
	 }

	 return $data;
	 
}
add_filter( 'rest_prepare_product', 'add_price_to_product_api_response', 10, 3 );


//Get ACF Fields
function wpg_get_product_custom_fields( $post_id ) {
    $custom_fields = array();

    // Check if ACF is activated
    if ( function_exists( 'get_field_objects' ) ) {

        // Get all the ACF fields registered for the product post type
        $fields = get_field_objects( $post_id );

        // Loop through the fields and add only text fields to the $custom_fields array
        foreach ( $fields as $field ) {
            if ( $field['type'] === 'text' ) {
                $value = get_field( $field['name'], $post_id );
                $custom_fields[ $field['name'] ] = $value;
            }
        }
    }
    return $custom_fields;
}