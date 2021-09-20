<?php

require 'connect.php';

function regex_data($param)
{
    $param = trim($param);
    $param = stripcslashes($param);
    $param = htmlspecialchars($param);
    return $param;
}


$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $data = json_decode($postdata, true);
    $id = $data['id'];
    $proprietaire_carte = regex_data($data['proprietaireCarte']);
    $numero_carte = regex_data($data['numeroCarte']);
    $date_carte = regex_data($data['dateCarte']);
    $cryptogramme = regex_data($data['cryptogramme']);

    //verif back

    $proprietaire_cartelength = strlen($proprietaire_carte);
    $numero_cartelength = strlen($numero_carte);
    $date_cartelength = strlen($date_cartelength);
    $cryptogrammelength = strlen($cryptogramme);



    if ($proprietaire_cartelength <= 255) {
        if ($numero_cartelength <= 255) {
            if ($date_cartelength <= 16) {
                if ($cryptogrammelength <= 3) {
                $req = $bdd->prepare("UPDATE users SET cb_proprietaire = :proprietaire_carte, cb_numero = :numero_carte, cb_date = :date_carte, cb_cryptogramme = :cryptogramme WHERE id = :id");
                                        $req->bindParam(':proprietaire_carte', $proprietaire_carte);
                                        $req->bindParam(':numero_carte', $numero_carte);
                                        $req->bindParam(':date_carte', $date_carte);
                                        $req->bindParam(':cryptogramme', $cryptogramme);
                                        $req->execute();
                                        echo json_encode([
                                            'success' => true
                                        ]);
            } else {
                echo "Attention ! Le propriétaire de la carte fait plus de 255 caracteres !";
            }
        } else {
            echo "Attention ! Le numéro de la carte fait plus de 16 caracteres !";
        }
    } else {
        echo "Attention ! La date de la carte fait plus de 30 caracteres !";
    }
} else {
    echo "Attention ! Le cryptogramme fait plus de 3 caracteres !";
}
} else {
    echo json_encode([
        'success' => false
    ]);
}

?>
