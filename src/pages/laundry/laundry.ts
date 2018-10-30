import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ParseProvider } from '../../providers/parse/parse';

/**
 * Generated class for the LaundryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laundry',
  templateUrl: 'laundry.html',
})
export class LaundryPage {
	laundryOrders =[];
  showSpinner= true;
  spinnerMessage: any = "Loading...";

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private parseProvider:ParseProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
  	this.listOrders();
  }

  public listOrders(): Promise<any> {
    let offset = this.laundryOrders.length;
    let limit = 10;
    return this.parseProvider.listLaundryOrders(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.laundryOrders.push(object.toJSON());
      }
      this.showSpinner = false;
      this.spinnerMessage =false;      
    }, (error) => {
      console.log(error);
      this.showSpinner = false;
      this.spinnerMessage = error.message;
    });
  }

    doRefresh(refresher) {
    this.showSpinner=true;
    this.spinnerMessage="Loading...";
    this.laundryOrders = [];
    this.listOrders();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  addLaundry() {
    let addModal = this.modalCtrl.create('LaundryOrderPage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.parseProvider.addRentalProperty(item).then(()=>{
        	console.log(item)
        });
      }
    })
    addModal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundryPage');
  }

}
