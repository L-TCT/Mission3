import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFilterComic(theme: string, valeur: boolean, valeurType: string) {
    this.router.navigate(['/liste', { theme: theme, valeur: valeur, valueType: valeurType }]);
  }

  onFilterComicPerso(theme: string, valeur: string) {
    this.router.navigate(['/liste', { theme: theme, valeur: valeur }]);
  }

}
