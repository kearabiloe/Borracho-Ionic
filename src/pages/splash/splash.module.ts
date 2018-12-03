import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplashPage } from './splash';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SplashPage,
  ],
  imports: [
    IonicPageModule.forChild(SplashPage),
    TranslateModule.forChild()
  ],
})
export class SplashPageModule {}
