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

    $nom = regex_data($data['nom']);
    $prenom = regex_data($data['prenom']);
    $email = regex_data($data['email']);
    $telephone = regex_data($data['telephone']);
    $password = regex_data($data['password']);
    $passwordconfirm = regex_data($data['passwordConfirm']);
    $adresse = regex_data($data['adresse']);
    $code_postal = regex_data($data['codePostal']);
    $ville = regex_data($data['ville']);

    //verif back

    $nomlength = strlen($nom);
    $prenomlength = strlen($prenom);
    $emaillength = strlen($email);
    $telephonelength = strlen($telephone);
    $passwordlength = strlen($password);
    $passwordconfirmlength = strlen($passwordconfirm);
    $adresselength = strlen($adresse);
    $code_postallength = strlen((string)$code_postal);
    $villelength = strlen($ville);

    if ($nomlength <= 255) {
        if ($prenomlength <= 255) {
            if ($emaillength <= 255) {
                if ($telephonelength <= 30) {
                    if ($adresselength <= 255) {
                        if ($code_postallength <= 5) {
                            if ($villelength <= 255) {
                                if ($passwordlength <= 1500) {
                                    if ($password === $passwordconfirm) {
                                        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                                        $req = $bdd->prepare("INSERT INTO users(`nom`, `prenom`, `email`, `telephone`, `mdp`, `adresse`, `code_postal`, `ville`) VALUES (:nom, :prenom, :email, :telephone, :mdp, :adresse, :code_postal, :ville)");
                                        $req->bindParam(':nom', $nom);
                                        $req->bindParam(':prenom', $prenom);
                                        $req->bindParam(':telephone', $telephone);
                                        $req->bindParam(':email', $email);
                                        $req->bindParam(':mdp', $passwordHash);
                                        $req->bindParam(':adresse', $adresse);
                                        $req->bindParam(':code_postal', $code_postal);
                                        $req->bindParam(':ville', $ville);
                                        $req->execute();
                                        echo json_encode(
                                            true
                                        );
                                    } else {
                                        echo "Les mots de passes ne sont pas identique !";
                                    }
                                } else {
                                    echo "Attention ! Le mot de passe fait plus de 1500 caracteres !";
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
                    echo "Attention ! Le telephone fait plus de 30 caracteres !";
                }
            } else {
                echo "Attention ! L'e-mail fait plus de 255 caracteres !";
            }
        } else {
            echo "Attention ! Le prénom fait plus de 255 caracteres !";
        }
    } else {
        echo "Attention ! Le nom fait plus de 255 caracteres !";
    }
} else {
    echo json_encode(
        false
    );
}
