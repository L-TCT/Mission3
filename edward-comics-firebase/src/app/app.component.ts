import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDULLQOrVBhcMJV1F49cZvWRbMdH-5c0qs",
      authDomain: "mission3-69b2b.firebaseapp.com",
      projectId: "mission3-69b2b",
      storageBucket: "mission3-69b2b.appspot.com",
      messagingSenderId: "641873096537",
      appId: "1:641873096537:web:cce921bf31f8c614b16648"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
  cloneDatabase(){
    const firestore = firebase.firestore()
    const collectionRef = firestore.collection("Comics");
    const batch = firestore.batch();

    fetch('assets/bdd.json')
    .then(res => res.json())
    .then((data)=>{
      for(let doc of data.Comics){
        const docRef = collectionRef.doc();
        batch.set(docRef, doc);
      }
      batch.commit()
      .then(() => console.log('ok'))
      .catch(err => console.error(err));
    })

  }
}

