import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController,ToastController } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';
/**
 * Generated class for the RentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:"rental/property"})
@Component({
  selector: 'page-rental-detail',
  templateUrl: 'rental-detail.html',
})
export class RentalDetailPage {
	rentalProperty:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public parseProv:ParseProvider,
  	public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  	public loadCtrl: LoadingController) {
  	this.rentalProperty = navParams.get('property');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalDetailPage');
  }

  presentContactUs(Property) {
    let applyModal = this.modalCtrl.create('RentLeadPage',{property:Property},{showBackdrop:true});
    applyModal.onDidDismiss(applicationForm => {
      if (applicationForm) {
        console.log(applicationForm);
      let loader = this.loadCtrl.create({
        content: 'Submitting Application...'
      });
      loader.present();      
      console.log("go");  
        this.parseProv.addRentApplication(applicationForm).then((resp)=>{
          loader.dismissAll();

          let toast = this.toastCtrl.create({
            message: "Your new application was successfuly created.",
            duration: 3000,
            position: 'top'
          });      
          
          toast.present();          
          }).catch(err =>{
            console.error(err);
            loader.dismissAll();
            let alert = this.alertCtrl.create({
              title: 'Property Rental Application Was Not Created',
              subTitle: err.message,
              buttons: ['OK']
            });  
            alert.present();              
          })
      }
    })
    applyModal.present();
  }  

}
