<?php

require 'connect.php';

$searchText = $_GET['searchText'];


$searchText = htmlspecialchars($searchText);
$searchText = trim($searchText);
$searchText = strip_tags($searchText);


$policies = [];
$sql = $bdd->prepare("SELECT * FROM comics WHERE (categorie LIKE ?) OR (titre LIKE ?) OR (univers LIKE?)") ;
$sql -> execute(["%".$searchText."%", "%".$searchText."%", "%".$searchText."%"]);
$results = $sql->fetchAll();
if (count($results) > 0) {
  foreach ($results as $donnees) {
       $policies[] =  $donnees;    
     }
     echo json_encode($policies);
}
