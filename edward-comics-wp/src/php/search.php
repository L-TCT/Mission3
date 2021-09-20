<?php

require 'connect.php';

$searchText = $_GET['searchText'];


$searchText = htmlspecialchars($searchText);
$searchText = trim($searchText);
$searchText = strip_tags($searchText);

require 'connect.php';

define( 'OBJECT', 'OBJECT' );
require_once '../../wordpress/wp-includes/taxonomy.php';


// $term_obj  = get_term_by('slug', 'daredevil', 'Série');
// 'attribute' => 'pa_serie',
// 'attribute_term' => 122    //$term_obj->term_id

$data = [
    'per_page' => 100,
    
];



print_r(json_encode($woocommerce->get('products', $data)));


?>
