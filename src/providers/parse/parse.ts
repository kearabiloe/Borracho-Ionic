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
        const RentalProperty = Parse.Object.extend('MarketListing');
        //const RentalProperty = currentUser.relation('MarketListing');
        let query = new Parse.Query(RentalProperty);
        query.skip(offset);
        query.limit(limit);
        query.descending("price");
        query.equalTo('isListed',true);
        query.equalTo('isVerified',true);
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
        const RentalProperty = Parse.Object.extend('MarketListing');
        //const RentalProperty = currentUser.relation('MarketListing');
        let query = new Parse.Query(RentalProperty);
        query.skip(offset);
        query.limit(limit);
        query.equalTo('isListed',true);
        query.ascending("price");
        query.equalTo('user',currentUser);
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
        const RentalProperty = Parse.Object.extend('MarketListing');
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
    const RentalProperty = Parse.Object.extend('MarketListing');

    let rentalProperty = new RentalProperty();
    let currentUser = Parse.User.current();
    let point = new Parse.GeoPoint({latitude: newProperty.coordinates.split(',')[0], longitude: newProperty.coordinates.split(',')[1]})

    rentalProperty.set('name', newProperty.name);
    rentalProperty.set('street_address', newProperty.street_address);
    rentalProperty.set('suburb', newProperty.suburb);
    rentalProperty.set('price', parseFloat(newProperty.price));
    rentalProperty.set('deposit', parseFloat(newProperty.deposit));
    rentalProperty.set('period', newProperty.period);
    rentalProperty.set('description', newProperty.description);
    rentalProperty.set('manager', newProperty.manager);
    if(newProperty.propertyPic){
      let file = new Parse.File("myfile.png", { base64: newProperty.propertyPic });
      file.save();
      rentalProperty.set('propertyPic', file);
    }
    rentalProperty.set('user', currentUser);
    rentalProperty.set('isVerified', newProperty.isVerified);
    rentalProperty.set('isListed', newProperty.isListed);
    rentalProperty.set('isBusiness', newProperty.isBusiness);
    rentalProperty.set('segment', newProperty.segment);
    rentalProperty.set('gps', point);

    return rentalProperty.save(null, {
      success: function (rentalProperty) {
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
        const RentalProperty = Parse.Object.extend('MarketListing');
        let query = new Parse.Query(RentalProperty);
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
        const LaundryOrder = Parse.Object.extend('LaundryOrder');
        //const RentalProperty = currentUser.relation('MarketListing');
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
        const StudioProduct = Parse.Object.extend('StudioProduct');
        //const RentalProperty = currentUser.relation('MarketListing');
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
    const Property = Parse.Object.extend("MarketListing");
    let rentProperty = new Property();
    rentProperty.id = newApplication.property.objectId;
    let rentApplication = new RentApplication();
    let currentUser = Parse.User.current();
    let point = new Parse.GeoPoint({latitude: newApplication.latitude, longitude: newApplication.longitude});
    rentApplication.set('name', newApplication.name);
    rentApplication.set('contact_no', newApplication.contact_no);
    rentApplication.set('onWhatsapp', newApplication.onWhatsapp);
    rentApplication.set('location', point);
    rentApplication.set('user', currentUser);
    rentApplication.set('property', rentProperty);

    return rentApplication.save(null, {
      success: function (rentApplication) {
        return rentApplication;
      },
      error: function (rentApplication, error) {
        console.log(error);
        return error;
      }
    });
  }

  public getMarketPartners(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const MarketPartners = Parse.Object.extend('MarketPartner');
        //const RentalProperty = currentUser.relation('MarketListing');
        let query = new Parse.Query(MarketPartners);
        //query.equalTo('isDone',false);
        query.find().then((MarketPartners) => {
          resolve(MarketPartners);
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
