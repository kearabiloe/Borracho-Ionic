import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, username: string,  email: string, password: string } = {
    name: 'Test Human',
    username: 'test@example.com',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: AuthProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((success) => {
      console.log(success);
      this.navCtrl.push(MainPage);
    }, (err) => {
      console.error(err);
      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      let alert = this.alertCtrl.create({
        title: 'Error Code: '+err.code,
        subTitle: err.message,
        buttons: ['OK']
      });
      alert.present();      
      toast.present();
    });
  }
}
