import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { IAppInfoFacturationUser } from 'src/models/user.model';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent implements OnInit {

  updateFormFactu!: FormGroup;
  errorMessage!: String;

  infoFacturationUser: IAppInfoFacturationUser = {
    nom: "",
    prenom: "",
    adresse: "",
    codePostal: 0,
    ville: "",
    proprietaireCarte: "",
    numeroCarte: 0,
    dateCarte: "",
    cryptogramme: 0,
    civilite: "mr"
  }

  id!: string;

  db = firebase.firestore();

  //permet d'afficher les infos d'un user connecte
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.db.collection("Users").where("email", "==", this.authService.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.infoFacturationUser = doc.data() as IAppInfoFacturationUser;
          this.id = doc.id;
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
   }

   ngOnInit(): void {
    this.initForm();
  }

//méthode de vérification des pattern lors de la saisie
  initForm() {
    this.updateFormFactu = this.formBuilder.group({
      nom: ['', [Validators.pattern(/[a-zA-Z]/)]],
      prenom: ['', [Validators.pattern(/[a-zA-Z]/)]],
      adresse: ['', [Validators.pattern(/[0-9a-zA-Z]/)]],
      codePostal: ['', [Validators.pattern(/[0-9]/)]],
      ville: ['', [Validators.pattern(/[a-zA-Z]/)]],
      proprietaire: ['', [Validators.pattern(/[a-zA-Z]/)]],
      nbCarte: ['', [Validators.pattern(/[0-9]/)]],
      expiration: ['', [Validators.pattern(/[0-9]/)]],
      cryptogramme: ['', [Validators.pattern(/[0-9]/)]]
    });
  }

  civiliteMr(){
    this.infoFacturationUser.civilite = "mr";
  }

  civiliteMme(){
    this.infoFacturationUser.civilite = "mme";
  }

//modifier les informations du user dans firebase après saisie
  updateUser() {

    let nom = this.updateFormFactu.get('nom')?.value;
    let prenom = this.updateFormFactu.get('prenom')?.value;
    let adresse = this.updateFormFactu.get('adresse')?.value;
    let codePostal = this.updateFormFactu.get('codePostal')?.value;
    let ville = this.updateFormFactu.get('ville')?.value;
    let proprietaireCarte = this.updateFormFactu.get('proprietaire')?.value;
    let numeroCarte = this.updateFormFactu.get('nbCarte')?.value;
    let dateCarte = this.updateFormFactu.get('expiration')?.value;
    let cryptogramme = this.updateFormFactu.get('cryptogramme')?.value;
    let civilite = this.infoFacturationUser.civilite;
    
    

    if(nom != ""){
      nom = this.updateFormFactu.get('nom')?.value;
    } else {
      nom = this.infoFacturationUser.nom;
    }
    if(prenom != ""){
      prenom = this.updateFormFactu.get('prenom')?.value;
    }else {
      prenom = this.infoFacturationUser.prenom;
    }
    if(adresse != ""){
      adresse = this.updateFormFactu.get('adresse')?.value;
    }else {
      adresse = this.infoFacturationUser.adresse;
    }
    if(codePostal != ""){
      codePostal = this.updateFormFactu.get('codePostal')?.value;
    }else {
      codePostal = this.infoFacturationUser.codePostal;
    }
    if(ville != ""){
      ville = this.updateFormFactu.get('ville')?.value;
    }else {
      ville = this.infoFacturationUser.ville;
    }
    if(proprietaireCarte != ""){
      proprietaireCarte = this.updateFormFactu.get('proprietaire')?.value;
    }else {
      proprietaireCarte = this.infoFacturationUser.proprietaireCarte;
    }
    if(numeroCarte != ""){
      numeroCarte = this.updateFormFactu.get('nbCarte')?.value;
    }else {
      numeroCarte = this.infoFacturationUser.numeroCarte;
    }
    if(dateCarte != ""){
      dateCarte = this.updateFormFactu.get('expiration')?.value;
    }else {
      dateCarte = this.infoFacturationUser.dateCarte;
    }
    if(cryptogramme != ""){
      cryptogramme = this.updateFormFactu.get('cryptogramme')?.value;
    }else {
      cryptogramme = this.infoFacturationUser.cryptogramme;
    }

    this.db.collection("Users").doc(this.id).update({
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      codePostal: codePostal,
      ville: ville,
      proprietaireCarte: proprietaireCarte,
      numeroCarte: numeroCarte,
      dateCarte: dateCarte,
      cryptogramme: cryptogramme,
      civilite: civilite
    }).then(
      () => {
        console.log('Modification réussie !');
        alert('Modification réussie !');
      }
    ).catch(
      (error) => {
        console.log("Il y à une erreur : " + error);
        alert("Il y à une erreur : " + error);
      }
    );
  }


}
