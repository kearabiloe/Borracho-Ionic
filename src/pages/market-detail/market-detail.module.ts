import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketDetailPage } from './market-detail';

@NgModule({
  declarations: [
    MarketDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketDetailPage),
  ],
})
export class MarketDetailPageModule {}
