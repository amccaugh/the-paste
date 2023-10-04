<?php
/**
 *	@package ThePaste\Admin
 *	@version 1.0.0
 *	2018-09-22
 */

namespace ThePaste\Admin;

use ThePaste\Asset;
use ThePaste\Core;

class Admin extends Core\Singleton {

	/** @var TinyMce\TinyMce */
	private $mce;

	/** @var Asset\Asset */
	private $js;

	/** @var Asset\Asset */
	private $css;

	/** @var string */
	private $ajax_action_enable = 'the_paste_tinymce_enable';

	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		if ( wp_is_mobile() ) {
			return;
		}

		add_action( 'admin_init', [ $this, 'register_assets' ] );
		add_action( 'wp_enqueue_media', [ $this, 'enqueue_assets' ] );
		add_action( 'print_media_templates',  [ $this, 'print_media_templates' ] );
		add_action( 'wp_enqueue_editor', [ $this, 'enqueue_assets' ] );
		add_action( "wp_ajax_{$this->ajax_action_enable}", [ $this, 'ajax_tinymce_enable' ] );
	}

	/**
	 *	@action wp_ajax_the_paste_tinymce_enable
	 */
	public function ajax_tinymce_enable() {

		check_ajax_referer( $this->ajax_action_enable );

		$enabled = isset( $_REQUEST['enabled'] )
			? (bool) wp_unslash( $_REQUEST['enabled'] )
			: false;

		$user = User::instance();
		$user->tinymce = $enabled;
		$user->commit();

		wp_send_json( [ 'success' => true ] );
	}

	/**
	 *	Enqueue options Assets
	 *	@action admin_print_scripts
	 */
	public function register_assets() {
		$user = User::instance();

		$this->mce = TinyMce\TinyMceThePaste::instance();

		$current_user = wp_get_current_user();

		$this->css = Asset\Asset::get('css/admin/the-paste.css')->register();

		$this->js = Asset\Asset::get('js/admin/the-paste.js')
			->deps( [ 'jquery', 'media-editor' ] )
			->localize( [
				'l10n'    => [
					'upload_pasted_images' => __( 'Upload pasted images', 'the-paste' ),
					'upload_image'         => __( 'Upload image', 'the-paste' ),
					'the_paste'            => __( 'The Paste', 'plugin name', 'the-paste' ),
					'copy_paste'           => __( 'Copy & Paste', 'the-paste' ),
					'paste_files'          => __( 'Paste as file', 'the-paste' ),
				],
				'options' => [
					'editor'           => [
						'enabled'           => $user->tinymce,
						'auto_upload'       => true,
						'datauri'           => $user->datauri,
						/**
						 *	Size limit for data uri images
						 *
						 *	@param Int $size	Max image size in pixels (width * height) being pasted as data url
						 */
						'force_upload_size' => apply_filters('the_paste_max_embed_image_size',
							apply_filters('the_paste_max_embed_imge_size', 512 * 512 ) // backwards compatibility
						),
						'enable_ajax_url'   => add_query_arg( [
							'action'      => $this->ajax_action_enable,
							'_ajax_nonce' => wp_create_nonce( $this->ajax_action_enable ),
						], admin_url( 'admin-ajax.php' ) ),
					],
					'filename_values'   => [
						'username'  => $current_user->display_name,
						'userlogin' => $current_user->user_login,
						'userid'    => $current_user->ID,
					],
					'jpeg_quality'     => apply_filters( 'jpeg_quality', 90, 'edit_image' ),
					/**
					 *	Filters the default filename
					 *
					 *	@param String $filename	The Filename. There are some placeholders:
					 *							Placeholders:
					 *								<postname> Name of current post
					 *								<username> Display name of current user
					 *								<userlogin> Login name of current user
					 *								<userid> Current user ID
					 *							Date and Time placeholders (a subset of php's strftime() format characters):
					 *								%Y Four-digit year
					 *								%y Two-digit year
					 *								%m Number of month with leading zero (01 to 12)
					 *								%d Day of month with leading zero (01 to 31)
					 *								%e Day of month (1 to 31)
					 *								%H Two digit hour in 24-hour format
					 *								%I Two digit hour in 12-hour format
					 *								%M Two digit minute
					 *								%S Two digit second
					 *								%s Unix timestamp
					 */
					'default_filename' => apply_filters( 'the_paste_default_filename', $user->default_filename ),
				],
			], 'thepaste' )
			->register();
	}

	/**
	 *	Enqueue options Assets
	 *	@action admin_print_scripts
	 */
	public function enqueue_assets() {
		if ( current_user_can( 'upload_files' ) ) {
			if ( $this->css ) {
				$this->css->enqueue();
			}
			if ( $this->js ) {
				$this->js->enqueue();
			}
		}
	}

	/**
	 *	@action 'print_media_templates'
	 */
	function print_media_templates() {
		if ( current_user_can( 'upload_files' ) ) {
			$rp = Core\Core::instance()->get_plugin_dir() . '/include/template/{,*/,*/*/,*/*/*/}*.php';
			foreach ( glob( $rp, GLOB_BRACE ) as $template_file ) {
				include $template_file;
			}
		}
	}
}
