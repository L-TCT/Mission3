import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

export enum State {
  left =  "left",
  right = "right"
}

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.css']
})
export class CarouselImageComponent implements OnInit {
//caroussel permettant d'afficher des comics filtrés suivant l'information envoyé par le parent
  comics!: Array<IComics>;
  State = State;

  statut!: State;

  @Input() config!: IcomicsFilterOrder //infos venant du parent

  constructor(private comicsService: ComicsService, private router: Router) { }

// à l'initialisation la fonction filtre de comicservice est utilisé avec les infos du parent
  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
    .subscribe((book: IComics[]) => {
      this.comics = book;})

  }
  firstItemIdx = 0;

//positionnement des comics à gauche
  shiftLeft() {
    this.firstItemIdx = (this.firstItemIdx - 1) % this.comics.length;
    return this.statut = State.left;
  }

//positionnement des comics à droite
  shiftRight() {
    this.firstItemIdx = (this.firstItemIdx + 1) % this.comics.length;
    return this.statut = State.right;
  }

  getOrderedItems() {
    if (!this.comics) {
      return [];
    }
    const start = this.comics.slice(this.firstItemIdx);
    const end = this.comics.slice(0, this.firstItemIdx);
    return [...start, ...end];
  }

  getSlideClass(itemIndex: number) {
    const itemClasses = ['item'];
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      if (itemIndex < 5 ) {
        itemClasses.push(`move-to-position${itemIndex + 1}-from-${this.statut}`);
      }else {
        itemClasses.push('hide');
      }
    }
    else {
      if (itemIndex < 3 ) {
        itemClasses.push(`move-to-position${itemIndex + 1}-from-${this.statut}`);
      }else {
        itemClasses.push('hide');
      }
    }


    return itemClasses.join(' ');
  }

  //méthode pour envoyer l'id à détail-article via la route
  onViewComic(id: number) {
    this.router.navigate(['/liste', 'view', id]);
  }

}
