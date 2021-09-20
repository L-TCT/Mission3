import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})



export class ContactComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {  }

  //envoie le message
  envoyer(){
    alert('Votre message a bien été envoyer. Merci.');
    this.router.navigate(['/home']);
  }

}
