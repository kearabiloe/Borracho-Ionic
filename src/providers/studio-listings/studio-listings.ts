import { Injectable } from '@angular/core';

import { StudioListing } from '../../models/studio-listing';
import { Api } from '../api/api';

@Injectable()
export class StudioListings {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: StudioListing) {
  }

  delete(item: StudioListing) {
  }

}
