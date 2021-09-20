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
    $nom = regex_data($data['nom']);
    $prenom = regex_data($data['prenom']);
    $adresse = regex_data($data['adresse']);
    $code_postal = regex_data($data['codePostal']);
    $ville = regex_data($data['ville']);
    $proprietaire_carte = regex_data($data['proprietaireCarte']);
    $numero_carte = regex_data($data['numeroCarte']);
    $date_carte = $data['dateCarte'];
    $cryptogramme = regex_data($data['cryptogramme']);
    $civilite = regex_data($data['civilite']);

    //verif back

    $nomlength = strlen($nom);
    $prenomlength = strlen($prenom);
    $adresselength = strlen($adresse);
    $code_postal_length = strlen($code_postal);
    $villelength = strlen($ville);
    $proprietaire_carte_length = strlen($proprietaire_carte);
    $numero_carte_length = strlen($numero_carte);
    $cryptogrammelength = strlen($cryptogramme);
    $civilitelength = strlen($civilite);

    if ($nomlength <= 255) {
        if ($prenomlength <= 255) {
            if ($adresselength <= 255) {
                if ($code_postal_length <= 5) {
                    if ($villelength <= 255) {
                        if ($proprietaire_carte_length <= 255) {
                            if ($numero_carte_length <= 16) {
                                if ($cryptogrammelength <= 3) {
                                    if ($civilitelength <= 3) {
                                        $req = $bdd->prepare("UPDATE users SET nom = :nom, prenom = :prenom, adresse = :adresse, code_postal = :code_postal, ville = :ville, cb_proprietaire = :cb_proprietaire, cb_numero = :cb_numero, cb_date = :cb_date, cb_cryptogramme = :cb_cryptogramme, civilite = :civilite WHERE id = :id");
                                        $req->bindParam(':id', $id);
                                        $req->bindParam(':nom', $nom);
                                        $req->bindParam(':prenom', $prenom);
                                        $req->bindParam(':adresse', $adresse);
                                        $req->bindParam(':code_postal', $code_postal);
                                        $req->bindParam(':ville', $ville);
                                        $req->bindParam(':cb_proprietaire', $proprietaire_carte);
                                        $req->bindParam(':cb_numero', $numero_carte);
                                        $req->bindParam(':cb_date', $date_carte);
                                        $req->bindParam(':cb_cryptogramme', $cryptogramme);
                                        $req->bindParam(':civilite', $civilite);
                                        $req->execute();
                                        echo json_encode([
                                            'success' => true
                                        ]);
                                    } else {
                                        echo "Attention ! civilite fait plus de 3 caracteres !";
                                    }
                                } else {
                                    echo "Attention ! Le cryptogramme fait plus de 3 caracteres !";
                                }
                            } else {
                                echo "Attention ! Les numero de la carte font plus de 16 caracteres !";
                            }
                        } else {
                            echo "Attention ! Le nom du proprietaire de la carte fait plus de 255 caracteres !";
                        }
                    } else {
                        echo "Attention ! La ville fait plus de 255 caracteres !";
                    }
                } else {
                    echo "Attention ! Le code postal fait plus de 5 caracteres !";
                }
            } else {
                echo "Attention ! L'adresse fait plus de 255 caracteres !";
            }
        } else {
            echo "Attention ! Le prénom fait plus de 255 caracteres !";
        }
    } else {
        echo "Attention ! Le nom fait plus de 255 caracteres !";
    }
} else {
    echo json_encode([
        'success' => false
    ]);
}
