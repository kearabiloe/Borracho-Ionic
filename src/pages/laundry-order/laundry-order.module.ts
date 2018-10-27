import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaundryOrderPage } from './laundry-order';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LaundryOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(LaundryOrderPage),
    TranslateModule.forChild()
  ],
  exports: [
    LaundryOrderPage
  ]
})
export class LaundryOrderPageModule {}
