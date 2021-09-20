<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'http://localhost/mission3/edward-comics-wp/wordpress',
   'ck_76c0341845b237cfaef344c3838b32f74c5e5a59',
    'cs_43849bd5d0d0b503904ba06c6e16a3ffaed70bfb',
    [
        'wp_api' => true,
        'version' => 'wc/v3'
    ]
);

?>

