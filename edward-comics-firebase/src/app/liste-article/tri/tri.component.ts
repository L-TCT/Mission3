import { Component, EventEmitter, Output } from '@angular/core';
import { IComicsRequestOrder } from 'src/app/services/comics.service';


@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})
export class TriComponent {
// recuperation des informations du click qui seront envoyé au parent 'liste-article'. N'est plus utilisé actuellement
  @Output()
  public onChange: EventEmitter<IComicsRequestOrder> = new EventEmitter<IComicsRequestOrder>(); 

  public setOrder(colName: string, bDescending = false){
    this.onChange.next({
      colName,
      order: bDescending ? "desc" : "asc"
    });
  }

}
