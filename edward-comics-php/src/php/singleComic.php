<?php

require 'connect.php';

$id = $_GET['id'];


$sql = $bdd->prepare("SELECT * FROM comics WHERE id = '$id'");
$sql -> execute();
$results = $sql->fetch(PDO::FETCH_ASSOC);
if (count($results) > 0) {
  $policies =  $results;      
  echo json_encode($policies);
}
?>