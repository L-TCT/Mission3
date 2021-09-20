<?php
require 'connect.php';

  //  echo "Connected successfully";
$policies = [];
$sql = $bdd->prepare("SELECT * FROM comics");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC); 

if (count($results) > 0) {

  foreach ($results as $donnees) {
    $policies[] =  $donnees;      
  }

  $json = json_encode($policies, JSON_THROW_ON_ERROR);
  echo $json;
}
