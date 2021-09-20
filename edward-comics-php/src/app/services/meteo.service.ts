import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMeteoData, IWeatherData } from './WeatherData';

@Injectable({
  providedIn: 'root'
})

export class MeteoService {

  meteoDirectSubject = new Subject<any>();

  meteoDirect: IMeteoData = {
    meteoActuel: '',
    imageMeteoActuel: ''
  }

  emitMeteoDirectSubject() {
    this.meteoDirectSubject.next(this.meteoDirect);
  }



  constructor() { }

  fetchWeather(cityName: string = 'toulon'): Promise<string> {

    return fetch(`https://www.prevision-meteo.ch/services/json/${cityName.toLowerCase()}`)
      .then(function (res) { return res.json(); })
      .then((data: IWeatherData) => {

        this.meteoDirect.meteoActuel = data.current_condition.condition;
        this.meteoDirect.imageMeteoActuel = data.current_condition.icon;
        this.emitMeteoDirectSubject();

        return cityName
      });
  }
}
