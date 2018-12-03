import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MarketListingDetailPage } from './market-listing-detail';

@NgModule({
  declarations: [
    MarketListingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketListingDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    MarketListingDetailPage
  ]
})
export class MarketListingDetailPageModule { }
