import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RentalsPage } from './rentals';

@NgModule({
  declarations: [
    RentalsPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalsPage),
    TranslateModule.forChild()
  ],
})
export class RentalsPageModule {}
