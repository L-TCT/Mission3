import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {

  updateForm!: FormGroup;
  errorMessage!: String;

  infoUser: any = [];
  updateProfil: any = {};

  static FORM_COLUMN_MAP: { [x: string]: string } = {
    nom: "nom",
    prenom: "prenom",
    telephone: "telephone",
    email: "email"
  };



  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private http : HttpClient) {   

  }


  ngOnInit(): void {
   this.getUserInfo(sessionStorage.getItem('id'));
    this.initForm();
  }



  getUserInfo(id: any) {
    let user = JSON.stringify(id);
    this.http.post(' https://edward-comics.go.yj.fr/php/info_user.php', user).subscribe(
      (response: any) => {
        if (response['success']) {
          this.infoUser = response['user'];
          this.hydrateForm();
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }


  initForm() {
    this.updateForm = this.formBuilder.group({
      telephone: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(30)]],
      nom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      prenom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]]
    });
  }

  hydrateForm(){
    Object.keys(DetailCompteComponent.FORM_COLUMN_MAP)
      .forEach(formControlName => {
        const columnName = DetailCompteComponent.FORM_COLUMN_MAP[formControlName];
        const newValue = this.infoUser[columnName];
        if(newValue != null){
          this.updateForm.get(formControlName)?.patchValue(newValue);
        }
      });
  }

  updateUser() {
    let id = sessionStorage.getItem('id');
    let nom = this.updateForm.get('nom')?.value;
    let prenom = this.updateForm.get('prenom')?.value;
    let telephone = this.updateForm.get('telephone')?.value;

    this.updateProfil = {
      nom : nom,
      prenom : prenom, 
      id : id,
      telephone : telephone
    }
 
    this.updateProfil = JSON.stringify(this.updateProfil);
    this.http.post('https://edward-comics.go.yj.fr/php/update_user.php', this.updateProfil).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Votre profil a bien été mis à jour')
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
    
  }
}
