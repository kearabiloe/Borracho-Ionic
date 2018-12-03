import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MarketListings } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-market-listing-detail',
  templateUrl: 'market-listing-detail.html'
})
export class MarketListingDetailPage {
  marketListing: any;

  constructor(public navCtrl: NavController, navParams: NavParams, marketListings: MarketListings) {
    this.marketListing = navParams.get('marketListing') || marketListings.defaultMarketListing;
  }

}
