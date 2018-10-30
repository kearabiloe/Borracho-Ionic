import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Settings } from '../settings/settings';

@Injectable()
export class GpsProvider {
  public geolocation: Geolocation;
  public settings: Settings;
  constructor() {
    console.log('Initiated Gps');
  }

  public getCurrentPosition(): Observable<boolean> {
    return new Observable((observer) => {
      console.log("Getting location...");
      this.geolocation.getCurrentPosition().then((resp)=>{
      	let coords = resp.coords;
      	console.log("Location: ",resp);
      	this.settings.load().then(() => {
      		this.settings.setValue('gps',{latitude: coords.latitude, longitude: coords.longitude, accuracy:coords.accuracy});
      	});
      	observer.next(true);
      	observer.complete();
      }).catch(error => {
          console.error(error);
          observer.error(error);
          observer.complete();        
      });
    });
  }

  public gpsInitialize(){
  	this.getCurrentPosition()
  }
}