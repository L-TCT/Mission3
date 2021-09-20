<?php

require 'connect.php';

$theme = htmlspecialchars($_GET['theme']);
$valeur = htmlspecialchars($_GET['valeur']);

// $policies = [];
// $sql = $bdd->prepare("SELECT * FROM comics WHERE $theme = '$valeur'");
// $sql -> execute();
// $results = $sql->fetchAll(PDO::FETCH_ASSOC);
// if (count($results) > 0) {
  
//   foreach ($results as $donnees) {
//     $policies[] =  $donnees;      
//   }
//   echo json_encode($policies);
// }

$data = [
  'per_page' => 100,
  "meta-data" =>
    [
      
      'key ' => 'univers',
      'value' => 'DC Comics',
    ],
];



print_r(json_encode($woocommerce->get('products', $data)));
