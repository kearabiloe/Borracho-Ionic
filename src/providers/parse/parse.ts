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
        let currentUser = Parse.User.current();
        console.log(currentUser);
        const RentalProperty = Parse.Object.extend('RentalProperties');
        //const RentalProperty = currentUser.relation('RentalProperties');
        let query = new Parse.Query(RentalProperty);
        query.skip(offset);
        query.limit(limit);
        query.descending("price");
        query.equalTo('isVerified',true);
        query.equalTo('isListed',true);
        query.find().then((Properties) => {
          resolve(Properties);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  public getUserProperties(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let currentUser = Parse.User.current();
        console.log(currentUser);
        const RentalProperty = Parse.Object.extend('RentalProperties');
        //const RentalProperty = currentUser.relation('RentalProperties');
        let query = new Parse.Query(RentalProperty);
        query.skip(offset);
        query.limit(limit);
        query.ascending("price");
        query.equalTo('manager',currentUser);
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
    let currentUser = Parse.User.current();
    let point = new Parse.GeoPoint({latitude: newProperty.latitude, longitude: newProperty.longitude})
    rentalProperty.set('name', newProperty.name);
    rentalProperty.set('street_address', newProperty.street_address);
    rentalProperty.set('suburb', newProperty.suburb);
    rentalProperty.set('price', newProperty.price);
    rentalProperty.set('period', newProperty.period);
    rentalProperty.set('propertyPic', newProperty.propertyPic);
    rentalProperty.set('manager', currentUser);
    rentalProperty.set('isVerified', newProperty.isVerified);
    rentalProperty.set('isListed', newProperty.isListed);
    rentalProperty.set('location', point);

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

  public listLaundryOrders(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let currentUser = Parse.User.current();
        console.log(currentUser);
        const LaundryOrder = Parse.Object.extend('LaundryOrder');
        //const RentalProperty = currentUser.relation('RentalProperties');
        let query = new Parse.Query(LaundryOrder);
        query.skip(offset);
        query.limit(limit);
        //query.equalTo('isDone',false);
        query.find().then((Orders) => {
          resolve(Orders);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }    

  public listStudioProducts(offset: number = 0, limit: number = 3, genre: string=''): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let currentUser = Parse.User.current();
        console.log(currentUser);
        const StudioProduct = Parse.Object.extend('Studio');
        //const RentalProperty = currentUser.relation('RentalProperties');
        let query = new Parse.Query(StudioProduct);
        query.skip(offset);
        query.limit(limit);
        if(genre){
          query.equalTo('genre',genre);
        }
        //query.equalTo('isDone',false);
        query.find().then((StudioProducts) => {
          resolve(StudioProducts);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }    

  private parseInitialize() {
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
  }

}
