import { Injectable } from '@angular/core';

import { MarketListing } from '../../models/market-listing';

@Injectable()
export class MarketListings {
  marketListings: MarketListing[] = [];

  defaultMarketListing: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let marketListings = [
      {
        "objectId":"0U8HFny54n",
        "gps":["0","0"],
        "name":"Laundry",
        "street_address":"Scheduled Laundry Every Week",
        "suburb":"Polokwane",
        "price":90,
        "deposit":1000,
        "period":"load",
        "description":"Let us collect, wash and fold your laundry every week.Join our monthly laundry club",
        "manager":"Borracho Team",
        "propertyPic":{"url":"assets/img/laundry-banner.png"},
        "user":null,
        "isVerified":true,
        "isListed":true,
        "_created_at":{"$date":"2018-11-21T14:25:56.752Z"},
        "_updated_at":{"$date":"2018-11-21T16:17:15.177Z"},
        "isBusiness":false,
        "call_to_action":"Join Laundry",
        "segment":"buy",
      },{
        "objectId":"Zo0A5HmKUq",
        "gps":["0","0"],
        "name":"Consultant",
        "street_address":"Find & Compare Rooms Faster",
        "suburb":"Polokwane",
        "price":90,
        "deposit":1000,
        "period":"lease",
        "description":"Let one of our Consultants help you rent quicker.",
        "manager":"Borracho Team",
        "propertyPic":{"url":"assets/img/student-rooms-banner.png"},
        "user":null,
        "isVerified":true,
        "isListed":true,
        "_created_at":{"$date":"2018-11-21T14:25:56.752Z"},
        "_updated_at":{"$date":"2018-11-21T16:17:15.177Z"},
        "isBusiness":false,
        "call_to_action":"Talk To Agent",
        "segment":"rent",
      },

    ];

    for (let marketListing of marketListings) {
      this.marketListings.push(new MarketListing(marketListing));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.marketListings;
    }

    return this.marketListings.filter((marketListing) => {
      for (let key in params) {
        let field = marketListing[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return marketListing;
        } else if (field == params[key]) {
          return marketListing;
        }
      }
      return null;
    });
  }

  add(marketListing: MarketListing) {
    console.log("adding market listing",marketListing);
    this.marketListings = this.marketListings.filter(listing=>listing.objectId !==marketListing.objectId);
    this.marketListings.push(marketListing);
  }

  delete(marketListing: MarketListing) {
    this.marketListings.splice(this.marketListings.indexOf(marketListing), 1);
  }
}
