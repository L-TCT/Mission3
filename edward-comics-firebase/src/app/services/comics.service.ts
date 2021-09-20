import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import firebase from 'firebase';


export interface IComicsRequestOrder {
  colName: string, 
  order: "asc" | "desc"
}

export interface IcomicsFilterOrder {
  theme: string,
  valeur: string | boolean
}

@Injectable({
  providedIn: 'root'
})

export class ComicsService {

  comics: IComics[] = [];
  comicsSubject = new Subject<any>();
  
  
  constructor() { 
    this.getComics();
  }


  emitComics()
  {
    this.comicsSubject.next(this.comics);
  }
  getComics() {
    this.getComicsPromise()
      .then(newComics => {
        this.comics = newComics;
        this.emitComics();
      })
  }

  getComicsPromise(): Promise<Array<IComics>>{
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("Comics")
        .get()
        .then(
          (querySnapshot) => {

            querySnapshot.forEach((_doc) => {
              const doc = _doc.data() as any;
              if(doc){
                this.comics.push({
                  ...doc,
                  id: _doc.id
                });
              }
            })
            resolve(this.comics)
          }
        )
        .catch(reject);
      });
  }

  

  getSingleComic(id: string): Promise<IComics>{
    const db = firebase.firestore()
    const comicRef = db.collection("Comics").doc(id)
    return new Promise((resolve, reject) => {
      comicRef
        .get()
        .then((_doc) => {
          const doc = _doc.data() as any;
          resolve({
            ...doc,
            id: _doc.id
          })
        })
      .catch(reject)
    })
  }          
    
    
  getOrderedComics(orderInfo: IComicsRequestOrder): Promise<Array<IComics>> {
    const orderCol = orderInfo.colName || "titre";
    const order = orderInfo.order || "asc";
    const db = firebase.firestore();
    var comicsRef = db.collection("Comics");

    return new Promise((resolve, reject) => {
      comicsRef.orderBy(orderCol, order)
        .get()
        .then((querySnapshot) => {
          const newComics: Array<any> = [];          
          querySnapshot.forEach((_doc) => {
            const doc = _doc.data() as any;
            newComics.push({
              ...doc,
              id: _doc.id
            });
          })
          resolve(newComics);
        })
        .catch(reject);
    })
    
  }
  
  
  getFilterComics(filterInfo: IcomicsFilterOrder): Promise<Array<IComics>> {
    const themeCol = filterInfo.theme || "univers";
    const value = filterInfo.valeur || "Marvel";
    const db = firebase.firestore();
    var comicsRef = db.collection("Comics");
    
    return new Promise((resolve, reject) => {
      comicsRef.where(themeCol, "==", value)
      .get()
      .then((querySnapshot) => {
        const newComics: Array<IComics> = [];
        querySnapshot.forEach((_doc) => {
          const doc = _doc.data() as any;
          newComics.push({
            ...doc,
            id: _doc.id
          }  
          );
        })
        resolve(newComics);
      })
      .catch(reject);
    })
  }
 
}
