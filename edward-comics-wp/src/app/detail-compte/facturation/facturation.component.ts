import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent implements OnInit {

  updateFormFactu!: FormGroup;
  updateProfil: any = {};
  infoFacturationUser: any = []

  /**
   * Dictonnaire listant les noms de colonnes associées à chaque nom de champ du formulaire.
   * En clefs: noms des champs
   * En valerurs: noms des colonnes
   */
  static FORM_COLUMN_MAP: { [x: string]: string } = {
    nom: "nom",
    prenom: "prenom",
    adresse: "adresse",
    codePostal: "code_postal",
    ville: "ville",
    proprietaire: "cb_proprietaire",
    nbCarte: "cb_numero",
    expiration: "cb_date",
    cryptogramme: "cb_cryptogramme"
  };

  //permet d'afficher les infos d'un user connecte
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    
   }

   ngOnInit(): void {
    this.getUserInfo(sessionStorage.getItem('id'));
    this.initForm();
  }

  getUserInfo(id: any) {
    let user = JSON.stringify(id);
    this.http.post('https://edward-comics.go.yj.fr/php/info_user.php', user).subscribe(
      (response: any) => {
        if (response['success']) {
          this.infoFacturationUser = response['user'];
          this.hydrateForm();
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

//méthode de vérification des pattern lors de la saisie
  initForm() {
    this.updateFormFactu = this.formBuilder.group({
      nom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      prenom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      adresse: ['', [Validators.pattern(/^[0-9a-zA-Z ]+$/), Validators.maxLength(255)]],
      codePostal: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(5)]],
      ville: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      proprietaire: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      nbCarte: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(16)]],
      expiration: ['', [Validators.pattern(/(0[1-9]|1[012]).[0-9]{4}/), Validators.maxLength(10)]],
      cryptogramme: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(3)]]
    });
  }

  hydrateForm(){
    Object.keys(FacturationComponent.FORM_COLUMN_MAP)
      .forEach(formControlName => {
        const columnName = FacturationComponent.FORM_COLUMN_MAP[formControlName];
        const newValue = this.infoFacturationUser[columnName];
        if(newValue != null){
          this.updateFormFactu.get(formControlName)?.patchValue(newValue);
        }
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
    

    this.updateProfil = {
      id: sessionStorage.getItem('id'),
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
    }
    console.log(this.updateProfil);
    this.updateProfil = JSON.stringify(this.updateProfil);

    this.http.post('https://edward-comics.go.yj.fr/php/update_facturation.php', this.updateProfil).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Votre profil de facturation a bien été mis à jour');
          this.router.navigate(['/detail-compte']);
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
    
  }

}
