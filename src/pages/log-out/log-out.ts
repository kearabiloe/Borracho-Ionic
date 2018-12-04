import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LogOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html',
})
export class LogOutPage {

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public user: AuthProvider,
  	public loadCtrl: LoadingController,
    public toastCtrl: ToastController) {
  	this.doLogout()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogOutPage');
  }

  public doLogout() {
  	console.log("logging out!");
    let loader = this.loadCtrl.create({
      content: 'Signing out...'
    });
    loader.present();

    this.user.signout().subscribe((success) => {
      console.log("logged out!");
      loader.dismissAll();
      let toast = this.toastCtrl.create({
        message: "You have been logged out successfully",
        duration: 3000,
        position: 'top'
      });      
      
      toast.present();
    }, (error) => {
      console.log(error);
      loader.dismissAll();
      let toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'top'
        }); 
      
      toast.present();
    });


    setTimeout(() => {
      loader.dismissAll();
      this.navCtrl.setRoot('WelcomePage');
    }, 5000);
 
  }

}
