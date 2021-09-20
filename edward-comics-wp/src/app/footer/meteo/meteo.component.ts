import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeteoService } from 'src/app/services/meteo.service';
import { IMeteoData } from 'src/app/services/WeatherData';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  meteoDirectSubcription!: Subscription;

  meteoDirect!: IMeteoData;

  constructor(private meteoService: MeteoService) { }

  ngOnInit(): void {

    this.meteoDirectSubcription = this.meteoService.meteoDirectSubject.subscribe(
      (meteoDirect: IMeteoData) => {
        this.meteoDirect = meteoDirect;
      }
    );
    this.meteoService.emitMeteoDirectSubject();
  }
  ngOnDestroy(){
    this.meteoDirectSubcription.unsubscribe();
  }

}
