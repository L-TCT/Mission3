import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  nbrItemSubject = new Subject<number>();
  cartSubject = new Subject<IComics[]>();
  cart: IComics[] = [];
  nbrItem = 0;


  constructor() { }

  addItemsToCart(obj: IComics) {
    if(obj.quantite > 0){
      obj.quantite ++
    }else {
      obj.quantite = 1
      this.cart.push(obj);
    }
    this.nbrItem ++;
    this.nbrItemSubject.next(this.nbrItem);
  }

  emitCart() {
    this.cartSubject.next(this.cart);
    this.nbrItemSubject.next(this.nbrItem);
  }

  
}
