import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';

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

  infoUser: any = [];
    
  static FORM_COLUMN_MAP: { [x: string]: string } = {
    nom: "nom",
    prenom: "prenom",
    adresse: "adresse",
    ville: "ville",
    proprietaire: "cb_proprietaire",
    nbCarte: "cb_numero",
    expiration: "cb_date",
    cryptogramme: "cb_cryptogramme"
  };

  

  constructor(private formBuilder: FormBuilder, private router: Router, private panierService: PanierService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getFacturationInfo(sessionStorage.getItem('id'));
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
      proprietaire: ['', [Validators.pattern(/^[a-zA-Z]+$/), Validators.required, Validators.maxLength(255)]],
      nbCarte: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.maxLength(16)]],
      expiration: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.maxLength(255)]],
      cryptogramme: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.maxLength(3)]]
    });
  }

  hydrateForm(){
    Object.keys(ValidationAchatComponent.FORM_COLUMN_MAP)
      .forEach(formControlName => {
        const columnName = ValidationAchatComponent.FORM_COLUMN_MAP[formControlName];
        const newValue = this.infoUser[columnName];
        if(newValue != null){
          this.formCarte.get(formControlName)?.patchValue(newValue);
        }
      });
  }


  updateCarte() {
    let proprietaireCarte = this.formCarte.get('proprietaire')?.value;
    let numeroCarte = this.formCarte.get('nbCarte')?.value;
    let dateCarte = this.formCarte.get('expiration')?.value;
    let cryptogramme = this.formCarte.get('cryptogramme')?.value;
    let id = sessionStorage.getItem('id');


    let userCarteInfo = {
      proprietaireCarte : proprietaireCarte,
      numeroCarte : numeroCarte,
      dateCarte : dateCarte,
      cryptogramme : cryptogramme,
      id : id
    }

    let data = JSON.stringify(userCarteInfo);
    this.http.post('https://edward-comics.go.yj.fr/php/update_carte.php', data).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Information de CB correctement modifié')
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

  getTotal(){
    for(let item of this.cart){
      if(item.quantite > 1){
        this.total += (item.prix)*(item.quantite);
      }
      else{
        this.total += Number(item.prix);
      }
    }
  }

  getFacturationInfo(id: any) {
    let user = JSON.stringify(id);
    this.http.post('https://edward-comics.go.yj.fr/php/info_user.php', user).subscribe(
      (response: any) => {
        if (response['success']) {
          this.infoUser = response['user'];
          this.hydrateForm();
          console.log(this.infoUser);
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

  resetPanier() {
    this.panierService.cleanPanier();
  }


}
