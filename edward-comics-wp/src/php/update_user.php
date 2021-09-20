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
    $id = $data['id'];
    $telephone = regex_data($data['telephone']);

    //verif back

    $nomlength = strlen($nom);
    $prenomlength = strlen($prenom);
    $telephonelength = strlen($telephone);

    // if ($nomlength > 255) {
    //     echo "Attention ! Le nom fait plus de 255 caracteres !";
    // }
    // if ($prenomlength <= 255) {
    //     if ($telephonelength <= 30) {
    //         $req = $bdd->prepare("UPDATE users SET nom = :nom, prenom = :prenom, telephone = :telephone WHERE id = :id");
    //                                 $req->bindParam(':nom', $nom);
    //                                 $req->bindParam(':prenom', $prenom);
    //                                 $req->bindParam(':telephone', $telephone);
    //                                 $req->bindParam(':id', $id);
    //                                 $req->execute();
    //                                 echo json_encode([
    //                                     'success' => true
    //                                 ]);
    //     } else {
    //         echo "Attention ! L'telephone fait plus de 30 caracteres !";
    //     }
    // } else {
    //     echo "Attention ! Le prénom fait plus de 255 caracteres !";
    // }

    if ($nomlength <= 255) {
        if ($prenomlength <= 255) {
            if ($telephonelength <= 30) {
                $req = $bdd->prepare("UPDATE users SET nom = :nom, prenom = :prenom, telephone = :telephone WHERE id = :id");
                                        $req->bindParam(':nom', $nom);
                                        $req->bindParam(':prenom', $prenom);
                                        $req->bindParam(':telephone', $telephone);
                                        $req->bindParam(':id', $id);
                                        $req->execute();
                                        echo json_encode([
                                            'success' => true
                                        ]);
            } else {
                echo "Attention ! L'telephone fait plus de 30 caracteres !";
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

// require 'connect.php';

// function regex_data($param)
// {
//     $param = trim($param);
//     $param = stripcslashes($param);
//     $param = htmlspecialchars($param);
//     return $param;
// }

// $postdata = file_get_contents('php://input');
// if (isset($postdata) && !empty($postdata)) {
//     $data = json_decode($postdata);
//     $nom = $data['nom'];
//     $prenom = $data['prenom'];
//     $telephone = $data['telephone'];
//     $id = $data['id'];

//     $req = $bdd->prepare("UPDATE users SET nom = :nom, prenom = :prenom, telephone = :telephone WHERE id = :id");
//     $req->bindParam(':nom', $nom);
//     $req->bindParam(':prenom', $prenom);
//     $req->bindParam(':telephone', $telephone);
//     $req->bindParam(':id', $id);
//     $req->execute();
   
   
//     $req->execute(array(
//         'id' => $id,
//         'nom' => $nom,
//         'prenom' => $prenom,
//         'telephone' => $telephone));
//     $resultat = $req->fetch();

//     if ($resultat) {
//         echo json_encode([
//             'success' => true,
//         ]);
//     } else {
//         echo json_encode([
//             'success' => false
//         ]);
//     }
    
// }