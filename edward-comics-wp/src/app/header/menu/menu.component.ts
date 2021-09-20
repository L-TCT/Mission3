import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items!: MenuItem[];

  userGuard = null;
  userGuardSubscription!: Subscription;




  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userGuardSubscription = this.authService.userGuardSubject.subscribe(
      (userGuard: any) => {
        this.userGuard = userGuard;
        if (this.userGuard != null) {
          this.items = [
            {
              label: 'Accueil',
              icon: 'pi pi-fw pi-home',
              routerLink: 'home'
            },
            {
              label: 'Promo',
              icon: 'pi pi-euro',
              routerLink: ["liste", { theme: "promotion", valeur: 1 }]
            },
            {
              label: 'Sélection du moment',
              icon: 'pi pi-heart',
              routerLink: ["liste", { theme: "selection", valeur: 1 }]
            },
            {
              label: 'Nouveautés',
              icon: 'pi pi-bell',
              routerLink: ["liste", { theme: "nouveaute", valeur: 1 }]
            },
    
            {
              label: 'Univers',
              items: [
                {
                  label: 'DC Comics',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'univers', valeur: 'DC Comics' }]
                },
                {
                  label: 'Marvel',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'univers', valeur: 'Marvel' }]
    
                },
              ]
            },
            {
              label: 'Héros',
              items: [
                {
                  label: 'Batman',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'heros', valeur: 'Batman' }]
    
                },
                {
                  label: 'Superman',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'heros', valeur: 'Superman' }]
                },
              ]
            },
            {
              label: 'Catégories',
              items: [
                {
                  label: 'Super-héros',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-héros' }]
                },
                {
                  label: 'Super-vilains',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-vilains' }]
                },
                {
                  label: 'Super-girls',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-girls' }]
                },
                {
                  label: 'Anti-héros',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Anti-héros' }]
    
                },
              ]
            },
            {
              label: 'Déconnexion',
              icon: "",
              command: (event) => {
                this.authService.signOutUser();
                this.router.navigate(['home'])
              }
            },
            {
              separator: true
            },
            {
              label: 'Retour',
              icon: ""
            }
          ];
        } else {
          this.items = [
            {
              label: 'Accueil',
              icon: 'pi pi-fw pi-home',
              routerLink: 'home'
            },
            {
              label: 'Promo',
              icon: 'pi pi-euro',
              routerLink: ["liste", { theme: "promotion", valeur: 1 }]
            },
            {
              label: 'Sélection du moment',
              icon: 'pi pi-heart',
              routerLink: ["liste", { theme: "selection", valeur: 1 }]
            },
            {
              label: 'Nouveautés',
              icon: 'pi pi-bell',
              routerLink: ["liste", { theme: "nouveaute", valeur: 1 }]
            },
    
            {
              label: 'Univers',
              items: [
                {
                  label: 'DC Comics',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'univers', valeur: 'DC Comics' }]
                },
                {
                  label: 'Marvel',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'univers', valeur: 'Marvel' }]
    
                },
              ]
            },
            {
              label: 'Héros',
              items: [
                {
                  label: 'Batman',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'heros', valeur: 'Batman' }]
    
                },
                {
                  label: 'Superman',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'heros', valeur: 'Superman' }]
                },
              ]
            },
            {
              label: 'Catégories',
              items: [
                {
                  label: 'Super-héros',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-héros' }]
                },
                {
                  label: 'Super-vilains',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-vilains' }]
                },
                {
                  label: 'Super-girls',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Super-girls' }]
                },
                {
                  label: 'Anti-héros',
                  icon: 'pi pi-minus',
                  routerLink: ["liste", { theme: 'categorie', valeur: 'Anti-héros' }]
    
                },
              ]
            },
            {
              separator: true
            },
            {
              label: 'Retour',
              icon: ""
            }
          ];
        }
      }
    );
    this.authService.emituserGuard();
    
  }

}
