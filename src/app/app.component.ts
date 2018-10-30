import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { GpsProvider } from '../providers/gps/gps';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-item >
          <ion-avatar item-start>
            <img src="assets/img/appicon.png">
          </ion-avatar>
          <ion-title>
            Borracho
          </ion-title>
        </ion-item>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  firstRun: any = false;


  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Home', component: 'TabsPage' },
    { title: 'Settings', component: 'SettingsPage' },
  ]

  constructor(private translate: TranslateService,
    platform: Platform,
    private settings: Settings,
    private gpsProv: GpsProvider,
    private config: Config,
    private statusBar: StatusBar,
    private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      SplashScreen.hide().catch((err)=>{console.log(err)});
      //this.initPush();

    });
    this.initTranslate();
    this.setRootPage();
    this.gpsProv.gpsInitialize()
  }

  setRootPage() {

    this.settings.load().then(() => {
      this.settings.getValue('firstRun').then((val)=>{
        this.firstRun=val
      });
      console.log("First run",this.firstRun);
      if(this.firstRun){
        this.settings.setValue('firstRun',false)
      }else{
        this.rootPage = 'WelcomePage';
      }      
    });

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  initPush(){
// to check if we have permission
this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

/*// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
this.push.createChannel({
 id: "testchannel1",
 description: "My first test channel",
 // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
 importance: 3
}).then(() => console.log('Channel created'));

// Delete a channel (Android O and above)
this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
*/
// Return a list of currently configured channels
this.push.listChannels().then((channels) => console.log('List of channels', channels))

// to initialize push notifications

const options: PushOptions = {
   android: {},
   browser: {
       pushServiceURL: 'https://ac-parse-server.herokuapp.com/parse/push'
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


