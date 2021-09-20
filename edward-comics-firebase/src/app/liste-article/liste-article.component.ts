import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder, IComicsRequestOrder } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { PanierService } from '../services/panier.service';


@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})

export class ListeArticleComponent implements OnInit {

  comics!: Array<IComics>;
  filter: IcomicsFilterOrder = {
    theme: "",
    valeur: ""
  };

  
p!: number;

  constructor(private route: ActivatedRoute, private comicsService: ComicsService, private router: Router, private modalService : ModalService, private panierService: PanierService) { 

   }

  //  A l'initialisation on recupère les informations theme et valeur de la route pour l'affichage filtré de la liste. 
  //  Si pas d'info, la liste complète est affichée
  ngOnInit(): void {  
    this.route.paramMap.subscribe(params => {
      const _theme = params.get('theme');
      let _valeur: string | boolean | null = params.get('valeur');
      if(params.get('valueType') === 'boolean'){  //si ValueType = boolean, alors la valeur de 'valeur' qui est recuperé en string est passé en boolean
        if(_valeur === "true"){
          _valeur = true;
        }else{
          _valeur = false;
        }
      }
      if(_theme != null && _valeur != null){
        this.updateFilter(_theme, _valeur);
      }else {
        this.comicsService.getComics();
        this.comics = this.comicsService.comics;
      }
    });
    this.p = 1;

  }
//affichage de la liste filter grâce à la méthode getFilercomics dans comicService
  updateFilter(theme: string, value: string | boolean){ 
    this.filter.theme = theme;
    this.filter.valeur = value;
    this.comicsService.getFilterComics(this.filter).then(
      (newComics: Array<IComics>) => {
        this.comics = newComics;
      }
    )
  }

//méthode permettant d'afficher sur l'image des infos du comic au passage de la souris - écran ordinateur
  showDescription(i:number){
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      document.getElementById(`${i}`)?.classList.replace('description', 'description-hover')
    }
    else{
      return
    }
  }

//méthode permettant d'enlever de l'image les infos du comic lorsque la souris n'est plus sur le comic - ecran d'ordinateur
  hideDescription(i:number){
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      document.getElementById(`${i}`)?.classList.replace('description-hover', 'description')
    }
    else{
      return
    }
  }
  
//méthode de tri sur le tableau filtré. Les infos de tri sont récupéré du component tri
  onOrderChanged(orderInfo: IComicsRequestOrder){
    switch (orderInfo.colName) {
      case 'titre' : 
        if(orderInfo.order === 'asc') {
          this.comics.sort(function compare(a, b) {
            if (a.titre < b.titre) {
              return -1;
            }
            if (a.titre > b.titre){
                return 1;
            }
          return 0;
          })
        } else { 
          this.comics.sort(function compare(a, b) {
            if (a.titre > b.titre) {
              return -1;
            }
            if (a.titre < b.titre){
                return 1;
            }
          return 0;
          })
        };
        break;
      case 'prix':
      if(orderInfo.order === 'asc') {
        this.comics.sort((a, b) => a.prix - b.prix);
      }else {
        this.comics.sort((a, b) => b.prix - a.prix);
      }
      break;
      case 'avis':
      if(orderInfo.order === 'asc') {
        this.comics.sort((a, b) => a.avis - b.avis);
      }else {
        this.comics.sort((a, b) => b.avis - a.avis);
      }
      break;  
      }        
    }       
  
//méthode pour les boutons filtres, l'adresse url sera modifié suivant les infos.
  onFilterChanged(filterInfo: IcomicsFilterOrder){
    const themeCol = filterInfo.theme;
    const value = filterInfo.valeur;
    this.pagination();
    this.comicsService.getFilterComics(filterInfo)
      .then((newComics: Array<IComics>) => {
        this.router.navigate(['/liste', { theme: themeCol, valeur: value }]);
        this.comics = newComics;
      })
  }

//méthode pour envoyer l'id à détail-article via la route
  onViewComic(id: string) {
    this.router.navigate(['/liste', 'view', id]);
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

//méthode permettant la pagination
  pagination(){
    this.p = 1;
 }

}
