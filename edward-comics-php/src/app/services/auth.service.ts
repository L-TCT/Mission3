import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user!: any;
  // userSubject = new Subject<any>();
  sessionValue: any = null;
  userGuard: any = sessionStorage.getItem('id');
  userGuardSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  emituserGuard(){
    this.userGuardSubject.next(this.userGuard);
  }

  createNewUser(user: IUser) {
    let userData = JSON.stringify(user);
    this.http.post('https://edward-comics.go.yj.fr/php/inscription.php', userData).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/auth/signin']);
        } else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

  signInUser(object: object) {
    let userData = JSON.stringify(object);
    this.http.post('https://edward-comics.go.yj.fr/php/connexion.php', userData).subscribe(
      (response : any) => {
        if (response['success']) {          
          sessionStorage.setItem('id', response['id']);
          this.userGuard = sessionStorage.getItem('id');
          this.emituserGuard();
          this.router.navigate(['/detail-compte']);
          
        } else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    )
  }
  signOutUser() {
    sessionStorage.removeItem('id');
    this.userGuard = null;
    this.emituserGuard();
  }


}
