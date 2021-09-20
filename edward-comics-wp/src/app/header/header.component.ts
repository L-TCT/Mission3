import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userGuardSubscription!: Subscription;
  nbrItemSubscription!: Subscription;
  userGuard = null;
  nbrItem = 0;

  constructor(private panierService: PanierService, private authService: AuthService) {

   
   }

  ngOnInit(): void {
    this.userGuardSubscription = this.authService.userGuardSubject.subscribe(
      (userGuard: any) => {
        this.userGuard = userGuard;
      }
    );
    this.authService.emituserGuard();

    

    this.nbrItemSubscription = this.panierService.nbrItemSubject.subscribe(
      (nbrItem: number) => {
        this.nbrItem = nbrItem;
      }
    );
    this.panierService.emitCart();

  }

}
