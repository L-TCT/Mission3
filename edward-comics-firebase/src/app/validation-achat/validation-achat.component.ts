import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import { IAppInfoFacturationUser } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-validation-achat',
  templateUrl: './validation-achat.component.html',
  styleUrls: ['./validation-achat.component.css']
})
export class ValidationAchatComponent implements OnInit {

  formCarte!: FormGroup;
  errorMessage!: String;
  cartSubscription!: Subscription;
  nbrItemSubscription!: Subscription;
  cart: IComics[] = []
  total = 0;
  nbrItem = 0;

  infoUser: IAppInfoFacturationUser = {
    nom: '',
    prenom: '',
    adresse: '',
    codePostal: 0,
    ville: '',
    proprietaireCarte: '',
    numeroCarte: 0,
    dateCarte: '',
    cryptogramme: 0,
    civilite: ''
  }

  id!: string;

  db = firebase.firestore();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private panierService: PanierService) {
    this.db.collection("Users").where("email", "==", this.authService.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.infoUser = doc.data() as IAppInfoFacturationUser;
          this.id = doc.id;
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.cartSubscription = this.panierService.cartSubject.subscribe(
      (cart: IComics[]) => {
        this.cart = cart;
      }
    );
    this.nbrItemSubscription = this.panierService.nbrItemSubject.subscribe(
      (nbrItem: number) => {
        this.nbrItem = nbrItem;
      }
    );
    this.panierService.emitCart();
    this.getTotal();
  }

  initForm() {
    this.formCarte = this.formBuilder.group({
      proprietaire: ['', [Validators.pattern(/[a-zA-Z]/)]],
      nbCarte: ['', [Validators.pattern(/[0-9]/)]],
      expiration: ['', [Validators.pattern(/[0-9]/)]],
      cryptogramme: ['', [Validators.pattern(/[0-9]/)]]
    });
  }

  updateCarte() {
    let proprietaireCarte = this.formCarte.get('proprietaire')?.value;
    let numeroCarte = this.formCarte.get('nbCarte')?.value;
    let dateCarte = this.formCarte.get('expiration')?.value;
    let cryptogramme = this.formCarte.get('cryptogramme')?.value;

    
    if(proprietaireCarte != ""){
      proprietaireCarte = this.formCarte.get('proprietaire')?.value;
    }else {
      proprietaireCarte = this.infoUser.proprietaireCarte;
    }
    if(numeroCarte != ""){
      numeroCarte = this.formCarte.get('nbCarte')?.value;
    }else {
      numeroCarte = this.infoUser.numeroCarte;
    }
    if(dateCarte != ""){
      dateCarte = this.formCarte.get('expiration')?.value;
    }else {
      dateCarte = this.infoUser.dateCarte;
    }
    if(cryptogramme != ""){
      cryptogramme = this.formCarte.get('cryptogramme')?.value;
    }else {
      cryptogramme = this.infoUser.cryptogramme;
    }

    this.db.collection("Users").doc(this.id).update({
      proprietaireCarte: proprietaireCarte,
      numeroCarte: numeroCarte,
      dateCarte: dateCarte,
      cryptogramme: cryptogramme
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

  getTotal(){
    for(let item of this.cart){
      if(item.quantite > 1){
        this.total += (item.prix)*(item.quantite);
      }
      else{
        this.total += item.prix;
      }
    }
  }

}
