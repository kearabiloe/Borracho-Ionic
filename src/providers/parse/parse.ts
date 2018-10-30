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
    rentalProperty.set('price', parseFloat(newProperty.price));
    rentalProperty.set('period', newProperty.period);
    rentalProperty.set('propertyPic', newProperty.propertyPic);
    rentalProperty.set('manager', currentUser);
    rentalProperty.set('isVerified', newProperty.isVerified);
    rentalProperty.set('isListed', newProperty.isListed);
    rentalProperty.set('gps', point);

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

  public deleteRentalProperty(property): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const RentalProperty = Parse.Object.extend('RentalProperties');
        let query = new Parse.Query(RentalProperty);
        console.log(property);
        query.get(property.objectId).then((Property) => {
          Property.destroy().then((property) =>{
            resolve(property);
          }, (error) =>{
            reject(error);
          })
        }, (error) => {
          reject(error);
        });
      }, 500);
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

  public addRentApplication(newApplication): Promise<any> {
    const RentApplication = Parse.Object.extend('RentApplication');
    const Property = Parse.Object.extend("RentalProperties");
    let rentProperty = new Property();
    console.log(newApplication);
    rentProperty.id = newApplication.property.objectId;
    let rentApplication = new RentApplication();
    let currentUser = Parse.User.current();
    let point = new Parse.GeoPoint({latitude: newApplication.latitude, longitude: newApplication.longitude});
    console.log(point);
    rentApplication.set('name', newApplication.name);
    rentApplication.set('contact_no', newApplication.contact_no);
    rentApplication.set('onWhatsapp', newApplication.onWhatsapp);
    rentApplication.set('location', point);
    rentApplication.set('user', currentUser);
    rentApplication.set('property', rentProperty);

    return rentApplication.save(null, {
      success: function (rentApplication) {
        console.log(rentApplication);
        return rentApplication;
      },
      error: function (rentApplication, error) {
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
