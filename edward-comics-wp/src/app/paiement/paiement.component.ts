import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit, OnDestroy {

  

  constructor(private router : Router) { }
  counter = interval(1000);
  counterSub!: Subscription;
  secondes = 15;

  ngOnInit(): void {    
    this.counterSub = this.counter.subscribe(
      () => {
        if(this.secondes > 0)
      this.secondes --;
      else {
        this.router.navigate(['/home']);
      }
      },
      (error : string) => {
        console.log('erreur : ' + error)
      }
    );
  }
  ngOnDestroy() {
    this.counterSub.unsubscribe()
  }

}
