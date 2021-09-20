import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComics } from '../../models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
//caroussel permettant d'afficher des comics filtrés suivant l'information envoyé par le parent
  comics!: Array<IComics>;

  @Input() config!: IcomicsFilterOrder; //infos venant du parent
  
  constructor(private comicsService: ComicsService, private modalService: ModalService, private panierService: PanierService, private router: Router) {    
  }
  //permet de mofifier le nombre de cards dans le caroussel suivant la taille de l'écran
  responsiveOptions =[
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  }
  ]
// à l'initialisation la fonction filtre de comicservice est utilisé avec les infos du parent
  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
    .subscribe((book: IComics[]) => {
      this.comics = book;})
  }

  // methode permettant d'affiche le modal et d'activer le methode addCart au clique du bouton
  enableModal(object: IComics) {
    this.modalService.comic = object ;
    this.modalService.showModal();
    this.modalService.emitComic();
    this.addToCart(object);    
  }

  // methode permetant d'envoyer les informations du comic au panier
  addToCart(comic: IComics){
    this.panierService.addItemsToCart(comic)
  }

  //méthode pour envoyer l'id à détail-article via la route
  onViewComic(id: number) {
    this.router.navigate(['/liste', 'view', id]);
  }


}
