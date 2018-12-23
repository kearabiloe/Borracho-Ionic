import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ModalController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FirstRunPage } from '../pages';
import { ENV } from '../app/app.constant';
import { CacheService } from 'ionic-cache';
import { Autostart } from '@ionic-native/autostart';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-item color="primary" no-lines>
          <ion-avatar item-start>
            <img src="assets/img/appicon.png">
          </ion-avatar>
          <ion-title>
            <h2 ion-text color="light">Borracho</h2>
          </ion-title>
        </ion-item>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" >
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar color="primary">
            <p ion-text color="light">{{ env.production? 'Production':env.parseServerUrl }}</p>
      </ion-toolbar>
    </ion-footer>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  firstRun: any = false;


  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'RentalsPage' },
    { title: 'Logout', component: 'LogOutPage' },
    { title: 'Tutorial', component: 'TutorialPage' },
  ]

  env: any = ENV;

  constructor(private translate: TranslateService,
    platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private push: Push,
    private splashScreen: SplashScreen,
    private autostart: Autostart,
    cache: CacheService,
     modalCtrl: ModalController) {
      cache.setDefaultTTL(60 * 60 * 12);

      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(true);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          //let splash = modalCtrl.create(SplashPage);
          //    splash.present();
          this.initPush();
          this.autostart.enable();
    });
    this.initTranslate();

  }



  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
        this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  initPush(){
    console.log(ENV.parseServerUrl+'/push');
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to initialize push notifications

    const options: PushOptions = {
       android: {},
       browser: {
           pushServiceURL: ENV.parseServerUrl+'/push'
       }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
