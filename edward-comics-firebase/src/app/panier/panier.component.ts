import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import { ComicsService } from '../services/comics.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  cartSubscription!: Subscription;
  nbrItemSubscription!: Subscription;
  cart: IComics[] = []
  total = 0;
  nbrItem = 0;
  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
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

  deleteItem(obj: IComics) {
    const item = this.cart.indexOf(obj);
    if (item > -1){
      this.cart.splice(item, 1);
      this.panierService.nbrItem -= obj.quantite;
      this.total -= (obj.prix)*(obj.quantite)
    }
    this.panierService.emitCart();
  }
  quantityPlus(obj: IComics){
    obj.quantite ++;
    this.panierService.nbrItem ++;
    this.total += obj.prix;
    this.panierService.emitCart();
  }
  quantityMinus(obj: IComics){
    obj.quantite --;
    this.panierService.nbrItem  --;
    this.total -= obj.prix;
    this.panierService.emitCart();
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
