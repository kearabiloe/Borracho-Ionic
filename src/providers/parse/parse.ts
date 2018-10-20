import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
import { ENV } from '../../app/app.constant';

@Injectable()
export class ParseProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  public getRentalProperties(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const RentalProperty = Parse.Object.extend('RentalProperties');
        let query = new Parse.Query(RentalProperty);
        query.skip(offset);
        query.limit(limit);
        query.find().then((Properties) => {
          resolve(Properties);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  public getRentalProperty(propertyId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const RentalProperty = Parse.Object.extend('RentalProperties');
        let query = new Parse.Query(RentalProperty);
        query.get(propertyId).then((Property) => {
          resolve(Property);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  public addRentalProperty(newProperty): Promise<any> {
    const RentalProperty = Parse.Object.extend('RentalProperties');
    
    let rentalProperty = new RentalProperty();
    rentalProperty.set('name', newProperty.name);
    rentalProperty.set('street_address', newProperty.street_address);
    rentalProperty.set('suburb', newProperty.suburb);
    rentalProperty.set('price', newProperty.price);
    rentalProperty.set('propertyPic', newProperty.propertyPic);

    return rentalProperty.save(null, {
      success: function (rentalProperty) {
        console.log(rentalProperty);
        return rentalProperty;
      },
      error: function (rentalProperty, error) {
        console.log(error);
        return error;
      }
    });
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
