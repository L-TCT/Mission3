<?php 
require 'connect.php';

$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    $data = json_decode($postdata);
    $id = $data;

    $req = $bdd->prepare("SELECT * FROM users WHERE id = :id");
    $req->execute(array(
        'id' => $id));
    $resultat = $req->fetch();

    if ($resultat) {
        echo json_encode([
            'success' => true,
            'user' => $resultat
        ]);
    } else {
        echo json_encode([
            'success' => false
        ]);
    }
    
}