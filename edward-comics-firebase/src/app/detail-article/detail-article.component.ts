import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { PanierService } from '../services/panier.service';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  comic!: IComics;

  constructor(private route: ActivatedRoute, private router: Router, private comicsService: ComicsService, private modalService : ModalService, private panierService: PanierService) { }

  ngOnInit(): void {
    // recupération de l'ID grâce à l'adresse URL fais à l'initialisation du component. 
    // L'ID sera transmis à singleComic
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      if(_id){
        this.singleComic(_id);
      }
    });    
}
  // méthode permettant d'affiche le comic correspondant à l'Id en appelant une méthode du service comic
  singleComic(id: string) {
    this.comicsService.getSingleComic(id).then(
      (comic: IComics) => {
        this.comic = comic;
      }
    )
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
}

