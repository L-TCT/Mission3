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
    $data = json_decode($postdata, true);
    $email = regex_data($data['email']);
    $password = regex_data($data['password']);

    $req = $bdd->prepare("SELECT * FROM users WHERE email = :email");
    $req->execute(array(
        'email' => $email));
    $resultat = $req->fetch();    
    
if ($resultat) {
    $passwordCorrect = password_verify($password, $resultat['mdp']);
    if ($passwordCorrect) {
        
        echo json_encode([
            'success' => true,
            'id' => $resultat['id']
        ]);
       
    } else { //MOT DE PASSE INCORECCT
        echo json_encode([
            "success" => false,
            "errors" => [
                "Mauvais mot de passe !",
                $resultat['mdp'],
                $password
            ]
        ]);
    }
} else { //IDENTIFIANT INCORRECT
    echo json_encode([
        "success" => false,
        "errors" => [
            "
                    Mauvais identifiant !"
        ]
    ]);
}
} else {
    echo json_encode([
        "success" => false,
        "errors" => [
            "Problème de connexion à la bdd"
        ]
    ]);
}
