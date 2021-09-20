import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: String;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  //méthode de vérification des pattern lors de la saisie
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/), Validators.maxLength(255)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/), Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(30)]],
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      adresse: ['', [Validators.pattern(/^[0-9a-zA-Z ]+$/), Validators.maxLength(255)]],
      codePostal: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(5)]],
      ville: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]]
    }, {
      validator: this.mustMatch('password', 'passwordConfirm')
    });
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // retourne si un autre validateur a déjà trouvé une erreur sur le validator
            return;
        }

        // définir une erreur sur validator si la validation échoue
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  //recupération des infos saisie pour créer un nouveau client
  onSubmit() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const passwordConfirm = this.signupForm.get('passwordConfirm')?.value;
    const nom = this.signupForm.get('nom')?.value;
    const prenom = this.signupForm.get('prenom')?.value;
    const telephone = this.signupForm.get('telephone')?.value;
    const adresse = this.signupForm.get('adresse')?.value;
    const codePostal = this.signupForm.get('codePostal')?.value;
    const ville = this.signupForm.get('ville')?.value;

    let user: IUser = {
      nom: nom,
      prenom: prenom,
      email: email,
      telephone: telephone,
      password: password,
      passwordConfirm: passwordConfirm,
      adresse: adresse,
      codePostal: codePostal,
      ville: ville
    }
    this.authService.createNewUser(user);
  }
}


