import { Injectable } from '@angular/core';

import { MarketListing } from '../../models/market-listing';
import { Api } from '../api/api';

@Injectable()
export class MarketListings {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: MarketListing) {
  }

  delete(item: MarketListing) {
  }

}
