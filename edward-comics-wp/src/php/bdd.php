<?php
require 'connect.php';


$data = [
    'per_page' => 100,
];



print_r(json_encode($woocommerce->get('products', $data)));

?>
