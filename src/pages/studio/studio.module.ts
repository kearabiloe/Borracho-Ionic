import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudioPage } from './studio';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StudioPage,
  ],
  imports: [
    IonicPageModule.forChild(StudioPage),
    TranslateModule.forChild()
  ],
})
export class StudioPageModule {}
