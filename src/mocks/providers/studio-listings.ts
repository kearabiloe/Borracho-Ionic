import { Injectable } from '@angular/core';

import { StudioListing } from '../../models/studio-listing';

@Injectable()
export class StudioListings {
  studioListings: StudioListing[] = [];

  defaultStudioListing: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let studioListings = [
      {
        "id":"doN4goxf2F",
        "title":"Let's Hope",
        "created_at":{
          "$date":"2018-11-26T20:10:50.505Z"
        },
        "updated_at":{
          "$date":"2018-11-26T22:09:45.165Z"
        },
        "artist":"Troy ft Floyd Flava",
        "album":"Borracho Sample",
        "genre":"hiphop",
        "file":{"url":"./assets/studio-listings/sample-file-1.mp3"},
        "art":{"url":"./assets/studio-listings/sample-art-1.png"}
      }
    ];

    for (let studioListing of studioListings) {
      this.studioListings.push(new StudioListing(studioListing));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.studioListings;
    }

    return this.studioListings.filter((studioListing) => {
      for (let key in params) {
        let field = studioListing[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return studioListing;
        } else if (field == params[key]) {
          return studioListing;
        }
      }
      return null;
    });
  }

  add(studioListing: StudioListing) {
    this.studioListings.push(studioListing);
  }

  delete(studioListing: StudioListing) {
    this.studioListings.splice(this.studioListings.indexOf(studioListing), 1);
  }
}
