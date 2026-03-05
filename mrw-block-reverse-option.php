<?php
/**
 * Plugin Name:     MRW Block Reverse Option
 * Description:     An option to reverse the order of columns
 * Author:          Mark Root-Wiley
 * Author URI:      https://MRWweb.com
 * Text Domain:     mrw-block-reverse-option
 * Domain Path:     /languages
 * Version:         0.2.0
 *
 * @package         MRW_Block_Reverse_Option
 */

namespace MRW\BlockReverseOption;

define( 'MRW_BLOCK_REVERSE_OPTION_VERSION', '0.2.0' );

add_action( 'after_setup_theme', __NAMESPACE__ . '\enqueue_style' );
function enqueue_style() {
    wp_enqueue_block_style(
        ['core/columns', 'core/group'],
        [
            'handle' => 'mrw-block-reverse',
            'src' => plugins_url( 'block-reverse.css', __FILE__ ),
            'ver' => MRW_BLOCK_REVERSE_OPTION_VERSION,
        ]
    );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\register_option_assets' );
/**
 * Register the script for the custom setting
 *
 * @return void
 */
function register_option_assets() {
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
    wp_enqueue_script(
        'mrw-block-reverse-option',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
        'mrw-block-reverse-option',
        plugins_url( 'build/index.css', __FILE__ ),
        [],
        $asset_file['version']
    );
}
