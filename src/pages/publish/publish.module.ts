import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishPage } from './publish';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PublishPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishPage),
    TranslateModule.forChild()
  ],
})
export class PublishPageModule {}
