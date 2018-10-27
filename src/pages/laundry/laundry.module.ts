import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaundryPage } from './laundry';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LaundryPage,
  ],
  imports: [
    IonicPageModule.forChild(LaundryPage),
    TranslateModule.forChild()
  ],
})
export class LaundryPageModule {}
