import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController,AlertController } from 'ionic-angular';
// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginSuccessString: string;

  constructor(public navCtrl: NavController,
    public user: AuthProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.translateService.get('LOGIN_SUCCESS').subscribe((value) => {
      this.loginSuccessString = value;
    })
  }


  public doLogin() {
    let loader = this.loadCtrl.create({
      content: 'Signing in...'
    });
    loader.present();

    this.user.signin(this.account.username, this.account.password).subscribe((success) => {
      console.log("logged in!");
      loader.dismissAll();
      let toast = this.toastCtrl.create({
        message: this.loginSuccessString,
        duration: 3000,
        position: 'top'
      });

      toast.present();
      this.navCtrl.setRoot(MainPage);
    }, (error) => {
      console.log(error);
      loader.dismissAll();
      let alert = this.alertCtrl.create({
        title: 'Error Code: '+error.code,
        subTitle: error.message,
        buttons: ['OK']
      });
      let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });

      alert.present();
      toast.present();
    })
  }

}
