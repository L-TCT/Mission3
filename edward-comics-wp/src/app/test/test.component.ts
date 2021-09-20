import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { IComics } from 'src/models/comic.model';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  results: {} | any = {};
  comicsArray = [] as any;
  comics : IComics[] = [];
  book!: IComics;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('http://edward-wp-php/test.php').subscribe(
      (data) => {
        this.comicsArray = data;
        if (this.comicsArray != null) {
          for (let comic of this.comicsArray) {
            const metas = comic['meta_data']
            for (let meta of metas) {
              if (meta.id % 2 === 0) {
                let pair = meta.value;
                let key = meta.key;
                this.results[key] = pair
              }
            }
            this.book = {
              id: comic.id,
              avis: Number(this.results.avis),
              categorie: this.results.categorie,
              date: this.results.date,
              dessinateur: this.results.dessinateur,
              disponibilite: Number(this.results.disponibilite),
              editeur: this.results.editeur,
              isbn: Number(this.results.isbn),
              nbrPages: Number(this.results.nbrpages),
              nouveaute: this.parseBool(this.results.nouveaute),
              photo: comic.images[0].src,
              prix: Number(comic.price),
              promotion: this.parseBool(this.results.promotion),
              resume: comic.description,
              scenariste: this.results.scenariste,
              selection: this.parseBool(this.results.selection),
              titre: comic.titre,
              univers: this.results.univers,
              quantite: Number(this.results.quantite)
            }
            this.comics.push(this.book)
            console.log()
          }
          console.log(this.comics)
          console.log(this.comicsArray)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  parseBool(value: string): boolean{
    switch(value){
      case '1':
        return true;
      default:
        return false;
    }
  }
}
