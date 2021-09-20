import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeSubject = new Subject<boolean>();
  comicSubject = new Subject<IComics>();
  comic!: IComics;
  active = false;

  constructor() { }

  hideModal() {
   return this.active = false
  }

  showModal() {

   return this.active = true

  }     
  
  emitComic() {
    this.comicSubject.next(this.comic);
    this.activeSubject.next(this.active);
    console.log(this.active);
  }


}
